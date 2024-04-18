import type { InputHTMLAttributes } from 'react';
import { View } from 'tamagui';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> & {
  value: Date | null;
  onChange: (date: Date) => Promise<void>;
};

const MyDateTimePicker = ({ value, onChange, style, ...props }: Props) => {
  return (
    <View
      paddingVertical='$2'

      // onPress={(e) => {
      //   console.log('press', e);
      //   // e.preventDefault();
      //   // inputRef.current?.tar
      //   inputRef.current?.style.display === 'none'
      //     ? (inputRef.current.style.display = 'block')
      //     : (inputRef.current.style.display = 'none');
      //   inputRef.current?.focus();
      // }}
    >
      {/* <input type='hidden' id='timezone' name='timezone' value='-04:00' /> */}
      <input
        style={{
          fontFamily: 'system-ui, Arial, sans-serif',
          cursor: 'text',
          ...style,
        }}
        // ref={inputRef}
        type='datetime-local'
        value={value?.toISOString().slice(0, 16)}
        onChange={async (e) => {
          const date = new Date(e.target.value);
          if (date) {
            await onChange(toLocalISOString(date));
          }
        }}
        {...props}
      />
    </View>
  );
};

const toLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  // subtract the offset to get the UTC time
  const dateUTC = new Date(date.getTime() - offset * 60 * 1000);
  console.log('date', date, 'dateUTC', dateUTC);
  return dateUTC;
};

export default MyDateTimePicker;
