// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import { AutocompleteInput, useTheme, useThemeName, View } from '@rooots/ui'
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur'

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
          title: 'Questions',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          // headerT
          headerBackground: () => (
            <BlurView
              style={{
                ...StyleSheet.absoluteFillObject,

                // overflow: 'hidden',
                // height: 200,
                // bottom: 0,
                // top: 0,
                // borderRadius: 999,
              }}
              tint={themeName === 'dark' ? 'dark' : 'light'}
              intensity={60}
              experimentalBlurMethod={experimentalBlurMethod}
            />
          ),
          // statusBarHidden: true,
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
        }}
      />
    </Stack>
  )
}
export default Layout
