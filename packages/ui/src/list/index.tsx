import { useHeaderHeight } from '@react-navigation/elements'
import { FlashList } from '@shopify/flash-list'
import { useCallback, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  data: any[] | undefined | null
  renderItem: (item: any) => ReactElement
  itemHeight: number
  listEmptyComponent?: ReactElement
  isPage?: boolean
}

export function VirtualList<T>({
  data,
  renderItem,
  itemHeight,
  listEmptyComponent,
  isPage = false,
}: Props): ReactNode {
  const { bottom } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  const [height, setHeight] = useState<number>(0)

  const render = useCallback(
    (item: { item: any }) => {
      return renderItem(item.item)
    },
    [renderItem],
  )

  return (
    <>
      {data?.length === 0 ? listEmptyComponent : (
        // @ts-ignore
        <FlashList
          data={data}
          listEmptyComponent={null}
          keyExtractor={(item, idx) => item?.id.toString() || idx}
          contentContainerStyle={{
            paddingTop: isPage ? headerHeight : 0,
            paddingBottom: bottom + (isPage ? 50 : 0)
          }}
          renderItem={render}
          estimatedItemSize={itemHeight}
        />
      )}
    </>
  )
}
