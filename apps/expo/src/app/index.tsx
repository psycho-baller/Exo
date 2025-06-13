import { Redirect } from 'expo-router'
import type { ComponentPropsWithoutRef, FC } from 'react'
import { useOnboarding } from "@rooots/app";
// import { usePushNotifications } from "@rooots/app/hooks/usePushNotifications";

// If I wanna have an AuthProvider instead: https://github.com/fredrikburmester/expo-router-3-tab-example-with-auth/blob/main/context/AuthProvider.tsx
interface Props extends ComponentPropsWithoutRef<'div'> { }
const Component: FC<Props> = (props) => {
  // const { expoPushToken, notification } = usePushNotifications();
  const { isOnboarded, resetOnboarding } = useOnboarding();

  if (!isOnboarded) {
    return <Redirect href='/(onboarding)/welcome' />
  }

  return <Redirect href='/(tabs)/questions' />
}

export default Component
