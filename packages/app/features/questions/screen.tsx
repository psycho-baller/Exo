import { api } from '@acme/api/utils/trpc';
import { Text, VirtualList } from '@acme/ui';

import { MainPage } from '../../shared/components/Footer/MainPage';
import { QuestionCard } from './QuestionCard';

const Index = () => {
  const { isLoading, error, data } = api.question.all.useQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <MainPage>
      {data ? (
        <VirtualList
          data={data}
          itemHeight={20}
          renderItem={(g) => <QuestionCard question={g} />}
        />
      ) : (
        <Text>No data</Text>
      )}
    </MainPage>
  );
};

export default Index;
