import type React from 'react';
import { ImageBackground, type ImageSourcePropType, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type OnboardingGifViewerProps = {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
};

export const OnboardingGifViewer: React.FC<OnboardingGifViewerProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'contain' as const,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ImageBackground
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default OnboardingGifViewer;
