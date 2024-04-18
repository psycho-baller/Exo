import DateTimePicker from '@react-native-community/datetimepicker';
import type { BaseProps } from '@react-native-community/datetimepicker';

type Props = Omit<BaseProps, 'value' | 'onChange'> & {
  value: Date | null;
  onChange: (date: Date) => Promise<void>;
};

const MyDateTimePicker = ({ value, onChange, ...props }: Props) => {
  return (
    <DateTimePicker
      value={value ?? new Date()}
      mode='datetime'
      // display='spinner'
      onChange={async (_, data) => {
        if (data) {
          await onChange(data);
        }
      }}
      {...props}
    />
  );
};

export default MyDateTimePicker;
