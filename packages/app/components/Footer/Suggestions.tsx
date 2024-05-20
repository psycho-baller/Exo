import { api } from "@acme/api/utils/trpc";
import { useAtom } from "jotai";
import { useState, type FC } from "react";
import { ScrollView, Button, YStack, MyDateTimePicker } from "@acme/ui";
import { type ReferenceType, superchargedInputWordsAtom } from "../../atoms/addQuestion";
import { getSymbolFromReference } from "../../utils/strings";
import TagButton from "../TagButton";
import { Calendar, Tag, User, Users } from "@tamagui/lucide-icons";

type SuggestionDropdownProps = {
  currentActiveWordIndex: number;
}

export const Suggestions: FC<SuggestionDropdownProps> = ({ currentActiveWordIndex }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);

  const currentActiveWord = inputWords[currentActiveWordIndex];


  return (
    <>
      {/* <Dialog
        modal
        
        open
        >
        <Dialog.Content
        position='absolute'
        gap='$1'
        bottom='100%'
        zIndex={1000}
        >
        {filteredData?.length > 0 ? filteredData?.map((item) => (
          <Button key={item.id} onPress={() => handlePress(item.firstName || item.name)}>
          {item.firstName || item.name}
          </Button>
        )) : (
          <Button onPress={handleAddNew}>
          <Button.Text>Add new {currentActiveReference}</Button.Text>
          </Button>
        )}
        </Dialog.Content>
      </Dialog> */}

      {/* <Popover
        allowFlip
        open
        modal={false}
        strategy='absolute'
        keepChildrenMounted
        placement='bottom'
        // offset={100}
        >
        <Popover.Content
        position='absolute'
        gap='$1'
        bottom='0'
        // left={0}
        // right={0}
        padding='$1'
        borderRadius='$1'
        
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        // elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        >
        {filteredData?.length > 0 ? filteredData?.map((item) => (
          <Button key={item.id} onPress={() => handlePress(item.firstName || item.name)}>
          {item.firstName || item.name}
          </Button>
        )) : (
          <Button onPress={handleAddNew}>
          <Button.Text>Add new {currentActiveReference}</Button.Text>
          </Button>
        )}
        </Popover.Content>
      </Popover> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        padding='$3'
        marginLeft='$-2.5'
      >
        {currentActiveWord?.word && currentActiveWord?.reference ? (
          <AutocompleteSuggestions
            currentActiveWordIndex={currentActiveWordIndex}
          />
        ) : (
          <PropertiesSuggestions />
        )}
      </ScrollView>
    </>
  );
}

type AutocompleteSuggestionsProps = {
  currentActiveWordIndex: number;
}
const AutocompleteSuggestions: FC<AutocompleteSuggestionsProps> = ({ currentActiveWordIndex }) => {
  const { data: people } = api.person.all.useQuery();
  const { data: topics } = api.topic.all.useQuery();
  const { data: groups } = api.group.all.useQuery();
  const dataMap = {
    person: people,
    group: groups,
    topic: topics,
  } as const

  const utils = api.useUtils();
  const { mutateAsync: createPerson } = api.person.create.useMutation({
    async onSuccess(data) {
      await utils.person.all.invalidate();
      // return data;
    },
  });
  const { mutateAsync: createGroup } = api.group.create.useMutation({
    async onSuccess(data) {
      await utils.group.all.invalidate();
      // return data;
    },
  });
  const { mutateAsync: createTopic } = api.topic.create.useMutation({
    async onSuccess(data) {
      await utils.topic.all.invalidate();
      // return data;
    },
  });

  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const currentActiveWord = inputWords[currentActiveWordIndex];
  // We are sure that currentActiveWord is not undefined
  const currentActiveReference: ReferenceType = currentActiveWord?.reference as ReferenceType;

  const handlePress = (name: string) => {
    setInputWords((prevInputWords) => {
      const newInputWords = prevInputWords.map((word, index) =>
        index === currentActiveWordIndex ? { ...word, word: `${getSymbolFromReference(currentActiveWord?.reference)}${name}` } : word
      );
      // TODo: Bug: update selection index
      return [...newInputWords, { word: ' ', reference: null, enabled: false }];
    });
  }

  const handleAddNew = () => {
    if (!currentActiveWord?.word) return;

    switch (currentActiveReference) {
      case 'person': {
        const personName = currentActiveWord?.word.slice(1);
        createPerson({ firstName: personName }).then((person) => {
          handlePress(personName);
        });
        break;
      }
      case 'group': {
        const groupName = currentActiveWord?.word.slice(2);
        createGroup({ name: groupName }).then((group) => {
          handlePress(groupName);
        });
        break;
      }
      case 'topic': {
        const topicName = currentActiveWord?.word.slice(1);
        createTopic({ name: currentActiveWord?.word.slice(1) }).then((topic) => {
          handlePress(topicName);
        });
        break;
      }
      default:
        break;
    }
  };

  const getFilteredData = (data: any[], reference: string) => {
    return data?.filter((item) => {
      const name = item.firstName || item.name;
      return name.toLowerCase().includes(currentActiveWord?.word?.slice(reference.length).toLowerCase() ?? '');
    });
  }

  // we are sure that currentActiveReference is not null
  if (currentActiveReference === null) return null;
  const data = dataMap[currentActiveReference];
  // we are sure that data is not undefined
  if (data === undefined) return null;
  const filteredData = getFilteredData(data, getSymbolFromReference(currentActiveReference))//, [getFilteredData, dataMap, currentActiveReference]);

  return (
    <>
      {filteredData?.length > 0 ? filteredData?.map((item) => (
        <TagButton key={item.id} onPress={() => handlePress(item.firstName || item.name)}>
          {item.firstName || item.name}
        </TagButton>
      )) : (
        <TagButton onPress={handleAddNew}>
          <Button.Text>Add new {currentActiveReference}</Button.Text>
        </TagButton>
      )}
    </>
  );
}

const PropertiesSuggestions: FC = () => {
  const properties = [
    { name: 'date', icon: Calendar },
    { name: 'person', icon: User },
    { name: 'group', icon: Users },
    { name: 'topic', icon: Tag },

  ] as const;
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  // const [date, setDate] = useState(new Date());

  const handlePress = (name: typeof properties[number]['name']) => {
    if (name === 'date') {
      return
    }
    setInputWords((prevInputWords) => {
      return [...prevInputWords, { word: getSymbolFromReference(name), reference: name, enabled: true }];
    });
  }

  return (
    <>
      {properties.map(({ name, icon }) => (
        // TODO: Show selected person, group, topic
        <TagButton key={name} icon={icon} onPress={() => handlePress(name)} >
          {name}
        </TagButton >
      ))}
      {/* <MyDateTimePicker
        value={date}
        onChange={setDate}
        mode='datetime'
      /> */}
    </>
  );
}