import type { FC } from 'react'

import { api } from '@rooots/api/utils/trpc'
import { Label, XStack } from '@rooots/ui'
import { BottomSheet } from '../BottomSheet'

import { questionDataAtom, sheetRefAtom, superchargedInputSelectedDateAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { type SuperchargedFormData, SuperchargedInput } from './SuperchargedInput'
import { superchargedInputWordsAtom } from '../../atoms/addQuestion';
import { initializeAmplitude, trackCreateQuestion, trackEditQuestion } from '../../utils/amplitude'

export const AddQuestion: FC = () => {
  const utils = api.useUtils()
  const { data: allTopics } = api.topic.all.useQuery()
  const createTopicMutation = api.topic.create.useMutation({
    async onSuccess(data) {
      await utils.topic.all.invalidate()
      return data
    },
  })
  const createQuestionTopicRelation = api.questionTopic.create.useMutation({
    async onSuccess(data) {
      const lastAddedQuestionTopic = data.at(-1);
      console.log('lastAddedQuestionTopic', lastAddedQuestionTopic)
      lastAddedQuestionTopic && await utils.questionTopic.getTopicsFromQuestionId.invalidate({ id: lastAddedQuestionTopic.questionId });
    },
  })
  const { data: people } = api.person.all.useQuery();
  const { data: groups } = api.group.all.useQuery();

  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [sheetRef] = useAtom(sheetRefAtom)
  const [selectedDate, setSelectedDate] = useAtom(superchargedInputSelectedDateAtom)
  const [questionData, setQuestionData] = useAtom(questionDataAtom)

  const createMutation = api.question.create.useMutation({
    async onSuccess(data) {
      sheetRef?.current?.close()
      const topicWords = inputWords
        .filter((word) => word.reference === 'topic')
        .map((word) => word.word.slice(1).toLowerCase());

      const selectedTopics = allTopics?.filter((topic) =>
        topicWords.includes(topic.name.toLowerCase())
      );

      const createdQuestion = data[0];
      if (createdQuestion && selectedTopics) {
        for (const selectedTopic of selectedTopics) {
          createQuestionTopicRelation.mutate({
            questionId: createdQuestion.id,
            topicId: selectedTopic.id,
          });
        }
      }
      if (createdQuestion?.personId) {
        await utils.question.forPerson.invalidate({ id: createdQuestion.personId });
      }
      await utils.question.all.invalidate()
      // Amplitude tracking
      if (createdQuestion) {
        await initializeAmplitude(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY || '')
        await trackCreateQuestion({
          questionId: String(createdQuestion.id),
          groupIds: createdQuestion.groupId ? [String(createdQuestion.groupId)] : undefined,
          topicIds: selectedTopics?.map(t => String(t.id)),
          date: createdQuestion.reminderDatetime ? (typeof createdQuestion.reminderDatetime === 'string' ? createdQuestion.reminderDatetime : new Date(createdQuestion.reminderDatetime).toISOString()) : undefined,
        })
      }
      // reset form
      setInputWords([])
    },
  })

  function isQuestionModified(original: any, form: {
    question: string
    groupId?: number | null
    personId?: number | null
    note?: string | null
    reminderDatetime?: Date | string | null
    topicIds?: string[]
  }) {
    if (!original) return false
    if (
      original.question !== form.question ||
      original.groupId !== form.groupId ||
      original.personId !== form.personId ||
      String(original.reminderDatetime) !== String(form.reminderDatetime) ||
      original.note !== form.note
    ) return true
    // If you want to compare topics, add logic here
    return false
  }

  const updateMutation = api.question.update.useMutation({
    async onSuccess(data) {
      sheetRef?.current?.close()
      const topicWords = inputWords
        .filter((word) => word.reference === 'topic')
        .map((word) => word.word.slice(1).toLowerCase());

      const selectedTopics = allTopics?.filter((topic) =>
        topicWords.includes(topic.name.toLowerCase())
      );
      const updateQuestion = questionData
      if (updateQuestion && selectedTopics) {
        for (const selectedTopic of selectedTopics) {
          createQuestionTopicRelation.mutate({
            questionId: updateQuestion.id,
            topicId: selectedTopic.id,
          });
        }
      }
      if (updateQuestion?.personId) {
        await utils.question.forPerson.invalidate({ id: updateQuestion.personId })
      }
      await utils.question.all.invalidate()
      // Amplitude tracking only if modified
      let updated: any = data
      if (Array.isArray(data) && typeof data[0] === 'object' && data[0] !== null) {
        updated = data[0]
      }
      if (updateQuestion && updated && isQuestionModified(updateQuestion, updated)) {
        await initializeAmplitude(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY || '')
        await trackEditQuestion({
          questionId: String(updateQuestion.id),
          groupIds: updateQuestion.groupId ? [String(updateQuestion.groupId)] : undefined,
          topicIds: selectedTopics?.map(t => String(t.id)),
          date: updateQuestion.reminderDatetime ? (typeof updateQuestion.reminderDatetime === 'string' ? updateQuestion.reminderDatetime : new Date(updateQuestion.reminderDatetime).toISOString()) : undefined,
        })
      }
      // reset form
      setInputWords([])
    },
  })

  function addQuestion(data: SuperchargedFormData) {
    // find the person id from the selected person
    const personWord = inputWords.find((word) => word.reference === 'person')?.word.slice(1).toLowerCase();
    const person = people?.find((person) => person.firstName.toLowerCase() === personWord);

    const groupWord = inputWords.find((word) => word.reference === 'group')?.word.slice(2).toLowerCase();
    const group = groups?.find((group) => group.name.toLowerCase() === groupWord);

    const questionText = inputWords
      .filter((word) => !word.reference)
      .map((word) => word.word)
      .join('')
      .trim();

    createMutation.mutateAsync({
      groupId: group?.id,
      personId: person?.id || questionData?.personId,
      question: questionText,
      note: data.note,
      reminderDatetime: selectedDate,
    });
  }

  function updateQuestion(questionId: number) {
    // find the person id from the selected person
    // ensure that questionData is not null and it contains the personId
    if (questionData?.id !== questionId) return;
    const personWord = inputWords.find((word) => word.reference === 'person')?.word.slice(1).toLowerCase();
    const person = people?.find((person) => person.firstName.toLowerCase() === personWord);

    const groupWord = inputWords.find((word) => word.reference === 'group')?.word.slice(2).toLowerCase();
    const group = groups?.find((group) => group.name.toLowerCase() === groupWord);

    const questionText = inputWords
      .filter((word) => !word.reference)
      .map((word) => word.word)
      .join('')
      .trim();

    const formValues = {
      question: questionText,
      groupId: group?.id || questionData.groupId,
      personId: person?.id || questionData.personId,
      note: questionData.note,
      reminderDatetime: selectedDate,
    }

    if (!isQuestionModified(questionData, formValues)) {
      // No change, do not call mutation or track
      return;
    }

    updateMutation.mutateAsync({
      id: questionData.id,
      groupId: formValues.groupId,
      personId: formValues.personId,
      question: formValues.question,
      note: formValues.note,
      reminderDatetime: formValues.reminderDatetime,
    });
  }
  function clearData() {
    setSelectedDate(null)
    if (questionData && questionData.createdByUserId.length > 0) { // only if we are updating a question
      updateQuestion(questionData.id)
      // setInputWords([])
    }
  }

  return (
    <BottomSheet sheetRefAtom={sheetRefAtom} onDismiss={clearData}>
      <XStack justifyContent='space-between'>
        <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='question'>
          QUESTION
        </Label>
      </XStack>
      <SuperchargedInput
        // paddingVertical={'$2'}
        // marginBottom={'$4'}
        placeholder='Add Question'
        addQuestion={addQuestion}
        updateQuestion={updateQuestion}
        autoFocus
      />
      {/* TODO find a way to make it work for both tRPC and vanilla react-query */}
      {/* {error?.data?.code === 'UNAUTHORIZED' && (
        <ErrorText textAlign='center'>You need to be logged in to ask a question</ErrorText>
      )}
      {error?.data?.zodError?.fieldErrors.text && (
        <ErrorText textAlign='center'>{error.data.zodError.fieldErrors.text}</ErrorText>
      )} */}
    </BottomSheet>
  )
}
