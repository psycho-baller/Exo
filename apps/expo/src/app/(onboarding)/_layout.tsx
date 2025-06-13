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
      <Stack.Screen name="welcome" options={{ title: 'Onboarding' }} />
      <Stack.Screen name="create-question" options={{ title: 'Create Question' }} />
    </Stack>
  );
}
