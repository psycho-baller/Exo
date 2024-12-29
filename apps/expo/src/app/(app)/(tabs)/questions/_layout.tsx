// import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { Image, Text, TouchableOpacity } from 'react-native'

import { AutocompleteInput, useTheme, useThemeName, View } from '@rooots/ui'
import { BlurView } from 'expo-blur'

const Layout = () => {
  const theme = useTheme()
  const themeName = useThemeName()

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Questions',
          headerTransparent: true,
          headerBlurEffect: 'regular',
          // headerStyle: {
          //   backgroundColor: 'transparent',
          // },
          // header() {
          //   return (
          //   <View
          //     // intensity={30}
          //     // tint={themeName === 'dark' ? 'extraLight' : 'light'}
          //     // style={{
          //     //   flex: 1,
          //     //   overflow: 'hidden',
          //     //   height: '100%',
          //     //   left: 0,
          //     //   right: 0,
          //     //   bottom: 0,
          //     //   top: 0,
          //     //   // position: 'absolute',
          //     //   opacity: 10,
          //     //   backgroundColor: 'transparent',
          //     //   padding: 10,
          //     // }}
          //   >
          //     <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          //       <Text style={{ fontSize: 34, fontWeight: 'bold' }}>Questions</Text>
          //       <TouchableOpacity>
          //         <Ionicons
          //           name='ellipsis-horizontal-circle-outline'
          //           // color={Colors.primary}
          //           size={30}
          //         />
          //       </TouchableOpacity>
          //     </View>
          //   </View>
          // )},
          // headerTitle(props) {
          //   return (
          //     <AutocompleteInput
          //     data={[]} value={'Ass'} setValue={() => {}} filter={() => []}
          //     placeholder='Search'
          //     style={{
          //       // width: '100%',
          //       backgroundColor: "green",
          //       // borderRadius: 10,
          //       // padding: 10,
          //       // fontSize: 16,
          //     }}              />
          //   )
          // },
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
        }}
      />

      <Stack.Screen
        name='[id]'
        options={{
          title: '',
          headerBackTitleVisible: true,
          // headerTitle: () => (
          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       width: 220,
          //       alignItems: 'center',
          //       gap: 10,
          //       paddingBottom: 4,
          //     }}
          //   >
          //     <Image
          //       source={{
          //         uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
          //       }}
          //       style={{ width: 40, height: 40, borderRadius: 50 }}
          //     />
          //     <Text style={{ fontSize: 16, fontWeight: '500' }}>Simon Grimm</Text>
          //   </View>
          // ),
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
