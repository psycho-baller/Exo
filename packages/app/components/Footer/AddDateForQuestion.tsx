import { use, useEffect, type FC } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Label, Stack, Text, XStack, YStack, Button, Group } from '@acme/ui'
import { BottomSheet } from '../BottomSheet'

import { questionDataAtom, dateSheetRefAtom, superchargedInputSelectedDateAtom, superchargedInputWordsAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { type SuperchargedFormData, SuperchargedInput } from './SuperchargedInput'
import { Calendar, CalendarDays } from '@tamagui/lucide-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays, nextSaturday, addWeeks } from 'date-fns';

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

  function saveAndClose(date: Date) {
    setDate(date)
    sheetRef?.current?.close()
  }

  return (
    <BottomSheet sheetRefAtom={dateSheetRefAtom} onDismiss={onDismiss}>

      <YStack paddingVertical="$4">
        <XStack
          onPress={() => saveAndClose(dates.today)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <XStack gap='$4' >
            <Calendar scale={0.7} />
            <Text fontWeight='bold' fontSize='$6'>Today</Text>
          </XStack>
          <Text opacity={0.8} fontSize='$4'>{format(dates.today, 'EEE')}</Text>
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.tomorrow)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <XStack gap='$4' >
            <CalendarDays scale={0.7} />
            <Text fontWeight='bold' fontSize='$6'>Tomorrow</Text>
          </XStack>
          <Text opacity={0.8} fontSize='$4'>{format(dates.tomorrow, 'EEE')}</Text>
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.thisWeekend)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <XStack gap='$4' >
            <CalendarDays scale={0.7} />
            <Text fontWeight='bold' fontSize='$6'>This Weekend</Text>
          </XStack>
          <Text opacity={0.8} fontSize='$4'>{format(dates.thisWeekend, 'EEE')}</Text>
        </XStack>
        <XStack
          onPress={() => saveAndClose(dates.nextWeek)}
          // backgroundColor="$gray3"
          gap="$2"
          justifyContent='space-between'
          alignItems='center'
          paddingVertical="$3"
        >
          <XStack gap='$4' >
            <CalendarDays scale={0.7} />
            <Text fontWeight='bold' fontSize='$6'>Next Week</Text>
          </XStack>
          <Text opacity={0.8} fontSize='$4'>{format(dates.nextWeek, 'EEE')}</Text>
        </XStack>
      </YStack>

      <DateTimePicker
        testID="dateTimePicker"
        value={date || new Date()}
        mode={'date'}
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || new Date();
          saveAndClose(currentDate)
        }}
        minimumDate={new Date()}
        display="inline"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />

    </BottomSheet>
  )
}
