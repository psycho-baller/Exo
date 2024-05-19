import { CheckCircle2 } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Button, ErrorText, Label, BottomSheetInput, XStack, YStack, Text } from '@acme/ui'
import { BottomSheet } from '../BottomSheet'

import type { Topic } from '../../../db/schema/types'
import { useAddPersonStore } from '../../stores/addQuestion'
import { AddPerson } from './AddPerson'
import { sheetRefAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { SuperchargedInput } from './SuperchargedInput'
import { type ReferenceType, type SuperchargedWord, superchargedInputWordsAtom } from '../../atoms/addQuestion';
import { getFullName } from '../../utils/strings'

export const AddQuestion: FC = () => {
  const utils = api.useUtils()
  const [sheetRef] = useAtom(sheetRefAtom)
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


  const [selectedPerson, setPersonSearch,
    dropdownOpen,
    setDropdownOpen
  ] = useAddPersonStore(
    (state) => [
      state.selectedPerson,
      state.setPersonSearch,
      state.dropdownOpen,
      state.setDropdownOpen,
    ],
  )

  // const [question, setQuestion] = useState('')
  const [question, setQuestion] = useAtom(superchargedInputWordsAtom);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>(allTopics ?? [])

  // const searchTopics = api.topic.search.useQuery
  // const { data: topics, isLoading } = searchTopics(
  //   { query: searchTerm },
  //   {
  //     enabled: !!searchTerm,
  //   },
  // )

  // useEffect(() => {
  //   if (topics && !isLoading) {
  //     setFilteredTopics(topics)
  //   }
  // }, [topics, isLoading])

  // useEffect(() => {
  //   const words = question.includes(' ') ? question.split(' ') : [question]
  //   // if any of the words starts with a hashtag, show topic suggestions
  //   // for (const word of words) {
  //   //   if (word.startsWith('#')) {
  //   //     setShowTopicSuggestions(true);
  //   //     setSearchTerm(word.slice(1));
  //   //     return;
  //   //   }
  //   // }
  //   const lastWordWithKey = words.slice(-1)[0]
  //   if (lastWordWithKey?.startsWith('#')) {
  //     const lastWord = lastWordWithKey.slice(1)
  //     setSearchTerm(lastWord)
  //     // check if the last word is a topic
  //     const topic = allTopics?.find((topic) => topic.name === lastWord)
  //     // if exists, select it
  //     if (topic) {
  //       setSelectedTopic(topic)
  //     } else {
  //       setFilteredTopics(allTopics ? allTopics.filter((topic) => topic.name.includes(searchTerm)) : [])
  //       setShowTopicSuggestions(true)
  //     }
  //   } else {
  //     setShowTopicSuggestions(false)
  //     setSearchTerm('')
  //   }
  // }, [question])

  const { mutateAsync: mutateQuestion, error } = api.question.create.useMutation({
    async onSuccess(data) {
      sheetRef?.current?.close()
      const topicWord = question.find((word) => word.reference === 'topic')?.word.slice(1).toLowerCase();
      const selectedTopic = allTopics?.find((topic) => topic.name.toLowerCase() === topicWord);
      const createdQuestion = data[0]
      if (createdQuestion && selectedTopic) {
        createQuestionTopicRelation.mutate({
          questionId: createdQuestion.id,
          topicId: selectedTopic.id,
        })
      }
      // reset form
      setQuestion([])
      setSelectedTopic(null)
      setDropdownOpen(false)
      setPersonSearch('')
      await utils.question.all.invalidate()
    },
  })

  function addQuestion() {
    // find the person id from the selected person
    const personWord = question.find((word) => word.reference === 'person')?.word.slice(1).toLowerCase();
    const person = people?.find((person) => person.firstName.toLowerCase() === personWord);

    const groupWord = question.find((word) => word.reference === 'group')?.word.slice(2).toLowerCase();
    const group = groups?.find((group) => group.name.toLowerCase() === groupWord);

    const questionText = question
      .filter((word) => !word.reference)
      .map((word) => word.word)
      .join('');

    mutateQuestion({
      groupId: group?.id,
      personId: person?.id,
      question: questionText,
    });
  }

  const selectTopic = (topic: Topic) => {
    // autocomplete the question with the selected topic
    // setQuestion(question.replace(/#[\w]*$/, `#${topic.name}`))
    setSelectedTopic(topic)
    console.log('selectedTopic', topic)
    setShowTopicSuggestions(false)
  }

  const createAndSelectTopic = (topicName: string) => {
    createTopicMutation.mutate(
      { name: topicName },
      {
        onSuccess: (topic) => {
          selectTopic(topic[0] ?? { id: 0, name: '', createdByUserId: '' })
        },
      },
    )
  }

  return (
    <BottomSheet sheetRefAtom={sheetRefAtom} snapPoints={['30%']}>
      <XStack justifyContent='space-between'>
        <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='question'>
          QUESTION
        </Label>
      </XStack>
      <XStack alignItems='center'>
        {/* <BottomSheetInput
          width={800}
          fontSize={'$8'}
          paddingVertical={'$2'}
          marginBottom={'$4'}
          autoFocus={dropdownOpen}
          placeholder='Add Question'
          value={question}
          onChangeText={setQuestion}
        /> */}
        <SuperchargedInput placeholder='Add Person' />
        <Button justifyContent='flex-end' unstyled onPress={addQuestion}>
          <CheckCircle2 />
        </Button>
      </XStack>
      {/* {showTopicSuggestions && (
        <>
          {filteredTopics.map((topic) => (
            <Button key={topic.id} onPress={() => selectTopic(topic)}>
              {topic.name}
            </Button>
          ))}
        </>
      )}
      {searchTerm && !filteredTopics.find((topic) => topic.name === searchTerm) && (
        <Button onPress={() => createAndSelectTopic(searchTerm)}>
          {`Create "${searchTerm}"`}
        </Button>
      )}
      <XStack>
        <AddPerson flex={1} />
      </XStack> */}
      {error?.data?.code === 'UNAUTHORIZED' && (
        <ErrorText textAlign='center'>You need to be logged in to ask a question</ErrorText>
      )}
      {error?.data?.zodError?.fieldErrors.text && (
        <ErrorText textAlign='center'>{error.data.zodError.fieldErrors.text}</ErrorText>
      )}
    </BottomSheet>
  )
}
