/**
 * Global design tokens for the app.
 * Colors, typography and layout values should be reused across screens.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#60a5fa';

export const Colors = {
  light: {
    text: '#111827',
    textSecondary: '#4b5563',
    textDisabled: '#9ca3af',
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#f8fafc',
    border: '#e5e7eb',
    icon: '#6b7280',
    tint: tintColorLight,
    primary: '#2563eb',
    secondary: '#60a5fa',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    textDisabled: '#6b7280',
    background: '#0f172a',
    surface: '#111827',
    card: '#111827',
    border: '#1f2937',
    icon: '#cbd5e1',
    tint: tintColorDark,
    primary: '#60a5fa',
    secondary: '#38bdf8',
    success: '#4ade80',
    warning: '#fbbf24',
    error: '#f87171',
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const FontSizes = {
  heading: 28,
  title: 22,
  subtitle: 18,
  body: 16,
  label: 14,
  caption: 12,
  button: 15,
};

export const Layout = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    small: 8,
    medium: 12,
    large: 16,
    pill: 999,
  },
  shadow: {
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 4,
    },
  },
};
