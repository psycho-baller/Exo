import { Text, VirtualList } from '@acme/ui';

import { api } from '@acme/api/utils/trpc';

import { MainPage } from '../../shared/components/Footer/MainPage';
import { PersonCard } from './PersonCard';

const Component = () => {
  const { isLoading, error, data } = api.person.all.useQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <MainPage>
      {data ? (
        <VirtualList data={data} itemHeight={20} renderItem={(p) => <PersonCard person={p} />} />
      ) : (
        <Text>No data</Text>
      )}
    </MainPage>
  );
};

export default Component;
