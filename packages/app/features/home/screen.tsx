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
import { Text, Page, Separator, View, FloatingFooter, Card, Button, Sheet, Input, Label, XStack, YStack } from "@acme/ui";

function QuestionCard(props: {
  question: RouterOutputs["question"]["all"][number];
  onDelete: () => void;
}) {
  return (
    <Card p={16}>
      <Card.Header>
        <Link
          href={`/question/${props.question.id.toString()}`}
        >
          <Pressable>
            <Text>
              {props.question.text}
            </Text>
            <Text
              // style={styles.subTitle}
            >
              {props.question.createdDatetime.toString()}
            </Text>
          </Pressable>
        </Link>
      </Card.Header>
      <Card.Footer>
      <Pressable onPress={props.onDelete}>
        <Text>Delete</Text>
      </Pressable>
      </Card.Footer>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
  },
  header: {
    flexGrow: 1,
  },
  deleteButton: {
    fontSize: 14,
    color: "white",
    textTransform: "uppercase",
  },
  input: {
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    color: 'white',
  },
  errorText: {
    marginBottom: 8,
    color: 'red',
  },
  button: {
    borderRadius: 4,
    backgroundColor: 'pink',
    padding: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  error: {
    marginTop: 8,
    color: 'red',
  },
  // index
  safeArea: {
    backgroundColor: '#1F104A',
  },
  fullContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    paddingBottom: 8,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitle: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    height: 8,
  },
});

function CreateQuestion() {
  const utils = api.useUtils();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent("");
      await utils.question.all.invalidate();
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text style={styles.errorText}>
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text style={styles.errorText}>
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        style={styles.button}
        onPress={() => {
          mutate({
            createdByUserId: 0,
            text: content,
          });
        }}
      >
        <Text style={styles.buttonText}>Publish question</Text>
      </Pressable>
      {error?.data?.code === "UNAUTHORIZED" && (
        <Text style={styles.error}>
          You need to be logged in to create a question
        </Text>
      )}
    </View>
  );
}

const FriendDropdown = (createFriendMutation: any) => {
  const ADD_FRIEND = 'Add friend'
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);

  const [data,setData] = useState([
    { label: ADD_FRIEND, value: '+'},
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' }
  ]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  const handleDropdownChange = (item: typeof data[0]) => {
    const value = item.value
    if (value === '+') {
      setData([
        ...data,
        { label: value, value: value },
      ]);
    }
    setValue(value);
    setIsFocus(false);

    createFriendMutation(value)
  }

  return(
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
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
        // renderInputSearch={(onSearch: (text:string) => void) => (
        // )}
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
    </View>
  );
};


const AddFriend = ({currentFriend: friend, setCurrentFriend: setFriend, selectedFriend, setSelectedFriend}: {currentFriend: string, setCurrentFriend: (friend: string) => void, selectedFriend: string | null, setSelectedFriend: (friend: string | null) => void}) => {
  // const {currentFriend: friend, setCurrentFriend: setFriend} = props;
  const utils = api.useUtils();

  const { mutate, error } = api.friend.create.useMutation({
    async onSuccess() {
      setFriend("");
      await utils.friend.all.invalidate();

      setSelectedFriend(friend);
    },
  });

  return (
    <YStack>
      <Label fontSize={"$1"} unstyled color={"$gray8"} htmlFor="friend">FRIEND</Label>
      <Input width={200} unstyled fontSize={"$8"} paddingVertical={"$2"} placeholder="Add Friend" value={friend} onChangeText={setFriend} />
      <FriendDropdown createFriendMutation={mutate} />
    </YStack>
  );
}

const AddQuestion = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  const utils = api.useUtils();

  const createQuestionFriendsMutation = api.questionFriend.create.useMutation({
    async onSuccess() {
      await utils.friend.all.invalidate();

      setSelectedFriend(friend);
    },
  });

  const [question, setQuestion] = useState("");
  const [friend, setFriend] = useState("");
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setQuestion("");
      setOpen(false);
      // setContent("");
      await utils.question.all.invalidate();

      // add friend relationship with question if friend is not empty
      if (selectedFriend !== null) {
        setFriend("");
        createQuestionFriendsMutation.mutate({
          questionId: 0,
          friendId: 0,
        });
      }
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function addQuestion(){
    mutate({
      createdByUserId: 0,
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
        <AddFriend currentFriend={friend} setCurrentFriend={setFriend} selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} />
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
      </Sheet.Frame>
    </Sheet>
  );
}

const Index = () => {
  const utils = api.useUtils();
  // const { width, height } = Dimensions.get('window');
  const [open, setOpen] = useState(false)

  const questionQuery = api.question.all.useQuery();
  console.log(questionQuery);

  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  function handlePlusClick(){
    setOpen(true);
  }

  return (
    <Page >
      {/* <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Tamagui.</H1>
        <Text ta="center">
          Here's a basic starter to show navigating from one screen to another. This screen uses the
          same code on Next.js and React Native
        </Text>

        <Separator />
      </YStack>
      <Button
        onPress={() => void utils.question.all.invalidate()}
        color={"#f472b6"}
      >Refresh questions</Button> */}
      {/* <View w={width} > */}
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
      {/* </View> */}

      {/* <CreateQuestion /> */}
      {/* blur background */}
      <FloatingFooter blurIntensity={70} >
        <Home />
        <UserCircle />
        <Button unstyled onPress={handlePlusClick}><Plus /></Button>
        <Search />
        <Settings />
      </FloatingFooter>
      <AddQuestion open={open} setOpen={setOpen} />
    </Page>
  );
};

export default Index;
