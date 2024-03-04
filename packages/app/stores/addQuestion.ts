import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { PersonStore } from '../types/people';

export interface PersonState {
  personSearch: string;
  selectedPerson: PersonStore | null;
  dropdownOpen: boolean;
}

export interface PersonActions {
  setPersonSearch: (search: string) => void;
  setSelectedPerson: (person: PersonStore | null) => void;
  setDropdownOpen: (open: boolean) => void;
}

export const useAddPersonStore = createWithEqualityFn<PersonState & PersonActions>()(
  devtools(
    (set, get) => ({
      personSearch: '',
      setPersonSearch: (search) => set({ personSearch: search }),
      selectedPerson: null,
      setSelectedPerson: (person) => set({ selectedPerson: person }),
      dropdownOpen: false,
      setDropdownOpen: (open) => set({ dropdownOpen: open }),
    }),
    {
      name: 'people',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
  shallow,
);
