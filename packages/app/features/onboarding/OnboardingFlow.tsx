import type React from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen1 } from './OnboardingScreen1';
import { OnboardingScreen2 } from './OnboardingScreen2';
import { useState } from 'react';
// Import other screens as they're created
// import { OnboardingScreen3 } from './OnboardingScreen3';
// import { OnboardingScreen4 } from './OnboardingScreen4';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const totalScreens = 2; // Update this when adding more screens

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <OnboardingScreen1 onNext={handleNext} />;
      case 2:
        return <OnboardingScreen2 onNext={handleNext} />;
      // case 3:
      //   return <OnboardingScreen3 onNext={handleNext} />;
      // case 4:
      //   return <OnboardingScreen4 onNext={handleNext} />;
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
  },
});
