import type { TamaguiProviderProps } from '@acme/ui'
import { CustomToast, ToastProvider } from '@acme/ui'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SafeAreaProvider } from './safe-area'
import { TamaguiProvider } from './tamagui'
import { TamaguiThemeProvider } from './theme'
import { ToastViewport } from './toast-viewport'
import { BottomSheetModalProvider } from './bottom-sheet-modal'
import { TRPCProvider } from './trpc';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiThemeProvider>
      <TamaguiProvider>
        <SafeAreaProvider>
          <ToastProvider swipeDirection='horizontal' duration={6000} native={['mobile']}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <TRPCProvider>
                <BottomSheetModalProvider>
                  {children}
                </BottomSheetModalProvider>
              </TRPCProvider>
              <CustomToast />
              {/* <ToastViewport /> */}
            </GestureHandlerRootView>
          </ToastProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </TamaguiThemeProvider>
  )
}
