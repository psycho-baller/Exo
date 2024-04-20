import { FlashList } from '@shopify/flash-list';
import { ArrowLeft } from '@tamagui/lucide-icons';
import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import { useLink, useParams } from 'solito/navigation';

import { api } from '@acme/api/utils/trpc';
import { Button, Page, Text, VirtualList, YStack } from '@acme/ui';

import { getFullName } from '../../utils/strings';
import { QuestionCard } from '../questions/QuestionCard';
import { EditPersonText } from './EditPersonText';
import { PersonProperties } from './PersonProperties';

interface Params {
  id: string;
  [key: string]: string;
}

const PersonScreen = (): ReactNode => {
  const { id } = useParams<Params>();

  const link = useLink({
    href: '/people',
  });
  const { data } = api.person.byId.useQuery({ id: Number.parseInt(id) });
  if (!data) return null;

  return (
    <Page animation='bouncy' paddingHorizontal='$5' paddingVertical='$2'>
      {/* <XStack gap={18}>
        <Button iconAfter={Trash2} size='$3' width='5%' variant='outlined'>
        </Button>
      </XStack> */}

      {/* <Label htmlFor='question' /> */}
      {Platform.OS === 'web' && (
        <Button {...link} icon={ArrowLeft} size='$3' variant='outlined'>
          Back
        </Button>
      )}
      <EditPersonText id={data.id} content={getFullName(data.firstName, data.lastName)} />
      <PersonProperties {...data} />
      <QuestionsForPerson personId={data.id} />
    </Page>
  );
};

const QuestionsForPerson = ({ personId }: { personId: number }) => {
  const { data } = api.question.getQuestionsForPerson.useQuery(personId);
  return (
    <YStack flex={1}>
      <VirtualList data={data} itemHeight={20} renderItem={(q) => <QuestionCard question={q} />} />
    </YStack>
  );
};
export default PersonScreen;
