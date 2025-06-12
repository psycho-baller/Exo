import type React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import { useOnboarding } from '../../contexts/OnboardingContext';

const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const { completeOnboarding } = useOnboarding();

  const handleNext = () => {
    if (currentScreen < 3) {
      setCurrentScreen(currentScreen + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <OnboardingScreen1 onNext={handleNext} />;
      case 2:
        return <OnboardingScreen2 onNext={handleNext} onSkip={handleSkip} />;
      case 3:
        return <OnboardingScreen3 onNext={handleNext} onSkip={handleSkip} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default OnboardingFlow;
