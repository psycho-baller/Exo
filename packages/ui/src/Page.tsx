import { type GetProps,styled, YStack } from 'tamagui'

export const Page = styled(YStack, {
  name: 'Page',
  // flex: 1,
  fullscreen: true,
})

export type PageProps = GetProps<typeof Page>
// export type Page = withStaticProperties(Page, {
//   Props: GetProps<typeof Page>
// GetProps<typeof YStack>
