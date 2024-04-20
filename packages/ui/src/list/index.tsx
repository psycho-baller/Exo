import { FlashList } from '@shopify/flash-list';
import { useCallback } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  data: any[] | undefined | null;
  renderItem: (item: any) => ReactElement;
  itemHeight: number;
  listEmptyComponent?: ReactElement;
}

export function VirtualList<T>({
  data,
  renderItem,
  itemHeight,
  listEmptyComponent,
}: Props): ReactNode {
  const { bottom } = useSafeAreaInsets();

  const render = useCallback(
    (item: { item: any }) => {
      return renderItem(item.item);
    },
    [renderItem],
  );

  return (
    <FlashList
      data={data}
      ListEmptyComponent={listEmptyComponent}
      // I can make a PR for that
      keyExtractor={(item, idx) => item?.id.toString() || idx}
      contentContainerStyle={{
        paddingBottom: bottom + 8,
      }}
      renderItem={render}
      estimatedItemSize={itemHeight}
    />
  );
}
