// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { useTheme } from '@rooots/ui'

const Layout = () => {
  const theme = useTheme()
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'People',
          // headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name='ellipsis-horizontal-circle-outline'
                // color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            // backgroundColor: theme.background?.get(),
          },
          // headerSearchBarOptions: {
          // placeholder: 'Search',
          // },
        }}
      />
    </Stack>
  )
}
export default Layout
