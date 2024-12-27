import type { FC } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Label, XStack } from '@acme/ui'
import { BottomSheet } from '../BottomSheet'

import { questionDataAtom, sheetRefAtom, superchargedInputSelectedDateAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { type SuperchargedFormData, SuperchargedInput } from './SuperchargedInput'
import { superchargedInputWordsAtom } from '../../atoms/addQuestion';

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
      // reset form
      setInputWords([])
    },
  })
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
      // reset form
      setInputWords([])
    },
  })

  function addQuestion(data: SuperchargedFormData) {
    // find the person id from the selected person
    console.log('inputWords', inputWords)
    console.log('data', data)
    const personWord = inputWords.find((word) => word.reference === 'person')?.word.slice(1).toLowerCase();
    const person = people?.find((person) => person.firstName.toLowerCase() === personWord);

    const groupWord = inputWords.find((word) => word.reference === 'group')?.word.slice(2).toLowerCase();
    const group = groups?.find((group) => group.name.toLowerCase() === groupWord);

    const questionText = inputWords
      .filter((word) => !word.reference)
      .map((word) => word.word)
      .join('')
      .trim();
    console.log('questionText', questionText)

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
    console.log('inputWords', inputWords)
    const personWord = inputWords.find((word) => word.reference === 'person')?.word.slice(1).toLowerCase();
    const person = people?.find((person) => person.firstName.toLowerCase() === personWord);

    const groupWord = inputWords.find((word) => word.reference === 'group')?.word.slice(2).toLowerCase();
    const group = groups?.find((group) => group.name.toLowerCase() === groupWord);

    const questionText = inputWords
      .filter((word) => !word.reference)
      .map((word) => word.word)
      .join('')
      .trim();

    updateMutation.mutateAsync({
      id: questionData.id,
      groupId: group?.id || questionData.groupId,
      personId: person?.id || questionData.personId,
      question: questionText,
      note: questionData.note,
      reminderDatetime: selectedDate,
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
