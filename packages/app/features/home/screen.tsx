import { useEffect, useState } from "react";
import { StyleSheet, Pressable, TextInput,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Link, Stack } from "expo-router";
import { Link } from "solito/link";
import { FlashList } from "@shopify/flash-list";
import { Plus, Search, Home, UserCircle, Settings, X, CheckCircle2 } from "@tamagui/lucide-icons";
import { Dropdown } from 'react-native-element-dropdown';

import { api } from "@acme/api/utils/trpc"
import type { RouterOutputs } from "@acme/api";
import { Text, Page, Separator, View, FloatingFooter, Card, Button, Sheet, Input, Label, XStack, YStack, Checkbox, ErrorText } from "@acme/ui";
import { useFriendsStore } from "../../stores/addQuestion";
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

const FriendDropdown = () => {
  const utils = api.useUtils();
  const ADD_FRIEND = 'Add friend'
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const friendsQuery = api.friend.all.useQuery();
  const friendData = friendsQuery?.data?.map((friend) => {
    return {label: friend.name, value: friend.name}
  });
  const [friends,setFriends] = useState([
    { label: ADD_FRIEND, value: '+'},
    ...friendData || [],
  ]);
  const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch] = useFriendsStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch]);

  const {mutate,error} = api.friend.create.useMutation({
    async onSuccess(data) {
      console.log("ball data: ",data.insertId);
      await utils.friend.all.invalidate();
      
      setSelectedFriend({name: friendSearch, id: Number(data.insertId)});
      setFriendSearch("");
    },
  });

  const handleDropdownChange = (item: typeof friends[0]) => {
    const value = item.value
    if (value === '+') {
      setFriends([
        ...friends,
        { label: friendSearch, value: friendSearch },
      ]);
      mutate({
        createdByUserId: 1,
        name: friendSearch,
        friendUserId: 0,
      })
      setValue(friendSearch);
    } else {
      setValue(value);
    }
    setIsFocus(false);
  }

  if (friendsQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  return(
    <View>
      {/* {renderLabel()} */}
      <Dropdown
        // placeholderStyle={styles.placeholderStyle}
        // selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        // iconStyle={styles.iconStyle}
        data={friends}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select or add a friend' : ''}
        searchPlaceholder="Search or add a friend"
        value={value}
        inverted={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleDropdownChange}
        renderInputSearch={(onSearch: (text:string) => void) => {
          function handleSearchChange(text: string) {
            setFriendSearch(text);
            onSearch(text);
          }
          return (
            <Input
              placeholder="Search or add a friend"
              onChangeText={handleSearchChange}
              value={friendSearch}
              autoFocus={isFocus}
            />
          );
        }}
        searchQuery={(keyword: string, labelValue: string) => (
          labelValue.includes(keyword) || labelValue === ADD_FRIEND
        )}
        // renderLeftIcon={() => (
          // <AntDesign
          //   style={styles.icon}
          //   color={isFocus ? 'blue' : 'black'}
          //   name="Safety"
          //   size={20}
          // />
        // )}
      />
      {error?.data?.code === "UNAUTHORIZED" && (
        <Text ta="center" color={"$red8"}>
          You need to be logged in to create a question
        </Text>
      )}
    </View>
  );
};

const AddFriend = () => {
  const [friendSearch, setFriendSearch] = useFriendsStore((state) => [state.friendSearch, state.setFriendSearch]);

  return (
    <YStack>
      <Label fontSize={"$1"} unstyled color={"$gray8"} htmlFor="friend">FRIEND</Label>
      <Input width={200} unstyled fontSize={"$8"} paddingVertical={"$2"} placeholder="Add Friend" value={friendSearch} onChangeText={setFriendSearch} />
      <FriendDropdown />
    </YStack>
  );
}


const AddQuestion = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  const utils = api.useUtils();

  const [selectedFriend, setSelectedFriend, friendSearch, setFriendSearch] = useFriendsStore((state) => [state.selectedFriend, state.setSelectedFriend, state.friendSearch, state.setFriendSearch]);

  const [question, setQuestion] = useState("");
  const [mounted, setMounted] = useState(false);

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setQuestion("");
      setOpen(false);
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
      open={open}
      modal
      onOpenChange={setOpen}
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
          <Button unstyled onPress={() => setOpen(false)}><X /></Button>
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
        }} autoFocus={open} placeholder="Add Question" value={question} onChangeText={setQuestion}  />
        <AddFriend />
        <XStack justifyContent="space-between">
          <XStack>
            <Text>
              stuff
            </Text>

          </XStack>
          <Button unstyled onPress={addQuestion}>
            <CheckCircle2 />
          </Button>
        </XStack>
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
  const utils = api.useUtils();
  // const { width, height } = Dimensions.get('window');
  const [open, setOpen] = useState(false)

  const questionQuery = api.question.all.useQuery();

  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  function handlePlusClick(){
    setOpen(true);
  }

  return (
    <Page >
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
        <UserCircle size={"$2"} />
        <Button unstyled onPress={handlePlusClick} icon={<Plus size={"$2"} />}/>
        <Search size={"$2"} />
        <Settings size={"$2"} />
      </FloatingFooter>
      <AddQuestion open={open} setOpen={setOpen} />
    </Page>
  );
};

export default Index;
