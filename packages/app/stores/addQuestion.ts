import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

export type FriendsState = {
  friendSearch: string;
  selectedFriends: string[];
};

export type FriendsActions = {
  setFriendSearch: (search: string) => void;
  setSelectedFriends: (friends: string[]) => void;
  toggleSelectedFriend: (friend: string) => void;

};

export const useFriendsStore = createWithEqualityFn<
  FriendsState & FriendsActions
>()(
  devtools(
    (set, get) => ({
      friendSearch: "",
      setFriendSearch: (search) => set({ friendSearch: search }),
      selectedFriends: [],
      setSelectedFriends: (friends) => set({ selectedFriends: friends }),
      toggleSelectedFriend: (friend) => {
        const friends = get().selectedFriends;
        if (friends.includes(friend)) { 
          const newFriends = friends.filter((f) => f !== friend);
          set({ selectedFriends: newFriends });
        } else {
          set({ selectedFriends: [...friends, friend] });
        }
      }
    }),
    {
      name: "friends",
      enabled: process.env.NODE_ENV === "development",
    }
  ),
  shallow
);
