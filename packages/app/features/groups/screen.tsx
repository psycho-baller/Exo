import { FlashList } from '@shopify/flash-list';

import { api } from '@acme/api/utils/trpc';

import { MainPage } from '../../shared/components/Footer/MainPage';
import GroupCard from './GroupCard';

const Index = () => {
  const questionQuery = api.group.all.useQuery();

  return (
    <MainPage>
      <FlashList
        data={questionQuery.data}
        estimatedItemSize={20}
        keyExtractor={(item) => item.id.toString()}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => <GroupCard group={p.item} />}
      />
    </MainPage>
  );
};

export default Index;
