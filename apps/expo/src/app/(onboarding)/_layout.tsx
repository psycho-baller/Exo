import { Stack } from 'expo-router';
import { OnboardingProvider } from '@rooots/app';

export default function OnboardingLayout() {
  return (
    <Stack
      // initialRouteName="welcome"
      screenOptions={{
        // headerTransparent: true,
        headerShown: false,
        // navigationBarColor: 'transparent',
        // navigationBarHidden: true,
      }}
    >
      <Stack.Screen name="welcome" options={{ title: 'Welcome' }} />
      <Stack.Screen name="create-question" options={{ title: 'Create Question' }} />
      <Stack.Screen name="connect-to-person" options={{ title: 'Connect to Person' }} />
      <Stack.Screen name="connect-to-group" options={{ title: 'Connect to Group' }} />
      <Stack.Screen name="thanks" options={{ title: 'Thank You' }} />
    </Stack>
  );
}
