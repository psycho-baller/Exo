import { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useLink, useParams } from 'solito/navigation';

import { api } from '@acme/api/utils/trpc';

type Params = { id: string };

const PersonScreen = (): ReactNode => {
  const { id } = useParams<Params>();
  const link = useLink({
    href: '/',
  });
  const { data } = api.person.byId.useQuery({ id: parseInt(id) });
  if (!data) return null;

  return (
    <View>
      <Text>{data.createdDatetime?.toString()}</Text>
      <Text>{data.id}</Text>
    </View>
  );
};

export default PersonScreen;
