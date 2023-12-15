import { type GetProps,styled, YStack, View } from 'tamagui'

export const Page = styled(YStack, {
  name: 'Page',
  backgroundColor: 'red',
  style: {
    color: 'blue',
    backgroundColor: 'red',
  },
  flex: 1,
  className: 'Page',
})

export type PageProps = GetProps<typeof Page>
