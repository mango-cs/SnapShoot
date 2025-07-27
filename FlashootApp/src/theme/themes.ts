// Theme types
export type ThemeMode = 'light' | 'dark';

// Base color definitions
const baseColors = {
  // Brand colors (consistent across themes)
  brand: {
    primary: '#FF0000',
    secondary: '#CC0000',
  },
  
  // Status colors (consistent across themes)
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const;

// Dark theme colors
export const darkTheme = {
  mode: 'dark' as ThemeMode,
  colors: {
    ...baseColors,
    
    // Primary colors
    primary: {
      red: '#FF0000',
      black: '#000000',
      white: '#FFFFFF',
    },
    
    // Background colors
    background: {
      primary: '#000000',
      secondary: '#1A1A1A',
      tertiary: '#404040',
      card: '#1A1A1A',
      overlay: 'rgba(0, 0, 0, 0.7)',
      modal: '#1A1A1A',
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      inverse: '#000000',
      accent: '#FF0000',
      muted: '#666666',
    },
    
    // Border colors
    border: {
      primary: '#404040',
      secondary: '#2A2A2A',
      accent: '#FF0000',
      light: '#333333',
    },
    
    // Component specific colors
    button: {
      primary: '#FF0000',
      primaryText: '#FFFFFF',
      secondary: 'transparent',
      secondaryText: '#FF0000',
      secondaryBorder: '#FF0000',
      disabled: '#404040',
      disabledText: '#808080',
    },
    
    input: {
      background: '#1A1A1A',
      border: '#404040',
      borderFocused: '#FF0000',
      text: '#FFFFFF',
      placeholder: '#808080',
    },
    
    card: {
      background: '#1A1A1A',
      border: '#404040',
      shadow: '#000000',
    },
    
    navigation: {
      background: '#000000',
      activeTab: '#FF0000',
      inactiveTab: '#808080',
      indicator: '#FF0000',
    },
  },
} as const;

// Light theme colors
export const lightTheme = {
  mode: 'light' as ThemeMode,
  colors: {
    ...baseColors,
    
    // Primary colors
    primary: {
      red: '#FF0000',
      black: '#000000',
      white: '#FFFFFF',
    },
    
    // Background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#E9ECEF',
      card: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
      modal: '#FFFFFF',
    },
    
    // Text colors
    text: {
      primary: '#000000',
      secondary: '#6C757D',
      tertiary: '#ADB5BD',
      inverse: '#FFFFFF',
      accent: '#FF0000',
      muted: '#868E96',
    },
    
    // Border colors
    border: {
      primary: '#DEE2E6',
      secondary: '#E9ECEF',
      accent: '#FF0000',
      light: '#F1F3F4',
    },
    
    // Component specific colors
    button: {
      primary: '#FF0000',
      primaryText: '#FFFFFF',
      secondary: 'transparent',
      secondaryText: '#FF0000',
      secondaryBorder: '#FF0000',
      disabled: '#E9ECEF',
      disabledText: '#ADB5BD',
    },
    
    input: {
      background: '#FFFFFF',
      border: '#DEE2E6',
      borderFocused: '#FF0000',
      text: '#000000',
      placeholder: '#6C757D',
    },
    
    card: {
      background: '#FFFFFF',
      border: '#DEE2E6',
      shadow: '#000000',
    },
    
    navigation: {
      background: '#FFFFFF',
      activeTab: '#FF0000',
      inactiveTab: '#6C757D',
      indicator: '#FF0000',
    },
  },
} as const;

// Theme configurations
export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

// Default theme
export const defaultTheme = darkTheme;

// Theme type exports - use union type to support both themes
export type Theme = typeof darkTheme | typeof lightTheme;
export type ThemeColors = Theme['colors']; 