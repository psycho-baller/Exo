import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

export interface FriendsState {
  friendSearch: string;
  selectedFriend: { name: string; id: number } | null;
  dropdownOpen: boolean;
}

export interface FriendsActions {
  setFriendSearch: (search: string) => void;
  setSelectedFriend: (friend: { name: string; id: number } | null) => void;
  setDropdownOpen: (open: boolean) => void;
}

export const useAddFriendStore = createWithEqualityFn<FriendsState & FriendsActions>()(
  devtools(
    (set, get) => ({
      friendSearch: '',
      setFriendSearch: (search) => set({ friendSearch: search }),
      selectedFriend: null,
      setSelectedFriend: (friend) => set({ selectedFriend: friend }),
      dropdownOpen: false,
      setDropdownOpen: (open) => set({ dropdownOpen: open }),
    }),
    {
      name: 'friends',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
  shallow,
);
