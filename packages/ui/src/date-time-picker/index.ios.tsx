import DateTimePicker from '@react-native-community/datetimepicker'
import type { IOSNativeProps } from '@react-native-community/datetimepicker'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
type Props = Omit<IOSNativeProps, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (date: Date) => Promise<void> | Dispatch<SetStateAction<Date>>
  children?: React.ReactNode
}

export const MyDateTimePicker = ({ value, onChange, ...props }: Props) => {

  return (
    <DateTimePicker
      value={value ?? new Date()}
      mode='datetime'
      onChange={async (_, data) => {
        if (data) {
          await onChange(data)
        }
      }}
      style={{

      }}
      // onLayout={(e) => {
      //   console.log('onLayout', e.nativeEvent)
      // }}
      {...props}
    />
  )
}
