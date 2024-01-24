import { RouterOutputs } from "@acme/api";
import { Link } from "solito/link";
import { XStack, Checkbox, YStack, Text } from "@acme/ui";
import { formatDate } from "../../lib/utils";
import { api } from "@acme/api/utils/trpc";

export function QuestionCard(props: {
  question: RouterOutputs["question"]["all"][number];
  onDelete: () => void;
}) {
  const { question, onDelete } = props;

  return (
    <Link href={`/questions/${question.id.toString()}`}>
      <XStack minHeight="$6" p={"$3"} ai="center" justifyContent="space-between">
        <XStack gap={"$3"}>
          <Checkbox borderColor='$secondaryBackground' onPress={onDelete} />
          <Text fontSize={16} fontWeight="bold">
            {question.text}
          </Text>
        </XStack>
        <YStack gap="$1.5">
          <Text
            // style={styles.subTitle}
          >
            {formatDate(question.createdDatetime)}
          </Text>
          {/* tags */}
          {/* friend */}
          <FriendOrGroupForQuestion question={question} />
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
    <Text>
      {friend.name}
    </Text>
  );
}