import { CalendarDays, CircleUser, Tag, Trash2 } from '@tamagui/lucide-icons'
import type { FC } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { interpolate } from 'react-native-reanimated' // Import AnimatedInterpolation
import { Link } from 'solito/link'
import * as Haptics from 'expo-haptics';

import type { RouterOutputs } from '@rooots/api'
import { api } from '@rooots/api/utils/trpc'
import { Text, XStack, YStack } from '@rooots/ui'

import { formatDate } from '../../utils/date'
import { SwipeableRow } from '../../components/SwipeableRow'
import { withHaptics } from '../../utils/haptics'
import { questionDataAtom, sheetRefAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { useTheme } from '@rooots/ui'

interface Props {
  question: RouterOutputs['question']['all'][number]
}

export const QuestionCard: FC<Props> = (props) => {
  const { question } = props
  const date = question.reminderDatetime

  const theme = useTheme()
  const utils = api.useUtils()
  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: async () => {
      await utils.question.all.invalidate()
      await utils.question.forPerson.invalidate({ id: question.personId })
    }
  })

  const [, setQuestionData] = useAtom(questionDataAtom)
  const [sheetRef] = useAtom(sheetRefAtom)


  function openBottomSheetWithQuestionData() {
    setQuestionData(question)
    sheetRef?.current?.present()
  }

  return (
    <SwipeableRow
      rightAction={
        {
          color: 'red',
          icon: <Trash2 size={27.5} color={theme.textAccent?.val} strokeWidth={2} />,
          onPress: () => withHaptics(() => deleteQuestionMutation.mutate({ id: question.id })),
        }
        // {
        //   color: 'green',
        //   icon: <CalendarDays size={20} color='white' strokeWidth={2.5} />,
        //   onPress: () => withHaptics(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
        // }
      }
    // renderRightActions={swipeRight}
    // enabled={true}
    // overshootRight={false}
    // overshootLeft={false}
    // friction={2}
    // leftThreshold={40}
    // rightThreshold={40}
    >
      <XStack
        onPress={openBottomSheetWithQuestionData}
        paddingVertical='$4'
        paddingHorizontal='$2.5'
        alignItems='center'
        justifyContent='space-between'
        animation='bouncy'
      >
        <YStack gap={6}>
          {/* <Checkbox borderColor='$secondaryBackground' onPress={onDelete} /> */}
          <Text fontSize={18} fontWeight='700'>
            {question.question}
          </Text>
          <XStack gap={18}>
            <PersonForQuestion question={question} />
            <GroupForQuestion question={question} />
            <TopicsForQuestion question={question} />
            {date && (
              <XStack gap={6} alignItems='center'>
                <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
                <Text color='$secondaryColor'>{formatDate(date)}</Text>
              </XStack>
            )}
          </XStack>
        </YStack>
      </XStack>
    </SwipeableRow >
  )
}

function PersonForQuestion(props: {
  question: RouterOutputs['question']['all'][number]
}) {
  const { question } = props
  if (question.personId === null) {
    return null
  }
  const personQuery = api.person.byId.useQuery({
    id: question.personId,
  })
  if (personQuery.isLoading) {
    return <Text>Loading...</Text>
  }
  if (personQuery.error) {
    return <Text>Error: {personQuery.error.message}</Text>
  }
  const { data: person } = personQuery
  if (!person) {
    return null
  }
  return (
    <XStack gap={6} alignItems='center'>
      <CircleUser size={15} color='$secondaryColor' strokeWidth={2.5} />
      <Text color='$secondaryColor'>{person.firstName}</Text>
    </XStack>
  )
}

function GroupForQuestion(props: {
  question: RouterOutputs['question']['all'][number]
}) {
  const { question } = props
  if (question.groupId === null) {
    return null
  }
  const groupQuery = api.group.byId.useQuery({
    id: question.groupId,
  })
  if (groupQuery.isLoading) {
    return <Text>Loading...</Text>
  }
  if (groupQuery.error) {
    return <Text>Error: {groupQuery.error.message}</Text>
  }
  const { data: group } = groupQuery
  if (!group) {
    return null
  }
  return (
    <XStack gap={6} alignItems='center'>
      <CircleUser size={15} color='$secondaryColor' strokeWidth={2.5} />
      <Text color='$secondaryColor'>{group.name}</Text>
    </XStack>
  )
}

function TopicsForQuestion(props: {
  question: RouterOutputs['question']['all'][number]
}) {
  const { question } = props
  const topicsQuery = api.questionTopic.getTopicsFromQuestionId.useQuery({
    id: question.id,
  })
  if (topicsQuery.isLoading) {
    return <Text>Loading...</Text>
  }
  if (topicsQuery.error) {
    return <Text>Error: {topicsQuery.error.message}</Text>
  }
  const { data: topics } = topicsQuery
  if (!topics) {
    return null
  }
  console.log('topics', topics)
  return (
    <>
      {topics.map((topic) => (
        <XStack key={topic.id} gap={5} alignItems='center'>
          <Tag size={14} color='$secondaryColor' strokeWidth={2.5} marginTop={1} />
          <Text color='$secondaryColor'>{topic.name}</Text>
        </XStack>
      ))}
    </>
  )
}


// function swipeRight(progressAnimatedValue: any, dragAnimatedValue: any) {
//   // progressAnimatedValue: AnimatedInterpolation<string | number>, dragAnimatedValue: AnimatedInterpolation<string | number>, swipeable: Swipeable
//   // const dragX = dragAnimatedValue;
//   // console.log('dragX', dragX);
//   // console.log('progressAnimatedValue', progressAnimatedValue);
//   // const trans = interpolate(progressAnimatedValue, [0, 50, 100, 101], [-20, 0, 0, 1]);
//   // console.log(trans);
//   return (
//     // <Animated.View style={{
//     //   transform: [{
//     //     translateX: Number(trans.toString()) || 0,
//     //   }]
//     // }}>
//     // <RectButton>
//     <XStack
//       animation='bouncy'
//       backgroundColor='$red'
//       padding='$3'
//       alignItems='center'
//       justifyContent='center'
//     // style={{
//     //   transform: [
//     //     {
//     //       translateX: Number(trans.toString()),
//     //     },
//     //   ],
//     // }}
//     >
//       <Trash2 size={20} color='white' strokeWidth={2.5} />
//     </XStack>
//     // </RectButton>
//     // </Animated.View>
//   )
// }
