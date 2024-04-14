import type { FC } from 'react';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { interpolate } from 'react-native-reanimated'; // Import AnimatedInterpolation
import { CalendarDays, CircleUser, Trash2 } from '@tamagui/lucide-icons';
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
    <XStack
      minHeight='$6'
      padding={'$3'}
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
        </XStack>
      </YStack>
    </XStack>
  );
};

export default Component;
