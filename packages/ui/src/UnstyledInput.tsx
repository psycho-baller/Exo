import { Input, styled } from 'tamagui'
import type { GetProps } from 'tamagui'

export const UnstyledInput = styled(Input, {
  name: 'UnstyledInput',
  color: '$color',
  placeholderTextColor: '$placeholder',
  p: 0,
  borderWidth: 0,
  backgroundColor: 'transparent',
})

export type UnstyledInputProps = GetProps<typeof UnstyledInput>
// export type Page = withStaticProperties(Page, {
//   Props: GetProps<typeof Page>
// GetProps<typeof YStack>
