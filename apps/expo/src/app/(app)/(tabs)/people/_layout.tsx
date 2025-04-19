// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

import { useTheme, useThemeName, View } from '@rooots/ui'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const Layout = () => {
  const theme = useTheme()
  const themeName = useThemeName()
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');

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
          title: 'People',
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
              <TouchableOpacity>
                <Ionicons
                  name='ellipsis-horizontal-circle-outline'
                  // color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              {/* <Link href='/(modals)/new-chat' asChild>
                <TouchableOpacity>
                  <Ionicons name='add-circle' color={Colors.primary} size={30} />
                </TouchableOpacity>
              </Link> */}
            </View>
          ),
          headerStyle: {
            // backgroundColor: theme.background?.get(),
          },
          // headerSearchBarOptions: {
          // placeholder: 'Search',
          // },
        }}
      />

      <Stack.Screen
        name='[id]'
        options={{
          title: 'Person',
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
            // backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  )
}
export default Layout
