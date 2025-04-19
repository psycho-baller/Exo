import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'
import { Tabs, useSegments } from 'expo-router'

import { useTheme, useThemeName } from '@rooots/ui'
import { sheetRefAtom, questionDataAtom } from '@rooots/app/atoms/addQuestion'
import { useAtom } from 'jotai'
import { Platform, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function TabLayout() {
  const themeName = useThemeName()
  const theme = useTheme()
  const segments = useSegments()
  const [sheetRef] = useAtom(sheetRefAtom)
  const [, setQuestionData] = useAtom(questionDataAtom)
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');
  const insets = useSafeAreaInsets();
  const androidNavHeight = insets.bottom === 48 ? 48 : 12;
  const androidBottomInset = Platform.OS === 'android' ? androidNavHeight : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperimentalBlurMethod('dimezisBlurView');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Tabs
      screenOptions={{
        // tabBarInactiveBackgroundColor: theme.background?.get(),
        // tabBarActiveBackgroundColor: theme.background?.get(),
        tabBarActiveTintColor: theme.accent?.val,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            experimentalBlurMethod={experimentalBlurMethod}
            tint={themeName === 'dark' ? 'systemThinMaterialDark' : 'systemThinMaterialLight'}
            style={{

              overflow: 'hidden',
              borderRadius: 999,
              ...StyleSheet.absoluteFillObject,
              bottom: 10 + androidBottomInset,
              left: 7.5,
              right: 7.5,
              // padding: 20,
              // marginBottom: 10
            }}
          />
        ),
        tabBarStyle: {
          display: segments[3] === '[id]' ? 'none' : 'flex',
          // transform: [{ translateY: segments[3] === '[id]' ? 100 : 0 }],
          // transformOrigin: 'bottom',
          backgroundColor: 'transparent',
          // borderTopWidth: 0,
          position: 'absolute',
          borderColor: 'transparent',
          // paddingBottom: 20,
          left: 0,
          right: 0,
          height: 70 + androidBottomInset,
          ...Platform.select({
            ios: {
              bottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: themeName === 'dark' ? 0 : 2,
            },
            android: {
              elevation: 100
            }
          }),
        },
      }}
    >
      <Tabs.Screen
        name='questions'
        options={{
          title: 'Questions',
          tabBarIconStyle: {
            ...styles.tabBarIcon
          },
          tabBarIcon: ({ color, focused }) => (
            <Home
              size='$2'
              color={focused ? color : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='people'
        options={{
          title: 'People',
          tabBarIconStyle: {
            ...styles.tabBarIcon
          },
          tabBarIcon: ({ size, color, focused }) => (
            <User
              size='$2'
              color={focused ? color : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='addQuestion'
        options={{
          title: 'Add Question',
          tabBarIconStyle: {
            ...styles.tabBarIcon
          },
          tabBarIcon: ({ size, color, focused }) => (
            <Plus
              size='$2.5'
              color={focused ? color : undefined}
            />
          ),
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            setQuestionData(null)
            sheetRef?.current?.present()
          },
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIconStyle: {
            ...styles.tabBarIcon
          },
          tabBarIcon: ({ size, color, focused }) => (
            <Search
              size='$2'
              color={focused ? color : undefined}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIconStyle: {
            ...styles.tabBarIcon
          },
          tabBarIcon: ({ size, color, focused }) => (
            <Users
              size='$2'
              color={focused ? color : undefined}
            />
          ),
        }}

      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginTop: 6, // Adjust this value to lower the icon
    // paddingTop: 50
  },
})