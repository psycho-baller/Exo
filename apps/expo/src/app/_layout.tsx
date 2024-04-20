import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { Provider } from '@acme/app/provider';

import { TRPCProvider } from '~/utils/api';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const RootLayout = () => {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <TRPCProvider>
        {/*
          The Stack component displays the current page.
          It also allows you to configure your screens
        */}
        <Stack
          screenOptions={{
            // headerTransparent: true,
            headerShown: false,
            navigationBarColor: 'transparent',
          }}
        >
          <Stack.Screen name='(app)/(tabs)' options={{ title: 'Home' }} />
          <Stack.Screen name='(auth)' options={{ title: 'Authorization' }} />
        </Stack>
        <StatusBar />
      </TRPCProvider>
    </Provider>
  );
};

export default RootLayout;
