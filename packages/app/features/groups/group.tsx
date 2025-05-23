import { ArrowLeft } from '@tamagui/lucide-icons'
import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import { useLink, useParams } from 'solito/navigation'
import { Button, Separator } from 'tamagui'

import { api } from '@rooots/api/utils/trpc'
import { Page, VirtualList, YStack } from '@rooots/ui'

import { CARD_HEIGHT } from '../../utils/constants'
import { PersonCard } from '../people/PersonCard'
import { QuestionCard } from '../questions/QuestionCard'
import { EditGroupText } from './EditGroupText'
import { GroupProperties } from './GroupProperties'

interface Params {
  id: string
  [key: string]: string
}

const GroupScreen = (): ReactNode => {
  const { id } = useParams<Params>()

  const link = useLink({
    href: '/people',
  })
  const { data } = api.group.byId.useQuery({ id: Number.parseInt(id) })
  if (!data) return null

  return (
    <Page animation='bouncy'
      paddingHorizontal='$2'
      paddingVertical='$2'>
      {/* <XStack gap={18}>
        <Button iconAfter={Trash2} size='$3' width='5%' variant='outlined'>
        </Button>
      </XStack> */}

      {/* <Label htmlFor='group' /> */}
      {Platform.OS === 'web' && (
        <Button {...link} icon={ArrowLeft} size='$3' variant='outlined'>
          Back
        </Button>
      )}
      <EditGroupText id={data.id} content={data.name} />
      <GroupProperties {...data} />
      <Separator marginTop='$3' />
      {/* <PeopleInGroup groupId={data.id} /> */}
      <QuestionsForGroup groupId={data.id} />
    </Page>
  )
}

const QuestionsForGroup = ({ groupId }: { groupId: number }) => {
  const questions = api.question.getQuestionsForGroup.useQuery({ id: groupId })
  return (
    <YStack flex={1}>
      <VirtualList
        data={questions.data}
        itemHeight={CARD_HEIGHT}
        renderItem={(q) => <QuestionCard question={q} />}
      />
    </YStack>
  )
}

const PeopleInGroup = ({ groupId }: { groupId: number }) => {
  const { data } = api.groupsOfPeople.getPeopleFromGroupId.useQuery({ id: groupId })
  return (
    <YStack flex={1}>
      <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(p) => <PersonCard person={p.people} />}
      />
    </YStack>
  )
}

export default GroupScreen
