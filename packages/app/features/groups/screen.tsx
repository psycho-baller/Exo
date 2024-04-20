import { FlashList } from '@shopify/flash-list';
import { Platform } from 'react-native';

import { api } from '@acme/api/utils/trpc';
import { Text, VirtualList } from '@acme/ui';

import { MainPage } from '../../components/Footer/MainPage';
import { GroupCard } from './GroupCard';

const Index = () => {
  const { isLoading, error, data } = api.group.all.useQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <MainPage>
      {data ? (
        <VirtualList data={data} itemHeight={20} renderItem={(g) => <GroupCard group={g} />} />
      ) : (
        // TODO: ADD YOUR FIRST QUESTION!!!
        <Text>No data</Text>
      )}
    </MainPage>
  );
};

export default Index;
