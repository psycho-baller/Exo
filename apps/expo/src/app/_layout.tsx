import { Stack } from 'expo-router'
import { setStatusBarTranslucent } from 'expo-status-bar'
import React, { useEffect } from 'react'

import { Provider } from '@rooots/app/provider'
import { Platform } from 'react-native'


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
        screenOptions={{
          // headerTransparent: true,
          headerShown: false,
          // navigationBarColor: 'transparent',
          // navigationBarHidden: true,
        }}
      >
        <Stack.Screen name='(app)/(tabs)' options={{ title: 'Home' }} />
        <Stack.Screen name='(auth)' options={{ title: 'Authorization' }} />
      </Stack>
    </Provider>
  )
}

export default RootLayout
