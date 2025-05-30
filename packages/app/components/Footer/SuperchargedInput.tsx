import { api } from '@rooots/api/utils/trpc';
import { Text, View, XStack, YStack, Button, BottomSheetInput, useTheme } from '@rooots/ui';
import type { UnstyledInputProps } from '@rooots/ui';
import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSelectionChangeEventData } from 'react-native';
import { getActiveWordIndexFromSuperchargedWords } from '../../utils/strings';
import { useAtom } from 'jotai';
import { type ReferenceType, type SuperchargedWord, superchargedInputWordsAtom, superchargedInputSelectionAtom, questionDataAtom } from '../../atoms/addQuestion';
// import { parse } from 'chrono-node';
import { Suggestions } from './Suggestions';
import { ArrowUp, CheckCircle2 } from '@tamagui/lucide-icons';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '@tamagui/themes';

// Form Data Types
export type SuperchargedFormData = {
  question: string;
  note: string;
};

type Props = UnstyledInputProps & {
  addQuestion: SubmitHandler<SuperchargedFormData>;
  updateQuestion: (id: number) => void;
};
export const SuperchargedInput: FC<Props> = ({ addQuestion, updateQuestion, ...rest }) => {
  const [inputWords, setInputWords] = useAtom(superchargedInputWordsAtom);
  const [selection, setSelection] = useAtom(superchargedInputSelectionAtom)
  const [questionData, setQuestionData] = useAtom(questionDataAtom)

  const [justDisabledWord, setJustDisabledWord] = useState(false);
  const [autoCapitalize, setAutoCapitalize] = useState<'none' | 'sentences' | 'words' | 'characters'>('sentences');
  const theme = useTheme();

  // React Hook Form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SuperchargedFormData>({
    defaultValues: {
      question: questionData?.question || inputWords.map(({ word }) => word).join(''),
      note: questionData?.note || '',
    },
    mode: 'onChange',
  });
  useEffect(() => {
    trigger();
  }, [trigger]);
  useEffect(() => {
    if (questionData) {
      // ! Is there any use for 'addTextProperties' here? There isn't any special characters in questionData.question
      setInputWords(addTextProperties(questionData.question));
      // TODO: show in the UI what properties are already connected (person, topic, group) and make them editable
    }
  }, [questionData, setInputWords]);
  // Sync Input Words with Local Text Value
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

  // Text Change Handler
  const handleChangeText = (text: string) => {
    const updatedWords = addTextProperties(text);
    setInputWords(updatedWords);
    setValue('question', text);
  };

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

  const addTextProperties: (text: string) => SuperchargedWord[] = (text) => {
    // const date = parse(text)
    const words = text.split(/(\s+)/)

    const lastWord = words.at(-1);
    console.log('lastWord', lastWord);
    // check if the final character is an '@'. If it is, set autoCapitalize to 'characters', if not, or it's a double '@', set it to 'sentences'(default)
    if (lastWord?.at(-1) === '@' && lastWord?.at(-2) !== '@') {
      setAutoCapitalize('characters')
    } else if (autoCapitalize !== 'sentences') {
      setAutoCapitalize('sentences')
    }
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

  const submit = () => {
    (questionData && questionData.createdByUserId.length > 0)
      ? handleSubmit(() => updateQuestion(questionData.id), console.log)()
      : handleSubmit(addQuestion, console.log)();
  }

  return (
    <YStack width='100%' >
      <View position='relative'>
        <XStack
          // height={30}
          position='absolute'
          flexWrap='wrap'
        >
          <ConnectAndStyleText inputWords={inputWords} />
        </XStack>
        <YStack gap='$2'>
          <Controller
            control={control}
            name="question"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <BottomSheetInput
                ref={null}
                returnKeyType='done'
                returnKeyLabel='Add'
                submitBehavior='blurAndSubmit'
                fontSize={25}
                // whiteSpace='pre-wrap'
                lineHeight={30}
                width='100%'
                color='transparent'
                onSelectionChange={handleSelectionChange}
                value={value}
                onChangeText={(text) => {
                  handleChangeText(text);
                  onChange(text);
                }}
                onSubmitEditing={submit}
                autoCapitalize={autoCapitalize}
                // numberOfLines={4}
                multiline
                // onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                //   if (e.nativeEvent.key === 'Backspace') {
                // handleBackspace();
                // } else {
                // handleChangeText(e.nativeEvent.key);
                // }
                // }}
                {...rest}
              />
            )}
          />
          {/* Description Input Field */}
          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value } }) => (
              <BottomSheetInput
                fontSize={18}
                // whiteSpace='pre-wrap'
                // lineHeight={30}
                width='100%'
                placeholder="Add a note for this question"
                value={value}
                onChangeText={(text) => {
                  onChange(text)
                  questionData && setQuestionData({ ...questionData, note: text })
                }}
                multiline
              />
            )}
          />
        </YStack>
        {/* {errors.question && <Text style={styles.errorText}>This field is required</Text>}
        {errors.note ?
          <Text style={styles.errorText}>{errors.note}s</Text>
          : null
        } */}

        <XStack alignItems='center' backgroundColor='transparent' >
          <Suggestions currentActiveWordIndex={getActiveWordIndexFromSuperchargedWords(inputWords, selection.start)} setFormValue={setValue} />
          <Button unstyled opacity={errors.question ? 0.5 : 1} onPress={submit} backgroundColor={theme.accent?.val} borderRadius={25} padding={4}>
            {/* <CheckCircle2 /> */}
            <ArrowUp color={theme.textAccent?.val} />
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
  const { data: people } = api.person.all.useQuery();
  const { data: topics } = api.topic.all.useQuery();
  const { data: groups } = api.group.all.useQuery();

  const theme = useTheme();

  const selectedWordStyle = styles.selectedWordBg;
  const selectedWordGradientColors = [theme.secondaryAccent?.val ?? '', theme.accent?.val ?? ''];

  return inputWords.map(({ word, reference, enabled }, index) => {
    if (reference === 'person') {
      console.log('word', word);
      const person = people?.find((person) => person.firstName.toLowerCase() === word.slice(1).toLowerCase());
      const personIsSelected = person && enabled;
      return personIsSelected ? (
        <LinearGradient
          key={index.toString() + word}
          colors={selectedWordGradientColors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={selectedWordStyle}
        >
          <Text style={{ ...styles.selectedWord, color: theme.textAccent?.val }}>{word}</Text>
        </LinearGradient>
      ) : (
        <View key={index.toString() + word} style={styles.unselectedWordBg}>
          <Text style={styles.unselectedWord}>{word}</Text>
        </View>
      );
    }
    if (reference === 'group') {
      const group = groups?.find((group) => group.name.toLowerCase() === word.slice(2).toLowerCase());
      const groupIsSelected = group && enabled;
      return groupIsSelected ? (
        <LinearGradient
          key={index.toString() + word}
          colors={selectedWordGradientColors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={selectedWordStyle}
        >
          <Text style={{ ...styles.selectedWord, color: theme.textAccent?.val }}>{word}</Text>
        </LinearGradient>
      ) : (
        <View key={index.toString() + word} style={styles.unselectedWordBg}>
          <Text style={styles.unselectedWord}>{word}</Text>
        </View>
      );
    }
    if (reference === 'topic') {
      const topic = topics?.find((topic) => topic.name.toLowerCase() === word.slice(1).toLowerCase());
      const topicIsSelected = topic && enabled;
      return topicIsSelected ? (
        <LinearGradient
          key={index.toString() + word}
          colors={selectedWordGradientColors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={selectedWordStyle}
        >
          <Text style={{ ...styles.selectedWord, color: theme.textAccent?.val }}>{word}</Text>
        </LinearGradient>
      ) : (
        <View key={index.toString() + word} style={styles.unselectedWordBg}>
          <Text style={styles.unselectedWord}>{word}</Text>
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
