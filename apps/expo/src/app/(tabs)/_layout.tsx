import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'
import { Tabs, useSegments } from 'expo-router'
import { sheetRefAtom, questionDataAtom } from '@rooots/app/atoms/addQuestion'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAtom } from 'jotai'
import { Platform, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { useTheme, useThemeName } from '@rooots/ui'
import { trackTabClick } from '@rooots/app/utils/amplitude'
import Drawer from 'expo-router/drawer'

export default function TabLayout() {
  const themeName = useThemeName()
  const theme = useTheme()
  const segments = useSegments()
  const [sheetRef] = useAtom(sheetRefAtom)
  const [, setQuestionData] = useAtom(questionDataAtom)
  const insets = useSafeAreaInsets();
  const androidNavHeight = insets.bottom === 48 ? 48 : 12;
  const androidBottomInset = Platform.OS === 'android' ? androidNavHeight : 0;
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperimentalBlurMethod('dimezisBlurView');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Tabs
      initialRouteName='questions'
      screenOptions={{
        // tabBarInactiveBackgroundColor: theme.background?.get(),
        // tabBarActiveBackgroundColor: theme.background?.get(),
        headerTintColor: theme.accent?.val,
        tabBarActiveTintColor: themeName === 'dark' ? theme.accent?.val : theme.darkerAccent?.val,
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
          display: segments[2] === '[id]' ? 'none' : 'flex',
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
    ><Drawer
      screenOptions={{
        headerShown: false,
      }}
    >
        <Drawer.Screen name='questions' options={{ title: 'Questions' }} />
        <Drawer.Screen name='people' options={{ title: 'People' }} />
        <Drawer.Screen name='addQuestion' options={{ title: 'Add Question' }} />
        <Drawer.Screen name='search' options={{ title: 'Search' }} />
        <Drawer.Screen name='groups' options={{ title: 'Groups' }} />
      </Drawer>

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
        listeners={{
          tabPress: () => trackTabClick('questions'),
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
        listeners={{
          tabPress: () => trackTabClick('people'),
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
            trackTabClick('addQuestion')
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
        listeners={{
          tabPress: () => trackTabClick('search'),
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
        listeners={{
          tabPress: () => trackTabClick('groups'),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginTop: 8, // Adjust this value to lower the icon
    // paddingTop: 50
  },
})