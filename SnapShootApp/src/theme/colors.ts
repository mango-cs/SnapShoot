export const colors = {
  // Primary Colors
  primary: {
    red: '#FF0000',
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
    redGradient: ['#FF0000', '#CC0000'],
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
    accent: '#FF0000',
  },
  
  // Border Colors
  border: {
    primary: '#404040',
    secondary: '#1A1A1A',
    accent: '#FF0000',
    light: '#808080',
  },
  
  // Component Specific Colors
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
  
  wallet: {
    cardBackground: '#FF0000',
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