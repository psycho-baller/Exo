import React from "react";
import { StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Link, Stack } from "expo-router";
import { Link } from "solito/link";
import { FlashList } from "@shopify/flash-list";

import { api } from "@acme/api/utils/trpc"
import type { RouterOutputs } from "@acme/api";
import { Text, Page, type PageProps, View, FloatingFooter, Card, Button } from "@acme/ui";

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
  const utils = api.useContext();

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

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

const Index = () => {
  const utils = api.useContext();

  const questionQuery = api.question.all.useQuery();
  console.log(questionQuery);

  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  return (
    <Page ai="center" >
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
        {/* <View w={width} h={height} > */}
        <FlashList
          data={questionQuery.data}
          estimatedItemSize={20}
          // ItemSeparatorComponent={() => <Separator />}
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
        <FloatingFooter>
          <Text>Footer</Text>
          <Text>Footer</Text>
        </FloatingFooter>
    </Page>

  );
};

export default Index;
