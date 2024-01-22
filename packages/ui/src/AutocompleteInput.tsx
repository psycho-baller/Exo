import { useState, type FC } from 'react';
import { GetProps, Input, Button, Text, Separator, View, YStack } from 'tamagui';
import { FlashList } from "@shopify/flash-list";
import { UnstyledInput } from './UnstyledInput';


interface Props<T> extends GetProps<typeof Input> {
 data: T[];
 value: string;
 setValue: (value: string) => void;
 filter: (data: T[], value: string) => T[];
 onSearch?: (value: string) => void;
 keyExtractor?: (item: T) => string;
}

export const AutocompleteInput: FC<Props<any>> = ({
  data,
  value,
  setValue,
  filter,
  onSearch,
  keyExtractor = (item) => item,
  ...restOfprops
}) => {
//  const [value, setValue] = useState('');
 const [menuVisible, setMenuVisible] = useState(false);
 const [filteredData, setFilteredData] = useState<string[]>([]);

 const handleSearch = (text: string) => {
   console.debug('text', text);
   setMenuVisible(true);
   setValue(text);
   setFilteredData(filter(data, text));
   onSearch && onSearch(text)
 };

 const handleDropdownSelect = (item: string) => {
   setValue(item);
   onSearch && onSearch(item)
   setFilteredData([]);
   setMenuVisible(false);
 };

 return (
   <View position='relative' w='100%'>
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
     <YStack gap="$1" position="absolute" top="100%" left={0} right={0} padding="$1" borderRadius="$1">
     {(filteredData.length > 0 && menuVisible) && (
       <FlashList
         data={filteredData}
         estimatedItemSize={20}
         ItemSeparatorComponent={() => <Separator />}
         renderItem={({ item }) => {
          const itemKey = keyExtractor(item)
          return(
           <Button onPress={() => handleDropdownSelect(itemKey)}>
            <Text>{itemKey}</Text>
           </Button>
          )}
          }
         keyExtractor={keyExtractor}
       />
     )}
     </YStack>
   </View>
 );
};
