import { CalendarDays, Tag, User } from '@tamagui/lucide-icons';

import type { RouterOutputs } from '@acme/api';
import { api } from '@acme/api/utils/trpc';
import { MyDateTimePicker, Text, XStack, YStack } from '@acme/ui';

import { getFullName } from '../../utils/strings';

type Props = RouterOutputs['group']['all'][number];

// TODO: Make this more modular: pass in an object with all the data and this component jsut renders it. If some data is not available, do like todoist and show a list of horizontal buttons to add the data.
export function GroupProperties({ id, reminderDatetime, name, createdByUserId }: Props) {
  const utils = api.useUtils();
  const { mutate: update } = api.group.update.useMutation({
    async onSuccess() {
      await utils.question.all.invalidate();
    },
  });

  const onChange = async (date: Date) => {
    update({
      id,
      reminderDatetime: date,
      createdByUserId,
      name: name,
    });
    await utils.question.byId.invalidate({ id: id });
  };

  return (
    <YStack gap='$3' padding='$2.5'>
      <XStack alignItems='center' columnGap='$5'>
        <CalendarDays size={20} />
        <MyDateTimePicker
          value={reminderDatetime ? reminderDatetime : new Date()}
          onChange={onChange}
        />
      </XStack>
      {/* <XStack columnGap='$5'></XStack> */}
      {/* <XStack columnGap='$5'>
        <Tag size={20} />
        <View>
          <TopicsProperty questionId={id} />
        </View>
      </XStack> */}
    </YStack>
  );
}

const PersonProperty = ({ id }: { id: number }) => {
  const person = api.person.byId.useQuery({ id });
  return <Text>{getFullName(person.data?.firstName ?? '', person.data?.lastName)}</Text>;
};

// TODO: After we turn all createdByUsername to createdByUserId
const GroupProperty = ({ id }: { id: number }) => {
  const group = api.group.byId.useQuery({ id });
  return <Text>{group.data?.name}</Text>;
};

const TopicsProperty = ({ questionId }: { questionId: number }) => {
  const topics = api.questionTopic.getTopicsFromQuestionId.useQuery({
    questionId,
  });

  return (
    <YStack>
      {topics.data?.map((topic) => (
        <Text key={topic.id}>{topic.name}</Text>
      ))}
    </YStack>
  );
};
