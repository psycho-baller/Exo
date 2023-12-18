import { Footer, XStack } from "tamagui";
import type { GetProps } from "tamagui"

export const FloatingFooter = (props: GetProps<typeof Footer>) => {
  const { children, ...rest } = props;
  return (
    <Footer position="absolute" b={0} zIndex={1} p={18} {...rest}>
      <XStack space>
        {children}
      </XStack>
    </Footer>
  );
}
