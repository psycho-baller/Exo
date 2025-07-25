// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { Linking, TouchableOpacity } from 'react-native'

import { useTheme, useThemeName, View } from '@rooots/ui'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useAtom } from 'jotai'
import { questionDataAtom, sheetRefAtom } from '@rooots/app/atoms/addQuestion'
import { getRandomQuestion } from '@rooots/app/utils/questions'
import { HelpCircle } from '@tamagui/lucide-icons'
import { useVideoSheetActions } from '@rooots/app/hooks/useVideoSheetActions';
import { trackGenerateQuestionClick, trackOnboardingClick } from '@rooots/app/utils/amplitude'

const Layout = () => {
  const theme = useTheme()
  const themeName = useThemeName()
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');
  const [, setQuestionData] = useAtom(questionDataAtom)
  const [sheetRef] = useAtom(sheetRefAtom)
  const { openVideoSheet } = useVideoSheetActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperimentalBlurMethod('dimezisBlurView');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Groups',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          headerBackground: () => (
            <BlurView
              style={StyleSheet.absoluteFillObject}
              tint={themeName === 'dark' ? 'dark' : 'light'}
              intensity={60}
              experimentalBlurMethod={experimentalBlurMethod}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 15 }}>
              <TouchableOpacity onPress={() => {
                // used to open link: https://youtube.com/shorts/FhcSiat6ihM
                openVideoSheet()
                trackOnboardingClick()
              }}>
                <HelpCircle
                  color={theme.color?.val}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                const randomQuestion = getRandomQuestion();
                setQuestionData({
                  createdByUserId: '',
                  question: randomQuestion,
                  note: null,
                  groupId: null,
                  personId: null,
                  postId: null,
                  id: 0,
                  reminderDatetime: null,
                  createdDatetime: null,
                })
                sheetRef?.current?.present()
                trackGenerateQuestionClick()
              }}>
                <Ionicons
                  name='sparkles-sharp'
                  color={theme.color?.val}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          ),
          // headerStyle: {
          // backgroundColor: theme.background?.get(),
          // },
          // headerSearchBarOptions: {
          //   placeholder: 'Search',
          // },
        }}
      />

      <Stack.Screen
        name='[id]'
        options={{
          title: '',
          // headerBackTitleVisible: false,
          headerRight: () => (
            <View flexDirection='row' gap={30}>
              <TouchableOpacity>
                <Ionicons
                  size={25}
                  name='ellipsis-vertical-sharp'
                  color={theme.color?.get()}
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.background?.get(),
          },
        }}
      />
    </Stack>
  )
}
export default Layout
