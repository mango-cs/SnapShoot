import { colors } from './colors';
import { textStyles, fontFamilies, fontSizes, fontWeights, lineHeights } from './typography';
import { spacing, componentSpacing, layout } from './spacing';

// Main theme object
export const theme = {
  colors,
  typography: {
    textStyles,
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
  },
  spacing,
  componentSpacing,
  layout,
} as const;

// Component-specific theme styles
export const componentThemes = {
  // Button themes
  button: {
    primary: {
      backgroundColor: colors.button.primary,
      color: colors.button.primaryText,
      borderRadius: layout.borderRadius.full,
      paddingHorizontal: componentSpacing.button.padding.medium.horizontal,
      paddingVertical: componentSpacing.button.padding.medium.vertical,
      ...textStyles.button.medium,
    },
    secondary: {
      backgroundColor: colors.button.secondary,
      color: colors.button.secondaryText,
      borderColor: colors.button.secondaryBorder,
      borderWidth: 1,
      borderRadius: layout.borderRadius.full,
      paddingHorizontal: componentSpacing.button.padding.medium.horizontal,
      paddingVertical: componentSpacing.button.padding.medium.vertical,
      ...textStyles.button.medium,
    },
  },
  
  // Card themes
  card: {
    default: {
      backgroundColor: colors.card.background,
      borderRadius: layout.borderRadius.lg,
      padding: componentSpacing.card.padding,
      shadowColor: colors.card.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: layout.shadow.elevation.small,
    },
    elevated: {
      backgroundColor: colors.card.background,
      borderRadius: layout.borderRadius.lg,
      padding: componentSpacing.card.padding,
      shadowColor: colors.card.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: layout.shadow.elevation.medium,
    },
  },
  
  // Input themes
  input: {
    default: {
      backgroundColor: colors.input.background,
      borderColor: colors.input.border,
      borderWidth: 1,
      borderRadius: layout.borderRadius.md,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      color: colors.input.text,
      ...textStyles.body.medium,
    },
    focused: {
      borderColor: colors.input.borderFocused,
      borderWidth: 2,
    },
  },
  
  // Navigation themes
  navigation: {
    tabBar: {
      backgroundColor: colors.navigation.background,
      borderTopWidth: 0,
      elevation: layout.shadow.elevation.medium,
      height: componentSpacing.navigation.bottomTabHeight,
      paddingBottom: spacing.xs,
    },
    header: {
      backgroundColor: colors.navigation.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  },
} as const;

// Utility functions for theme access
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = colors;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color path "${path}" not found`);
      return colors.primary.black;
    }
  }
  
  return value;
};

export const getSpacingValue = (key: keyof typeof spacing): number => spacing[key];

// Theme type exports
export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;

// Re-export all theme parts
export { colors } from './colors';
export { textStyles, fontFamilies, fontSizes, fontWeights } from './typography';
export { spacing, componentSpacing, layout } from './spacing';

// Default export
export default theme; 