import { CheckCircle2, X } from '@tamagui/lucide-icons'
import { useEffect, useState } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Button, ErrorText, Label, Sheet, UnstyledInput, XStack, YStack } from '@acme/ui'

import type { Topic } from '../../../db/schema/types'
import { useAddPersonStore } from '../../stores/addQuestion'
import { AddPerson } from './AddPerson'

export const AddQuestion = () => {
  const utils = api.useUtils()
  const createTopicMutation = api.topic.create.useMutation()
  const createQuestionTopicRelation = api.questionTopic.create.useMutation()
  const searchTopics = api.topic.search.useQuery

  const [selectedPerson, setPersonSearch, dropdownOpen, setDropdownOpen] = useAddPersonStore(
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
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([])

  const { data: topics, isLoading } = searchTopics(
    { query: searchTerm },
    {
      enabled: !!searchTerm,
    },
  )

  useEffect(() => {
    if (topics && !isLoading) {
      setFilteredTopics(topics)
    }
  }, [topics, isLoading])

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
    const lastWord = words.slice(-1)[0]
    if (lastWord?.startsWith('#') || lastWord === '#') {
      setShowTopicSuggestions(true)
      setSearchTerm(lastWord.slice(1))
    } else {
      setShowTopicSuggestions(false)
      setSearchTerm('')
    }
  }, [question])

  const { mutate: mutateQuestion, error } = api.question.create.useMutation({
    async onSuccess(data) {
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
    setShowTopicSuggestions(false)
  }

  const createAndSelectTopic = (topicName: string) => {
    createTopicMutation.mutate(
      { name: topicName },
      {
        onSuccess: (topic) => {
          selectTopic(topic[0]!)
        },
      },
    )
  }

  return (
    <Sheet open={dropdownOpen} modal onOpenChange={setDropdownOpen} zIndex={50}>
      <Sheet.Handle />
      <Sheet.Frame padding='$4'>
        <XStack justifyContent='space-between'>
          <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='question'>
            QUESTION
          </Label>
          <Button unstyled style={{ cursor: 'pointer' }} onPress={() => setDropdownOpen(false)}>
            <X />
          </Button>
        </XStack>
        <XStack alignItems='center'>
          <UnstyledInput
            width={800}
            placeholderTextColor='$secondaryColor'
            opacity={0.75}
            fontSize={'$8'}
            paddingVertical={'$2'}
            marginBottom={`$4`}
            autoFocus={dropdownOpen}
            placeholder='Add Question'
            value={question}
            onChangeText={setQuestion}
          />
        </XStack>
        {showTopicSuggestions && (
          <YStack padding='$2'>
            {filteredTopics.map((topic) => (
              <Button key={topic.id} onPress={() => selectTopic(topic)}>
                {topic.name}
              </Button>
            ))}
            {searchTerm && !filteredTopics.find((topic) => topic.name === searchTerm) && (
              <Button onPress={() => createAndSelectTopic(searchTerm)}>
                {`Create "${searchTerm}"`}
              </Button>
            )}
          </YStack>
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
      </Sheet.Frame>
    </Sheet>
  )
}
