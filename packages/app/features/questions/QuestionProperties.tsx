import { CalendarDays, Tag, User, Users } from '@tamagui/lucide-icons'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { MyDateTimePicker, ScrollView, Text, View, XStack, YStack } from '@acme/ui'

import { getFullName } from '../../utils/strings'
import TagButton from '../../components/TagButton'
import { BottomSheet } from '../../components/bottom-sheet'
import { personSheetRefAtom, groupSheetRefAtom, topicsSheetRefAtom } from '../../atoms/propertiesSheet'
import { useAtom } from 'jotai'

type Props = RouterOutputs['question']['all'][number]

// TODO: Make this more modular: pass in an object with all the data and this component jsut renders it. If some data is not available, do like todoist and show a list of horizontal buttons to add the data.
export function QuestionProperties({
  id,
  reminderDatetime,
  question,
  createdByUserId,
  personId,
  groupId,
}: Props) {
  const utils = api.useUtils()
  const { mutate: update } = api.question.update.useMutation({
    async onSuccess() {
      await utils.question.all.invalidate()
    },
  })

  const topics = api.questionTopic.getTopicsFromQuestionId.useQuery({
    questionId: id,
  })
  const topicsData = topics.data

  const [personSheetRef] = useAtom(personSheetRefAtom)
  const [groupSheetRef] = useAtom(groupSheetRefAtom)
  const [topicsSheetRef] = useAtom(topicsSheetRefAtom)


  const onChange = async (date: Date) => {
    update({
      id,
      reminderDatetime: date,
      createdByUserId,
      question,
    })
    await utils.question.byId.invalidate({ id: id })
  }

  // const undefinedMetadata = [
  return (
    <YStack gap='$5' padding='$2.5'>
      {/*  TODO: 1. A list of defined metadata */}
      <XStack alignItems='center' columnGap='$5'>
        <CalendarDays size={20} />
        {/* this is prolly platform specific */}
        {reminderDatetime ? (
          <MyDateTimePicker
            value={reminderDatetime}
            onChange={onChange}
          />
        ) : (
          <Text>
            Set a reminder
          </Text>
        )}
      </XStack>
      {personId && (
        <XStack columnGap='$5'>
          <User size={20} />
          {/* TODO: add some indication in the UI that tells the user that they can connect a person to it... this goes against the prev to-do */}
          <PersonProperty id={personId} />
        </XStack>
      )}
      {groupId && (
        <XStack columnGap='$5'>
          <Users size={20} />
          <View>
            <GroupProperty id={id} />
          </View>
        </XStack>
      )}
      {topicsData && topicsData.length > 0 && (
        <TopicsProperty topicsData={topicsData} />
      )}
      {/* TODO: 2. A list of undefined metadata; Horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {!personId && (
          <TagButton
            onPress={() => personSheetRef?.current?.present()}
            icon={User}
          // scaleIcon={ }
          >
            Person
          </TagButton>
        )}
        {!groupId && (
          <TagButton
            onPress={() => groupSheetRef?.current?.present()}
            icon={Users}
          // scaleIcon={ }
          >
            Group
          </TagButton>
        )}
        {topicsData && topicsData.length === 0 && (
          <TagButton
            onPress={() => topicsSheetRef?.current?.present()}
            icon={Tag}
          // scaleIcon={ }
          >
            Topic
          </TagButton>
        )}
      </ScrollView>
      <Sheets />
    </YStack>
  )
}

const PersonProperty = ({ id }: { id: number }) => {
  const person = api.person.byId.useQuery({ id })
  return <Text>{getFullName(person.data?.firstName ?? '', person.data?.lastName)}</Text>
}

const GroupProperty = ({ id }: { id: number }) => {
  const group = api.group.byId.useQuery({ id })
  return <Text>{group.data?.name}</Text>
}

const TopicsProperty = ({ topicsData }: { topicsData: RouterOutputs['questionTopic']['getTopicsFromQuestionId'] }) => {
  return (
    <XStack columnGap='$5'>
      <Tag size={20} />
      <YStack>
        {topicsData.map((topic) => (
          <Text key={topic.id}>{topic.name}</Text>
        ))}
      </YStack>
    </XStack>
  )
}

const Sheets = () => {
  // const personRef = useRef<BottomSheetModalRef>(null)
  // const groupRef = useRef<BottomSheetModalRef>(null)
  return (
    <>
      <BottomSheet
        // ref={personRef}
        sheetRefAtom={personSheetRefAtom}
      >
        <Text>Person</Text>
      </BottomSheet>
      <BottomSheet
        // ref={groupRef}
        sheetRefAtom={groupSheetRefAtom}
      >
        <Text>Group</Text>
      </BottomSheet>
      <BottomSheet
        // ref={groupRef}
        sheetRefAtom={topicsSheetRefAtom}
      >
        <Text>Topics</Text>
      </BottomSheet>
    </>
  )
}
