import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { tokens } from './tokens';

const fontConfig = {
  displayLarge: { fontFamily: 'System', fontWeight: '700' as const, fontSize: 28, letterSpacing: -0.5, lineHeight: 36 },
  displayMedium: { fontFamily: 'System', fontWeight: '700' as const, fontSize: 24, letterSpacing: -0.3, lineHeight: 32 },
  displaySmall: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 20, letterSpacing: 0, lineHeight: 28 },
  headlineLarge: { fontFamily: 'System', fontWeight: '700' as const, fontSize: 28, letterSpacing: -0.5, lineHeight: 36 },
  headlineMedium: { fontFamily: 'System', fontWeight: '700' as const, fontSize: 24, letterSpacing: -0.3, lineHeight: 32 },
  headlineSmall: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 20, letterSpacing: 0, lineHeight: 28 },
  titleLarge: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 20, letterSpacing: 0, lineHeight: 28 },
  titleMedium: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 18, letterSpacing: 0, lineHeight: 24 },
  titleSmall: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 16, letterSpacing: 0, lineHeight: 24 },
  labelLarge: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 12, letterSpacing: 0.5, lineHeight: 16 },
  labelMedium: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 12, letterSpacing: 0.5, lineHeight: 16 },
  labelSmall: { fontFamily: 'System', fontWeight: '600' as const, fontSize: 10, letterSpacing: 0.5, lineHeight: 14 },
  bodyLarge: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 16, letterSpacing: 0, lineHeight: 24 },
  bodyMedium: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 14, letterSpacing: 0, lineHeight: 20 },
  bodySmall: { fontFamily: 'System', fontWeight: '400' as const, fontSize: 12, letterSpacing: 0, lineHeight: 16 },
};

export const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    primary: tokens.colors.brand.primary,
    primaryContainer: tokens.colors.surface.subtle,
    secondary: tokens.colors.brand.secondary,
    secondaryContainer: tokens.colors.surface.subtle,
    tertiary: tokens.colors.brand.tertiary,
    tertiaryContainer: tokens.colors.surface.subtle,
    background: tokens.colors.surface.card,
    surface: tokens.colors.surface.card,
    surfaceVariant: tokens.colors.surface.subtle,
    outline: tokens.colors.border.default,
    error: tokens.colors.state.error,
    errorContainer: tokens.colors.state.errorSoft,
    onSurface: tokens.colors.text.primary,
    onSurfaceVariant: tokens.colors.text.secondary,
  },
  roundness: 3, 
};
