// Base spacing unit (4px)
const BASE_UNIT = 4;

// Spacing scale based on 4px grid system
export const spacing = {
  // No spacing
  none: 0,
  
  // Extra small spacing
  xs: BASE_UNIT, // 4px
  
  // Small spacing
  sm: BASE_UNIT * 2, // 8px
  
  // Medium spacing (base)
  md: BASE_UNIT * 3, // 12px
  
  // Large spacing
  lg: BASE_UNIT * 4, // 16px
  
  // Extra large spacing
  xl: BASE_UNIT * 5, // 20px
  
  // 2x large spacing
  '2xl': BASE_UNIT * 6, // 24px
  
  // 3x large spacing
  '3xl': BASE_UNIT * 8, // 32px
  
  // 4x large spacing
  '4xl': BASE_UNIT * 10, // 40px
  
  // 5x large spacing
  '5xl': BASE_UNIT * 12, // 48px
  
  // 6x large spacing
  '6xl': BASE_UNIT * 16, // 64px
} as const;

// Component-specific spacing
export const componentSpacing = {
  // Button spacing
  button: {
    padding: {
      small: { horizontal: spacing.md, vertical: spacing.xs },
      medium: { horizontal: spacing.lg, vertical: spacing.sm },
      large: { horizontal: spacing.xl, vertical: spacing.md },
    },
    margin: {
      small: spacing.xs,
      medium: spacing.sm,
      large: spacing.md,
    },
  },
  
  // Card spacing
  card: {
    padding: spacing.lg,
    margin: spacing.sm,
    gap: spacing.md,
  },
  
  // Form spacing
  form: {
    fieldGap: spacing.lg,
    labelGap: spacing.xs,
    sectionGap: spacing['2xl'],
  },
  
  // Navigation spacing
  navigation: {
    tabPadding: spacing.sm,
    headerPadding: spacing.lg,
    bottomTabHeight: 60,
  },
  
  // Screen spacing
  screen: {
    horizontal: spacing.lg,
    vertical: spacing.lg,
    sectionGap: spacing['2xl'],
  },
  
  // List spacing
  list: {
    itemGap: spacing.sm,
    sectionGap: spacing.lg,
    headerGap: spacing.xs,
  },
} as const;

// Layout spacing
export const layout = {
  // Container spacing
  container: {
    padding: spacing.lg,
    maxWidth: 428, // iPhone 14 Pro Max width
  },
  
  // Section spacing
  section: {
    marginBottom: spacing['2xl'],
    paddingVertical: spacing.lg,
  },
  
  // Grid spacing
  grid: {
    gap: spacing.md,
    columnGap: spacing.sm,
    rowGap: spacing.md,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },
  
  // Shadow spacing
  shadow: {
    elevation: {
      small: 2,
      medium: 4,
      large: 8,
      xlarge: 16,
    },
  },
} as const;

// Responsive spacing helpers
export const responsiveSpacing = {
  // Screen size breakpoints
  breakpoints: {
    small: 320,
    medium: 768,
    large: 1024,
  },
  
  // Responsive spacing multipliers
  multipliers: {
    small: 0.75,
    medium: 1,
    large: 1.25,
  },
} as const;

// Helper functions
export const getSpacing = (size: keyof typeof spacing): number => spacing[size];

export const getResponsiveSpacing = (
  size: keyof typeof spacing,
  screenWidth: number
): number => {
  const baseSpacing = spacing[size];
  
  if (screenWidth <= responsiveSpacing.breakpoints.small) {
    return baseSpacing * responsiveSpacing.multipliers.small;
  }
  
  if (screenWidth >= responsiveSpacing.breakpoints.large) {
    return baseSpacing * responsiveSpacing.multipliers.large;
  }
  
  return baseSpacing * responsiveSpacing.multipliers.medium;
};

// Type exports
export type SpacingKeys = keyof typeof spacing;
export type ComponentSpacingKeys = keyof typeof componentSpacing;
export type LayoutKeys = keyof typeof layout; 