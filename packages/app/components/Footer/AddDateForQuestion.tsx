import { use, useEffect, type FC } from 'react'

import { api } from '@rooots/api/utils/trpc'
import { Label, Stack, Text, XStack, YStack, Button, Group, Spacer, Separator } from '@rooots/ui'
import { BottomSheet } from '../BottomSheet'

import { questionDataAtom, dateSheetRefAtom, superchargedInputSelectedDateAtom, superchargedInputWordsAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { type SuperchargedFormData, SuperchargedInput } from './SuperchargedInput'
import { Calendar, CalendarDays, Sunrise, CalendarArrowDown, SunDim, CalendarPlus, CalendarOff } from '@tamagui/lucide-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, addDays, nextSaturday, addWeeks } from 'date-fns';
import { Platform } from 'react-native';
const dates = {
  today: new Date(),
  tomorrow: addDays(new Date(), 1),
  thisWeekend: nextSaturday(new Date()),
  nextWeek: addWeeks(new Date(), 1),
}

export const AddDateForQuestion: FC = () => {
  const [sheetRef] = useAtom(dateSheetRefAtom)
  const [date, setDate] = useAtom(superchargedInputSelectedDateAtom)
  const [questionData, setQuestionData] = useAtom(questionDataAtom)

  useEffect(() => {
    questionData && setDate(questionData.reminderDatetime)
  }, [questionData, setDate])

  function onDismiss() {
    questionData && setQuestionData({ ...questionData, reminderDatetime: date })
  }

  function saveAndClose(date: Date | null) {
    setDate(date)
    sheetRef?.current?.close()
  }
  const showAndroidDatePicker = () => {
    DateTimePickerAndroid.open({
      minimumDate: new Date(),
      value: date ?? new Date(),
      onChange: (e, data) => {
        if (data && e.type === 'set') {
          saveAndClose(data)
        }
      },
      mode: 'date',
      is24Hour: true,
      // ...props
    });
  };


  return (
    <BottomSheet sheetRefAtom={dateSheetRefAtom} onDismiss={onDismiss}>

      <YStack paddingBottom="$4">
        <XStack
          onPress={() => saveAndClose(dates.today)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <YStack rowGap>
            <Text fontWeight='' fontSize='$6'>Today</Text>
            <Text opacity={0.65} textTransform='uppercase' fontSize='$3'>{format(dates.today, 'EEE')}</Text>
          </YStack>
          <SunDim />
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.tomorrow)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <YStack rowGap>
            <Text fontWeight='' fontSize='$6'>Tomorrow</Text>
            <Text opacity={0.65} textTransform='uppercase' fontSize='$3'>{format(dates.tomorrow, 'EEE')}</Text>
          </YStack>
          <Sunrise />
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.thisWeekend)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <YStack rowGap>
            <Text fontWeight='' fontSize='$6'>This Weekend</Text>
            <Text opacity={0.65} textTransform='uppercase' fontSize='$3'>{format(dates.thisWeekend, 'EEE')}</Text>
          </YStack>
          <CalendarPlus />
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.nextWeek)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <YStack rowGap>
            <Text fontWeight='' fontSize='$6'>Next Week</Text>
            <Text opacity={0.65} textTransform='uppercase' fontSize='$3'>{format(dates.nextWeek, 'EEE')}</Text>
          </YStack>
          <CalendarArrowDown />
        </XStack>
        {Platform.OS === 'android' && (
          <XStack
            onPress={() => showAndroidDatePicker()}
            // backgroundColor="$gray3"
            gap="$2"
            justifyContent='space-between'
            alignItems='center'
            paddingVertical="$3"
          >
            <YStack rowGap>
              <Text fontWeight='' fontSize='$6'>Custom</Text>
              <Text opacity={0.65} textTransform='uppercase' fontSize='$3'>Date</Text>
            </YStack>
            <CalendarDays />
          </XStack>
        )}
        {/* clear date */}
        {date && (
          <XStack
            onPress={() => saveAndClose(null)}
            // backgroundColor="$gray3"
            gap="$2"
            justifyContent='space-between'
            alignItems='center'
            paddingVertical="$3"
          >
            <YStack rowGap>
              <Text fontWeight='' fontSize='$6'>Clear Date</Text>
              {/* <Text opacity={0.65} textTransform='uppercase' fontSize='$3.5'>Remove reminder</Text> */}
            </YStack>
            <CalendarOff />
          </XStack>
        )}
        {Platform.OS === 'ios' && (
          <>
            <Separator />
            <DateTimePicker
              // shouldRasterizeIOS
              testID="dateTimePicker"
              value={date || new Date()}
              mode={'date'}
              onChange={(event, selectedDate) => {
                if (event.type !== 'set') { return }
                const currentDate = selectedDate;
                saveAndClose(currentDate || null)
              }}
              minimumDate={new Date()}
              display="inline"
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            />
          </>
        )}
      </YStack>



    </BottomSheet>
  )
}
