import { atom } from 'jotai';

import type { PersonStore } from '../types/people';

export interface PersonState {
  personSearch: string;
  selectedPerson: PersonStore | null;
  dropdownOpen: boolean;
}

export const personSearchAtom = atom('');
export const selectedPersonAtom = atom<PersonStore | null>(null);
export const dropdownOpenAtom = atom(false);
