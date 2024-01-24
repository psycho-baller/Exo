import { RouterOutputs } from '@acme/api';
import { Link } from 'solito/link';
import { type ComponentPropsWithoutRef, type FC } from 'react';
import { XStack, Checkbox, YStack, Text } from '@acme/ui';
import { formatDate } from '../../lib/utils/date';
import { CalendarDays, MessageCircleQuestion } from '@tamagui/lucide-icons';
import { api } from '@acme/api/utils/trpc';

interface Props extends ComponentPropsWithoutRef<"div"> {
  friend: RouterOutputs["friend"]["all"][number];
  onDelete: () => void;
}

const Component: FC<Props> = (props) => {
  const { friend, onDelete } = props;

  return (
    <Link href={`/friends/${friend.id.toString()}`}>
      <XStack px="$4" py="$4" ai="center" justifyContent="space-between">
        <YStack gap={6}>
          <Text fontSize={20} fontWeight="bold">
            {friend.name}
          </Text>
          <QuestionMetadata friend={friend} />
        </YStack>
        {/* tags */}
      </XStack>
    </Link>
  );
}

function QuestionMetadata({ friend }: { friend: RouterOutputs["friend"]["all"][number] }) {
  
  const {data: questions} = api.question.getQuestionsForFriend.useQuery(friend.id);
  if (!questions) return null;
  const questionCount = questions.length;
  const mostRecentQuestion = questions[0];

  return (
    <XStack gap={18}>
      <XStack gap={6} ai="center">
        <MessageCircleQuestion size={15} color="$secondaryColor" strokeWidth={2.5} />
        <Text color="$secondaryColor">
          {questionCount}
        </Text>
      </XStack>
      {mostRecentQuestion && (
        <XStack gap={6} ai="center">
          <CalendarDays size={15} color="$secondaryColor" strokeWidth={2.5} />
          <Text color="$secondaryColor">
            {formatDate(mostRecentQuestion.createdDatetime)}
          </Text>
        </XStack>
      )}
    </XStack>
  );
}

export default Component;
