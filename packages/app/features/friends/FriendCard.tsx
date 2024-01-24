import { RouterOutputs } from '@acme/api';
import { Link } from 'solito/link';
import { type ComponentPropsWithoutRef, type FC } from 'react';
import { XStack, Checkbox, YStack, Text } from '@acme/ui';
import { formatDate, getQuestionsFromFriendId } from '../../lib/utils';

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
      <XStack minHeight="$6" px="$4" ai="center" justifyContent="space-between">
        <XStack gap={"$3"}>
          <Text fontSize={16} fontWeight="bold">
            {friend.name}
          </Text>
        </XStack>
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
