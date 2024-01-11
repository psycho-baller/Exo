import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type FriendsState = {
  friendSearch: string;
  selectedFriend: { name: string; id: number } | null;
};

export type FriendsActions = {
  setFriendSearch: (search: string) => void;
  setSelectedFriend: (friend: { name: string; id: number }) => void;
};

export const useFriendsStore = createWithEqualityFn<
  FriendsState & FriendsActions
>()(
  devtools(
    (set, get) => ({
      friendSearch: "",
      setFriendSearch: (search) => set({ friendSearch: search }),
      selectedFriend: null,
      setSelectedFriend: (friend) => set({ selectedFriend: friend }),
    }),
    {
      name: "friends",
      enabled: process.env.NODE_ENV === "development",
    }
  ),
  shallow
);
