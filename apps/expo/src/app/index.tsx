import { Stack } from 'expo-router';

import HomeScreen from '@acme/app/features/questions/screen';
import { Button, Text, useTheme } from '@acme/ui';

export default function Screen() {
  const theme = useTheme();
  return (
    <>
      <Stack.Screen
        // name="Home"
        options={{
          // headerStatusBarHeight:0,
          title: 'Home',
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
  );
}
