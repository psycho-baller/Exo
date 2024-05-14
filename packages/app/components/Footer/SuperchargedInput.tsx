import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface Props {
  // tags: string[];
  // setTags: (tags: string[]) => void;
  [x: string]: any;
}

export const SuperchargedInput: FC<Props> = (props) => {
  const { ...rest } = props;

  const [tags, setTags] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(1);
  const [focused, setFocused] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const input = useRef<TextInput>(null);

  const removeTag = (i: number) => {
    setTags([...tags.slice(0, i), ...tags.slice(i + 1)]);
  };


  const inputKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    e.stopPropagation();
    if ((e.nativeEvent.key === "Tab" || e.nativeEvent.key === "," || e.nativeEvent.key === "Enter") && inputVal) {
      e.preventDefault();
      if (tags.find((tag) => tag.toLowerCase() === inputVal.toLowerCase())) {
        if (input.current) {
          input.current.focus();
        }
        return;
      }
      setTags([...tags, inputVal.trim()]);
      // console.log(input.current);
      if (input.current) {
        console.log(inputVal)
        // input.current.clear();
        setInputVal(prev => "");
      }
    } else if (e.nativeEvent.key === "Backspace" && !inputVal && tags.length) {
      removeTag(tags.length - 1);
      setInputVal(prev => prev + tags.slice(-1)[0]);
    }
  };

  useEffect(() => {
    setWidth(Dimensions.get('window').width);
  }, [inputVal]);

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => {
        if (input.current) {
          input.current.focus();
        }
        return true;
      }}
    >
      <View style={styles.tagContainer}>
        {tags.map((tag, i) => (
          <View key={tag} style={styles.tag}>
            <Text>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(i)}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputVal}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(text) => {
              setInputVal(text.replace(/,/g, ""));
            }}
            style={[styles.input]}
            onKeyPress={inputKeyDown}
            ref={input}
            {...rest}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    backgroundColor: 'green',
  },
});
