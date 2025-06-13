import type React from 'react';
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OnboardingButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, style]}
      activeOpacity={0.8}
      {...props}
    >
      <LinearGradient
        colors={['#D4FF9C', '#9EF9FE']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingButton;
