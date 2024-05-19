import { api } from '@acme/api/utils/trpc';
import { Text, View, XStack, YStack, BottomSheetInput, Button } from '@acme/ui';
import type { UnstyledInputProps } from '@acme/ui';
import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSelectionChangeEventData } from 'react-native';
import { getFullName } from '../../utils/strings';
import { useAtom } from 'jotai';
import { type ReferenceType, type SuperchargedWord, superchargedInputWordsAtom } from '../../atoms/addQuestion';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 24,
    position: 'relative',
    alignSelf: 'center',
  },
  inputWrapper: {
    position: 'absolute',
    top: 0,
    height: 24,
    width: '100%',
  },
  input: {
    height: 24,
    width: '100%',
  },
  text: {
    height: 24,
    position: 'absolute',
    top: 0,
    color: 'transparent',
  },
  mention: {
    backgroundColor: 'rgba(0, 150, 255, .5)',

  }
});
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
      console.log('prevInputWords', prevInputWords);

      if (word?.reference && word?.enabled) {
        console.log('deleting reference', selection.start, activeWordIndex);
        setJustDisabledWord(true);
        return prevInputWords.map((w, index) =>
          index === activeWordIndex ? { ...w, enabled: false } : w
        );
      }
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
        <Text
          fontSize={25}
          height={30}
          position='absolute'
        // style={styles.text}
        >
          <ConnectAndStyleText inputWords={inputWords} />
        </Text>
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
  const currentActiveWord = inputWords[currentActiveWordIndex];
  const { data: people } = api.person.all.useQuery();

  const filteredPeople = useMemo(() => people?.filter((person) => {
    const fullName = person.firstName // getFullName(person.firstName, person.lastName);
    return fullName.toLowerCase().includes(currentActiveWord?.word?.slice(1).toLowerCase() ?? '');
  }), [people, currentActiveWord]);

  if (!currentActiveWord) return null;
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
      {currentActiveWord.reference === 'person' && filteredPeople?.map((person) => {
        // One idea for handling full names is by making the space between the first and last name contain the reference of the person, group, or topic.
        const fullName = person.firstName // getFullName(person.firstName, person.lastName);
        return (
          <Button
            key={person.id}
            onPress={() => {
              console.log('currentActiveWord', currentActiveWord);
              setInputWords((prevInputWords) => {
                const newInputWords = prevInputWords.map((word, index) =>
                  index === currentActiveWordIndex ? { ...word, word: `@${fullName}` } : word
                );
                return newInputWords;
              });
            }}
          >
            {fullName}
          </Button>
        );
      })}

    </YStack>
  );
}


type ConnectAndStyleTextProps = {
  inputWords: SuperchargedWord[];
}
const ConnectAndStyleText: FC<ConnectAndStyleTextProps> = ({ inputWords }) => {
  const { data: people } = api.person.all.useQuery();

  return inputWords.map(({ word, reference, enabled }, index) => {
    if (reference === 'person') {
      console.log('word', word);
      const person = people?.find((person) => person.firstName.toLowerCase() === word.slice(1).toLowerCase());
      const personIsSelected = person && enabled;
      return (
        <Text unstyled
          key={index.toString() + word} style={personIsSelected ? styles.mention : undefined}>
          {word}
        </Text>
      );
    }
    if (reference === 'topic') {
      return (
        <Text unstyled
          key={index.toString() + word} style={enabled ? styles.mention : undefined}>
          {word}
        </Text>
      );
    }
    return word;
  });
}
