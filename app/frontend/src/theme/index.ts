/**
 * Theme System - Photo Collage Maker
 * Complete design tokens for consistent UI/UX
 */

import { TextStyle, ViewStyle } from 'react-native';

// ============================================
// COLOR PALETTE
// ============================================
export const colors = {
  // Primary Colors
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Main primary color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Accent Colors
  accent: {
    pink: '#EC4899',
    purple: '#A855F7',
    teal: '#14B8A6',
    orange: '#F97316',
    yellow: '#EAB308',
  },

  // Neutral Colors
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Semantic Colors
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Special Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font Sizes (8pt scale)
  fontSize: {
    xs: 12,    // 9pt
    sm: 14,    // 10.5pt
    base: 16,  // 12pt
    lg: 18,    // 13.5pt
    xl: 20,    // 15pt
    '2xl': 24, // 18pt
    '3xl': 30, // 22.5pt
    '4xl': 36, // 27pt
    '5xl': 48, // 36pt
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// ============================================
// SPACING (8pt Grid System)
// ============================================
export const spacing = {
  xs: 4,    // 0.25rem
  sm: 8,    // 0.5rem
  md: 16,   // 1rem
  lg: 24,   // 1.5rem
  xl: 32,   // 2rem
  '2xl': 48, // 3rem
  '3xl': 64, // 4rem
  '4xl': 96, // 6rem
};

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  none: {
    shadowColor: colors.transparent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// ============================================
// TEXT STYLES
// ============================================
export const textStyles = {
  // Heading Styles
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[900],
  } as TextStyle,

  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[900],
  } as TextStyle,

  h3: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[900],
  } as TextStyle,

  h4: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[900],
  } as TextStyle,

  // Body Styles
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    color: colors.neutral[800],
  } as TextStyle,

  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    color: colors.neutral[700],
  } as TextStyle,

  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
    color: colors.neutral[600],
  } as TextStyle,

  // UI Text Styles
  button: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.tight,
    color: colors.white,
  } as TextStyle,

  caption: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[500],
  } as TextStyle,

  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.tight,
    color: colors.neutral[700],
  } as TextStyle,
};

// ============================================
// VIEW STYLES
// ============================================
export const viewStyles = {
  // Card Styles
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  } as ViewStyle,

  cardElevated: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    ...shadows.lg,
  } as ViewStyle,

  // Input Styles
  input: {
    backgroundColor: colors.neutral[50],
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  } as ViewStyle,

  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  } as ViewStyle,

  // Safe Area Styles
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  } as ViewStyle,
};

// ============================================
// ANIMATION
// ============================================
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// ============================================
// LAYOUT
// ============================================
export const layout = {
  // Screen padding
  screenPadding: spacing.md,
  // Content max width
  maxWidth: 500,
  // Tab bar height
  tabBarHeight: 60,
  // Header height
  headerHeight: 56,
  // Bottom sheet snap points
  bottomSheetSnapPoints: ['25%', '50%', '75%', '90%'],
};

// ============================================
// COMPLETE THEME EXPORT
// ============================================
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  textStyles,
  viewStyles,
  animation,
  layout,
};

export default theme;