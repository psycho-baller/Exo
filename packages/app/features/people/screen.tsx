import type { FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { api } from '@acme/api/utils/trpc';

import { PageWithNavFooter } from '../../shared/components/Footer/PageWithNavFooter';
import PersonCard from './PersonCard';

const Component: FC = () => {
  const personQuery = api.person.all.useQuery();

  return (
    <PageWithNavFooter>
      <FlashList
        data={personQuery.data}
        estimatedItemSize={20}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <PersonCard person={p.item} />
          // <Text>{p.item.text}</Text>
        )}
      />
    </PageWithNavFooter>
  );
};

export default Component;
