import HomeScreen from "@acme/app/features/home/screen";
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
          // headerShown: false,
          // headerTransparent: true,
          // headerStyle: {

        }}
      />
      <HomeScreen />
    </>
  )
}
