import { UnstyledInput, Text, View } from '@acme/ui';
import React, { useEffect, useState } from 'react';
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
    fontSize: 28,
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
  active: boolean;
};

export const SuperInput = () => {
  const [inputWords, setInputWords] = useState<SuperchargedWord[]>([]);
  const [selection, setSelection] = useState<{ start: number, end: number }>({ start: 0, end: 0 });
  const [justDisabledWord, setJustDisabledWord] = useState(false);

  const handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    const newSelection = e.nativeEvent.selection;
    setSelection(newSelection);

    const inputText = inputWords.map(({ word }) => word).join(' ');
    const activeWordIndex = inputText.slice(0, newSelection.start).split(' ').length - 1;
    const newInputWords = inputWords.map((word, index) => ({
      ...word,
      active: index === activeWordIndex,
    }));
    setInputWords(newInputWords);
  };

  const handleChangeText = (newInput: string) => {
    const inputText = inputWords.map(({ word }) => word).join(' ');

    // Insert new input at current selection position
    const before = inputText.slice(0, selection.start);
    const after = inputText.slice(selection.start);
    const updatedText = before + newInput + after;

    const words = updatedText.split(' ');
    const newInputWords: SuperchargedWord[] = words.map((word, index) => {
      let reference: ReferenceType = null;
      if (word.startsWith('@')) {
        reference = word.startsWith('@@') ? 'group' : 'person';
      } else if (word.startsWith('#')) {
        reference = 'topic';
        // } else if (chrono.parseDate(word)) {
        // reference = 'date';
      }

      return {
        word,
        // TODO: only enabled if there's a match
        enabled: reference !== null,
        reference,
        active: selection.start === index,
      };
    });

    setInputWords(newInputWords);
  };

  const formatText = (inputWords: SuperchargedWord[]) => {
    return inputWords.map(({ word, reference, enabled }, index) => {
      if (reference === 'person' || reference === 'group' || reference === 'topic') {
        return (
          <Text unstyled
            fontSize={28}
            key={index.toString() + word} style={enabled ? styles.mention : undefined}>
            {word}
          </Text>
        );
      }
      return word;
    });
  }

  const handleBackspace = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (selection.start <= 0) return; // No action if cursor is at the start
    const activeWordIndex = inputWords.findIndex(({ active }) => active);
    setInputWords((prevInputWords) => {
      const inputText = prevInputWords.map(({ word }) => word).join(' ');
      const wordIndex = inputText.slice(0, selection.start).split(' ').length - 1;
      const word = prevInputWords[wordIndex];

      if (word?.reference && word?.enabled) {
        console.log('deleting reference', selection.start, wordIndex);
        setJustDisabledWord(true);
        return prevInputWords.map((w, index) =>
          index === wordIndex ? { ...w, enabled: false } : w
        );
      }
      console.log('deleting word', selection.start, wordIndex);
      const indexToSlice = justDisabledWord ? selection.start + 1 : selection.start;


      const newInputText = inputText.slice(0, indexToSlice - 1) + inputText.slice(indexToSlice);
      justDisabledWord && setJustDisabledWord(false)
      // TODO: 
      return newInputText.split(' ').map((word) => ({ word, reference: null, active: false }));
    });
  }

  return (
    <View style={styles.wrapper}>
      <Text unstyled
        fontSize={28}
        style={styles.text}>
        {formatText(inputWords)}
      </Text>
      <View style={styles.inputWrapper}>
        <UnstyledInput
          fontSize={28}
          onSelectionChange={handleSelectionChange}
          style={styles.input}
          value={inputWords.map(({ word }) => word).join(' ')}
          onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (e.nativeEvent.key === 'Backspace') {
              handleBackspace(e);
            } else if (e.nativeEvent.key.length === 1) {
              handleChangeText(e.nativeEvent.key);
            }
          }}
        />
      </View>
    </View>
  );
};