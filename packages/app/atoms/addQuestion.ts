import { atom } from 'jotai'

import type { PersonStore } from '../types/people'

export interface PersonState {
  personSearch: string
  selectedPerson: PersonStore | null
  dropdownOpen: boolean
}

export const personSearchAtom = atom('')
export const selectedPersonAtom = atom<PersonStore | null>(null)
// Base atom
export const dropdownOpenAtom = atom(false)

// Derived atom with a custom setter that receives another parameter (a function that runs when the atom is set)
export const derivedDropdownOpenAtom = atom(
  (get) => get(dropdownOpenAtom),
  (get, set, { newValue, onSet }) => {
    console.log('newValue', newValue)
    set(dropdownOpenAtom, newValue)
    onSet?.()
  },
)
