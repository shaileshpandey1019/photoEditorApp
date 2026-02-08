/**
 * ProBadge Component - Photo Collage Maker
 * Badge to indicate premium/pro features
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, typography } from '@/theme';

// ============================================
// TYPES
// ============================================
export type BadgeSize = 'small' | 'medium' | 'large';

interface ProBadgeProps {
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  showIcon?: boolean;
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Size styles
  small: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  medium: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  large: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },

  // Text styles
  textSmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  textMedium: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  textLarge: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },

  // Container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Gradient
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Colors
  text: {
    color: colors.white,
  },

  // Icon
  icon: {
    marginRight: 2,
  },
});

// ============================================
// COMPONENT
// ============================================
export const ProBadge: React.FC<ProBadgeProps> = ({
  size = 'small',
  style,
  textStyle,
  showIcon = false,
}) => {
  // Get size style
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  // Get text size style
  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };

  return (
    <View style={[styles.container, getSizeStyle(), style]}>
      <LinearGradient
        colors={[colors.accent.purple, colors.accent.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, getSizeStyle()]}
      >
        {showIcon && (
          <Text style={[styles.text, getTextSizeStyle(), styles.icon]}>✨</Text>
        )}
        <Text style={[styles.text, getTextSizeStyle(), textStyle]}>PRO</Text>
      </LinearGradient>
    </View>
  );
};

// ============================================
// LOCK ICON BADGE
// ============================================
interface LockBadgeProps {
  size?: BadgeSize;
}

export const LockBadge: React.FC<LockBadgeProps> = ({ size = 'small' }) => {
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return styles.textSmall;
      case 'large':
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };

  return (
    <View style={[styles.container, getSizeStyle()]}>
      <LinearGradient
        colors={[colors.accent.purple, colors.accent.pink]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, getSizeStyle()]}
      >
        <Text style={[styles.text, getTextSizeStyle()]}>🔒</Text>
      </LinearGradient>
    </View>
  );
};

export default ProBadge;