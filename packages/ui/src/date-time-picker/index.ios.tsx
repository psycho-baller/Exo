import DateTimePicker from '@react-native-community/datetimepicker'
import type { BaseProps } from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Platform } from 'react-native'
type Props = Omit<BaseProps, 'value' | 'onChange'> & {
  value: Date | null
  onChange: (date: Date) => Promise<void>
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
      {...props}
    />
  )
}
