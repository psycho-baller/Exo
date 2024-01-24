import { RouterOutputs } from '@acme/api';
import { Link } from 'solito/link';
import { type ComponentPropsWithoutRef, type FC } from 'react';
import { XStack, Checkbox, YStack, Text } from '@acme/ui';
import { formatDate, getQuestionsFromFriendId } from '../../lib/utils';
import { MessageCircleQuestion } from '@tamagui/lucide-icons';

interface Props extends ComponentPropsWithoutRef<"div"> {
  friend: RouterOutputs["friend"]["all"][number];
  onDelete: () => void;
}

const Component: FC<Props> = (props) => {
  const { friend, onDelete } = props;

  const questions = getQuestionsFromFriendId(friend.id);
  const questionCount = questions.length;


  return (
    <Link href={`/friends/${friend.id.toString()}`}>
      <XStack px="$4" py="$4" ai="center" justifyContent="space-between">
        <YStack gap={6}>
          <Text fontSize={20} fontWeight="bold">
            {friend.name}
          </Text>
          <XStack gap={6} ai="center">
            <Text color="$secondaryColor">
              {questionCount}
            </Text>
            <MessageCircleQuestion size={15} color="$secondaryColor" strokeWidth={2.5} />
          </XStack>
        </YStack>
        <YStack gap="$1.5">
          <Text
            // style={styles.subTitle}
          >
            {formatDate(friend.createdDatetime)}
          </Text>
          {/* tags */}
          {/* friend */}
          {/* <FriendOrGroupForQuestion question={question} /> */}
        </YStack>
      </XStack>
    </Link>
  );
}

export default Component;
