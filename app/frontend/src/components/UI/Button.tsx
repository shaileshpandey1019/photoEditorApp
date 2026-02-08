/**
 * Button Component - Photo Collage Maker
 * Reusable button with multiple variants and sizes
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, colors, borderRadius, spacing, typography, shadows } from '@/theme';

// ============================================
// TYPES
// ============================================
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  // Size styles
  small: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 52,
  },

  // Variant styles
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.neutral[800],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Text styles
  textSmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  textMedium: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  textLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },

  // Variant text colors
  textPrimary: {
    color: colors.white,
  },
  textSecondary: {
    color: colors.white,
  },
  textOutline: {
    color: colors.primary[500],
  },
  textGhost: {
    color: colors.primary[500],
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.neutral[400],
  },

  // Container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },

  // Icon
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },

  // Loader
  loader: {
    marginRight: spacing.sm,
  },
});

// ============================================
// COMPONENT
// ============================================
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
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

  // Get variant style
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
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

  // Get variant text style
  const getVariantTextStyle = (): TextStyle => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'outline':
        return styles.textOutline;
      case 'ghost':
        return styles.textGhost;
      default:
        return styles.textPrimary;
    }
  };

  // Render gradient for primary variant
  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[
          styles.container,
          getSizeStyle(),
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={[colors.primary[500], colors.primary[600]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.container,
            getSizeStyle(),
            fullWidth && styles.fullWidth,
          ]}
        >
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.white}
              style={styles.loader}
            />
          )}
          {icon && iconPosition === 'left' && !loading && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              getTextSizeStyle(),
              getVariantTextStyle(),
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && !loading && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Render flat button for other variants
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.container,
        getSizeStyle(),
        getVariantStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary[500] : colors.white}
          style={styles.loader}
        />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <View style={styles.iconLeft}>{icon}</View>
      )}
      <Text
        style={[
          getTextSizeStyle(),
          getVariantTextStyle(),
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
      {icon && iconPosition === 'right' && !loading && (
        <View style={styles.iconRight}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;