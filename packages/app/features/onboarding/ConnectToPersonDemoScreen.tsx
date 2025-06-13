import type React from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingLayout, OnboardingButton, OnboardingText, OnboardingGifViewer } from './components';
import { useRouter } from 'expo-router';

// Import the GIF - you'll need to add the actual GIF file to your assets
const demoGif = require('../../assets/gifs/exo-onboarding-person-no-border.gif');

interface ConnectToPersonDemoScreenProps {
}

const ConnectToPersonDemoScreen: React.FC<ConnectToPersonDemoScreenProps> = () => {
  const router = useRouter();

  return (
    <OnboardingLayout
      showOverlay
      style={styles.container}
      contentStyle={styles.content}
    >
      <OnboardingGifViewer
        source={demoGif}
        containerStyle={styles.gifContainer}
        resizeMode="contain"
      />
      <OnboardingText variant="title">Connect any question with any person!</OnboardingText>
      <OnboardingText variant="subtitle">
        Simply type @ and select or create the person you want to connect that question to
      </OnboardingText>
      <OnboardingLayout.ButtonContainer>
        <OnboardingButton
          title="What about groups? 👥"
          onPress={() => {
            router.push('/(onboarding)/connect-to-group');
          }}
        />
      </OnboardingLayout.ButtonContainer>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  gifContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
});

export default ConnectToPersonDemoScreen;
