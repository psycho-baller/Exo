import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Provider } from '@acme/app/provider';

import { TRPCProvider } from '~/utils/api';

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
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
