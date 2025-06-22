import type React from 'react';
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TouchableOpacityProps, type TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
}

const SIZE_STYLES = {
  small: {
    paddingVertical: 10,
    fontSize: 14,
    marginTop: 8,
  },
  medium: {
    paddingVertical: 14,
    fontSize: 16,
    marginTop: 12,
  },
  large: {
    paddingVertical: 16,
    fontSize: 18,
    marginTop: 20,
  },
} as const;

export const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  size = 'large',
  ...props
}) => {
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.large;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { marginTop: sizeStyle.marginTop },
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <LinearGradient
        colors={['#D4FF9C', '#9EF9FE']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[
          styles.gradient,
          { paddingVertical: sizeStyle.paddingVertical },
        ]}
      >
        <Text style={[
          styles.buttonText,
          { fontSize: sizeStyle.fontSize },
          textStyle,
        ]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingButton;
