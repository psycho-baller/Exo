import React from 'react';
import { Linking, Alert, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { H3, Paragraph, YStack, Button } from 'tamagui';
import { exportQuestionsToMarkdown } from '../utils/exportQuestions';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Burnt from 'burnt';
import { LINKS } from '../utils/constants';
import { OnboardingButton } from '../features/onboarding/components/OnboardingButton';
import { api } from '@rooots/api/utils/trpc';

const openLink = (url: string) => {
  Linking.openURL(url).catch(err =>
    console.error('Failed to open URL:', err)
  );
};

export function AppDrawerContent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: people } = api.person.all.useQuery();
  const { data: questions } = api.question.all.useQuery();
  // const { resetOnboarding } = useOnboarding();

  const redoOnboarding = () => {
    // resetOnboarding();
    router.replace('/(onboarding)/welcome');
  };

  const handleContactPress = async () => {
    const email = 'rami.pb8@gmail.com';
    const subject = 'Exo App Support';
    const body = 'Hi Rami,\n\nI wanted to reach out about...';

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      Linking.openURL(url);
    } catch (err) {
      console.log('Error handling email action:', err);
      await Clipboard.setStringAsync(email);
      Burnt.toast({
        title: 'Email copied to clipboard!',
        preset: 'custom',
        icon: {
          ios: { name: 'envelope.fill', color: '' },
        },
        duration: 3,
      });
    }
  };

  const handleExport = async () => {
    if (!people || !questions) {
      Alert.alert('Error', 'Failed to load data. Please try again.');
      return;
    }

    console.log('Exporting questions...');
    console.log('People:', people);
    console.log('Questions:', questions);

    await exportQuestionsToMarkdown({ people, questions });
  };

  return (
    <YStack
      flex={1}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingHorizontal="$4"
      gap="$4"
    >
      <YStack gap="$2" paddingBottom="$6">
        <H3 color="$color">Exo</H3>
        <Paragraph color="$secondaryColor" size="$3">
          Hope you find value in this app 🙂
        </Paragraph>
      </YStack>

      <YStack gap="$2" paddingBottom="$4">
        <H3 color="$color" paddingBottom="$2">Help & Support</H3>
        <OnboardingButton
          title="🔄 Go through onboarding again"
          onPress={() => redoOnboarding()}
          size="small"
        />
        <OnboardingButton
          title="❓ How does this app work?"
          onPress={() => openLink(LINKS.YOUTUBE_TUTORIAL)}
          size="small"
        />
        <OnboardingButton
          title="✉️ Contact Exo Support"
          onPress={handleContactPress}
          size="small"
        />
        <OnboardingButton
          title="🐞 Create a bug report on GitHub"
          onPress={() => openLink(LINKS.GITHUB_ISSUES || LINKS.GITHUB_REPO)}
          size="small"
        />
        <OnboardingButton
          title="📜 Privacy Policy & Terms"
          onPress={() => openLink('https://getexo.vercel.app/terms')}
          size="small"
        />
        <OnboardingButton
          title="📤 Export All Questions"
          onPress={handleExport}
          size="small"
        />
      </YStack>

      {/* <YStack gap="$2" paddingBottom="$4">
        <H3 color="$color" paddingBottom="$2">Data</H3> */}
      {/* </YStack> */}

      <YStack gap="$2" paddingBottom="$4">
        <H3 color="$color" paddingBottom="$2">Support This Project</H3>
        <OnboardingButton
          title="💬 Share Feedback"
          onPress={() => openLink(LINKS.FEEDBACK_FORM)}
          size="small"
        />
        <OnboardingButton
          title="⭐ Star Exo on GitHub"
          onPress={() => openLink(LINKS.GITHUB_REPO)}
          size="small"
        />
        <OnboardingButton
          title="☕ Buy me a coffee"
          onPress={() => openLink(LINKS.KOFI_DONATION)}
          size="small"
        />
      </YStack>

      <YStack
        gap="$2"
        marginTop="auto"
        paddingTop="$4"
        borderTopWidth={1}
        borderColor="$secondaryColor"
      >
        <Paragraph size="$2" color="$secondaryColor" textAlign="center">
          Made with the ❤️ to connect by Rami Maalouf
        </Paragraph>
        <Paragraph size="$1" color="$secondaryColor" textAlign="center">
          v{require('../../../apps/expo/package.json').version}
        </Paragraph>
      </YStack>
    </YStack>
  );
}
