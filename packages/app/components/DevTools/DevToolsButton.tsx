import { Button, XStack } from '@rooots/ui';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboarding } from '../../contexts/OnboardingContext';

// Only include this component in development builds
const DevToolsButton = () => {
  const insets = useSafeAreaInsets();
  const { resetOnboarding } = useOnboarding();

  const clearOnboardingData = useCallback(() => {
    Alert.alert(
      'Clear Onboarding Data',
      'Are you sure you want to clear all onboarding data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            resetOnboarding();
            Alert.alert('Success', 'Onboarding data has been cleared.');
          },
        },
      ],
      { cancelable: true }
    );
  }, [resetOnboarding]);

  // Only render in development
  if (__DEV__ === false) {
    return null;
  }

  return (
    <XStack
      position="absolute"
      right={16}
      bottom={Math.max(insets.bottom, 16) + 60} // Position above the tab bar
      zIndex={1000}
      opacity={0.7}
      hoverStyle={{ opacity: 1 }}
    >
      <Button
        size="$3"
        circular
        onPress={clearOnboardingData}
        backgroundColor="$red9"
        color="white"
        pressStyle={{ opacity: 0.8 }}
        elevation="$0.5"
      >
        🛠️
      </Button>
    </XStack>
  );
};

export default DevToolsButton;
