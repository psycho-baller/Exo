import { RefObject, useEffect, useRef, useState } from "react";
import { StyleSheet, Pressable, TextInput,Dimensions, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Link, Stack } from "expo-router";
import { Link } from "solito/link";
import { FlashList } from "@shopify/flash-list";
import { Plus, Search, Home, CircleUser, Settings, X, CheckCircle2 } from "@tamagui/lucide-icons";

import { api } from "@acme/api/utils/trpc"
import type { RouterOutputs } from "@acme/api";
import { Text, Page, Separator, View, FloatingFooter, Button, Sheet, Input, Label, XStack, YStack, Checkbox, ErrorText, AutocompleteInput, GetProps, YStackProps } from "@acme/ui";
import { useAddFriendStore } from "../../stores/addQuestion";
import { formatDate } from "../../lib/utils";

function FriendOrGroupForQuestion(props: { question: RouterOutputs["question"]["all"][number] }) {
  const { question } = props;
  if (question.friendId === null) {
    return null;
  }
  const {data: friend} = api.friend.byId.useQuery({
    id: question.friendId,
  });
  return (
    <Text>
      {friend?.name}
    </Text>
  );
}

function QuestionCard(props: {
  question: RouterOutputs["question"]["all"][number];
  onDelete: () => void;
}) {
  const { question, onDelete } = props;
  
  return (
    <Link  href={`/question/${question.id.toString()}`}>
      <XStack minHeight="$6" p={"$3"} ai="center" justifyContent="space-between">
        <XStack gap={"$3"}>
          <Checkbox borderColor="gray" onPress={onDelete} />
          <Text fontSize={16} fontWeight="bold">
            {question.text}
          </Text>
        </XStack>
        <YStack gap="$1.5">
          <Text
            // style={styles.subTitle}
          >
            {formatDate(question.createdDatetime)}
          </Text>
          {/* tags */}
          {/* friend */}
          <FriendOrGroupForQuestion question={question} />
        </YStack>
      </XStack>
    </Link>
  );
}
// const FriendDropdown = () => {
//   const utils = api.useUtils();
//   const ADD_FRIEND = 'Add friend'
//   const [value, setValue] = useState<string>("");
//   const [isFocus, setIsFocus] = useState(false);
//   const friendsQuery = api.friend.all.useQuery();
//   const friendData = friendsQuery?.data?.map((friend) => {
//     return {label: friend.name, value: friend.name}
//   });
//   const [friends,setFriends] = useState([
//     { label: ADD_FRIEND, value: '+'},
//     ...friendData || [],
//   ]);
//   const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch] = useAddFriendStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch]);

//   const {mutate,error} = api.friend.create.useMutation({
//     async onSuccess(data) {
//       await utils.friend.all.invalidate();
      
//       setSelectedFriend({name: friendSearch, id: Number(data.insertId)});
//       setFriendSearch("");
//     },
//   });

//   const handleDropdownChange = (item: typeof friends[0]) => {
//     const value = item.value
//     if (value === '+') {
//       setFriends([
//         ...friends,
//         { label: friendSearch, value: friendSearch },
//       ]);
//       mutate({
//         createdByUserId: 1,
//         name: friendSearch,
//         friendUserId: 0,
//       })
//       setValue(friendSearch);
//     } else {
//       setValue(value);
//     }
//     setIsFocus(false);
//   }

//   if (friendsQuery.isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   return(
//     <View>
//       {/* {renderLabel()} */}
//       <Dropdown
//         // style={{
//         //   width: 300,
//         //   height: 50,
//         //   borderWidth: 1,
//         //   borderColor: 'black',
//         //   borderRadius: 5,
//         //   paddingLeft: 10,
//         //   paddingRight: 10,
//         //   backgroundColor: 'white',
//         //   // color: 'black',
//         //   marginBottom: 10,
//         //   marginTop: 10,
//         // }}
//         placeholderStyle={{
//           // color: 'black',
//         }}
//         selectedTextStyle={{
//           display: 'none',
//         }}
//         inputSearchStyle={{
//           display: 'none',
//         }}
//         iconStyle={{
//           display: 'none',
//         }}
//         data={friends}
//         search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={!isFocus ? 'Select or add a friend' : ''}
//         searchPlaceholder="Search or add a friend"
//         value={value}
//         inverted={false}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={handleDropdownChange}
//         renderInputSearch={(onSearch: (text:string) => void) => {
//           function handleSearchChange(text: string) {
//             setFriendSearch(text);
//             onSearch(text);
//           }
//           return (
//             <Input
//               placeholder="Search or add a friend"
//               onChangeText={handleSearchChange}
//               value={friendSearch}
//               // autoFocus={isFocus}
//             />
//           );
//         }}
//         searchQuery={(keyword: string, labelValue: string) => (
//           labelValue.includes(keyword) || labelValue === ADD_FRIEND
//         )}
//           // renderItem={}
//         // renderLeftIcon={() => (
//           // <AntDesign
//           //   style={styles.icon}
//           //   color={isFocus ? 'blue' : 'black'}
//           //   name="Safety"
//           //   size={20}
//           // />
//         // )}
//       />
//     </View>
//   );
// };

const AddFriend = (props: YStackProps) => {
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
      {/* <Input ref={inputRef} onFocus={handleFriendInputFocus} onBlur={handleFriendInputBlur} */}
      <AutocompleteInput data={friendData} width={200} unstyled fontSize={"$8"} paddingVertical={"$2"} placeholder="Add Friend" value={friendSearch} setValue={setFriendSearch} filter={filterFriendsFromSearch} onSearch={onFriendSearch} keyExtractor={keyExtractor} />
      {/* <FriendDropdown dropdownRef={dropdownRef} /> */}
    </YStack>
  );
}

const AddQuestion = () => {
  const utils = api.useUtils();

  const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch, dropdownOpen, setDropdownOpen] = useAddFriendStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch, state.dropdownOpen, state.setDropdownOpen]);

  const [question, setQuestion] = useState("");
  const [mounted, setMounted] = useState(false);

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setQuestion("");
      setDropdownOpen(false);
      setFriendSearch("");
      await utils.question.all.invalidate();
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function addQuestion(){
    mutate({
      createdByUserId: 1,
      friendId: selectedFriend?.id,
      text: question,
    });
  }

  return (
    <Sheet
      open={dropdownOpen}
      modal
      onOpenChange={setDropdownOpen}
      zIndex={50}
    >
      {/* <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      /> */}
      <Sheet.Handle />
      <Sheet.Frame padding="$4">
        <XStack justifyContent="space-between">
          <Label fontSize={"$1"} unstyled color={"$gray8"} htmlFor="question">QUESTION</Label>
          <Button unstyled onPress={() => setDropdownOpen(false)}><X /></Button>
        </XStack>
        <Input width={200} unstyled fontSize={"$8"} paddingVertical={"$2"} style={mounted ? {
          transform: [
            {
              translateY: 0,
            },
          ],
        } : {
          transform: [
            {
              translateY: 100,
            },
          ],
        }} autoFocus={dropdownOpen} placeholder="Add Question" value={question} onChangeText={setQuestion}  />
        <XStack>
          <AddFriend flex={1} />
          <Button jc="flex-end" unstyled onPress={addQuestion}>
            <CheckCircle2 />
          </Button>
        </XStack>
        {/* <XStack justifyContent="space-between">
          <XStack>

          </XStack>
          
        </XStack> */}
        {error?.data?.code === "UNAUTHORIZED" && (
          <ErrorText ta="center">
            You need to be logged in to create a question
          </ErrorText>
        )}
        {error?.data?.zodError?.fieldErrors.text && (
          <ErrorText ta="center">
            {error.data.zodError.fieldErrors.text}
          </ErrorText>
        )}
      </Sheet.Frame>
    </Sheet>
  );
}

const Index = () => {
  const [setDropdownOpen] = useAddFriendStore((state) => [state.setDropdownOpen]);
  const utils = api.useUtils();
  // const { width, height } = Dimensions.get('window');
  const questionQuery = api.question.all.useQuery();

  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  function handlePlusClick(){
    setDropdownOpen(true);
  }

  return (
    <Page>
      <FlashList
        data={questionQuery.data}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <QuestionCard
            question={p.item}
            onDelete={() => deleteQuestionMutation.mutate(p.item.id)}
          />
          // <Text>{p.item.text}</Text>
        )}
      />

      {/* <CreateQuestion /> */}
      <FloatingFooter blurIntensity={70} >
        <Home size={"$2"} />
        <CircleUser size={"$2"} />
        <Button unstyled onPress={handlePlusClick} icon={<Plus size={"$2.5"} />}/>
        <Search size={"$2"} />
        <Settings size={"$2"} />
      </FloatingFooter>
      <AddQuestion />
    </Page>
  );
};

export default Index;
