import { UnstyledInput, Text, View } from '@acme/ui';
import React, { useState } from 'react';
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
    fontSize: 28,
    position: 'absolute',
    top: 0,
    color: 'transparent',
  },
  mention: {
    backgroundColor: 'rgba(0, 150, 255, .5)',
  }
});

export const SuperInput = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState<(string | JSX.Element)[]>([]);

  const handleChangeText = (inputText: string) => {
    setInputText(inputText);
    setFormattedText(formatText(inputText));
  };

  const formatText = (inputText: string) => {
    const words = inputText.split(' ');
    const formattedTextArray: (string | JSX.Element)[] = [];
    for (const word of words) {
      if (!word.startsWith('@')) {
        formattedTextArray.push(word, ' ');
      } else {
        const mention = (
          <Text unstyled key={word} style={styles.mention}>
            {word}
          </Text>
        );
        formattedTextArray.push(mention, ' ');
      }
    }
    return formattedTextArray;
  }

  const handleBackspace = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    // check if the word we are deleting is a mention
    const words = inputText.split(' ').filter(Boolean);
    console.log('words', words);
    const lastWord = words.slice(-1)[0];
    if (lastWord?.startsWith('@')) {
      // delete the whole word
      const newWords = words.slice(0, words.length - 1);
      console.log('newWords', newWords);
      const newInputText = newWords.join(' ');
      setInputText(newInputText);
      setFormattedText(formatText(newInputText));
    } else {
      // delete the last character
      const newInputText = inputText.slice(0, -1);
      setInputText(newInputText);
      setFormattedText(formatText(newInputText));
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text unstyled style={styles.text}>
        {formattedText}
      </Text>
      <View style={styles.inputWrapper}>
        <UnstyledInput
          onSelectionChange={(e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            // make a state to store the selection
            console.log('selection', e.nativeEvent.selection.start, e.nativeEvent.selection.end);
          }}
          style={styles.input}
          fontSize={28}
          value={inputText}
          // onChangeText={handleChangeText}
          onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
            if (e.nativeEvent.key === 'Backspace') {
              // handle edge cases:
              // if no text
              if (!inputText) return;
              // if a chunk of text is selected
              handleBackspace(e);
            } else if (e.nativeEvent.key.length === 1) {
              // if letter
              handleChangeText(inputText + e.nativeEvent.key);

            }
          }}
        />
      </View>
    </View>
  );
};
