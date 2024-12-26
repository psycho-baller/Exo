import { use, useEffect, type FC } from 'react'

import { api } from '@acme/api/utils/trpc'
import { Label, Stack, Text, XStack, YStack, Button } from '@acme/ui'
import { BottomSheet } from '../BottomSheet'

import { questionDataAtom, dateSheetRefAtom, superchargedInputSelectedDateAtom, superchargedInputWordsAtom } from '../../atoms/addQuestion'
import { useAtom } from 'jotai'
import { type SuperchargedFormData, SuperchargedInput } from './SuperchargedInput'
import { Calendar, Today } from '@tamagui/lucide-icons';
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
      <Stack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <XStack
          justifyContent="space-between"
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderBottomWidth={1}
          borderColor="$borderColor"
        >
          <Button
            onPress={() => sheetRef?.current?.close()}
            backgroundColor="$blue5"
            hoverStyle={{ backgroundColor: '$blue6' }}
          >
            <Text fontWeight="bold" color="$blue11">Done</Text>
          </Button>
        </XStack>

        <YStack gap="$6" paddingVertical="$4">
          <Button
            onPress={() => saveAndClose(dates.today)}
            icon={Today}
            backgroundColor="$gray3"
          >
            Today
            <Text>{format(dates.today, 'EEE')}</Text>
          </Button>

          <Button
            onPress={() => saveAndClose(dates.tomorrow)}
            icon={Calendar}
            backgroundColor="$gray3"
          >
            Tomorrow
            <Text>{format(dates.tomorrow, 'EEE')}</Text>
          </Button>

          <Button
            onPress={() => saveAndClose(dates.thisWeekend)}
            icon={Calendar}
            backgroundColor="$gray3"
          >
            This Weekend
            <Text>{format(dates.thisWeekend, 'EEE')}</Text>
          </Button>

          <Button
            onPress={() => saveAndClose(dates.nextWeek)}
            icon={Calendar}
            backgroundColor="$gray3"
          >
            Next Week
            <Text>{format(dates.nextWeek, 'EEE')}</Text>
          </Button>
        </YStack>

        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={'date'}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            saveAndClose(currentDate)
          }}
          display="inline"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </Stack>
    </BottomSheet>
  )
}
