import { api } from "@acme/api/utils/trpc";
import { useAtom } from "jotai";
import type { FC } from "react";
import { Keyboard } from "react-native";
import { ScrollView, MyDateTimePicker, TagButton, XStack } from "@acme/ui";
import { type ReferenceType, superchargedInputWordsAtom, superchargedInputDateAtom } from "../../atoms/addQuestion";
import { getSymbolFromReference } from "../../utils/strings";
import { Calendar, Tag, User, Users } from "@tamagui/lucide-icons";

type SuggestionDropdownProps = {
  currentActiveWordIndex: number;
}

export const Suggestions: FC<SuggestionDropdownProps> = ({ currentActiveWordIndex }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);

  const currentActiveWord = inputWords[currentActiveWordIndex];


  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      paddingVertical='$3'
      marginHorizontal='$-2.5'
    >
      <XStack columnGap='$2.5' paddingRight='$3'>
        {currentActiveWord?.word && currentActiveWord?.reference ? (
          <AutocompleteSuggestions
            currentActiveWordIndex={currentActiveWordIndex}
          />
        ) : (
          <PropertiesSuggestions />
        )}
      </XStack>
    </ScrollView>
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
    Keyboard.dismiss();

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
          Add new {currentActiveReference}
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
  // const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [date, setDate] = useAtom(superchargedInputDateAtom)

  const handlePress = (name: typeof properties[number]['name']) => {
    Keyboard.dismiss();
    if (name === 'date') {
      setDate(new Date());
      return;
    }
    setInputWords((prevInputWords) => {
      return [...prevInputWords, { word: getSymbolFromReference(name), reference: name, enabled: true }];
    });
  }

  return (
    <>
      {date ? (
        <MyDateTimePicker
          value={date}
          onChange={setDate as () => Promise<void>}
        // showOnMount
        />
      ) : (
        <TagButton icon={properties[0].icon} onPress={() => handlePress(properties[0].name)} >
          {properties[0].name}
        </TagButton>
      )}
      {properties.slice(1).map(({ name, icon }) => (
        // TODO: Show selected person, group, topic
        <TagButton key={name} icon={icon} onPress={() => handlePress(name)} >
          {name}
        </TagButton>
      ))}
    </>
  );
}
