import { RouterOutputs } from "@acme/api";
import { Link } from "solito/link";
import { XStack, Checkbox, YStack, Text } from "@acme/ui";
import { formatDate } from "../../lib/utils";
import { api } from "@acme/api/utils/trpc";
import { CalendarDays, CircleUser } from "@tamagui/lucide-icons";

export function QuestionCard(props: {
  question: RouterOutputs["question"]["all"][number];
  onDelete: () => void;
}) {
  const { question, onDelete } = props;
  const date = question.createdDatetime;

  return (
    <Link href={`/questions/${question.id.toString()}`}>
      <XStack minHeight="$6" p={"$3"} ai="center" justifyContent="space-between">
        <YStack gap={6}>
          {/* <Checkbox borderColor='$secondaryBackground' onPress={onDelete} /> */}
          <Text fontSize={18} fontWeight="bold">
            {question.text}
          </Text>
          <XStack gap={18}>
            {date && (
              <XStack gap={6} ai="center">
                <CalendarDays size={15} color="$secondaryColor" strokeWidth={2.5} />
                <Text color="$secondaryColor">
                  {formatDate(date)}
                </Text>
              </XStack>
            )}
            <FriendOrGroupForQuestion question={question} />
          </XStack>
        </YStack>
      </XStack>
    </Link>
  );
}

function FriendOrGroupForQuestion(props: { question: RouterOutputs["question"]["all"][number] }) {
  const { question } = props;
  if (question.friendId === null) {
    return null;
  }
  const {data: friend} = api.friend.byId.useQuery({
    id: question.friendId,
  });
  if (!friend) {
    return null;
  }
  return (
    <XStack gap={6} ai="center">
      <CircleUser size={15} color="$secondaryColor" strokeWidth={2.5} />
      <Text color="$secondaryColor">
        {friend.name}
      </Text>
    </XStack>
  );
}