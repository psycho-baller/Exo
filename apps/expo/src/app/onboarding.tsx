import { Redirect, useRouter } from 'expo-router';
import { useOnboarding } from '../contexts/OnboardingContext';
import OnboardingFlow from '../screens/onboarding/OnboardingFlow';

export default function OnboardingScreen() {
  const { isOnboarded } = useOnboarding();
  const router = useRouter();
  
  // If onboarding is already completed, redirect to home
  if (isOnboarded) {
    return <Redirect href="/(tabs)" />;
  }

  const handleOnboardingComplete = () => {
    // Navigate to home after onboarding is complete
    router.replace({
      pathname: '/(tabs)',
      // @ts-ignore - Workaround for expo-router type issue
      params: { from: 'onboarding' }
    });
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
}
