import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

interface Props {
  data: any[];
  renderItem: (item: any) => React.ReactElement;
  itemHeight: number;
}

export function VirtualList<T>({ data, renderItem, itemHeight }: Props): ReactNode {
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
