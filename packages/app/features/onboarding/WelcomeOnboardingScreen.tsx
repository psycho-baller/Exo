import type React from 'react';
import { ImageBackground, type ImageSourcePropType, StyleSheet, View } from 'react-native';
import { OnboardingLayout, OnboardingButton, OnboardingText } from './components';

// Import the image
const backgroundImage = require('../../assets/9-16-icon-zoomed-out.jpg') as ImageSourcePropType;

interface WelcomeOnboardingScreenProps {
  onNext: () => void;
}

export const WelcomeOnboardingScreen: React.FC<WelcomeOnboardingScreenProps> = ({ onNext }) => {
  return (
    <OnboardingLayout
      backgroundImage={
        <ImageBackground
          source={backgroundImage}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      }
      showOverlay
      contentStyle={styles.content}
    >
      <OnboardingText variant="title">
        Deepen your relationships through meaningful conversations
      </OnboardingText>
      <OnboardingText variant="subtitle">
        In a world of fleeting interactions, Exo empowers you to store meaningful conversations topics you'd like to have with your loved ones
      </OnboardingText>
      <OnboardingLayout.ButtonContainer>
        <OnboardingButton
          title="Show me how!!"
          onPress={onNext}
          style={styles.button}
        />
      </OnboardingLayout.ButtonContainer>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  button: {
    width: '100%',
  },
});
