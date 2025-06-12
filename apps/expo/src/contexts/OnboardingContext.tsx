import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'onboarding-storage',
});

type OnboardingContextType = {
  isOnboarded: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    // Check if onboarding was completed
    const onboarded = storage.getBoolean('isOnboarded') || false;
    setIsOnboarded(onboarded);
  }, []);

  const completeOnboarding = () => {
    storage.set('isOnboarded', true);
    setIsOnboarded(true);
  };

  const resetOnboarding = () => {
    storage.delete('isOnboarded');
    setIsOnboarded(false);
  };

  return (
    <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
