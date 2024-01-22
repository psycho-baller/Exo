import type { TamaguiProviderProps} from '@acme/ui';
import { CustomToast, TamaguiProvider, ToastProvider } from '@acme/ui'
import { useColorScheme } from 'react-native'
import { loadFonts } from "../lib/loadFonts"
import { ToastViewport } from './ToastViewport'

import config from '../tamagui.config'
import { useEffect } from 'react';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  const loaded = loadFonts()
  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider
      config={config}
      disableInjectCSS
      defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // 'mobile'
          ]
        }
      >
        {children}
        <CustomToast />
        <ToastViewport />
       </ToastProvider>
     </TamaguiProvider>
  )
}
