import type React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { OnboardingButton } from '../../components';

interface OnboardingScreen1Props {
  onNext: () => void;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/1200/2400' }} // Placeholder image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome to Our App</Text>
            <Text style={styles.subtitle}>
              Discover amazing features that will make your life easier and more enjoyable.
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
    paddingBottom: 48,
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
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
  },
});
