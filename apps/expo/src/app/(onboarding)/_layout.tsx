import { Stack, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View } from 'react-native';
import { useTheme, useThemeName } from '@rooots/ui';
import { BlurView, type ExperimentalBlurMethod } from 'expo-blur';
import { useState, useEffect } from 'react';

export default function OnboardingLayout() {
  const themeName = useThemeName();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const androidNavHeight = insets.bottom === 48 ? 30 : 0;
  const androidBottomInset = Platform.OS === 'android' ? androidNavHeight : 0;
  const [experimentalBlurMethod, setExperimentalBlurMethod] = useState<ExperimentalBlurMethod>('none');

  useEffect(() => {
    const timer = setTimeout(() => {
      setExperimentalBlurMethod('dimezisBlurView');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: androidBottomInset }]}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
          // headerBackground: () => (
          //   <BlurView
          //     intensity={60}
          //     experimentalBlurMethod={experimentalBlurMethod}
          //     tint={themeName === 'dark' ? 'systemThinMaterialDark' : 'systemThinMaterialLight'}
          //     style={StyleSheet.absoluteFill}
          //   />
          // ),
        }}
      >
        <Stack.Screen name="welcome" options={{ title: 'Welcome' }} />
        <Stack.Screen name="create-question" options={{ title: 'Create Question' }} />
        <Stack.Screen name="connect-to-person" options={{ title: 'Connect to Person' }} />
        <Stack.Screen name="connect-to-group" options={{ title: 'Connect to Group' }} />
        <Stack.Screen name="thanks" options={{ title: 'Thank You' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
