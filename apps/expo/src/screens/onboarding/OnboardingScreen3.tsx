import type React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import OnboardingButton from '../../components/OnboardingButton';

interface OnboardingScreen3Props {
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({ onNext, onSkip }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/onboarding-2.gif')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Powerful Features</Text>
          <Text style={styles.description}>
            Unlock powerful features that will help you achieve your goals faster and more efficiently.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <OnboardingButton
            title="Next"
            onPress={onNext}
          />
          <Text style={styles.skipText} onPress={onSkip}>
            Skip
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  skipText: {
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
});

export default OnboardingScreen3;
