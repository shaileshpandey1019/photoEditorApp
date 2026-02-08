/**
 * Home Screen - Photo Collage Maker
 * Main landing screen with featured templates and quick actions
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, usePathname } from 'expo-router';
import { Button } from '@/components/UI/Button';
import { ProBadge } from '@/components/UI/ProBadge';
import { TabBar } from '@/components/Navigation';
import { colors, spacing, borderRadius, shadows, textStyles } from '@/theme';
import { getFeaturedTemplates, getRecentTemplates } from '@/data/templates';
import { useStorage } from '@/hooks/useStorage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const { recentTemplates } = useStorage();
  const featuredTemplates = getFeaturedTemplates();
  const recent = getRecentTemplates(recentTemplates);

  const handleCreateNew = () => {
    router.push('/templates');
  };

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
        {/* Hero Section */}
        <View style={styles.hero}>
          <LinearGradient
            colors={[colors.primary[500], colors.primary[600]]}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.heroTitle}>Create Beautiful</Text>
            <Text style={styles.heroTitle}>Photo Collages</Text>
            <Text style={styles.heroSubtitle}>
              Turn your memories into stunning collages with ease
            </Text>
            <Button
              title="Start Creating"
              onPress={handleCreateNew}
              variant="primary"
              size="large"
              style={styles.ctaButton}
            />
          </LinearGradient>
        </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/templates')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary[100] }]}>
              <Text style={styles.quickActionEmoji}>📸</Text>
            </View>
            <Text style={styles.quickActionText}>New Collage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/my-creations')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.accent.purple + '20' }]}>
              <Text style={styles.quickActionEmoji}>🖼️</Text>
            </View>
            <Text style={styles.quickActionText}>My Creations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => router.push('/pro')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.accent.pink + '20' }]}>
              <Text style={styles.quickActionEmoji}>⭐</Text>
            </View>
            <Text style={styles.quickActionText}>Go Pro</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Templates */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Templates</Text>
          <TouchableOpacity onPress={() => router.push('/templates')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          {featuredTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              onPress={() => handleTemplatePress(template.id)}
            >
              <View style={styles.templatePreview}>
                {/* Template preview visualization */}
                <View style={styles.templateGrid}>
                  {template.frames.slice(0, 4).map((frame) => (
                    <View
                      key={frame.id}
                      style={[
                        styles.templateFrame,
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
                  <View style={styles.templateBadge}>
                    <ProBadge size="small" />
                  </View>
                )}
              </View>
              <Text style={styles.templateName}>{template.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Templates */}
      {recent.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Templates</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recent.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateCard}
                onPress={() => handleTemplatePress(template.id)}
              >
                <View style={styles.templatePreview}>
                  <View style={styles.templateGrid}>
                    {template.frames.slice(0, 4).map((frame) => (
                      <View
                        key={frame.id}
                        style={[
                          styles.templateFrame,
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
                </View>
                <Text style={styles.templateName}>{template.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Pro Banner */}
      <View style={styles.proBanner}>
        <LinearGradient
          colors={[colors.accent.purple, colors.accent.pink]}
          style={styles.proGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.proContent}>
            <View>
              <Text style={styles.proTitle}>✨ Unlock Premium Features</Text>
              <Text style={styles.proSubtitle}>
                Get access to 200+ stickers, HD export, and more
              </Text>
            </View>
            <Button
              title="Upgrade"
              onPress={() => router.push('/pro')}
              variant="primary"
              size="small"
            />
          </View>
        </LinearGradient>
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
  hero: {
    margin: spacing.md,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    ...textStyles.h1,
    color: colors.white,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...textStyles.bodyLarge,
    color: colors.primary[100],
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  ctaButton: {
    minWidth: 200,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...textStyles.h3,
  },
  seeAll: {
    ...textStyles.label,
    color: colors.primary[500],
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionEmoji: {
    fontSize: 28,
  },
  quickActionText: {
    ...textStyles.bodySmall,
    textAlign: 'center',
  },
  horizontalScroll: {
    paddingRight: spacing.md,
  },
  templateCard: {
    width: 140,
    marginRight: spacing.md,
  },
  templatePreview: {
    width: 140,
    height: 140,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.sm,
  },
  templateGrid: {
    flex: 1,
    padding: spacing.sm,
  },
  templateFrame: {
    position: 'absolute',
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.sm,
  },
  templateBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  templateName: {
    ...textStyles.bodySmall,
    textAlign: 'center',
  },
  proBanner: {
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  proGradient: {
    padding: spacing.lg,
  },
  proContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proTitle: {
    ...textStyles.h4,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  proSubtitle: {
    ...textStyles.bodySmall,
    color: colors.primary[100],
    maxWidth: 200,
  },
});