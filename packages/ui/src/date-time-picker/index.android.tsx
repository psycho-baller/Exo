import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import { Button, XStack, Text } from 'tamagui'
import type { BaseProps, AndroidNativeProps } from '@react-native-community/datetimepicker'
type Props = Omit<AndroidNativeProps, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (date: Date) => Promise<void>
}

export const MyDateTimePicker = ({ value, onChange, ...props }: Props) => {

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: value ?? new Date(),
      onChange: async (_, data) => {
        if (data) {
          await onChange(data)
        }
      },
      mode: currentMode,
      is24Hour: true,
      ...props
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <XStack gap='$1.5' paddingVertical='$0'>
      <Button fontWeight='100' size='$3' fontSize='$5' borderRadius='$lg' onPress={showDatepicker} >
        {value?.toLocaleDateString()}
      </Button>
      <Button size='$3' fontSize='$5' borderRadius='$lg' onPress={showTimepicker}>
        {value?.toLocaleTimeString().replace(/:\d+ /, ' ')}
      </Button>
    </XStack>
  );
};