import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

type OnboardingContextType = {
  isOnboarded: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

const storage = new MMKV();
const ONBOARDING_KEY = 'onboarding_completed';

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Load onboarding status from storage
    const savedStatus = storage.getBoolean(ONBOARDING_KEY);
    if (savedStatus !== undefined) {
      setIsOnboarded(savedStatus);
    }
  }, []);

  const completeOnboarding = () => {
    storage.set(ONBOARDING_KEY, true);
    setIsOnboarded(true);
  };

  const resetOnboarding = () => {
    storage.delete(ONBOARDING_KEY);
    setIsOnboarded(false);
  };

  return (
    <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
