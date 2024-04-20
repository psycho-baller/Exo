import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useLink, useParams } from 'solito/navigation';
import { Button } from 'tamagui';

import { api } from '@acme/api/utils/trpc';
import { Page, Text, VirtualList, YStack } from '@acme/ui';

import { PersonCard } from '../people/PersonCard';
import { QuestionCard } from '../questions/QuestionCard';
import { EditGroupText } from './EditGroupText';
import { GroupProperties } from './GroupProperties';

interface Params {
  id: string;
  [key: string]: string;
}

const GroupScreen = (): ReactNode => {
  const { id } = useParams<Params>();

  const link = useLink({
    href: '/people',
  });
  const { data } = api.group.byId.useQuery({ id: parseInt(id) });
  if (!data) return null;

  return (
    <Page animation='bouncy' paddingHorizontal='$5' paddingVertical='$2'>
      {/* <XStack gap={18}>
        <Button iconAfter={Trash2} size='$3' width='5%' variant='outlined'>
        </Button>
      </XStack> */}

      {/* <Label htmlFor='group' /> */}
      {Platform.OS === 'web' && (
        <Button {...link} icon={ArrowLeft} size='$3' variant='outlined'>
          Back
        </Button>
      )}
      <EditGroupText id={data.id} content={data.name} />
      <GroupProperties {...data} />
      <PeopleInGroup groupId={data.id} />
      <QuestionsForGroup groupId={data.id} />
    </Page>
  );
};

const QuestionsForGroup = ({ groupId }: { groupId: number }) => {
  const questions = api.group.getQuestionsForGroup.useQuery(groupId);
  return (
    <YStack flex={1}>
      <VirtualList
        data={questions.data}
        itemHeight={20}
        renderItem={(q) => <QuestionCard question={q.item} />}
      />
    </YStack>
  );
};

const PeopleInGroup = ({ groupId }: { groupId: number }) => {
  const { data } = api.groupsOfPeople.getPeopleFromGroupId.useQuery(groupId);
  return (
    <YStack flex={1}>
      <VirtualList
        data={data}
        itemHeight={20}
        renderItem={(p) => <PersonCard person={p.item.people} />}
      />
    </YStack>
  );
};

export default GroupScreen;
