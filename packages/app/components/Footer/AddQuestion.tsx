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

  const [question, setQuestion] = useState('')
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

  useEffect(() => {
    const words = question.includes(' ') ? question.split(' ') : [question]
    // if any of the words starts with a hashtag, show topic suggestions
    // for (const word of words) {
    //   if (word.startsWith('#')) {
    //     setShowTopicSuggestions(true);
    //     setSearchTerm(word.slice(1));
    //     return;
    //   }
    // }
    const lastWordWithKey = words.slice(-1)[0]
    if (lastWordWithKey?.startsWith('#')) {
      const lastWord = lastWordWithKey.slice(1)
      setSearchTerm(lastWord)
      // check if the last word is a topic
      const topic = allTopics?.find((topic) => topic.name === lastWord)
      // if exists, select it
      if (topic) {
        setSelectedTopic(topic)
      } else {
        setFilteredTopics(allTopics ? allTopics.filter((topic) => topic.name.includes(searchTerm)) : [])
        setShowTopicSuggestions(true)
      }
    } else {
      setShowTopicSuggestions(false)
      setSearchTerm('')
    }
  }, [question])

  const { mutateAsync: mutateQuestion, error } = api.question.create.useMutation({
    async onSuccess(data) {
      sheetRef?.current?.close()
      const createdQuestion = data[0]
      if (createdQuestion && selectedTopic) {
        createQuestionTopicRelation.mutate({
          questionId: createdQuestion.id,
          topicId: selectedTopic.id,
        })
      }
      // reset form
      setQuestion('')
      setSelectedTopic(null)
      setDropdownOpen(false)
      setPersonSearch('')
      await utils.question.all.invalidate()
    },
  })

  function addQuestion() {
    mutateQuestion({
      personId: selectedPerson?.id,
      question: question.trim().replace(`#${selectedTopic?.name}`, ''),
    })
  }

  const selectTopic = (topic: Topic) => {
    // autocomplete the question with the selected topic
    setQuestion(question.replace(/#[\w]*$/, `#${topic.name}`))
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
        <SuperchargedInput />
      </XStack>
      {showTopicSuggestions && (
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
        <Button justifyContent='flex-end' unstyled onPress={addQuestion}>
          <CheckCircle2 />
        </Button>
      </XStack>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <ErrorText textAlign='center'>You need to be logged in to ask a question</ErrorText>
      )}
      {error?.data?.zodError?.fieldErrors.text && (
        <ErrorText textAlign='center'>{error.data.zodError.fieldErrors.text}</ErrorText>
      )}
    </BottomSheet>
  )
}
