// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import { useThemeName, View, useTheme } from '@rooots/ui'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'
import { useAtom } from 'jotai';
import { questionDataAtom, sheetRefAtom } from '@rooots/app/atoms/addQuestion';
import { getRandomQuestion } from '@rooots/app/utils/questions';
import { HelpCircle } from '@tamagui/lucide-icons';
import { useVideoSheetActions } from '@rooots/app/hooks/useVideoSheetActions';
import { trackGenerateQuestionClick, trackOnboardingClick } from '@rooots/app/utils/amplitude'
import { DrawerToggleButton } from '@react-navigation/drawer';

const Layout = () => {
  const themeName = useThemeName()
  const theme = useTheme()
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
    <>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Questions',
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
            headerLeft: (props) => (
              <View marginStart={-20}>
                <DrawerToggleButton {...props} tintColor={theme.color?.val} />
              </View>
            ),
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 15 }}>
                <TouchableOpacity onPress={() => {
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
                {/* <Link href='/(modals)/new-chat' asChild>
                <TouchableOpacity>
                  <Ionicons name='add-circle' color={Colors.primary} size={30} />
                </TouchableOpacity>
              </Link> */}
              </View>
            ),
          }}
        />
      </Stack >
    </>
  )
}
export default Layout
