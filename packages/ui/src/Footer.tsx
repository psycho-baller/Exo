import { Platform, StyleSheet, View } from 'react-native'
import { Button, Footer, useThemeName, XStack } from 'tamagui'
import type { GetProps } from 'tamagui'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'

// Use require for BlurView to avoid type issues in JSX
const NativeBlurView = Platform.OS !== 'web' ? require('expo-blur').BlurView : View

interface Props extends GetProps<typeof Footer> {
  stackProps?: GetProps<typeof XStack>
  blurIntensity?: number
}

export const FloatingFooter = (props: Props) => {
  const { children, stackProps, blurIntensity = 60, ...rest } = props
  const themeName = useThemeName()
  const insets = useSafeAreaInsets()
  const androidNavHeight = insets.bottom === 48 ? 48 : 12
  const bottomInset = Platform.OS === 'android' ? androidNavHeight : 15
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState('none')

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperimentalBlurMethod('dimezisBlurView')
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const blurContent = (
    <XStack gap={35} justifyContent='space-evenly' alignItems='center' {...stackProps}>
      {children}
    </XStack>
  )

  return (
    <Footer
      style={[
        {
          position: 'absolute',
          left: 7.5,
          right: 7.5,
          bottom: 10 + bottomInset,
          zIndex: 1,
          borderRadius: 999,
          overflow: 'hidden',
        },
        rest.style,
      ]}
      {...rest}
    >
      <NativeBlurView
        intensity={blurIntensity}
        experimentalBlurMethod={experimentalBlurMethod}
        tint={themeName === 'dark' ? 'systemThinMaterialDark' : 'systemThinMaterialLight'}
        style={{ borderRadius: 999, padding: 16, overflow: 'hidden', backgroundColor: Platform.OS === 'web' ? (themeName === 'dark' ? 'rgba(30,30,30,0.7)' : 'rgba(255,255,255,0.7)') : undefined }}
      >
        {blurContent}
      </NativeBlurView>
    </Footer>
  )
}
