import { Redirect } from 'expo-router'
import type { ComponentPropsWithoutRef, FC } from 'react'

// If I wanna have an AuthProvider instead: https://github.com/fredrikburmester/expo-router-3-tab-example-with-auth/blob/main/context/AuthProvider.tsx
interface Props extends ComponentPropsWithoutRef<'div'> { }

const Component: FC<Props> = (props) => {
  const { } = props

  return <Redirect href='/(tabs)/questions' />
}

export default Component
