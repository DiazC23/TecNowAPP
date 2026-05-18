import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'heading' | 'subtitle' | 'body' | 'caption' | 'button' | 'defaultSemiBold' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'heading' ? styles.heading : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'button' ? styles.button : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: FontSizes.body,
    lineHeight: 24,
  },
  body: {
    fontSize: FontSizes.body,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: FontSizes.body,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: FontSizes.heading,
    lineHeight: 36,
    fontWeight: '800',
  },
  heading: {
    fontSize: FontSizes.title,
    lineHeight: 32,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: FontSizes.subtitle,
    lineHeight: 26,
    fontWeight: '600',
  },
  caption: {
    fontSize: FontSizes.caption,
    lineHeight: 18,
    color: Colors.dark.textSecondary,
  },
  button: {
    fontSize: FontSizes.button,
    lineHeight: 22,
    fontWeight: '700',
  },
  link: {
    lineHeight: 24,
    fontSize: FontSizes.body,
    color: Colors.light.primary,
  },
});
