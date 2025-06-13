import type React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { OnboardingButton } from '../../components';

// Import the GIF
const demoGif = require('../../assets/gifs/exo-onboarding-question.gif');

interface CreateQuestionDemoScreenProps {
  onNext: () => void;
}

export const CreateQuestionDemoScreen: React.FC<CreateQuestionDemoScreenProps> = ({ onNext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.gifContainer}>
          <ImageBackground
            source={demoGif}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>Create Questions Easily</Text>
          <Text style={styles.subtitle}>
            It couldn't be easier to create questions. Just type your question and add relevant details which we'll look at in the final 2 steps
          </Text>
          <OnboardingButton
            title="What else can I do? 👀"
            onPress={onNext}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  gifContainer: {
    flex: 1,
  },
  gif: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 24,
    paddingBottom: 30,
    // backgroundColor: '#fff',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    width: '100%',
  },
});

export default CreateQuestionDemoScreen;
