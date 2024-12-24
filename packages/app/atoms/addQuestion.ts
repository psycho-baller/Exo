import { atom } from 'jotai'

import type { PersonStore } from '../types/people'
import type { BottomSheetModalRef } from '../components/BottomSheet'
import type { RefObject } from 'react'
import type { RouterOutputs } from '@acme/api'
export interface PersonState {
  personSearch: string
  selectedPerson: PersonStore | null
  dropdownOpen: boolean
}

export const personSearchAtom = atom('')
export const selectedPersonAtom = atom<PersonStore | null>(null)

export const sheetRefAtom = atom<RefObject<BottomSheetModalRef> | null>(null)
export const questionDataAtom = atom<RouterOutputs['question']['all'][number] | null>(null)

export type ReferenceType = 'person' | 'group' | 'topic' | null
export type SuperchargedWord = {
  word: string
  enabled?: boolean
  reference: ReferenceType
  // active: boolean;
}
export const superchargedInputWordsAtom = atom<SuperchargedWord[]>([])
export const superchargedInputDateAtom = atom<Date | null>(null)
export const superchargedInputSelectionAtom = atom({ start: 0, end: 0 })
