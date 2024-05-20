import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import type { AndroidNativeProps } from '@react-native-community/datetimepicker'
import { TagButton } from '../TagButton'
type Props = Omit<AndroidNativeProps, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (date: Date) => Promise<void>,
  // showOnMount?: boolean
}

export const MyDateTimePicker = ({
  value,
  onChange,
  // showOnMount = false,
  ...props
}: Props) => {

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

  // // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // useEffect(() => {
  //   if (showOnMount) {
  //     showDatepicker()
  //   }
  //   return () => {
  //     DateTimePickerAndroid.dismiss('date')
  //     DateTimePickerAndroid.dismiss('time')
  //   }
  // }, [])
  return (
    <>
      <TagButton onPress={showDatepicker} >
        {value?.toLocaleDateString()}
      </TagButton>
      <TagButton onPress={showTimepicker}>
        {value?.toLocaleTimeString()?.replace(/:\d+ /, ' ')}
      </TagButton>
    </>
  );
};