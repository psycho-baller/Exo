import type React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { OnboardingButton } from '../../components';

// Import the image
const backgroundImage = require('../../assets/9-16-icon-zoomed-out.jpg');

interface OnboardingScreen1Props {
  onNext: () => void;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Deepen your relationships through meaningful conversations</Text>
            <Text style={styles.subtitle}>
              In a world of fleeting interactions, Exo empowers you to store meaningful conversations topics you'd like to have with your loved ones
            </Text>
            <OnboardingButton
              title="Show me how!!"
              onPress={onNext}
              style={styles.button}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 24,
    // paddingBottom: 4,
  },
  content: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    // marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    // marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',

  },
});
