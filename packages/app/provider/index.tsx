import type { TamaguiProviderProps } from '@rooots/ui'
import { CustomToast, ToastProvider } from '@rooots/ui'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from './safe-area'
import { TamaguiProvider } from './tamagui'
import { TamaguiThemeProvider } from './theme'
import { BottomSheetModalProvider } from './bottom-sheet-modal'
import { BackendProvider } from './backend';
import { AnalyticsProvider } from './analytics'
import React from 'react';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {

  return (
    <AnalyticsProvider>
      <TamaguiThemeProvider>
        <TamaguiProvider>
          <SafeAreaProvider >
            <ToastProvider swipeDirection='horizontal' duration={6000} native={['mobile']}>
              <GestureHandlerRootView>
                <BackendProvider>
                  <BottomSheetModalProvider>
                    {/* <BLEProvider> */}
                    {children}
                    {/* </BLEProvider> */}
                  </BottomSheetModalProvider>
                </BackendProvider>
                <CustomToast />
                {/* <ToastViewport /> */}
              </GestureHandlerRootView>
            </ToastProvider>
          </SafeAreaProvider>
        </TamaguiProvider>
      </TamaguiThemeProvider>
    </AnalyticsProvider>
  )
}
