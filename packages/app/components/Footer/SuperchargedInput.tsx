import { UnstyledInput, Text, View, XStack, YStack, BottomSheetInput, Button } from '@acme/ui';
import { useState } from 'react';
import type { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSelectionChangeEventData } from 'react-native';

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
type ReferenceType = 'person' | 'group' | 'topic' | 'date' | null;
type SuperchargedWord = {
  word: string;
  enabled?: boolean;
  reference: ReferenceType;
  // active: boolean;
};
type Props = typeof UnstyledInput.defaultProps;
export const SuperchargedInput: FC<Props> = ({ ...rest }) => {
  const [inputWords, setInputWords] = useState<SuperchargedWord[]>([]);
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
            console.log('key', e.nativeEvent.key);
            if (e.nativeEvent.key === 'Backspace') {
              handleBackspace();
            } else {
              handleChangeText(e.nativeEvent.key);
            }
          }}
          {...rest}
        />
      </View>
      <SuggestionDropdown />
    </YStack>
  );
};

type ConnectAndStyleTextProps = {
  inputWords: SuperchargedWord[];
}
const ConnectAndStyleText: FC<ConnectAndStyleTextProps> = ({ inputWords }) => {

  return inputWords.map(({ word, reference, enabled }, index) => {
    if (reference === 'person' || reference === 'group') {
      return (
        <Text unstyled
          key={index.toString() + word} style={enabled ? styles.mention : undefined}>
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
type SuggestionDropdownProps = {
  currentActiveWord: SuperchargedWord;
}
const SuggestionDropdown: FC<SuggestionDropdownProps> = ({ currentActiveWord }) => {

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
      <Button onPress={() => { }}>
        <Text>Person</Text>
      </Button>
    </YStack>
  );
}