import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

import { useTheme } from '@rooots/ui'
import { SearchEverythingInput } from '@rooots/app/components/SearchInput/SearchEverythingInput'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout = () => {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Search',
          header(props) {
            return (
              <SafeAreaView>
                <SearchEverythingInput />
              </SafeAreaView>
            )
          },
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerRight: () => (
            <View style={{ flex: 1 }}>
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
        }}
      />
    </Stack>
  )
}
export default Layout
