import { Redirect } from 'expo-router';
import { useOnboarding, OnboardingFlow } from '@rooots/app';

export default function OnboardingScreen() {
  const { isOnboarded, completeOnboarding } = useOnboarding();

  // If onboarding is already completed, redirect to home
  if (isOnboarded) {
    return <Redirect href="/(tabs)/questions" />;
  }

  const handleOnboardingComplete = () => {
    completeOnboarding();
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
}
