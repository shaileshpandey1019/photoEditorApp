/**
 * Templates Screen - Photo Collage Maker
 * Browse all available templates with filtering
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ProBadge } from '@/components/UI/ProBadge';
import { TabBar } from '@/components/Navigation';
import { colors, spacing, borderRadius, shadows, textStyles } from '@/theme';
import { getTemplatesByAspectRatio, getTemplatesByCategory } from '@/data/templates';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - spacing.md * 2 - spacing.md) / 2;

const ASPECT_RATIOS = ['All', '1:1', '4:5', '9:16', 'Freeform'];
const CATEGORIES = ['All', 'Grid', 'Creative', 'Minimal', 'Artistic'];

export default function TemplatesScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const templates = selectedAspectRatio === 'All' && selectedCategory === 'All'
    ? getTemplatesByCategory('All')
    : selectedAspectRatio !== 'All'
    ? getTemplatesByAspectRatio(selectedAspectRatio)
    : getTemplatesByCategory(selectedCategory);

  const handleTemplatePress = (templateId: string) => {
    router.push({
      pathname: '/create',
      params: { templateId },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Templates</Text>
          <Text style={styles.subtitle}>Choose a template to get started</Text>
        </View>

        {/* Aspect Ratio Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Aspect Ratio</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {ASPECT_RATIOS.map((ratio) => (
              <TouchableOpacity
                key={ratio}
                style={[
                  styles.filterChip,
                  selectedAspectRatio === ratio && styles.filterChipActive,
                ]}
                onPress={() => {
                  setSelectedAspectRatio(ratio);
                  setSelectedCategory('All');
                }}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedAspectRatio === ratio && styles.filterChipTextActive,
                  ]}
                >
                  {ratio}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.filterChipActive,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setSelectedAspectRatio('All');
                }}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedCategory === category && styles.filterChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Templates Grid */}
        <View style={styles.grid}>
          {templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.card}
              onPress={() => handleTemplatePress(template.id)}
            >
              <View style={styles.cardPreview}>
                {/* Template preview visualization */}
                <View style={styles.cardGrid}>
                  {template.frames.slice(0, 4).map((frame) => (
                    <View
                      key={frame.id}
                      style={[
                        styles.cardFrame,
                        {
                          left: `${frame.x}%`,
                          top: `${frame.y}%`,
                          width: `${frame.width}%`,
                          height: `${frame.height}%`,
                        },
                      ]}
                    />
                  ))}
                </View>
                {template.isPremium && (
                  <View style={styles.cardBadge}>
                    <ProBadge size="small" />
                  </View>
                )}
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{template.name}</Text>
                <Text style={styles.cardCategory}>{template.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      {/* Tab Bar */}
      <TabBar
        activeTab={pathname}
        onTabChange={(tabId) => router.push(`/${tabId === 'home' ? 'index' : tabId}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...textStyles.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.neutral[600],
  },
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterLabel: {
    ...textStyles.label,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.neutral[600],
  },
  filterScroll: {
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  filterChipText: {
    ...textStyles.label,
    color: colors.neutral[600],
  },
  filterChipTextActive: {
    color: colors.white,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: spacing.md,
    marginRight: spacing.md,
  },
  cardPreview: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  cardGrid: {
    flex: 1,
    padding: spacing.sm,
  },
  cardFrame: {
    position: 'absolute',
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
  },
  cardBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  cardInfo: {
    paddingHorizontal: spacing.xs,
  },
  cardName: {
    ...textStyles.label,
    marginBottom: 2,
  },
  cardCategory: {
    ...textStyles.bodySmall,
    color: colors.neutral[500],
  },
});