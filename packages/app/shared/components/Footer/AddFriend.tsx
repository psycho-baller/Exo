import { api } from "@acme/api/utils/trpc";
import { AutocompleteInput, Text } from "@acme/ui";
import { YStackProps, YStack, Label } from "tamagui";
import { useAddFriendStore } from "../../../stores/addQuestion";

export const AddFriend = (props: YStackProps) => {
  const [friendSearch, setFriendSearch, setSelectedFriend] = useAddFriendStore((state) => [state.friendSearch, state.setFriendSearch, state.setSelectedFriend]);
  const friendsQuery = api.friend.all.useQuery();

  if (friendsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }
  const friendData = friendsQuery?.data?.map((friend) => {
    return {name: friend.name, id: friend.id}
  }) || [];

  const filterFriendsFromSearch = (friends: {name: string, id: number}[], search: string) => {
    return friends.filter((friend) => {
      return friend.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  const onFriendSearch = (value: string) => {
    // check if there is a friend with that name and set it as selected friend if there is
    const friend = friendData.find((friend) => friend.name === value);
    friend ? setSelectedFriend(friend) : setSelectedFriend(null);
  }

  const keyExtractor = (item: {name: string, id: number}) => item.name;
  
  return (
    <YStack {...props}>
      <Label fontSize={"$1"} unstyled color={"$gray8"} htmlFor="friend">FRIEND</Label>
      <AutocompleteInput placeholderTextColor='$secondaryColor' data={friendData} width={200} fontSize={"$8"} paddingVertical={"$2"} placeholder="Add Friend" value={friendSearch} setValue={setFriendSearch} filter={filterFriendsFromSearch} onSearch={onFriendSearch} keyExtractor={keyExtractor} />
      {/* <FriendDropdown dropdownRef={dropdownRef} /> */}
    </YStack>
  );
};