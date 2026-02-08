import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../theme';
import { Button } from '../UI/Button';
import { ProBadge, LockBadge } from '../UI/ProBadge';
import { useProFeatures } from '../../hooks/useProFeatures';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface TextStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  strokeWidth?: number;
  strokeColor?: string;
  shadowColor: string;
  shadowOffset: { x: number; y: number };
  shadowOpacity: number;
  shadowRadius: number;
}

export interface TextItem {
  id: string;
  content: string;
  style: TextStyle;
  transform: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
}

interface TextToolProps {
  visible?: boolean;
  textItem?: TextItem | null;
  onTextChange?: (text: TextItem) => void;
  onClose?: () => void;
  showFreeOnly?: boolean;
  style?: any;
}

const FONTS = [
  { name: 'System', family: 'System', isPremium: false },
  { name: 'Bold', family: 'System-Bold', isPremium: false },
  { name: 'Serif', family: 'Georgia', isPremium: false },
  { name: 'Mono', family: 'Courier', isPremium: true },
  { name: 'Rounded', family: 'Avenir Rounded', isPremium: true },
  { name: 'Handwriting', family: 'Bradley Hand', isPremium: true },
];

const COLORS = [
  { name: 'White', value: colors.white, isPremium: false },
  { name: 'Black', value: colors.black, isPremium: false },
  { name: 'Red', value: '#FF3B30', isPremium: false },
  { name: 'Blue', value: '#007AFF', isPremium: false },
  { name: 'Green', value: '#34C759', isPremium: false },
  { name: 'Yellow', value: '#FFCC00', isPremium: false },
  { name: 'Purple', value: '#AF52DE', isPremium: false },
  { name: 'Pink', value: '#FF2D55', isPremium: true },
  { name: 'Orange', value: '#FF9500', isPremium: true },
  { name: 'Teal', value: '#5AC8FA', isPremium: true },
  { name: 'Gold', value: '#FFD700', isPremium: true },
  { name: 'Silver', value: '#C0C0C0', isPremium: true },
];

const FONT_SIZES = [
  { value: 16, label: 'S' },
  { value: 24, label: 'M' },
  { value: 32, label: 'L' },
  { value: 48, label: 'XL' },
  { value: 64, label: 'XXL', isPremium: true },
];

const TEXT_SHADOWS = [
  { name: 'None', color: 'transparent', offset: { x: 0, y: 0 }, opacity: 0, radius: 0, isPremium: false },
  { name: 'Light', color: colors.black, offset: { x: 0, y: 1 }, opacity: 0.3, radius: 2, isPremium: false },
  { name: 'Medium', color: colors.black, offset: { x: 0, y: 2 }, opacity: 0.5, radius: 4, isPremium: false },
  { name: 'Heavy', color: colors.black, offset: { x: 0, y: 3 }, opacity: 0.7, radius: 6, isPremium: true },
  { name: 'Neon', color: colors.accent.cyan, offset: { x: 0, y: 0 }, opacity: 1, radius: 10, isPremium: true },
];

export const TextTool: React.FC<TextToolProps> = ({
  visible = true,
  textItem,
  onTextChange,
  onClose,
  showFreeOnly = false,
  style,
}) => {
  const { requestFeatureAccess, isPro } = useProFeatures();
  
  const [text, setText] = useState(textItem?.content || '');
  const [selectedFont, setSelectedFont] = useState(
    FONTS.find(f => f.family === textItem?.style?.fontFamily) || FONTS[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    COLORS.find(c => c.value === textItem?.style?.color) || COLORS[0]
  );
  const [selectedFontSize, setSelectedFontSize] = useState(
    FONT_SIZES.find(f => f.value === textItem?.style?.fontSize) || FONT_SIZES[1]
  );
  const [selectedShadow, setSelectedShadow] = useState(
    TEXT_SHADOWS.find(s => 
      s.color === textItem?.style?.shadowColor &&
      s.offset.x === textItem?.style?.shadowOffset?.x &&
      s.offset.y === textItem?.style?.shadowOffset?.y &&
      s.opacity === textItem?.style?.shadowOpacity
    ) || TEXT_SHADOWS[0]
  );

  const currentStyle = useMemo<TextStyle>(() => ({
    fontSize: selectedFontSize.value,
    fontFamily: selectedFont.family,
    color: selectedColor.value,
    backgroundColor: 'transparent',
    shadowColor: selectedShadow.color,
    shadowOffset: selectedShadow.offset,
    shadowOpacity: selectedShadow.opacity,
    shadowRadius: selectedShadow.radius,
  }), [selectedFont, selectedColor, selectedFontSize, selectedShadow]);

  const handleSave = () => {
    if (!text.trim()) return;

    const newTextItem: TextItem = {
      id: textItem?.id || `text_${Date.now()}`,
      content: text,
      style: currentStyle,
      transform: textItem?.transform || {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      },
    };

    onTextChange?.(newTextItem);
    onClose?.();
  };

  const handleFontSelect = (font: typeof FONTS[0]) => {
    if (font.isPremium && !isPro) {
      const canAccess = requestFeatureAccess('advanced-text');
      if (!canAccess) return;
    }
    setSelectedFont(font);
  };

  const handleColorSelect = (color: typeof COLORS[0]) => {
    if (color.isPremium && !isPro) {
      const canAccess = requestFeatureAccess('advanced-text');
      if (!canAccess) return;
    }
    setSelectedColor(color);
  };

  const handleFontSizeSelect = (size: typeof FONT_SIZES[0]) => {
    if (size.isPremium && !isPro) {
      const canAccess = requestFeatureAccess('advanced-text');
      if (!canAccess) return;
    }
    setSelectedFontSize(size);
  };

  const handleShadowSelect = (shadow: typeof TEXT_SHADOWS[0]) => {
    if (shadow.isPremium && !isPro) {
      const canAccess = requestFeatureAccess('advanced-text');
      if (!canAccess) return;
    }
    setSelectedShadow(shadow);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.overlay} onTouchEnd={onClose} />
        
        <View style={[styles.content, style]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Text</Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Preview */}
          <View style={styles.previewContainer}>
            <View style={styles.preview}>
              <Text
                style={[
                  styles.previewText,
                  {
                    fontFamily: selectedFont.family,
                    color: selectedColor.value,
                    fontSize: Math.min(selectedFontSize.value, 32),
                    textShadowColor: selectedShadow.color,
                    textShadowOffset: selectedShadow.offset,
                    textShadowOpacity: selectedShadow.opacity,
                    textShadowRadius: selectedShadow.radius,
                  },
                ]}
                numberOfLines={2}
              >
                {text || 'Preview'}
              </Text>
            </View>
          </View>

          {/* Text Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Enter text..."
              placeholderTextColor={colors.neutral[400]}
              autoFocus
              maxLength={100}
            />
          </View>

          <ScrollView
            style={styles.options}
            showsVerticalScrollIndicator={false}
          >
            {/* Font Family */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Font</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionScrollContent}
              >
                {FONTS.map((font) => {
                  const isPremium = font.isPremium && !isPro;
                  return (
                    <TouchableOpacity
                      key={font.name}
                      style={[
                        styles.optionItem,
                        selectedFont.name === font.name && styles.optionItemSelected,
                      ]}
                      onPress={() => handleFontSelect(font)}
                    >
                      <Text
                        style={[
                          styles.optionItemText,
                          {
                            fontFamily: font.family,
                          },
                          selectedFont.name === font.name && styles.optionItemTextSelected,
                        ]}
                      >
                        Aa
                      </Text>
                      {isPremium && (
                        <View style={styles.lockOverlay}>
                          <LockBadge size="small" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Font Size */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Size</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionScrollContent}
              >
                {FONT_SIZES.map((size) => {
                  const isPremium = size.isPremium && !isPro;
                  return (
                    <TouchableOpacity
                      key={size.label}
                      style={[
                        styles.sizeItem,
                        selectedFontSize.label === size.label && styles.sizeItemSelected,
                      ]}
                      onPress={() => handleFontSizeSelect(size)}
                    >
                      <Text
                        style={[
                          styles.sizeItemText,
                          selectedFontSize.label === size.label && styles.sizeItemTextSelected,
                        ]}
                      >
                        {size.label}
                      </Text>
                      {isPremium && (
                        <View style={styles.lockOverlaySmall}>
                          <LockBadge size="small" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Color */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Color</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionScrollContent}
              >
                {COLORS.map((color) => {
                  const isPremium = color.isPremium && !isPro;
                  return (
                    <TouchableOpacity
                      key={color.name}
                      style={styles.colorItem}
                      onPress={() => handleColorSelect(color)}
                    >
                      <View
                        style={[
                          styles.colorCircle,
                          { backgroundColor: color.value },
                          selectedColor.name === color.name && styles.colorCircleSelected,
                        ]}
                      />
                      {selectedColor.name === color.name && (
                        <View style={styles.colorCheck}>
                          <Text style={styles.colorCheckText}>✓</Text>
                        </View>
                      )}
                      {isPremium && (
                        <View style={styles.lockOverlaySmall}>
                          <LockBadge size="small" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Shadow */}
            <View style={styles.optionSection}>
              <Text style={styles.optionLabel}>Shadow</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.optionScrollContent}
              >
                {TEXT_SHADOWS.map((shadow) => {
                  const isPremium = shadow.isPremium && !isPro;
                  return (
                    <TouchableOpacity
                      key={shadow.name}
                      style={[
                        styles.shadowItem,
                        selectedShadow.name === shadow.name && styles.shadowItemSelected,
                      ]}
                      onPress={() => handleShadowSelect(shadow)}
                    >
                      <Text
                        style={[
                          styles.shadowItemText,
                          {
                            textShadowColor: shadow.color,
                            textShadowOffset: shadow.offset,
                            textShadowOpacity: shadow.opacity,
                            textShadowRadius: shadow.radius,
                          },
                          selectedShadow.name === shadow.name && styles.shadowItemTextSelected,
                        ]}
                      >
                        Aa
                      </Text>
                      {isPremium && (
                        <View style={styles.lockOverlaySmall}>
                          <LockBadge size="small" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>

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
                    Unlock Advanced Text Features
                  </Text>
                  <Text style={styles.proBannerSubtitle}>
                    Premium fonts, colors, and effects
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.proBannerButton}
                  onPress={() => {
                    const canAccess = requestFeatureAccess('advanced-text');
                    if (!canAccess) return;
                  }}
                >
                  <ProBadge size="small" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    maxHeight: SCREEN_WIDTH * 1.5,
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
  cancelButton: {
    paddingVertical: spacing.xs,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.neutral[600],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  saveButton: {
    paddingVertical: spacing.xs,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[600],
  },
  previewContainer: {
    paddingVertical: spacing.lg,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
  },
  preview: {
    paddingHorizontal: spacing.lg,
  },
  previewText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  input: {
    fontSize: 18,
    color: colors.neutral[900],
    paddingVertical: spacing.sm,
  },
  options: {
    maxHeight: 300,
  },
  optionSection: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  optionScrollContent: {
    paddingHorizontal: spacing.lg,
  },
  optionItem: {
    width: 60,
    height: 60,
    borderRadius: spacing.sm,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionItemSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  optionItemText: {
    fontSize: 18,
    color: colors.neutral[700],
    fontWeight: '600',
  },
  optionItemTextSelected: {
    color: colors.primary[600],
  },
  sizeItem: {
    width: 50,
    height: 50,
    borderRadius: spacing.sm,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeItemSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  sizeItemText: {
    fontSize: 14,
    color: colors.neutral[700],
    fontWeight: '600',
  },
  sizeItemTextSelected: {
    color: colors.primary[600],
  },
  colorItem: {
    width: 44,
    height: 44,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorCircleSelected: {
    borderColor: colors.primary[500],
    borderWidth: 3,
  },
  colorCheck: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCheckText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: colors.black,
    textShadowOffset: { width: 0, height: 1 },
    textShadowOpacity: 0.3,
    textShadowRadius: 2,
  },
  shadowItem: {
    width: 60,
    height: 60,
    borderRadius: spacing.sm,
    backgroundColor: colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  shadowItemSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  shadowItemText: {
    fontSize: 18,
    color: colors.neutral[700],
    fontWeight: '600',
  },
  shadowItemTextSelected: {
    color: colors.primary[600],
  },
  lockOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  lockOverlaySmall: {
    position: 'absolute',
    top: 2,
    right: 2,
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