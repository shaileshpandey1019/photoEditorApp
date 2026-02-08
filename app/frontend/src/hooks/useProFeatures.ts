/**
 * useProFeatures Hook - Photo Collage Maker
 * Manages pro feature gating and upgrade flow
 */

import { useState, useEffect } from 'react';
import { useStorage } from './useStorage';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

// ============================================
// PRO FEATURES LIST
// ============================================
export const PRO_FEATURES = [
  {
    id: 'export-no-watermark',
    name: 'Export Without Watermark',
    description: 'Save your collages without any branding',
    icon: '💎',
  },
  {
    id: 'premium-stickers',
    name: 'Premium Stickers',
    description: 'Access 160+ exclusive sticker designs',
    icon: '🎨',
  },
  {
    id: 'ultra-hd-export',
    name: 'Ultra HD Export',
    description: 'Export in 4K resolution for perfect quality',
    icon: '📸',
  },
  {
    id: 'advanced-text',
    name: 'Advanced Text Styles',
    description: 'Custom fonts, shadows, and curved text',
    icon: '✍️',
  },
  {
    id: 'transparent-bg',
    name: 'Transparent Background',
    description: 'Export with transparent PNG backgrounds',
    icon: '🔲',
  },
  {
    id: 'unlimited-creations',
    name: 'Unlimited Creations',
    description: 'Create and save as many collages as you want',
    icon: '♾️',
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    description: 'Get faster responses from our support team',
    icon: '🎧',
  },
  {
    id: 'premium-templates',
    name: 'Premium Templates',
    description: 'Unlock exclusive pro-only templates',
    icon: '📐',
  },
] as const;

// ============================================
// HOOK
// ============================================
export function useProFeatures() {
  const { isPro, setProStatus } = useStorage();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingFeature, setPendingFeature] = useState<string | null>(null);

  // Check if a feature is premium
  const isPremiumFeature = (featureId: string): boolean => {
    return PRO_FEATURES.some(f => f.id === featureId);
  };

  // Check if user can access a feature
  const canAccessFeature = (featureId: string): boolean => {
    return isPro || !isPremiumFeature(featureId);
  };

  // Request access to a premium feature
  const requestFeatureAccess = (featureId: string): boolean => {
    if (isPro) {
      return true;
    }

    if (isPremiumFeature(featureId)) {
      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Show upgrade modal
      setPendingFeature(featureId);
      setShowUpgradeModal(true);
      return false;
    }

    return true;
  };

  // Handle pro upgrade (placeholder for real payment integration)
  const handleUpgrade = async () => {
    try {
      // Haptic feedback
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // TODO: Integrate with RevenueCat or similar for real payments
      // For now, we'll simulate the upgrade
      Alert.alert(
        'Upgrade to Pro',
        'This is a demo upgrade. In production, this would connect to your payment provider.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Upgrade Demo',
            onPress: () => {
              setProStatus(true);
              setShowUpgradeModal(false);
              setPendingFeature(null);
              Alert.alert('Success!', 'You are now a Pro member!');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Upgrade error:', error);
    }
  };

  // Restore purchases (placeholder)
  const restorePurchases = async () => {
    try {
      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // TODO: Integrate with RevenueCat or similar
      Alert.alert(
        'Restore Purchases',
        'This would restore your previous purchases from the app store.',
        [
          { text: 'OK' },
        ]
      );
    } catch (error) {
      console.error('Restore error:', error);
    }
  };

  // Get feature by ID
  const getFeatureById = (featureId: string) => {
    return PRO_FEATURES.find(f => f.id === featureId);
  };

  return {
    // State
    isPro,
    showUpgradeModal,
    pendingFeature,

    // Features
    PRO_FEATURES,

    // Methods
    isPremiumFeature,
    canAccessFeature,
    requestFeatureAccess,
    handleUpgrade,
    restorePurchases,
    getFeatureById,

    // UI Control
    setShowUpgradeModal,
    setPendingFeature,
  };
}

export default useProFeatures;