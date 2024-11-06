import { Redirect } from 'expo-router'
import type { ComponentPropsWithoutRef, FC } from 'react'
// import { usePushNotifications } from "@acme/app/hooks/usePushNotifications";

// If I wanna have an AuthProvider instead: https://github.com/fredrikburmester/expo-router-3-tab-example-with-auth/blob/main/context/AuthProvider.tsx
interface Props extends ComponentPropsWithoutRef<'div'> { }
const Component: FC<Props> = (props) => {
  // const { expoPushToken, notification } = usePushNotifications();
  return <Redirect href='/(app)/(tabs)/questions' />
}

export default Component
