import type React from 'react';
import type { ReactNode } from 'react';
import { Text, StyleSheet, type StyleProp, type TextStyle } from 'react-native';

type Variant = 'title' | 'subtitle' | 'body' | 'caption';

type OnboardingTextProps = {
  children: ReactNode;
  variant?: Variant;
  style?: StyleProp<TextStyle>;
  align?: 'left' | 'center' | 'right';
  color?: string;
  numberOfLines?: number;
};

export const OnboardingText: React.FC<OnboardingTextProps> = ({
  children,
  variant = 'body',
  style,
  align = 'center',
  color,
  numberOfLines,
}) => {
  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseStyle = {
      ...styles.base,
      textAlign: align,
      color: color || getDefaultColor(),
    };

    switch (variant) {
      case 'title':
        return { ...baseStyle, ...styles.title };
      case 'subtitle':
        return { ...baseStyle, ...styles.subtitle };
      case 'caption':
        return { ...baseStyle, ...styles.caption };
      // case 'body':
      default:
        return { ...baseStyle, ...styles.body };
    }
  };

  const getDefaultColor = (): string => {
    switch (variant) {
      case 'title':
      case 'subtitle':
        return '#fff';
      default:
        return '#000';
    }
  };

  return (
    <Text style={[getTextStyle(), style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const styles = {
  base: {
    fontFamily: 'System',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
    opacity: 0.7,
  },
} as const;

export default OnboardingText;
