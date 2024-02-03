import type { ComponentPropsWithoutRef, FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { api } from '@acme/api/utils/trpc';

import { PageWithNavFooter } from '../../shared/components/Footer/PageWithNavFooter';
import FriendCard from './FriendCard';

const Component: FC = () => {
  const friendQuery = api.friend.all.useQuery();

  return (
    <PageWithNavFooter>
      <FlashList
        data={friendQuery.data}
        estimatedItemSize={20}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <FriendCard friend={p.item} />
          // <Text>{p.item.text}</Text>
        )}
      />
    </PageWithNavFooter>
  );
};

export default Component;
