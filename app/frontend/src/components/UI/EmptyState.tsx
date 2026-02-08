/**
 * EmptyState Component - Photo Collage Maker
 * Displays empty state with illustration and action button
 */

import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, ViewStyle } from 'react-native';
import { Button } from './Button';
import { colors, spacing, typography, borderRadius } from '@/theme';

interface EmptyStateProps {
  illustration?: ImageSourcePropType;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  illustration,
  title,
  description,
  actionText,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {illustration && <Image source={illustration} style={styles.illustration} resizeMode="contain" />}
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
      {actionText && onAction && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  title: {
    ...typography.textStyles.h3,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.textStyles.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 280,
  },
  button: {
    minWidth: 200,
  },
});