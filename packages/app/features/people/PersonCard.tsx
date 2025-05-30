import { CalendarDays, MessageCircleQuestion, Trash2 } from '@tamagui/lucide-icons'
import { useMemo, type FC } from 'react'
import { useLink } from 'solito/link'

import type { RouterOutputs } from '@rooots/api'
import { api } from '@rooots/api/utils/trpc'
import { Text, XStack, YStack } from '@rooots/ui'

import { formatDate } from '../../utils/date'
import { SwipeableRow } from '../../components/SwipeableRow'
import { withHaptics } from '../../utils/haptics'
import { useTheme } from '@rooots/ui'
import { trackPersonClick } from '../../utils/amplitude'

interface Props {
  person: RouterOutputs['person']['all'][number]
}

export const PersonCard: FC<Props> = (props) => {
  const { person } = props

  const theme = useTheme()
  const utils = api.useUtils()
  const deletePersonMutation = api.person.delete.useMutation({
    onSettled: async () => {
      await utils.person.all.invalidate()
    },
  })

  const link = useLink({
    href: `/people/${String(person.id)}`,
  })

  return (
    <SwipeableRow
      rightAction={{
        color: 'red',
        icon: <Trash2 size={27.5} color={theme.textAccent?.val} strokeWidth={2} />,
        onPress: () => withHaptics(() => deletePersonMutation.mutate({ id: person.id })),
      }}
    >
      <XStack
        {...link}
        paddingVertical='$4'
        paddingHorizontal='$2.5'
        alignItems='center'
        justifyContent='space-between'
        animation='bouncy'
        onPress={(e) => {
          trackPersonClick(String(person.id))
          link.onPress?.(e)
        }}
      >
        <YStack gap={6}>
          <Text fontSize={18} fontWeight='700'>
            {person.firstName}
          </Text>
          <QuestionMetadata person={person} />
        </YStack>
        {/* topics */}
      </XStack>
    </SwipeableRow >
  )
}

function QuestionMetadata({ person }: { person: RouterOutputs['person']['all'][number] }) {
  const { data: questions } = api.question.getQuestionsForPerson.useQuery({ id: person.id })
  if (!questions) return null
  const questionCount = questions.length

  return (
    <XStack gap={18}>
      <XStack gap={6} alignItems='center'>
        <MessageCircleQuestion size={15} color='$secondaryColor' strokeWidth={2.5} />
        <Text color='$secondaryColor'>{questionCount}</Text>
      </XStack>
      {person.reminderDatetime && (
        <XStack gap={6} alignItems='center'>
          <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
          <Text color='$secondaryColor'>
            {formatDate(person.reminderDatetime)}
          </Text>
        </XStack>
      )}
    </XStack>
  )
}
