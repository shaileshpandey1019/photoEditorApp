/**
 * Root Layout - Photo Collage Maker
 * Main app layout with navigation and Pro features
 */

import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useProFeatures } from '@/hooks/useProFeatures';
import { BottomSheet } from '@/components/UI/BottomSheet';
import { Button } from '@/components/UI/Button';
import { ProBadge } from '@/components/UI/ProBadge';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, textStyles } from '@/theme';

export default function RootLayout() {
  const { showUpgradeModal, setShowUpgradeModal, PRO_FEATURES, handleUpgrade, isPro } = useProFeatures();

  return (
    <>
      <StatusBar style="auto" />

      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            href: '/',
          }}
        />
        <Tabs.Screen
          name="templates"
          options={{
            title: 'Templates',
            href: '/templates',
          }}
        />
      </Tabs>

      {/* Pro Upgrade Modal */}
      <BottomSheet
        isVisible={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        snapPoints={['70%', '85%']}
      >
        <View style={styles.upgradeContent}>
          <ProBadge size="large" showIcon style={styles.badge} />

          <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
          <Text style={styles.upgradeDescription}>
            Unlock all premium features and take your collages to the next level
          </Text>

          <ScrollView style={styles.featuresList}>
            {PRO_FEATURES.map((feature) => (
              <View key={feature.id} style={styles.featureItem}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureName}>{feature.name}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.pricing}>
            <Text style={styles.priceAmount}>$4.99</Text>
            <Text style={styles.pricePeriod}>/month</Text>
          </View>

          <Button
            title={isPro ? 'You are a Pro Member!' : 'Upgrade Now'}
            onPress={handleUpgrade}
            variant="primary"
            size="large"
            fullWidth
            style={styles.upgradeButton}
            disabled={isPro}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  upgradeContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  badge: {
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  upgradeTitle: {
    ...textStyles.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  upgradeDescription: {
    ...textStyles.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.neutral[600],
  },
  featuresList: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  featureIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureName: {
    ...textStyles.label,
    marginBottom: 2,
  },
  featureDesc: {
    ...textStyles.bodySmall,
    color: colors.neutral[500],
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  priceAmount: {
    ...textStyles.h1,
    color: colors.primary[600],
  },
  pricePeriod: {
    ...textStyles.body,
    color: colors.neutral[600],
    marginLeft: spacing.xs,
  },
  upgradeButton: {
    marginBottom: spacing.md,
  },
});