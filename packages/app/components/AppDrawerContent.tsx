import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, H2, H3, H4, Image, Paragraph, XStack, YStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LINKS } from '../utils/constants';

const openLink = (url: string) => {
  // Using expo-linking to open URLs
  // This will be handled by the OS to open in default browser
  window.open(url, '_blank');
};

export function AppDrawerContent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <YStack flex={1} paddingTop={insets.top} paddingBottom={insets.bottom} paddingHorizontal="$4" backgroundColor="$background" gap="$4">
      <YStack gap="$2" marginBottom="$4">
        <H3>Exo</H3>
        <Paragraph theme="alt1" size="$3">
          Connect deeper through meaningful conversations
        </Paragraph>
      </YStack>

      <YStack flex={1} gap="$3">
        <Button
          size="$4"
          themeInverse
          onPress={() => router.push('/(tabs)')}
        >
          Home
        </Button>
        <Button
          size="$4"
          themeInverse
          onPress={() => router.push('/people')}
        >
          People
        </Button>
        <Button
          size="$4"
          themeInverse
          onPress={() => router.push('/settings')}
        >
          Settings
        </Button>
      </YStack>

      <YStack gap="$3" marginBottom="$4">
        <H4>Support the Project</H4>
        <Button
          size="$3"
          onPress={() => openLink(LINKS.FEEDBACK_FORM)}
          theme="gray"
          chromeless
          justifyContent="flex-start"
        >
          💬 Share Feedback
        </Button>
        <Button
          size="$3"
          onPress={() => openLink(LINKS.GITHUB_REPO)}
          theme="gray"
          chromeless
          justifyContent="flex-start"
        >
          ⭐ Star on GitHub
        </Button>
        <Button
          size="$3"
          onPress={() => openLink(LINKS.KOFI_DONATION)}
          theme="gray"
          chromeless
          justifyContent="flex-start"
        >
          ☕ Buy me a coffee
        </Button>
      </YStack>

      <YStack gap="$2" marginTop="auto" paddingTop="$4" borderTopWidth={1} borderColor="$borderColor">
        <Paragraph size="$1" theme="alt2" textAlign="center">
          Made with ❤️ by the Exo team
        </Paragraph>
        <Paragraph size="$1" theme="alt2" textAlign="center">
          v{require('../../../apps/expo/package.json').version}
        </Paragraph>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
