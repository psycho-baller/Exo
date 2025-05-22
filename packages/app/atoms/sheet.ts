import { atom, useAtom } from 'jotai'
import type { RefObject } from 'react'
import type { BottomSheetModalRef } from '../components/BottomSheet'

const sheetOpenAtom = atom(false)

export function useSheetOpen() {
  return [...useAtom(sheetOpenAtom)] as const
}
export const videoSheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)