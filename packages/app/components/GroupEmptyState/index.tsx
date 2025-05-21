import React, { useState, useEffect } from 'react'
import { YStack, Text, useThemeName, useTheme, Image } from '@rooots/ui'
import { getRandomQuestions } from '../../utils/questions'

export default function GroupEmptyState() {
  const themeName = useThemeName()
  const theme = useTheme()

  // adjust these to match your design tokens
  const bgColor = themeName === 'dark' ? '#333' : '#eee'
  const textColor = theme.color?.val

  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setSuggestions(getRandomQuestions())
  }, [])

  return (
    // place at center of screen
    <YStack flex={1} justifyContent="center" alignItems="center" gap={10} paddingTop="$5" paddingHorizontal="$2.5">
      <Text fontSize='$9' textAlign='center' fontWeight="bold" color={textColor} paddingBottom="$5">
        How to create a group?
      </Text>
      {/* gif */}
      <Image source={require('../../assets/gifs/exo-onboarding-group-no-border.gif')} height='70%' objectFit='contain' />
    </YStack>
  )
}
