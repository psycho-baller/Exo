import type React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import OnboardingButton from '../../components/OnboardingButton';

interface OnboardingScreen1Props {
  onNext: () => void;
}

const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onNext }) => {
  return (
    <ImageBackground
      source={require('../../assets/onboarding-bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.description}>
            Discover amazing features that will make your life easier and more productive.
          </Text>
          <OnboardingButton
            title="Show me how!!"
            onPress={onNext}
            style={styles.button}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  button: {
    width: '80%',
  },
});

export default OnboardingScreen1;
