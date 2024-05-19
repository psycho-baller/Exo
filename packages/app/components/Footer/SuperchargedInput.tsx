import { api } from '@acme/api/utils/trpc';
import { Text, View, XStack, YStack, BottomSheetInput, Button } from '@acme/ui';
import type { UnstyledInputProps } from '@acme/ui';
import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSelectionChangeEventData } from 'react-native';
import { getFullName, getSymbolFromReference } from '../../utils/strings';
import { useAtom } from 'jotai';
import { type ReferenceType, type SuperchargedWord, superchargedInputWordsAtom } from '../../atoms/addQuestion';

// import chrono from 'chrono-node';
type Props = UnstyledInputProps;
export const SuperchargedInput: FC<Props> = ({ ...rest }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [selection, setSelection] = useState<{ start: number, end: number }>({ start: 0, end: 0 });
  const [justDisabledWord, setJustDisabledWord] = useState(false);

  const handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    const newSelection = e.nativeEvent.selection;
    setSelection(newSelection);

    // const inputText = inputWords.map(({ word }) => word).join('');
    // const newInputWords = inputWords.map((word, index) => ({
    //   ...word,
    //   // active: index === activeWordIndex,
    // }));
    // setInputWords(newInputWords);
  };

  const handleChangeText = (newInput: string) => {
    // Insert new input at current selection position
    const before = inputWords.map(({ word }) => word).join('');
    const after = inputWords.slice(selection.start).map(({ word }) => word).join('');
    const updatedText = before + newInput + after;

    setInputWords(addTextProperties(updatedText));
  };

  const addTextProperties: (text: string) => SuperchargedWord[] = (text) => {
    const words = text.split(/(\s+)/)
    return words.map((word, index) => {
      let reference: ReferenceType = null;
      if (word.startsWith('@')) {
        reference = word.startsWith('@@') ? 'group' : 'person';
      } else if (word.startsWith('#')) {
        reference = 'topic';
      }

      return {
        word,
        enabled: reference !== null,
        reference,
        // active: false,
      };
    });
  }

  const getActiveWordIndexFromSuperchargedWords = (superchargedWords: SuperchargedWord[], cursorPosition = selection.start) => {
    const inputText = superchargedWords.map(({ word }) => word).join('');
    return inputText.slice(0, cursorPosition).split(/(\s+)/).length - 1;
  }

  const handleBackspace = () => {
    if (selection.start <= 0) return; // No action if cursor is at the start
    // const activeWordIndex = inputWords.findIndex(({ active }) => active);
    setInputWords((prevInputWords) => {
      const inputText = prevInputWords.map(({ word }) => word).join('');
      const activeWordIndex = inputText.slice(0, selection.start).split(/(\s+)/).length - 1;
      const word = prevInputWords[activeWordIndex];

      // TODO: Use this for dates
      // if (word?.reference && word?.enabled) {
      //   console.log('deleting reference', selection.start, activeWordIndex);
      //   setJustDisabledWord(true);
      //   return prevInputWords.map((w, index) =>
      //     index === activeWordIndex ? { ...w, enabled: false } : w
      //   );
      // }
      console.log('deleting word', selection.start, activeWordIndex);
      const indexToSlice = justDisabledWord ? selection.start + 1 : selection.start;

      const newInputText = inputText.slice(0, indexToSlice - 1) + inputText.slice(indexToSlice);
      justDisabledWord && setJustDisabledWord(false)
      const newInputWords = addTextProperties(newInputText);
      return newInputWords.map((newWord, index) => {
        const oldWord = prevInputWords[index];
        return oldWord && index === activeWordIndex ? { ...oldWord, word: newWord.word } : newWord;
      });
      // if (newInputWords[wordIndex]) {
      //   newInputWords[wordIndex] = prevInputWords[wordIndex];
      // }
      // return newInputWords.map((word, index) => {
      //   const oldWord = prevInputWords[index];
      //   const isTheModifiedWord = index === activeWordIndex;
      //   const updatedWord = newInputText.split(/(\s+)/)[activeWordIndex];
      //   const wordExists = oldWord && updatedWord;
      //   if (isTheModifiedWord && wordExists) {
      //     return {
      //       ...oldWord,
      //       // active: true,
      //       // enabled: false,
      //       word: updatedWord,
      //     };
      //   }
      //   return word;
      // });
    });
  };

  return (
    <YStack width='100%' >
      <View position='relative'>
        <XStack
          height={30}
          position='absolute'
        >
          <ConnectAndStyleText inputWords={inputWords} />
        </XStack>
        <BottomSheetInput
          // @ts-ignore
          ref={null}
          fontSize={25}
          height={30}
          width='100%'
          onSelectionChange={handleSelectionChange}
          color='transparent'
          value={inputWords.map(({ word }) => word).join('')}
          onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (e.nativeEvent.key === 'Backspace') {
              handleBackspace();
            } else {
              handleChangeText(e.nativeEvent.key);
            }
          }}
          {...rest}
        />
      </View>
      <SuggestionDropdown currentActiveWordIndex={getActiveWordIndexFromSuperchargedWords(inputWords)} />
    </YStack>
  );
};
type SuggestionDropdownProps = {
  currentActiveWordIndex: number;
}

const SuggestionDropdown: FC<SuggestionDropdownProps> = ({ currentActiveWordIndex }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const { data: people } = api.person.all.useQuery();
  const { data: topics } = api.topic.all.useQuery();
  const { data: groups } = api.group.all.useQuery();

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

  const currentActiveWord = inputWords[currentActiveWordIndex];
  const currentActiveReference = currentActiveWord?.reference;
  const dataMap = {
    person: people,
    group: groups,
    topic: topics,
  } as const;

  const getFilteredData = (data: any[] | undefined, reference: string) => {
    return data?.filter((item) => {
      const name = item.firstName || item.name;
      return name.toLowerCase().includes(currentActiveWord?.word?.slice(reference.length).toLowerCase() ?? '');
    });
  }

  const handlePress = (name: string) => {
    setInputWords((prevInputWords) => {
      const newInputWords = prevInputWords.map((word, index) =>
        index === currentActiveWordIndex ? { ...word, word: `${getSymbolFromReference(currentActiveWord?.reference)}${name}` } : word
      );
      newInputWords.push({ word: ' ', reference: null, enabled: false });
      return newInputWords;
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

  if (!currentActiveWord || !currentActiveReference) return null;
  const filteredData = getFilteredData(dataMap[currentActiveReference], getSymbolFromReference(currentActiveReference))//, [getFilteredData, dataMap, currentActiveReference]);
  if (!filteredData) return null;
  return (
    <YStack
      gap='$1'
      position='absolute'
      top='100%'
      left={0}
      right={0}
      padding='$1'
      borderRadius='$1'
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
    </YStack>
  );
}
type ConnectAndStyleTextProps = {
  inputWords: SuperchargedWord[];
}
const ConnectAndStyleText: FC<ConnectAndStyleTextProps> = ({ inputWords }) => {
  const { data: people } = api.person.all.useQuery();
  const { data: topics } = api.topic.all.useQuery();
  const { data: groups } = api.group.all.useQuery();

  return inputWords.map(({ word, reference, enabled }, index) => {
    if (reference === 'person') {
      console.log('word', word);
      const person = people?.find((person) => person.firstName.toLowerCase() === word.slice(1).toLowerCase());
      const personIsSelected = person && enabled;
      return (
        <View key={index.toString() + word} style={personIsSelected ? styles.selectedWordBg : undefined}>
          <Text
            fontSize={25}
            fontWeight={personIsSelected ? 'bold' : 'normal'}
          >
            {word}
          </Text>
        </View>
      );
    }
    if (reference === 'group') {
      const group = groups?.find((group) => group.name.toLowerCase() === word.slice(2).toLowerCase());
      const groupIsSelected = group && enabled;
      return (
        <View key={index.toString() + word} style={groupIsSelected ? styles.selectedWordBg : styles.unselectedWord}>
          <Text
            fontSize={25}
            style={groupIsSelected ? styles.selectedWord : styles.unselectedWord}
          >
            {word}
          </Text>
        </View>
      );
    }
    if (reference === 'topic') {
      const topic = topics?.find((topic) => topic.name.toLowerCase() === word.slice(1).toLowerCase());
      const topicIsSelected = topic && enabled;
      return (
        <View key={index.toString() + word} style={topicIsSelected ? styles.selectedWordBg : styles.unselectedWord}>
          <Text
            fontSize={25}
            style={topicIsSelected ? styles.selectedWord : styles.unselectedWord}
          >
            {word}
          </Text>
        </View>
      );
    }
    return (
      <Text key={index.toString() + word} style={styles.unselectedWord}>
        {word}
      </Text>
    );
  });
}

const styles = StyleSheet.create({
  selectedWordBg: {
    backgroundColor: 'rgba(0, 150, 255, .3)',
    borderRadius: 10,
    paddingHorizontal: 3,
    marginHorizontal: -3,
    paddingVertical: 2,
    marginVertical: -2,
  },
  selectedWord: {
    fontSize: 25,
  },
  unselectedWord: {
    fontSize: 25,
  },
});
