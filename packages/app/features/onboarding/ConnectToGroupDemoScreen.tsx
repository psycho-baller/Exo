import type React from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingLayout, OnboardingButton, OnboardingText, OnboardingGifViewer } from './components';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts';

// Import the GIF - you'll need to add the actual GIF file to your assets
const demoGif = require('../../assets/gifs/exo-onboarding-group-no-border.gif');

interface ConnectToGroupDemoScreenProps {
}

const ConnectToGroupDemoScreen: React.FC<ConnectToGroupDemoScreenProps> = () => {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleComplete = () => {
    completeOnboarding();
    router.replace('/(tabs)/questions');
  };

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
      <OnboardingText variant="title">
        Connect any question with any group!
      </OnboardingText>
      <OnboardingText variant="subtitle">
        Simply type @@ and select or create the group you want to connect that question to
      </OnboardingText>
      <OnboardingLayout.ButtonContainer>
        <OnboardingButton
          title="Take me into the app already!"
          onPress={handleComplete}
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

export default ConnectToGroupDemoScreen;
