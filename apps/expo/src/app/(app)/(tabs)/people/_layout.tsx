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
          title: 'People',
          // headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name='ellipsis-horizontal-circle-outline'
                  // color={Colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              ),
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
          headerBackTitleVisible: false,
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
