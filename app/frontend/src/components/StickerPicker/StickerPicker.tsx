import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../theme';
import { ProBadge, LockBadge } from '../UI/ProBadge';
import { getStickersByCategory, searchStickers, Sticker } from '../../data/stickers';
import { useProFeatures } from '../../hooks/useProFeatures';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StickerPickerProps {
  visible?: boolean;
  selectedSticker?: Sticker | null;
  onStickerSelect?: (sticker: Sticker) => void;
  onClose?: () => void;
  showFreeOnly?: boolean;
  style?: any;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  visible = true,
  selectedSticker,
  onStickerSelect,
  onClose,
  showFreeOnly = false,
  style,
}) => {
  const { requestFeatureAccess, isPro } = useProFeatures();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All', icon: '🎨' },
    { id: 'emoji', name: 'Emoji', icon: '😊' },
    { id: 'love', name: 'Love', icon: '❤️' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'birthday', name: 'Birthday', icon: '🎂' },
    { id: 'wedding', name: 'Wedding', icon: '💍' },
  ];

  const filteredStickers = useMemo(() => {
    let stickers: Sticker[];

    if (searchQuery.trim()) {
      stickers = searchStickers(searchQuery);
    } else if (selectedCategory === 'all') {
      stickers = showFreeOnly 
        ? [
            ...getStickersByCategory('emoji').filter(s => !s.isPremium),
            ...getStickersByCategory('love').filter(s => !s.isPremium),
            ...getStickersByCategory('travel').filter(s => !s.isPremium),
            ...getStickersByCategory('birthday').filter(s => !s.isPremium),
            ...getStickersByCategory('wedding').filter(s => !s.isPremium),
          ]
        : [
            ...getStickersByCategory('emoji'),
            ...getStickersByCategory('love'),
            ...getStickersByCategory('travel'),
            ...getStickersByCategory('birthday'),
            ...getStickersByCategory('wedding'),
          ];
    } else {
      stickers = getStickersByCategory(selectedCategory);
      if (showFreeOnly) {
        stickers = stickers.filter(s => !s.isPremium);
      }
    }

    return stickers;
  }, [selectedCategory, searchQuery, showFreeOnly]);

  const handleStickerPress = (sticker: Sticker) => {
    if (sticker.isPremium && !isPro) {
      const canAccess = requestFeatureAccess('premium-stickers');
      if (!canAccess) return;
    }

    onStickerSelect?.(sticker);
  };

  const renderStickerItem = ({ item }: { item: Sticker }) => {
    const isSelected = selectedSticker?.id === item.id;
    const isPremium = item.isPremium && !isPro;

    return (
      <TouchableOpacity
        style={[
          styles.stickerItem,
          isSelected && styles.stickerItemSelected,
        ]}
        onPress={() => handleStickerPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.stickerContainer}>
          <View style={styles.stickerImageContainer}>
            <Text style={styles.stickerPlaceholder}>{item.name}</Text>
          </View>
          
          {isPremium && (
            <View style={styles.lockOverlay}>
              <LockBadge size="small" />
            </View>
          )}
          
          {isSelected && (
            <View style={styles.selectedIndicator}>
              <Text style={styles.selectedIndicatorText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryTab = (category: typeof categories[0]) => {
    const isActive = selectedCategory === category.id;
    const count = category.id === 'all'
      ? filteredStickers.length
      : getStickersByCategory(category.id).length;

    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryTab,
          isActive && styles.categoryTabActive,
        ]}
        onPress={() => setSelectedCategory(category.id)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.categoryIcon,
          isActive && styles.categoryIconActive,
        ]}>
          {category.icon}
        </Text>
        <Text style={[
          styles.categoryName,
          isActive && styles.categoryNameActive,
        ]}>
          {category.name}
        </Text>
        <Text style={[
          styles.categoryCount,
          isActive && styles.categoryCountActive,
        ]}>
          {count}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stickers</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabsContainer}
        style={styles.categoryTabs}
      >
        {categories.map(renderCategoryTab)}
      </ScrollView>

      {/* Stickers grid */}
      <FlatList
        data={filteredStickers}
        renderItem={renderStickerItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.stickersGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No stickers found</Text>
          </View>
        }
      />

      {/* Pro banner */}
      {!isPro && !showFreeOnly && (
        <LinearGradient
          colors={[colors.accent.purple, colors.accent.pink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.proBanner}
        >
          <View style={styles.proBannerContent}>
            <View style={styles.proBannerTextContainer}>
              <Text style={styles.proBannerTitle}>
                Unlock 160+ Premium Stickers
              </Text>
              <Text style={styles.proBannerSubtitle}>
                Get access to all sticker collections
              </Text>
            </View>
            <TouchableOpacity
              style={styles.proBannerButton}
              onPress={() => {
                const canAccess = requestFeatureAccess('premium-stickers');
                if (!canAccess) return;
              }}
            >
              <ProBadge size="small" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.neutral[600],
    fontWeight: '600',
  },
  categoryTabs: {
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  categoryTabsContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryTab: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.xs,
    borderRadius: spacing.sm,
    minWidth: 70,
  },
  categoryTabActive: {
    backgroundColor: colors.primary[50],
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  categoryIconActive: {
    opacity: 1,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.neutral[600],
    marginBottom: 2,
  },
  categoryNameActive: {
    color: colors.primary[600],
  },
  categoryCount: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.neutral[400],
  },
  categoryCountActive: {
    color: colors.primary[500],
  },
  stickersGrid: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  stickerItem: {
    width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm * 3) / 4,
    aspectRatio: 1,
    marginBottom: spacing.sm,
    marginRight: spacing.sm,
  },
  stickerItemSelected: {
    backgroundColor: colors.primary[50],
    borderRadius: spacing.sm,
  },
  stickerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
    borderRadius: spacing.sm,
  },
  stickerPlaceholder: {
    fontSize: 36,
  },
  lockOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  selectedIndicatorText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: spacing.xl * 2,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: colors.neutral[500],
  },
  proBanner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  proBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  proBannerTextContainer: {
    flex: 1,
  },
  proBannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  proBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  proBannerButton: {
    marginLeft: spacing.md,
  },
});