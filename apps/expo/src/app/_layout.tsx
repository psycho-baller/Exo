import { Stack } from 'expo-router'
import { Provider } from '@rooots/app/provider'
import DemoVideo from '@rooots/app/components/DemoVideo'
import { BottomSheet } from '@rooots/app/components/BottomSheet'
import { videoSheetRefAtom } from '@rooots/app/atoms/sheet'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

const RootLayout = () => {

  // const [loaded, error] = useFonts({
  //   Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  //   InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  // })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error
  // }, [error])

  // useEffect(() => {
  //   if (loaded) {
  //     // SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <Provider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens
        */}
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          // headerTransparent: true,
          headerShown: false,
          // navigationBarColor: 'transparent',
          // navigationBarHidden: true,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ title: 'Home' }} />
        <Stack.Screen name='(auth)' options={{ title: 'Authorization' }} />
      </Stack>
      <BottomSheet
        enablePanDownToClose
        // snapPoints={['90%']}
        // enableDynamicSizing={false}
        // onClose={closeVideoSheet}
        // index={0}
        sheetRefAtom={videoSheetRefAtom}
      >
        <DemoVideo />
      </BottomSheet>
    </Provider>
  )
}

export default RootLayout
