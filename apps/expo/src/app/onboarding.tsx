import { Redirect } from 'expo-router';
import { useOnboarding } from '@rooots/app/src/contexts/OnboardingContext';
import { OnboardingFlow } from '@rooots/app/src/screens/onboarding/OnboardingFlow';

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
