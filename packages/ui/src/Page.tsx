import { styled, YStack } from 'tamagui';
import type { GetProps } from 'tamagui';

export const Page = styled(YStack, {
  name: 'Page',
  // flex: 1,
  paddingHorizontal: '$3',
  fullscreen: true,
  backgroundColor: '$background',
  // style: {
  //   color: '#fff',
  // },
});

export type PageProps = GetProps<typeof Page>;
