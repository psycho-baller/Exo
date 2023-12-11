import type { TamaguiProviderProps} from '@acme/ui';
import { CustomToast, TamaguiProvider, ToastProvider } from '@acme/ui'
import { useColorScheme } from 'react-native'

import { ToastViewport } from './ToastViewport'
import { TRPCProvider } from './TRPCProvider'

import config from '../tamagui.config'
import React from 'react'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    // <TamaguiProvider
    //   config={config}
    //   disableInjectCSS
    //   defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
    //   {...rest}
    // >
    //   <ToastProvider
    //     swipeDirection="horizontal"
    //     duration={6000}
    //     native={
    //       [
    //         /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
    //         // 'mobile'
    //       ]
    //     }
    //   >
        <TRPCProvider>
          {children}
        </TRPCProvider>

    //     <CustomToast />
    //     <ToastViewport />
    //   </ToastProvider>
    // </TamaguiProvider>
  )
}
