import { type GetProps,styled, YStack } from 'tamagui'

export const Page = styled(YStack, {
  name: 'Page',
  // flex: 1,
  fullscreen: true,
  backgroundColor: '$background',
  // style: {
  //   color: '#fff',
  // },
})

export type PageProps = GetProps<typeof Page>
