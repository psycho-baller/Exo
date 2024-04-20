import { api } from '@acme/api/utils/trpc';
import { Text, VirtualList } from '@acme/ui';

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
      <VirtualList
        data={data}
        itemHeight={20}
        renderItem={(p) => <PersonCard person={p} />}
        listEmptyComponent={<Text>No data</Text>}
      />
    </MainPage>
  );
};

export default Component;
