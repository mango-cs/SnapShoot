export const colors = {
  // Primary Colors
  primary: {
    red: '#3B82F6',
    black: '#000000',
    white: '#FFFFFF',
  },
  
  // Secondary Colors
  secondary: {
    darkGray: '#1A1A1A',
    mediumGray: '#404040',
    lightGray: '#808080',
    veryLightGray: '#F5F5F5',
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Gradients
  gradients: {
    redGradient: ['#3B82F6', '#2563EB'],
    darkGradient: ['#000000', '#1A1A1A'],
    grayGradient: ['#404040', '#1A1A1A'],
  },
  
  // Background Colors
  background: {
    primary: '#000000',
    secondary: '#1A1A1A',
    tertiary: '#404040',
    card: '#1A1A1A',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#808080',
    tertiary: '#404040',
    inverse: '#000000',
    accent: '#3B82F6',
  },
  
  // Border Colors
  border: {
    primary: '#404040',
    secondary: '#1A1A1A',
    accent: '#3B82F6',
    light: '#808080',
  },
  
  // Component Specific Colors
  button: {
    primary: '#3B82F6',
    primaryText: '#FFFFFF',
    secondary: 'transparent',
    secondaryText: '#3B82F6',
    secondaryBorder: '#3B82F6',
    disabled: '#404040',
    disabledText: '#808080',
  },
  
  input: {
    background: '#1A1A1A',
    border: '#404040',
    borderFocused: '#3B82F6',
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
    activeTab: '#3B82F6',
    inactiveTab: '#808080',
    indicator: '#3B82F6',
  },
  
  wallet: {
    cardBackground: '#3B82F6',
    cardText: '#FFFFFF',
    balance: '#FFFFFF',
    transactions: '#10B981',
  },
} as const;

// Type for accessing colors
export type ColorKeys = keyof typeof colors;
export type PrimaryColors = keyof typeof colors.primary;
export type SecondaryColors = keyof typeof colors.secondary;
export type StatusColors = keyof typeof colors.status; 