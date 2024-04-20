import type { FC } from 'react';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { interpolate } from 'react-native-reanimated'; // Import AnimatedInterpolation
import { CalendarDays, CircleUser, Trash2 } from '@tamagui/lucide-icons';
import { Link } from 'solito/link';

import type { RouterOutputs } from '@acme/api';
import { api } from '@acme/api/utils/trpc';
import { Text, XStack, YStack } from '@acme/ui';

import { formatDate } from '../../utils/date';

interface Props {
  question: RouterOutputs['question']['all'][number];
}

export const QuestionCard: FC<Props> = (props) => {
  const { question } = props;
  const date = question.createdDatetime;

  const utils = api.useUtils();
  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={(progress, dragX) => swipeRight(progress, dragX)}
        onSwipeableOpen={() => deleteQuestionMutation.mutate(question.id)}
        enabled={true}
        overshootRight={false}
        overshootLeft={false}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
      >
        <Link href={`/questions/${question.id.toString()}`}>
          <XStack
            minHeight='$6'
            padding='$3'
            alignItems='center'
            justifyContent='space-between'
            backgroundColor='$background'
            animation='bouncy'
            hoverStyle={{
              backgroundColor: '$secondaryBackground',
              borderRadius: 10,
            }}
          >
            <YStack gap={6}>
              {/* <Checkbox borderColor='$secondaryBackground' onPress={onDelete} /> */}
              <Text fontSize={18} fontWeight='bold'>
                {question.question}
              </Text>
              <XStack gap={18}>
                {date && (
                  <XStack gap={6} alignItems='center'>
                    <CalendarDays size={15} color='$secondaryColor' strokeWidth={2.5} />
                    <Text color='$secondaryColor'>{formatDate(date)}</Text>
                  </XStack>
                )}
                <PersonOrGroupForQuestion question={question} />
              </XStack>
            </YStack>
          </XStack>
        </Link>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

function PersonOrGroupForQuestion(props: { question: RouterOutputs['question']['all'][number] }) {
  const { question } = props;
  if (question.personId === null) {
    return null;
  }
  const personQuery = api.person.byId.useQuery({
    id: question.personId,
  });
  if (personQuery.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (personQuery.error) {
    return <Text>Error: {personQuery.error.message}</Text>;
  }
  const { data: person } = personQuery;
  if (!person) {
    return null;
  }
  return (
    <XStack gap={6} alignItems='center'>
      <CircleUser size={15} color='$secondaryColor' strokeWidth={2.5} />
      <Text color='$secondaryColor'>{person.firstName}</Text>
    </XStack>
  );
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
  );
}
