import { atom } from 'jotai'

import type { PersonStore } from '../types/people'
import type { BottomSheetModalRef } from '../components/bottom-sheet'
import type { RefObject } from 'react'

export interface PersonState {
  personSearch: string
  selectedPerson: PersonStore | null
  dropdownOpen: boolean
}

export const personSearchAtom = atom('')
export const selectedPersonAtom = atom<PersonStore | null>(null)

export const sheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)