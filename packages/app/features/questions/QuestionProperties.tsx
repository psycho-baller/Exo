import { CalendarDays, Tag, User, Users } from '@tamagui/lucide-icons'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
// @ts-ignore
import { Button, MyDateTimePicker, ScrollView, Text, YStack } from '@acme/ui'

import { getFullName, splitOutPersonName } from '../../utils/strings'
import TagButton from '../../components/TagButton'
import { BottomSheet } from '../../components/BottomSheet'
import { personSheetRefAtom, groupSheetRefAtom, topicsSheetRefAtom } from '../../atoms/propertiesSheet'
import { useAtom } from 'jotai'
import { Property } from '../../components/Property'
import { PeopleSearchInput, GroupSearchInput } from '../../components/SearchInput/other-search-inputs'
import { SearchResult } from '../search/SearchResult'
import { groupSchema, personSchema } from '../../utils/search'
import type { PersonSearchResult, GroupSearchResult } from '../../utils/search'
import { peopleQueryAtom, groupsQueryAtom } from '../../atoms/search'
import type { UseQueryResult } from '@tanstack/react-query'

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
  const showPersonSheet = () => personSheetRef?.current?.present()
  const showGroupSheet = () => groupSheetRef?.current?.present()
  const showTopicsSheet = () => topicsSheetRef?.current?.present()


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
    <YStack>
      {/*  TODO: 1. A list of defined metadata */}
      <Property>
        <CalendarDays size='$2' />
        {/* this is prolly platform specific */}
        {reminderDatetime ? (
          <MyDateTimePicker
            value={reminderDatetime}
            onChange={onChange}
          />
        ) : (
          <Text fontSize='$5'>
            Set a reminder
          </Text>
        )}
      </Property>
      {
        personId && (
          <Property onPress={showPersonSheet}>
            <User size='$2' />
            {/* TODO: add some indication in the UI that tells the user that they can connect a person to it... this goes against the prev to-do */}
            <PersonProperty id={personId} />

          </Property>
        )
      }
      {
        groupId && (
          <Property columnGap='$5'>
            <Users size='$2' />
            <Button unstyled onPress={showGroupSheet}>
              <GroupProperty id={groupId} />
            </Button>
          </Property>
        )
      }
      {
        topicsData && topicsData.length > 0 && (
          <Button unstyled onPress={showTopicsSheet}>
            <TopicsProperty topicsData={topicsData} />
          </Button>
        )
      }
      {/* TODO: 2. A list of undefined metadata */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        padding='$3'
      >
        {!personId && (
          <TagButton
            onPress={showPersonSheet}
            icon={User}
          // scaleIcon={ }
          >
            Person
          </TagButton>
        )}
        {!groupId && (
          <TagButton
            onPress={showGroupSheet}
            icon={Users}
          // scaleIcon={ }
          >
            Group
          </TagButton>
        )}
        {topicsData && topicsData.length === 0 && (
          <TagButton
            onPress={showTopicsSheet}
            icon={Tag}
          // scaleIcon={ }
          >
            Topic
          </TagButton>
        )}
      </ScrollView>
      <Sheets questionId={id} />
    </YStack >
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
    <Property columnGap='$5'>
      <Tag size={20} />
      <YStack>
        {topicsData.map((topic) => (
          <Text key={topic.id}>{topic.name}</Text>
        ))}
      </YStack>
    </Property>
  )
}

const Sheets = ({ questionId }: { questionId: number }) => {
  // const personRef = useRef<BottomSheetModalRef>(null)
  // const groupRef = useRef<BottomSheetModalRef>(null)
  return (
    <>
      <BottomSheet
        // ref={personRef}
        sheetRefAtom={personSheetRefAtom}
      >
        <SearchPeopleSheet questionId={questionId} />
      </BottomSheet>
      <BottomSheet
        // ref={groupRef}
        sheetRefAtom={groupSheetRefAtom}
      >
        <SearchGroupSheet questionId={questionId} />
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

const SearchPeopleSheet = ({ questionId }: { questionId: number }) => {
  const [personSheetRef] = useAtom(personSheetRefAtom)
  const [personQuery, setPersonQuery] = useAtom(peopleQueryAtom)
  const utils = api.useUtils()
  const { mutate: assignQuestionToPerson } = api.question.assignToPerson.useMutation({
    async onSuccess() {
      await utils.question.byId.invalidate({ id: questionId })
      setPersonQuery('')

    },
  })
  const { mutateAsync: createPerson } = api.person.create.useMutation({
    async onSuccess() {
      await utils.person.all.invalidate()
    },
  })

  const assignToPerson = (personId: number) => {
    assignQuestionToPerson({
      questionId,
      personId,
    })
    personSheetRef?.current?.close()

  }

  const createNewPerson = async (input: string) => {
    const { firstName, lastName } = splitOutPersonName(input)
    const [person] = await createPerson({
      firstName,
      lastName,
    })
    console.log('person:', person)
    if (person) {
      assignToPerson(person.id)
    } else {
      // add user-facing error handling here                                                                        
      console.error('Failed to create person')
    }
  }

  return (
    <YStack>
      <PeopleSearchInput />
      <SearchResult<PersonSearchResult, RouterOutputs['person']['all'][number]>
        useQueryResult={api.person.all.useQuery as () => UseQueryResult<RouterOutputs['person']['all']>}
        filterSchema={personSchema}
        resultKey="people"
        queryAtom={peopleQueryAtom}
        renderHit={(hit: PersonSearchResult) => (
          // shared component
          <Button key={hit.document.id} onPress={() => assignToPerson(Number.parseInt(hit.document.id))}>
            {hit.document.firstName}{hit.document.lastName ?? ''}
          </Button>
        )}
        RenderOnEmpty={<Button disabled={!personQuery} style={{}} onPress={() => createNewPerson(personQuery)}>Create new person</Button>}
      />
    </YStack>
  )
}

const SearchGroupSheet = ({ questionId }: { questionId: number }) => {
  const [groupSheetRef] = useAtom(groupSheetRefAtom)
  const [groupQuery, setGroupQuery] = useAtom(groupsQueryAtom)
  const utils = api.useUtils()
  const { mutate: assignQuestionToGroup } = api.question.assignToGroup.useMutation({
    async onSuccess() {
      await utils.question.byId.invalidate({ id: questionId })
      setGroupQuery('')
    },
  })
  const { mutateAsync: createGroup } = api.group.create.useMutation({
    async onSuccess() {
      await utils.group.all.invalidate()
    },
  })

  const assignToGroup = (groupId: number) => {
    assignQuestionToGroup({
      questionId,
      groupId,
    })
    groupSheetRef?.current?.close()
  }

  const createNewGroup = async (input: string) => {

    const [group] = await createGroup({
      name: input,
    })
    if (group) {
      assignToGroup(group.id)
    } else {
      // add user-facing error handling here                                                                        
      console.error('Failed to create group')
    }
  }

  return (
    <YStack>
      <GroupSearchInput />
      <SearchResult<GroupSearchResult, RouterOutputs['group']['all'][number]>
        useQueryResult={api.group.all.useQuery as () => UseQueryResult<RouterOutputs['group']['all']>}
        filterSchema={groupSchema}
        resultKey="groups"
        queryAtom={groupsQueryAtom}
        renderHit={(hit: GroupSearchResult) => (
          // shared component
          <Button key={hit.document.id} onPress={() => assignToGroup(Number.parseInt(hit.document.id))}>
            {hit.document.name}
          </Button>
        )}
        RenderOnEmpty={<Button onPress={() => createNewGroup(groupQuery)}>Create new group</Button>}
      />
    </YStack>
  )
}

// TODO: Implement this when I care enough bout topics
export const SearchTopicsSheet = ({ questionId }: { questionId: number }) => {
  const [topicsSheetRef] = useAtom(topicsSheetRefAtom)
  const utils = api.useUtils()
  // const { mutate: assignQuestionToTopic } = api.question.assignTopic.useMutation({
  //   async onSuccess() {
  //     await utils.question.byId.invalidate({ id: questionId })
  //   },
  // })
}