import type { FC } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Label, XStack } from '@acme/ui'
import { BottomSheet } from '../BottomSheet'

import { sheetRefAtom, superchargedInputDateAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { SuperchargedInput } from './SuperchargedInput'
import { superchargedInputWordsAtom, superchargedInputSelectionAtom } from '../../atoms/addQuestion';

export const AddQuestion: FC = () => {
  const utils = api.useUtils()
  const { data: allTopics } = api.topic.all.useQuery()
  const createTopicMutation = api.topic.create.useMutation({
    async onSuccess(data) {
      await utils.topic.all.invalidate()
      return data
    },
  })
  const createQuestionTopicRelation = api.questionTopic.create.useMutation()
  const { data: people } = api.person.all.useQuery();
  const { data: groups } = api.group.all.useQuery();

  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [sheetRef] = useAtom(sheetRefAtom)
  const [inputDate] = useAtom(superchargedInputDateAtom)

  const { mutateAsync: mutateQuestion, error } = api.question.create.useMutation({
    async onSuccess(data) {
      sheetRef?.current?.close()
      const topicWord = inputWords.find((word) => word.reference === 'topic')?.word.slice(1).toLowerCase();
      const selectedTopic = allTopics?.find((topic) => topic.name.toLowerCase() === topicWord);
      const createdQuestion = data[0]
      if (createdQuestion && selectedTopic) {
        createQuestionTopicRelation.mutate({
          questionId: createdQuestion.id,
          topicId: selectedTopic.id,
        })
      }
      if (createdQuestion?.personId) {
        await utils.question.forPerson.invalidate({ id: createdQuestion.personId })
      }
      await utils.question.all.invalidate()
      // reset form
      setInputWords([])
    },
  })

  function addQuestion() {
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

    mutateQuestion({
      groupId: group?.id,
      personId: person?.id,
      question: questionText,
      reminderDatetime: inputDate,
    });
  }

  return (
    <BottomSheet sheetRefAtom={sheetRefAtom} snapPoints={['25%']}>
      <XStack justifyContent='space-between'>
        <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='question'>
          QUESTION
        </Label>
      </XStack>
      <SuperchargedInput
        // paddingVertical={'$2'}
        // marginBottom={'$4'}
        placeholder='Add Question'
        onSubmitEditing={addQuestion}
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
