import { api } from "@rooots/api/utils/trpc";
import { useAtom } from "jotai";
import type { FC } from "react";
import { Keyboard } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { MyDateTimePicker, TagButton, XStack, Text } from "@rooots/ui";
import { type ReferenceType, superchargedInputWordsAtom, superchargedInputSelectedDateAtom, questionDataAtom, dateSheetRefAtom, superchargedInputSelectionAtom } from "../../atoms/addQuestion";
import { getSymbolFromReference } from "../../utils/strings";
import { Calendar, Tag, User, Users } from "@tamagui/lucide-icons";
import type { UseFormSetValue } from "react-hook-form";
import type { SuperchargedFormData } from "./SuperchargedInput";
import { formatDate } from "../../utils/date";
type SuggestionDropdownProps = {
  currentActiveWordIndex: number;
  setFormValue: UseFormSetValue<SuperchargedFormData>;
}

export const Suggestions: FC<SuggestionDropdownProps> = ({ currentActiveWordIndex, setFormValue }) => {
  const [inputWords] = useAtom(superchargedInputWordsAtom);

  const currentActiveWord = inputWords[currentActiveWordIndex];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // style={{ paddingVertical: 10, marginHorizontal: -10 }}
      keyboardShouldPersistTaps='always'
    >
      <XStack columnGap='$2' paddingRight='$4' paddingVertical='$3'>
        {currentActiveWord?.word && currentActiveWord?.reference ? (
          <AutocompleteSuggestions
            currentActiveWordIndex={currentActiveWordIndex}
            setFormValue={setFormValue}
          />
        ) : (
          <PropertiesSuggestions setFormValue={setFormValue} />
        )}
      </XStack>
    </ScrollView>
  );
}

type AutocompleteSuggestionsProps = {
  currentActiveWordIndex: number;
  setFormValue: UseFormSetValue<SuperchargedFormData>;
}
const AutocompleteSuggestions: FC<AutocompleteSuggestionsProps> = ({ currentActiveWordIndex, setFormValue }) => {
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
      const newInputWordsWithSpace = [...newInputWords, { word: ' ', reference: null, enabled: false }]
      setFormValue('question', newInputWordsWithSpace.map((word) => word.word).join(''));
      // TODo: Bug: update selection index
      return newInputWordsWithSpace;
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
          {`Create ${currentActiveReference.trim()} "${currentActiveWord?.word?.slice(getSymbolFromReference(currentActiveReference).length).trim()}"`}
        </TagButton>
      )}
    </>
  );
}

const PropertiesSuggestions: FC<{ setFormValue: UseFormSetValue<SuperchargedFormData>; }> = ({ setFormValue }) => {
  const properties = [
    { name: 'date', icon: Calendar },
    { name: 'person', icon: User },
    { name: 'group', icon: Users },
    { name: 'topic', icon: Tag },
  ] as const;
  const [, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [, setSelection] = useAtom(superchargedInputSelectionAtom);
  const [datePickerSheetRef] = useAtom(dateSheetRefAtom)

  // const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useAtom(superchargedInputSelectedDateAtom)
  //react query get the person, group, topic from questionData
  const [questionData] = useAtom(questionDataAtom);
  const handlePropertyPress = (name: typeof properties[number]['name']) => {
    if (name === 'date') {
      Keyboard.dismiss();
      datePickerSheetRef?.current?.present()
      // setDate(new Date());
      return;
    }
    setInputWords((prevInputWords) => {
      const lastWord = prevInputWords.at(-1)?.word
      const newInputWords = lastWord && lastWord !== ' '
        ? [...prevInputWords, { word: ' ', reference: null, enabled: false }, { word: getSymbolFromReference(name), reference: name, enabled: true }]
        : [...prevInputWords, { word: getSymbolFromReference(name), reference: name, enabled: true }];
      const fullText = newInputWords.map(w => w.word).join('');
      setFormValue('question', fullText);
      // move cursor to end of text so suggestions see the new "@..." word
      setSelection({ start: fullText.length, end: fullText.length });
      return newInputWords
    });
  }
  const selectedDateForThisQuestion = questionData?.reminderDatetime || selectedDate;
  return (
    <>

      {/* <MyDateTimePicker
  value={selectedDate}
  onChange={setSelectedDate as () => Promise<void>}
// showOnMount
/> */}
      {selectedDateForThisQuestion ? (
        <TagButton icon={Calendar} onPress={() => handlePropertyPress('date')} borderColor='$accent' color='$accent'>
          {formatDate(selectedDateForThisQuestion)}
        </TagButton>
      ) : (
        <TagButton icon={Calendar} onPress={() => handlePropertyPress('date')} >
          date
        </TagButton>
      )}
      {questionData?.personId ? (
        <SelectedPersonProperty personId={questionData.personId} />
      ) : (
        <TagButton icon={User} onPress={() => handlePropertyPress('person')} >
          person
        </TagButton>
      )}
      {questionData?.groupId ? (
        <SelectedGroupProperty groupId={questionData.groupId} />
      ) : (
        <TagButton icon={Users} onPress={() => handlePropertyPress('group')} >
          group
        </TagButton>
      )}
      {questionData?.id ? (
        // update or create the topics
        <TopicsSuggestions questionId={questionData?.id} onNewTopicPress={() => handlePropertyPress('topic')} />
      ) : (
        // only create a new topic
        <TagButton icon={Tag} onPress={() => handlePropertyPress('topic')} >
          topic
        </TagButton>
      )}

    </>
  );
}

const SelectedPersonProperty: FC<{ personId: number }> = ({ personId }) => {
  const { data: person } = api.person.byId.useQuery({ id: personId });
  const [prevQuestionData, setQuestionData] = useAtom(questionDataAtom);

  const handleSelectedPersonPress = () => {
    // unset person
    prevQuestionData && setQuestionData({ ...prevQuestionData, personId: null });
  }
  return (
    <>
      <TagButton icon={User} onPress={handleSelectedPersonPress} borderColor='$accent' color='$accent'>
        {person?.firstName}
      </TagButton>
    </>
  );
}

const SelectedGroupProperty: FC<{ groupId: number }> = ({ groupId }) => {
  const { data: group } = api.group.byId.useQuery({ id: groupId });
  const [prevQuestionData, setQuestionData] = useAtom(questionDataAtom);

  const handleSelectedGroupPress = () => {
    // unset group
    prevQuestionData && setQuestionData({ ...prevQuestionData, groupId: null });
  }
  return (
    <>
      <TagButton icon={Users} onPress={handleSelectedGroupPress} borderColor='$accent' color='$accent'>
        {group?.name}
      </TagButton>
    </>
  );
}

const SelectedTopicProperty: FC<{ questionId: number; topicId: number }> = ({ questionId, topicId }) => {
  const utils = api.useUtils();
  const { data: topic } = api.topic.byId.useQuery({ id: topicId });
  const { mutateAsync } = api.questionTopic.delete.useMutation({
    async onSuccess() {
      await utils.questionTopic.getTopicsFromQuestionId.invalidate({ id: questionId });
    },
  });

  const handleSelectedTopicPress = () => {
    // unset topic
    mutateAsync({ questionId: questionId, topicId: topicId });
  }
  return (
    <>
      <TagButton icon={Tag} onPress={handleSelectedTopicPress} borderColor='$accent' color='$accent'>
        {topic?.name}
      </TagButton>
    </>
  );
}

const TopicsSuggestions: FC<{ questionId: number; onNewTopicPress: () => void }> = ({ questionId, onNewTopicPress }) => {
  const topicsQuery = api.questionTopic.getTopicsFromQuestionId.useQuery({
    id: questionId,
  })
  if (topicsQuery.isLoading) {
    return <Text>Loading...</Text>
  }
  if (topicsQuery.error) {
    return <Text>Error: {topicsQuery.error.message}</Text>
  }
  const { data: topics } = topicsQuery
  if (!topics) {
    return null
  }
  return (
    <>
      {topics.map((topic) => (
        <SelectedTopicProperty key={topic.id} questionId={questionId} topicId={topic.id} />
      ))}
      {topics.length < 3 && (
        <TagButton icon={Tag} onPress={onNewTopicPress}>
          Add topic
        </TagButton>
      )}
    </>
  );
}
