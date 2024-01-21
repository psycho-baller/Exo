import { type GetProps, styled, Input } from 'tamagui'

export const UnstyledInput = styled(Input, {
  name: 'UnstyledInput',
  p: 0,
  borderWidth: 0,
  backgroundColor: 'transparent',
})

export type UnstyledInputProps = GetProps<typeof UnstyledInput>
// export type Page = withStaticProperties(Page, {
//   Props: GetProps<typeof Page>
// GetProps<typeof YStack>
