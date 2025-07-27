import { Platform } from 'react-native';

// Font families
export const fontFamilies = {
  primary: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'System',
  }),
  secondary: Platform.select({
    ios: 'Poppins',
    android: 'Poppins',
    default: 'System',
  }),
  system: Platform.select({
    ios: 'San Francisco',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

// Font weights
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const;

// Font sizes
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Line heights
export const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 42,
  '4xl': 48,
  '5xl': 60,
} as const;

// Text styles
export const textStyles = {
  // Display styles
  display: {
    large: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights['5xl'],
    },
    medium: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights['4xl'],
    },
    small: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights['3xl'],
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights['3xl'],
    },
    h2: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights['2xl'],
    },
    h3: {
      fontFamily: fontFamilies.secondary,
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.xl,
    },
    h4: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.lg,
    },
    h5: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.base,
    },
    h6: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.sm,
    },
  },
  
  // Body styles
  body: {
    large: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.lg,
    },
    medium: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.base,
    },
    small: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.sm,
    },
  },
  
  // Label styles
  label: {
    large: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.base,
    },
    medium: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.sm,
    },
    small: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.xs,
    },
  },
  
  // Caption styles
  caption: {
    large: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.sm,
    },
    medium: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.xs,
    },
  },
  
  // Button styles
  button: {
    large: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.lg,
    },
    medium: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.base,
    },
    small: {
      fontFamily: fontFamilies.primary,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      lineHeight: lineHeights.sm,
    },
  },
} as const;

// Type exports
export type FontFamilyKeys = keyof typeof fontFamilies;
export type FontWeightKeys = keyof typeof fontWeights;
export type FontSizeKeys = keyof typeof fontSizes;
export type LineHeightKeys = keyof typeof lineHeights;
export type TextStyleKeys = keyof typeof textStyles; 