import React, { useState, useEffect } from 'react'
import { Main, YStack, XStack, Text, Button, useThemeName, useTheme, ButtonText, View } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import { MainPage } from '../Footer/MainPage'
import { useAtom } from 'jotai'
import { questionDataAtom, sheetRefAtom } from '../../atoms/addQuestion'
import { getRandomQuestions } from '../../utils/questions'
import { UnstyledInput } from '@rooots/ui'

export default function EmptyState() {
  const themeName = useThemeName()
  const theme = useTheme()
  const [sheetRef] = useAtom(sheetRefAtom)
  const [, setQuestionData] = useAtom(questionDataAtom)

  // adjust these to match your design tokens
  const bgColor = themeName === 'dark' ? '#333' : '#eee'
  const textColor = theme.color?.val

  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setSuggestions(getRandomQuestions())
  }, [])

  return (
    // place at center of screen
    <YStack flex={1} justifyContent="center" alignItems="center" gap={15} paddingTop="$5" paddingHorizontal="$1">
      <Text fontSize='$9' textAlign='center' fontWeight="bold" color={textColor} paddingBottom="$5">
        Let's create your first question!
      </Text>

      {suggestions.map((text) => (
        <Button
          // icon={Plus}
          // scaleIcon={1.3}
          key={text}
          size='$7'
          backgroundColor={bgColor}
          borderRadius={999}
          overflow='visible'
          // textWrap='wrap'
          // flexWrap='wrap'
          onPress={() => {
            setQuestionData({
              createdByUserId: '',
              question: text,
              note: null,
              groupId: null,
              personId: null,
              postId: null,
              id: 0,
              reminderDatetime: null,
              createdDatetime: null,
            })
            sheetRef?.current?.present()
          }}
        >
          {/* <ButtonText
            fontSize='$8'
            textAlign="center"
            flexWrap="wrap"
            whiteSpace="normal"
          // Remove numberOfLines, ellipsizeMode if present
          > */}
          <XStack alignItems="center" flex={1} gap="$2">
            <Plus marginLeft="$-4" size={'$2'} color={textColor} strokeWidth={2.5} />
            <Text fontSize="$7" flexWrap='wrap' ellipsizeMode='tail' whiteSpace='normal' numberOfLines={2} >
              {text}
            </Text>
          </XStack>
        </Button>
      ))}
    </YStack>
  )
}