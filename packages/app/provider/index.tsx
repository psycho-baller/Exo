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
import { ExpoDrizzleStudio } from './expo-drizzle-studio';
import { useEffect } from 'react';
import { getDeviceId } from '@acme/api/utils/device';
import { ensureUserExistsInDB } from '@acme/api/src/queries/user';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  useEffect(() => {
    void (async () => {
      const deviceId = await getDeviceId();
      await ensureUserExistsInDB(deviceId);
    })();

  }, []);

  return (
    <TamaguiThemeProvider>
      <TamaguiProvider>
        <SafeAreaProvider>
          <ToastProvider swipeDirection='horizontal' duration={6000} native={['mobile']}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              {/* <TRPCProvider> */}
              <QueryClientProvider>
                <ExpoSQLiteProvider>
                  <ExpoDrizzleStudio>
                    <BottomSheetModalProvider>
                      {children}
                    </BottomSheetModalProvider>
                  </ExpoDrizzleStudio>
                </ExpoSQLiteProvider>
              </QueryClientProvider>
              {/* </TRPCProvider> */}
              <CustomToast />
              {/* <ToastViewport /> */}
            </GestureHandlerRootView>
          </ToastProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </TamaguiThemeProvider >
  )
}
