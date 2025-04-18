import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import { Tabs, useSegments } from 'expo-router'

import { useTheme, useThemeName } from '@rooots/ui'
import { sheetRefAtom, questionDataAtom } from '@rooots/app/atoms/addQuestion'
import { useAtom } from 'jotai'
import { Platform, StyleSheet } from 'react-native'

export default function TabLayout() {
  const themeName = useThemeName()
  const theme = useTheme()
  const segments = useSegments()
  const [sheetRef] = useAtom(sheetRefAtom)
  const [, setQuestionData] = useAtom(questionDataAtom)

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
            // experimentalBlurMethod="dimezisBlurView"
            tint={themeName === 'dark' ? 'systemThinMaterialDark' : 'systemThinMaterialLight'}
            style={{
              overflow: 'hidden',
              borderRadius: 999,
              ...StyleSheet.absoluteFillObject,
              bottom: 20,
              left: 7.5,
              right: 7.5,
              padding: 25,
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
          paddingBottom: 20,
          left: 0,
          right: 0,
          height: 80,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: themeName === 'dark' ? 0 : 3,
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
          tabBarIcon: ({ color, focused }) => (
            <Home
              size='$2'
              color={focused ? color : undefined}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='people'
        options={{
          title: 'People',
          tabBarIcon: ({ size, color, focused }) => (
            <User
              size='$2'
              color={focused ? color : undefined}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='addQuestion'
        options={{
          title: 'Add Question',
          tabBarIcon: ({ size, color, focused }) => (
            <Plus
              size='$2'
              color={focused ? color : undefined}
              style={styles.tabBarIcon}
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
          tabBarIcon: ({ size, color, focused }) => (
            <Search
              size='$2'
              color={focused ? color : undefined}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIcon: ({ size, color, focused }) => (
            <Users
              size='$2'
              color={focused ? color : undefined}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginTop: 18, // Adjust this value to lower the icon
  },
})