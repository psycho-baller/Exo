import { CalendarDays, MessageCircleQuestion } from '@tamagui/lucide-icons'
import type { FC } from 'react'
import { Link } from 'solito/link'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { Text, XStack, YStack } from '@acme/ui'

import { formatDate } from '../../utils/date'

interface Props {
  person: RouterOutputs['person']['all'][number]
}

export const PersonCard: FC<Props> = (props) => {
  const { person } = props

  const utils = api.useUtils()
  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  })

  return (
    <Link href={`/people/${String(person.id)}`}>
      <XStack
        paddingHorizontal='$4'
        paddingVertical='$4'
        alignItems='center'
        justifyContent='space-between'
      >
        <YStack gap={6}>
          <Text fontSize={20} fontWeight='bold'>
            {person.firstName}
          </Text>
          <QuestionMetadata person={person} />
        </YStack>
        {/* topics */}
      </XStack>
    </Link>
  )
}

function QuestionMetadata({ person }: { person: RouterOutputs['person']['all'][number] }) {
  const { data: questions } = api.question.getQuestionsForPerson.useQuery(person.id)
  if (!questions) return null
  const questionCount = questions.length
  const mostRecentQuestion = questions[0]

  return (
    <XStack gap={18}>
      <XStack gap={6} alignItems='center'>
        <MessageCircleQuestion size={15} color='$secondaryColor' strokeWidth={2.5} />
        <Text color='$secondaryColor'>{questionCount}</Text>
      </XStack>
      {mostRecentQuestion && (
        <XStack gap={6} alignItems='center'>
          <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
          <Text color='$secondaryColor'>
            {mostRecentQuestion.createdDatetime
              ? formatDate(mostRecentQuestion.createdDatetime)
              : ''}
          </Text>
        </XStack>
      )}
    </XStack>
  )
}
