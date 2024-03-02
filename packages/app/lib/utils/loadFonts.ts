import { Platform } from 'react-native';
import { useFonts } from 'expo-font';

export function loadFonts() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  return loaded;
}
