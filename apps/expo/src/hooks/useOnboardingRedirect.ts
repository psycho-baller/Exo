import { usePathname } from 'expo-router';
import { useOnboarding } from '../contexts/OnboardingContext';

type RedirectPath = '/onboarding' | null;

export const useOnboardingRedirect = () => {
  const { isOnboarded } = useOnboarding();
  const pathname = usePathname();
  
  const requiresOnboarding = !isOnboarded && pathname !== '/onboarding';
  
  return {
    requiresOnboarding,
    redirectPath: (requiresOnboarding ? '/onboarding' : null) as RedirectPath
  };
};
