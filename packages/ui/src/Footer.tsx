import { BlurView } from 'expo-blur'
import { Button, Footer, useThemeName, type View, XStack } from 'tamagui'
import type { GetProps } from 'tamagui'

interface Props extends GetProps<typeof View> {
  stackProps?: GetProps<typeof XStack>
  blurIntensity?: number
}

export const FloatingFooter = (props: Props) => {
  const { children, stackProps, blurIntensity = 0, ...rest } = props
  const themeName = useThemeName()
  // https://www.youtube.com/watch?v=w9gPW_cXWHo
  return (
    <Footer position='absolute' l={20} r={20} b={27.5} zIndex={1} {...rest}>
      <BlurView
        intensity={blurIntensity}
        tint={themeName === 'dark' ? 'systemThinMaterialDark' : 'systemThinMaterialLight'}
        style={{ borderRadius: 999, padding: 16, overflow: 'hidden' }}
      >
        <XStack gap={35} justifyContent='space-evenly' px={0} alignItems='center' {...stackProps}>
          {children}
        </XStack>
      </BlurView>
    </Footer>
  )
}
