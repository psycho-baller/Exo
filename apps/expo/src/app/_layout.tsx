import { router, Stack } from 'expo-router'
import { Provider } from '@rooots/app/provider'
import DemoVideo from '@rooots/app/components/DemoVideo'
import { BottomSheet } from '@rooots/app/components/BottomSheet'
import { videoSheetRefAtom } from '@rooots/app/atoms/sheet'
import React from 'react';
import { Redirect, usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { OnboardingProvider, useOnboarding } from '@rooots/app';
import DevToolsButton from '@rooots/app/components/DevTools/DevToolsButton';
import { View } from 'react-native'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

const RootLayoutNav = () => {
  const router = useRouter();
  const { isOnboarded, resetOnboarding } = useOnboarding();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // useEffect(() => {
  //   console.log('Onboarding not completed!!!!!!!!!!', isOnboarded, pathname);
  //   resetOnboarding();
  //   // Handle initial navigation based on onboarding status
  //   // If not onboarded and not on an onboarding screen, redirect to welcome
  //   if (!isOnboarded && !pathname.startsWith('/(onboarding)')) {
  //     router.replace('/(onboarding)/welcome');
  //   }
  //   // If onboarded and on an onboarding screen, redirect to questions
  //   else if (isOnboarded && pathname.startsWith('/(onboarding)')) {
  //     router.replace('/(tabs)/questions');
  //   }

  //   // Mark that we've finished the initial auth check
  //   setIsCheckingAuth(false);
  // }, [isOnboarded, pathname, router]);

  // // Show nothing while checking auth state to prevent flash of wrong screen
  // if (isOnboarded === undefined || isCheckingAuth) {
  //   return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  // }


  return (
    <OnboardingProvider>
      <Stack
        initialRouteName="(onboarding)"
        screenOptions={{
          // headerTransparent: true,
          headerShown: false,
          // navigationBarColor: 'transparent',
          // navigationBarHidden: true,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ title: 'Home' }} />
        <Stack.Screen name='(auth)' options={{ title: 'Authorization' }} />
        <Stack.Screen name='(onboarding)' options={{ title: 'Onboarding' }} />
      </Stack>
    </OnboardingProvider>
  );
}

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

  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading the app
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <OnboardingProvider>
      <Provider>
        <RootLayoutNav />
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
        <DevToolsButton />
      </Provider>
    </OnboardingProvider>
  )
}

export default RootLayout
