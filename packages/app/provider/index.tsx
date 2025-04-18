import type { TamaguiProviderProps } from '@rooots/ui'
import { CustomToast, ToastProvider } from '@rooots/ui'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from './safe-area'
import { TamaguiProvider } from './tamagui'
import { TamaguiThemeProvider } from './theme'
import { BottomSheetModalProvider } from './bottom-sheet-modal'
import { BackendProvider } from './backend';
import React from 'react';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {

  return (
    <TamaguiThemeProvider>
      <TamaguiProvider>
        <ToastProvider swipeDirection='horizontal' duration={6000} native={['mobile']}>
          <GestureHandlerRootView >
            <BackendProvider>
              <SafeAreaProvider >
                <BottomSheetModalProvider>
                  {/* <BLEProvider> */}
                  {children}
                  {/* </BLEProvider> */}
                </BottomSheetModalProvider>
                <CustomToast />
              </SafeAreaProvider>
            </BackendProvider>
            {/* <ToastViewport /> */}
          </GestureHandlerRootView>
        </ToastProvider>
      </TamaguiProvider>
    </TamaguiThemeProvider>
  )
}
