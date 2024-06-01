import type { TamaguiProviderProps } from '@acme/ui'
import { CustomToast, ToastProvider } from '@acme/ui'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from './safe-area'
import { TamaguiProvider } from './tamagui'
import { TamaguiThemeProvider } from './theme'
import { BottomSheetModalProvider } from './bottom-sheet-modal'
import { ExpoSQLiteProvider } from './expo-sqlite';
import { QueryClientProvider } from './query-client';
import { ToastViewport } from './toast-viewport';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiThemeProvider>
      <TamaguiProvider>
        <SafeAreaProvider>
          <ToastProvider swipeDirection='horizontal' duration={6000} native={['mobile']}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {/* <TRPCProvider> */}
              <QueryClientProvider>
                <ExpoSQLiteProvider>
                  <BottomSheetModalProvider>
                    {children}
                  </BottomSheetModalProvider>
                </ExpoSQLiteProvider>
              </QueryClientProvider>
              {/* </TRPCProvider> */}
              <CustomToast />
              {/* <ToastViewport /> */}
            </GestureHandlerRootView>
          </ToastProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </TamaguiThemeProvider>
  )
}
