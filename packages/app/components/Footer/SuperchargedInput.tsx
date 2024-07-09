import { api } from '@acme/api/utils/trpc';
import { Text, View, XStack, YStack, Button, BottomSheetInput } from '@acme/ui';
import type { UnstyledInputProps } from '@acme/ui';
import { useState } from 'react';
import type { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSelectionChangeEventData } from 'react-native';
import { getActiveWordIndexFromSuperchargedWords } from '../../utils/strings';
import { useAtom } from 'jotai';
import { type ReferenceType, type SuperchargedWord, superchargedInputWordsAtom, superchargedInputSelectionAtom } from '../../atoms/addQuestion';
// import { parse } from 'chrono-node';
import { Suggestions } from './Suggestions';
import { CheckCircle2 } from '@tamagui/lucide-icons';

type Props = UnstyledInputProps;
export const SuperchargedInput: FC<Props> = ({ ...rest }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [selection, setSelection] = useAtom(superchargedInputSelectionAtom)
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
    // const indexOfActiveWord = before.split(/(\s+)/).length - 1;
    // const indexOfCursorInActiveWord = selection.start - before.split(/(\s+)/).slice(0, indexOfActiveWord).join('').length;
    const before = inputWords.map(({ word }) => word).join('').slice(0, selection.start);
    const after = inputWords.map(({ word }) => word).join('').slice(selection.start);
    console.log('before', before);
    console.log('after', after);
    const updatedText = before + newInput + after;

    setInputWords(addTextProperties(updatedText));
  };

  const addTextProperties: (text: string) => SuperchargedWord[] = (text) => {
    // const date = parse(text)
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

      let newInputText: string;
      const isSingleCursor = selection.start === selection.end;
      if (isSingleCursor) {
        newInputText = inputText.slice(0, indexToSlice - 1) + inputText.slice(indexToSlice);
        justDisabledWord && setJustDisabledWord(false)
      } else {
        newInputText = inputText.slice(0, selection.start) + inputText.slice(selection.end);
      }
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
        <XStack columnGap='$2' alignItems='center'>
          <Suggestions currentActiveWordIndex={getActiveWordIndexFromSuperchargedWords(inputWords, selection.start)} />
          <Button unstyled>
            <CheckCircle2 />
          </Button>
        </XStack>

      </View>
    </YStack>
  );
};

type ConnectAndStyleTextProps = {
  inputWords: SuperchargedWord[];
}
const ConnectAndStyleText: FC<ConnectAndStyleTextProps> = ({ inputWords }) => {
  // This might be the thing that's slowing shit down
  // const { data: people } = api.person.all.useQuery();
  // const { data: topics } = api.topic.all.useQuery();
  // const { data: groups } = api.group.all.useQuery();
  const people = []
  const topics = []
  const groups = []

  return inputWords.map(({ word, reference, enabled }, index) => {
    if (reference === 'person') {
      console.log('word', word);
      const person = people?.find((person) => person.firstName.toLowerCase() === word.slice(1).toLowerCase());
      const personIsSelected = person && enabled;
      return (
        <View key={index.toString() + word} style={personIsSelected ? styles.selectedWordBg : undefined}>
          <Text
            style={personIsSelected ? styles.selectedWord : styles.unselectedWord}
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
        <View key={index.toString() + word} style={groupIsSelected ? styles.selectedWordBg : styles.unselectedWordBg}>
          <Text
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
        <View key={index.toString() + word} style={topicIsSelected ? styles.selectedWordBg : styles.unselectedWordBg}>
          <Text
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
  unselectedWordBg: {
  },
  selectedWord: {
    fontSize: 25,
  },
  unselectedWord: {
    fontSize: 25,
  },
});
