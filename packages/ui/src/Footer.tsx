import { Footer, View, XStack, Button } from "tamagui";
import type { GetProps } from "tamagui"
import { BlurView } from 'expo-blur';
import { Children } from "react";

interface Props extends GetProps<typeof View> {
  stackProps?: GetProps<typeof XStack>
  blurIntensity?: number
}

export const FloatingFooter = (props: Props) => {
  const { children, stackProps, blurIntensity=0,...rest } = props;
  return (
    <Footer position="absolute" l={20} r={20} b={20} zIndex={1} {...rest}>
      <BlurView intensity={blurIntensity} style={{borderRadius:999, padding: 12, overflow:"hidden"}} >
        <XStack space jc="space-evenly" px={0} ai="center" {...stackProps}>
          {children}
        </XStack>
      </BlurView>
    </Footer>
  );
}
