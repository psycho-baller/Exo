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

const Layout = () => {
  const themeName = useThemeName()
  const theme = useTheme()
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');
  const [, setQuestionData] = useAtom(questionDataAtom)
  const [sheetRef] = useAtom(sheetRefAtom)
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
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
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
  )
}
export default Layout
