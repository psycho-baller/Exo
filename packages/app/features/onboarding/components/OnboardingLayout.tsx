import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

type OnboardingLayoutProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  backgroundImage?: React.ReactElement;
  showOverlay?: boolean;
};

// Button container component
const ButtonContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.buttonContent, style]}>
      {children}
    </View>
  );
};

const OnboardingLayout = ({
  children,
  style,
  contentStyle,
  buttonContainerStyle,
  backgroundImage,
  showOverlay = false,
}: OnboardingLayoutProps) => {
  return (
    <View style={[styles.container, style]}>
      {backgroundImage && (
        <View style={styles.backgroundContainer}>
          {backgroundImage}
          {showOverlay && <View style={styles.overlay} />}
        </View>
      )}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
      <View style={[styles.buttonContainer, buttonContainerStyle]} />
    </View>
  );
};

// Attach ButtonContainer as a static property
OnboardingLayout.ButtonContainer = ButtonContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 18,
  },
  buttonContent: {
    width: '100%',
  },
});

export default OnboardingLayout;
