import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import type { FC } from 'react';
import type { GetProps, Input } from 'tamagui';
import { Button, Separator, Text, View, YStack } from 'tamagui';

import { UnstyledInput } from './UnstyledInput';

type T = any;
interface Props<T> extends GetProps<typeof Input> {
  data: T[];
  value: string;
  setValue: (value: string) => void;
  filter: (data: T[], value: string) => T[];
  onSearch?: (value: T) => void;
  onSelect?: (item: T) => void;
  renderItem?: (item: T) => string;
  keyExtractor?: (item: T) => string;
  onEmptyList?: () => JSX.Element;
}

export const AutocompleteInput: FC<Props<T>> = ({
  data,
  value,
  setValue,
  filter,
  onSearch,
  onSelect,
  onEmptyList,
  renderItem = (item: T) => item,
  keyExtractor = (item: T) => item,
  ...restOfprops
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<string[]>(data);

  const handleSearch = (text: string) => {
    setMenuVisible(true);
    setValue(text);
    setFilteredData(filter(data, text));
    onSearch && onSearch(text);
  };

  const handleDropdownSelect = (item: T) => {
    onSelect && onSelect(item);
    setFilteredData([]);
    setMenuVisible(false);
  };

  return (
    <View position='relative' width='100%'>
      <UnstyledInput
        value={value}
        onChangeText={handleSearch}
        onFocus={() => {
          // if (value.length === 0) {
          setMenuVisible(true);
          // }
        }}
        onBlur={() => {
          setTimeout(() => {
            setMenuVisible(false);
          }, 200);
        }}
        {...restOfprops}
      />
      <YStack
        gap='$1'
        position='absolute'
        top='100%'
        left={0}
        right={0}
        padding='$1'
        borderRadius='$1'
      >
        {menuVisible && (
          <FlashList
            data={filteredData}
            estimatedItemSize={20}
            ItemSeparatorComponent={() => <Separator />}
            keyExtractor={keyExtractor}
            ListEmptyComponent={onEmptyList}
            renderItem={({ item }) => {
              return (
                <Button onPress={() => handleDropdownSelect(item)}>
                  <Text>{renderItem(item)}</Text>
                </Button>
              );
            }}
          />
        )}
      </YStack>
    </View>
  );
};
