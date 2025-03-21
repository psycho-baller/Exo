// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

import { useTheme, View } from '@rooots/ui'

const Layout = () => {
  const theme = useTheme()
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Groups',
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
