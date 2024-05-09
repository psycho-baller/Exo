import { atom } from 'jotai'

import type { BottomSheetModalRef } from '../components/bottom-sheet'
import type { RefObject } from 'react'

export const personSheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)
export const groupSheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)
export const topicsSheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)
