import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, StyleSheet, View } from 'react-native'

export default function OnboardingLayout() {
  const insets = useSafeAreaInsets();
  const androidNavHeight = insets.bottom === 48 ? 30 : 0;
  const androidBottomInset = Platform.OS === 'android' ? androidNavHeight : 0;


  return (
    <View style={[styles.container, { paddingBottom: androidBottomInset }]}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
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
