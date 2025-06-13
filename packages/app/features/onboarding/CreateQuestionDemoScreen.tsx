import type React from 'react';
import { StyleSheet } from 'react-native';
import { OnboardingLayout, OnboardingButton, OnboardingText, OnboardingGifViewer } from './components';

// Import the GIF
const demoGif = require('../../assets/gifs/exo-onboarding-question.gif');

interface CreateQuestionDemoScreenProps {
  onNext: () => void;
}

export const CreateQuestionDemoScreen: React.FC<CreateQuestionDemoScreenProps> = ({ onNext }) => {
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
      <OnboardingText variant="title">Create Questions Easily</OnboardingText>
      <OnboardingText variant="subtitle">
        It couldn't be easier to create questions. Just type your question and add relevant details which we'll look at in the final 2 steps
      </OnboardingText>
      <OnboardingLayout.ButtonContainer>
        <OnboardingButton
          title="What else can I do? 👀"
          onPress={onNext}
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
    flex: 1,
    paddingBottom: 24,
  },

});

export default CreateQuestionDemoScreen;
