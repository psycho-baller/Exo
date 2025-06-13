import type React from 'react';
import { StyleSheet, Linking, type ViewStyle } from 'react-native';
import { OnboardingLayout, OnboardingButton, OnboardingText } from './components';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts';

interface ThanksOnboardingScreenProps { }

const ThanksOnboardingScreen: React.FC<ThanksOnboardingScreenProps> = () => {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleGetStarted = () => {
    completeOnboarding();
    router.replace('/(tabs)/questions');
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <OnboardingLayout
      showOverlay
      style={styles.container}
      contentStyle={styles.content}
    >
      <OnboardingText variant="title" style={styles.title}>
        You're goated for trying Exo 🐐
      </OnboardingText>

      <OnboardingText variant="subtitle" style={styles.subtitle}>
        Building Exo started as a personal project to help me have better conversations with my friends and a partner that doesn't exist.
      </OnboardingText>

      <OnboardingText variant="subtitle" style={styles.subtitle}>
        Now I wanna help other people have better conversations with their loved ones. For that to happen, I need your help🥺
      </OnboardingText>

      <OnboardingText variant="subtitle" style={styles.subtitle}>

        PLEASE CONSIDER SUPPORTING THE PROJECT THROUGH ANY OF THE 3 BUTTONS BELOW IF YOU LIKE IT!
      </OnboardingText>


      {/* <OnboardingText style={styles.text}>
        • Found a bug or have a feature request? Let us know on GitHub!
      </OnboardingText>

      <OnboardingText style={styles.text}>
        • Want to support development? Consider making a donation.
      </OnboardingText> */}

      <OnboardingLayout.ButtonContainer style={styles.buttonContainer as ViewStyle}>
        <OnboardingButton
          title="Shape the future of Exo 💥"
          onPress={() => openLink('https://app.formbricks.com/s/cmbgfzsx80ut7sm01an3v7bz3')}
          style={styles.button as ViewStyle}
        />
        <OnboardingButton
          title="Star Exo on GitHub 🌟"
          onPress={() => openLink('https://github.com/psycho-baller/exo')}
          style={styles.button as ViewStyle}
        />
        <OnboardingButton
          title="Buy me a coffee ☕"
          onPress={() => openLink('https://ko-fi.com/ramimaalouf')}
          style={styles.button as ViewStyle}
        />
      </OnboardingLayout.ButtonContainer>
      <OnboardingButton
        title="TAKE ME INTO THE APP‼️"
        onPress={handleGetStarted}
        style={styles.footerButton as ViewStyle}
      />
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  text: {
    paddingBottom: 15,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
  },
  footerButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
});

export default ThanksOnboardingScreen;
