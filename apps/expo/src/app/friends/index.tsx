import HomeScreen from "@acme/app/features/friends/screen";
import { Button, useTheme, Text } from "@acme/ui";
import { Stack } from 'expo-router'

export default function Screen() {
  // const theme = useTheme()
  return (
    <>
      <Stack.Screen
        // name="Home"
        options={{
          // headerStatusBarHeight:0,
          title: 'Friends',
          // headerShown: false,
          headerStyle: {
            // backgroundColor: '$primary',
            // height: 100,
          },
          // I can have sort, profile, archive, and title
          // header: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     color="#0f0"

          //   />
          // ),
          // headerTitle: props => <Text color='blue' {...props}>hi</Text>, 
          // headerRight: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     color="#0f0"
          //   />
          // ),
          // headerTransparent: true,
          // headerStyle: {
        }}
      />
      <HomeScreen />
    </>
  )
}