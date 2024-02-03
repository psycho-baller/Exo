import type { FC } from 'react';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated'; // Import AnimatedInterpolation
import { CalendarDays, CircleUser } from '@tamagui/lucide-icons';
import { Link } from 'solito/link';

import type { RouterOutputs } from '@acme/api';
import { api } from '@acme/api/utils/trpc';
import { Text, XStack, YStack } from '@acme/ui';

import { formatDate } from '../../lib/utils/date';

interface Props {
  question: RouterOutputs['question']['all'][number];
}

const Component: FC<Props> = (props) => {
  const { question } = props;
  const date = question.createdDatetime;

  const utils = api.useUtils();
  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={swipeRight} rightThreshold={-200}>
        <Link href={`/questions/${question.id.toString()}`}>
          <XStack
            minHeight='$6'
            p={'$3'}
            ai='center'
            justifyContent='space-between'
            bg='$background'
            animation='bouncy'
            hoverStyle={{
              backgroundColor: '$secondaryBackground',
              borderRadius: 10,
            }}
          >
            <YStack gap={6}>
              {/* <Checkbox borderColor='$secondaryBackground' onPress={onDelete} /> */}
              <Text fontSize={18} fontWeight='bold'>
                {question.text}
              </Text>
              <XStack gap={18}>
                {date && (
                  <XStack gap={6} ai='center'>
                    <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
                    <Text color='$secondaryColor'>{formatDate(date)}</Text>
                  </XStack>
                )}
                <FriendOrGroupForQuestion question={question} />
              </XStack>
            </YStack>
          </XStack>
        </Link>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

function FriendOrGroupForQuestion(props: { question: RouterOutputs['question']['all'][number] }) {
  const { question } = props;
  if (question.friendId === null) {
    return null;
  }
  const { data: friend } = api.friend.byId.useQuery({
    id: question.friendId,
  });
  if (!friend) {
    return null;
  }
  return (
    <XStack gap={6} ai='center'>
      <CircleUser size={15} color='$secondaryColor' strokeWidth={2.5} />
      <Text color='$secondaryColor'>{friend.name}</Text>
    </XStack>
  );
}

function swipeRight() {
  // progressAnimatedValue: AnimatedInterpolation<string | number>, dragAnimatedValue: AnimatedInterpolation<string | number>, swipeable: Swipeable
  // const trans = dragX.interpolate({
  //   inputRange: [0, 50, 100, 101],
  //   outputRange: [-20, 0, 0, 1],
  // });
  return (
    // <Animated.View style={{
    //   transform: [{
    //     translateX: Number(trans.toString()) || 0,
    //   }]
    // }}>
    <RectButton>
      <XStack animation='bouncy' bg='$danger' p='$3' ai='center' justifyContent='center'>
        <Text fontWeight='bold'>Delete</Text>
      </XStack>
    </RectButton>
    // </Animated.View>
  );
}

export default Component;
