import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  data: any[] | undefined | null
  renderItem: (item: any) => ReactElement
  itemHeight: number
  listEmptyComponent?: ReactElement
}

export const VirtualList = ({
  data,
  renderItem,
  itemHeight,
  listEmptyComponent,
}: Props): ReactNode => {
  const { top, bottom } = useSafeAreaInsets()

  const parentRef = useRef()
  const dataLength = data?.length || 0
  const rowVirtualizer = useVirtualizer({
    count: dataLength,
    getScrollElement: () => parentRef.current as any,
    estimateSize: (index) => itemHeight,
  })

  return (
    <div
      ref={parentRef as any}
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        height: '100%',
        overflow: 'auto', // Make it scroll!
      }}
    >
      {/* The large inner element to hold all of the items */}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Only the visible items in the virtualizer, manually positioned to be in view */}
        {!data ? (
          <>{listEmptyComponent || <div>No data</div>}</>
        ) : (
          rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(data[virtualItem.index])}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
