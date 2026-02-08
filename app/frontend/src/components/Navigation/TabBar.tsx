import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../theme';
import { useProFeatures } from '../../hooks/useProFeatures';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
  isPremium?: boolean;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  showProBadge?: boolean;
  style?: any;
}

const DEFAULT_TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'templates', label: 'Templates', icon: '📐' },
  { id: 'create', label: 'Create', icon: '✨' },
  { id: 'my-creations', label: 'My Creations', icon: '📁' },
  { id: 'pro', label: 'Pro', icon: '⭐', isPremium: true },
];

export const TabBar: React.FC<TabBarProps> = ({
  tabs = DEFAULT_TABS,
  activeTab,
  onTabChange,
  showProBadge = true,
  style,
}) => {
  const { isPro } = useProFeatures();

  const renderTab = (tab: TabItem) => {
    const isActive = activeTab === tab.id;
    const showPro = tab.isPremium && !isPro && showProBadge;

    return (
      <TouchableOpacity
        key={tab.id}
        style={styles.tab}
        onPress={() => onTabChange(tab.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.tabContent, isActive && styles.tabContentActive]}>
          <Text style={[
            styles.tabIcon,
            isActive && styles.tabIconActive,
          ]}>
            {tab.activeIcon && isActive ? tab.activeIcon : tab.icon}
          </Text>
          
          <Text style={[
            styles.tabLabel,
            isActive && styles.tabLabelActive,
          ]}>
            {tab.label}
          </Text>

          {showPro && (
            <View style={styles.proDot} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']}
        style={styles.background}
      >
        <View style={styles.tabBar}>
          {tabs.map(renderTab)}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  background: {
    paddingTop: spacing.xs,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabContentActive: {
    transform: [{ translateY: -2 }],
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs / 2,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.neutral[500],
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: colors.primary[600],
    fontWeight: '600',
  },
  proDot: {
    position: 'absolute',
    top: 0,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.pink,
  },
});