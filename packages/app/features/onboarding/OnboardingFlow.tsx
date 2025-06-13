import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../../contexts/OnboardingContext';

interface OnboardingFlowProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  children,
  onComplete
}) => {
  const router = useRouter();
  const { completeOnboarding } = useOnboarding();

  const handleComplete = () => {
    completeOnboarding();
    onComplete?.();
    router.replace('/(tabs)/questions');
  };

  return (
    <View style={styles.container}>
      {React.Children.map(children, child =>
        React.isValidElement<{ onComplete?: () => void }>(child)
          ? React.cloneElement(child, { onComplete: handleComplete })
          : child
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
