import { CalendarDays, CircleUser, Trash2 } from '@tamagui/lucide-icons'
import type { FC } from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { interpolate } from 'react-native-reanimated' // Import AnimatedInterpolation
import { Link } from 'solito/link'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { Text, XStack, YStack } from '@acme/ui'

import { formatDate } from '../../utils/date'
import { SwipeableRow } from '../../components/SwipeableRow'
import { withHaptics } from '../../utils/haptics'

interface Props {
  group: RouterOutputs['group']['all'][number]
}

export const GroupCard: FC<Props> = (props) => {
  const { group } = props
  const date = group.reminderDatetime

  const utils = api.useUtils()
  const { mutate: deleteMutation } = api.group.delete.useMutation({
    onSettled: () => utils.group.all.invalidate(),
  })

  return (
    <SwipeableRow
      rightAction={
        {
          color: 'red',
          icon: <Trash2 size={27.5} color='white' strokeWidth={2.5} />,
          onPress: () => withHaptics(() => deleteMutation({ id: group.id })),
        }
      }
    // renderRightActions={swipeRight}
    // enabled={true}
    // overshootRight={false}
    // overshootLeft={false}
    // friction={2}
    // leftThreshold={40}
    // rightThreshold={40}
    >
      <Link href={`/groups/${group.id.toString()}`}>
        <XStack
          paddingVertical='$4'
          paddingHorizontal='$2.5'
          alignItems='center'
          justifyContent='space-between'
          animation='bouncy'
        >
          <YStack gap={6}>
            {/* <Checkbox borderColor='$secondaryBackground' onPress={onDelete} /> */}
            <Text fontSize={18} fontWeight='700'>
              {group.name}
            </Text>
            <XStack gap={18}>
              {date && (
                <XStack gap={6} alignItems='center'>
                  <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
                  <Text color='$secondaryColor'>{formatDate(date)}</Text>
                </XStack>
              )}
              {/* TODO: Fix this when I care about persno n groups */}
              {/* <PersonOrGroupForGroup group={group} /> */}
            </XStack>
          </YStack>
        </XStack>
      </Link>
    </SwipeableRow>
  )
}

function PersonOrGroupForGroup(props: {
  group: RouterOutputs['group']['all'][number]
}) {
  const { group } = props
  if (group.personId === null) {
    return null
  }
  const personQuery = api.person.byId.useQuery({
    id: group.personId,
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

function swipeRight(progressAnimatedValue: any, dragAnimatedValue: any) {
  // progressAnimatedValue: AnimatedInterpolation<string | number>, dragAnimatedValue: AnimatedInterpolation<string | number>, swipeable: Swipeable
  // const dragX = dragAnimatedValue;
  // console.log('dragX', dragX);
  // console.log('progressAnimatedValue', progressAnimatedValue);
  // const trans = interpolate(progressAnimatedValue, [0, 50, 100, 101], [-20, 0, 0, 1]);
  // console.log(trans);
  return (
    // <Animated.View style={{
    //   transform: [{
    //     translateX: Number(trans.toString()) || 0,
    //   }]
    // }}>
    // <RectButton>
    <XStack
      animation='bouncy'
      backgroundColor='$red'
      padding='$3'
      alignItems='center'
      justifyContent='center'
    // style={{
    //   transform: [
    //     {
    //       translateX: Number(trans.toString()),
    //     },
    //   ],
    // }}
    >
      <Trash2 size={20} color='white' strokeWidth={2.5} />
    </XStack>
    // </RectButton>
    // </Animated.View>
  )
}
