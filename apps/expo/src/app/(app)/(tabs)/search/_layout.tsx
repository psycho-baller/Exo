import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

import { useTheme } from '@acme/ui'
import { SearchInput } from '@acme/app/components/search'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAtom } from 'jotai'
import { queryAtom } from '@acme/app/atoms/search'

const Layout = () => {
  const theme = useTheme()
  const [query, setQuery] = useAtom(queryAtom)
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Search',
          header(props) {
            return (
              <SafeAreaView>
                <SearchInput
                  size='$5'
                  labelText='Search'
                  focusOnMount={true}
                  value={query}
                  onChangeText={setQuery}
                />
              </SafeAreaView>
            )
          },
          // headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons
                name='ellipsis-horizontal-circle-outline'
                // color={Colors.primary}
                size={30}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name='camera-outline'
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
