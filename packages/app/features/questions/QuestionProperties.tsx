import { CalendarDays, Tag, User } from '@tamagui/lucide-icons'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { MyDateTimePicker, Text, View, XStack, YStack } from '@acme/ui'

import { getFullName } from '../../utils/strings'

type Props = RouterOutputs['question']['all'][number]

// TODO: Make this more modular: pass in an object with all the data and this component jsut renders it. If some data is not available, do like todoist and show a list of horizontal buttons to add the data.
export function QuestionProperties({
  id,
  reminderDatetime,
  question,
  createdByUserId,
  personId,
}: Props) {
  const utils = api.useUtils()
  const { mutate: update } = api.question.update.useMutation({
    async onSuccess() {
      await utils.question.all.invalidate()
    },
  })

  const onChange = async (date: Date) => {
    update({
      id,
      reminderDatetime: date,
      createdByUserId,
      question,
    })
    await utils.question.byId.invalidate({ id: id })
  }

  return (
    <YStack gap='$3' padding='$2.5'>
      <XStack alignItems='center' columnGap='$5'>
        <CalendarDays size={20} />
        <MyDateTimePicker
          value={reminderDatetime ? reminderDatetime : new Date()}
          onChange={onChange}
        />
      </XStack>
      <XStack columnGap='$5'>
        <User size={20} />
        {/* TODO: add some indication in the UI that tells the user that they can connect a person to it... this goes against the prev to-do */}
        {personId ? <PersonProperty id={personId} /> : null}
      </XStack>
      <XStack columnGap='$5'>
        <Tag size={20} />
        <View>
          <TopicsProperty questionId={id} />
        </View>
      </XStack>
    </YStack>
  )
}

const PersonProperty = ({ id }: { id: number }) => {
  const person = api.person.byId.useQuery({ id })
  return <Text>{getFullName(person.data?.firstName ?? '', person.data?.lastName)}</Text>
}

// TODO: After we turn all createdByUsername to createdByUserId
const GroupProperty = ({ id }: { id: number }) => {
  const group = api.group.byId.useQuery({ id })
  return <Text>{group.data?.name}</Text>
}

const TopicsProperty = ({ questionId }: { questionId: number }) => {
  const topics = api.questionTopic.getTopicsFromQuestionId.useQuery({
    questionId,
  })

  return (
    <YStack>
      {topics.data?.map((topic) => (
        <Text key={topic.id}>{topic.name}</Text>
      ))}
    </YStack>
  )
}
