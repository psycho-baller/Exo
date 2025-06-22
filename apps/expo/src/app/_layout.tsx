import { Provider } from '@rooots/app/provider'
import DemoVideo from '@rooots/app/components/DemoVideo'
import { BottomSheet } from '@rooots/app/components/BottomSheet'
import { videoSheetRefAtom } from '@rooots/app/atoms/sheet'
import React from 'react';
import { useEffect, useState } from 'react';
import { OnboardingProvider } from '@rooots/app';
import DevToolsButton from '@rooots/app/components/DevTools/DevToolsButton';
import { Drawer } from 'expo-router/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { AppDrawerContent } from '@rooots/app/components/AppDrawerContent';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

const RootLayoutNav = () => {
  return (
    <OnboardingProvider>
      <Drawer
        initialRouteName="(tabs)"
        drawerContent={(props: DrawerContentComponentProps) => (
          <AppDrawerContent />
        )}
        screenOptions={{
          // headerTransparent: true,
          headerShown: false,
          // navigationBarColor: 'transparent',
          // navigationBarHidden: true,
        }}
      >
        <Drawer.Screen name='(tabs)' options={{ title: 'Home' }} />
        <Drawer.Screen name='(auth)' options={{ title: 'Authorization' }} />
        <Drawer.Screen name='(onboarding)' options={{ title: 'Onboarding' }} />
      </Drawer>
    </OnboardingProvider>
  );
}

export default function RootLayout() {
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
