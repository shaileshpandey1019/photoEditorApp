import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ViewStyle,
  Image,
  Text,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { Template, Frame } from '../../data/templates';
import { colors, spacing } from '../../theme';
import { TransformableItem } from './TransformableItem';
import { SnapGuides } from './SnapGuides';
import { TransformState } from '../../utils/gestures';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface CanvasItem {
  id: string;
  type: 'photo' | 'sticker' | 'text';
  uri?: string;
  content?: string;
  transform: TransformState;
  frameId?: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    strokeWidth?: number;
    strokeColor?: string;
    shadowColor?: string;
    shadowOffset?: { x: number; y: number };
    shadowOpacity?: number;
    shadowRadius?: number;
  };
  isPremium?: boolean;
  zIndex?: number;
}

interface CollageCanvasProps {
  template: Template;
  photos: { frameId: string; uri: string }[];
  stickers?: CanvasItem[];
  texts?: CanvasItem[];
  style?: ViewStyle;
  canvasSize?: number;
  onPhotoAdd?: (frameId: string) => void;
  onPhotoRemove?: (frameId: string) => void;
  onStickerUpdate?: (id: string, transform: TransformState) => void;
  onTextUpdate?: (id: string, transform: TransformState) => void;
  onItemSelect?: (id: string, type: 'photo' | 'sticker' | 'text') => void;
  onItemDeselect?: () => void;
  selectedItem?: { id: string; type: 'photo' | 'sticker' | 'text' } | null;
  enableSnapGuides?: boolean;
  enableProFeatures?: boolean;
  readonly?: boolean;
}

export const CollageCanvas: React.FC<CollageCanvasProps> = ({
  template,
  photos,
  stickers = [],
  texts = [],
  style,
  canvasSize = SCREEN_WIDTH - spacing.md * 2,
  onPhotoAdd,
  onPhotoRemove,
  onStickerUpdate,
  onTextUpdate,
  onItemSelect,
  onItemDeselect,
  selectedItem,
  enableSnapGuides = true,
  enableProFeatures = true,
  readonly = false,
}) => {
  const canvasRef = useRef<View>(null);
  
  const [showVerticalGuide, setShowVerticalGuide] = useState(false);
  const [showHorizontalGuide, setShowHorizontalGuide] = useState(false);
  const [showCenterGuide, setShowCenterGuide] = useState(false);
  const [guidePosition, setGuidePosition] = useState({ x: 50, y: 50 });

  const canvasStyle = useMemo(() => ({
    width: canvasSize,
    height: canvasSize * (template.aspectRatio === '9:16' ? 1.78 : 
                          template.aspectRatio === '4:5' ? 1.25 : 
                          template.aspectRatio === '1:1' ? 1 : 1),
    ...style,
  }), [canvasSize, template.aspectRatio, style]);

  const getFrameStyle = (frame: Frame) => {
    return {
      position: 'absolute' as const,
      left: `${frame.x}%`,
      top: `${frame.y}%`,
      width: `${frame.width}%`,
      height: `${frame.height}%`,
      transform: frame.rotation ? [{ rotate: `${frame.rotation}deg` }] : undefined,
      zIndex: frame.zIndex || 0,
    };
  };

  const getPhotoUri = (frameId: string): string | undefined => {
    return photos.find(p => p.frameId === frameId)?.uri;
  };

  const handleFramePress = (frameId: string) => {
    if (readonly) return;
    
    const hasPhoto = photos.some(p => p.frameId === frameId);
    if (hasPhoto) {
      onItemSelect?.(frameId, 'photo');
    } else {
      onPhotoAdd?.(frameId);
    }
  };

  const handleTransformUpdate = (
    id: string,
    type: 'sticker' | 'text',
    transform: TransformState
  ) => {
    if (type === 'sticker') {
      onStickerUpdate?.(id, transform);
    } else {
      onTextUpdate?.(id, transform);
    }

    // Update snap guides
    if (enableSnapGuides) {
      const centerX = 50;
      const centerY = 50;
      const snapThreshold = 5;

      setShowCenterGuide(
        Math.abs(transform.x) < snapThreshold &&
        Math.abs(transform.y) < snapThreshold
      );

      setGuidePosition({
        x: (transform.x / canvasStyle.width) * 100 + centerX,
        y: (transform.y / canvasStyle.height) * 100 + centerY,
      });
    }
  };

  const getFrameBounds = (frame: Frame) => {
    const canvasWidth = canvasStyle.width;
    const canvasHeight = canvasStyle.height;
    return {
      width: (frame.width / 100) * canvasWidth,
      height: (frame.height / 100) * canvasHeight,
    };
  };

  const isItemSelected = (id: string, type: 'photo' | 'sticker' | 'text') => {
    return selectedItem?.id === id && selectedItem?.type === type;
  };

  return (
    <View style={styles.container}>
      <View
        ref={canvasRef}
        style={[styles.canvas, canvasStyle]}
        collapsable={false}
      >
        {/* Background */}
        <View style={styles.background} />

        {/* Template frames */}
        {template.frames.map((frame) => {
          const photoUri = getPhotoUri(frame.id);
          const hasPhoto = !!photoUri;
          const isSelected = isItemSelected(frame.id, 'photo');

          return (
            <View
              key={frame.id}
              style={getFrameStyle(frame)}
            >
              {hasPhoto ? (
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: photoUri }}
                    style={styles.photo}
                    resizeMode="cover"
                  />
                  {!readonly && (
                    <View style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>✕</Text>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={styles.emptyFrame}
                  onTouchEnd={() => handleFramePress(frame.id)}
                >
                  <Text style={styles.emptyFrameText}>+</Text>
                  <Text style={styles.emptyFrameSubtext}>Tap to add</Text>
                </View>
              )}
              
              {isSelected && !readonly && (
                <View style={styles.selectedBorder} />
              )}
            </View>
          );
        })}

        {/* Stickers layer */}
        {!readonly && stickers.map((sticker) => {
          const isSelected = isItemSelected(sticker.id, 'sticker');
          const bounds = getFrameBounds(template.frames[0]);
          
          return (
            <TransformableItem
              key={sticker.id}
              id={sticker.id}
              isSelected={isSelected}
              onSelect={() => onItemSelect?.(sticker.id, 'sticker')}
              onDeselect={onItemDeselect}
              bounds={canvasStyle}
              itemSize={{ width: 100, height: 100 }}
              initialTransform={sticker.transform}
              onUpdate={(transform) => handleTransformUpdate(sticker.id, 'sticker', transform)}
              isPremium={sticker.isPremium}
              snapToGrid={enableSnapGuides}
              showHandles={isSelected}
            >
              {sticker.uri ? (
                <Image
                  source={{ uri: sticker.uri }}
                  style={styles.sticker}
                  resizeMode="contain"
                />
              ) : null}
            </TransformableItem>
          );
        })}

        {/* Text layer */}
        {!readonly && texts.map((text) => {
          const isSelected = isItemSelected(text.id, 'text');
          const bounds = getFrameBounds(template.frames[0]);
          
          return (
            <TransformableItem
              key={text.id}
              id={text.id}
              isSelected={isSelected}
              onSelect={() => onItemSelect?.(text.id, 'text')}
              onDeselect={onItemDeselect}
              bounds={canvasStyle}
              itemSize={{ width: 150, height: 50 }}
              initialTransform={text.transform}
              onUpdate={(transform) => handleTransformUpdate(text.id, 'text', transform)}
              showHandles={isSelected}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: text.style?.fontSize || 24,
                    fontFamily: text.style?.fontFamily || 'System',
                    color: text.style?.color || colors.white,
                    backgroundColor: text.style?.backgroundColor || 'transparent',
                    textShadowColor: text.style?.shadowColor || colors.black,
                    textShadowOffset: text.style?.shadowOffset || { width: 0, height: 0 },
                    textShadowOpacity: text.style?.shadowOpacity || 0,
                    textShadowRadius: text.style?.shadowRadius || 0,
                  },
                ]}
                numberOfLines={1}
              >
                {text.content}
              </Text>
            </TransformableItem>
          );
        })}

        {/* Snap guides */}
        {enableSnapGuides && !readonly && (
          <SnapGuides
            showVertical={showVerticalGuide}
            showHorizontal={showHorizontalGuide}
            showCenter={showCenterGuide}
            verticalPosition={guidePosition.x}
            horizontalPosition={guidePosition.y}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvas: {
    backgroundColor: colors.white,
    borderRadius: spacing.sm,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.neutral[100],
  },
  photoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: -2,
  },
  emptyFrame: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral[200],
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyFrameText: {
    fontSize: 32,
    color: colors.neutral[400],
    fontWeight: '300',
  },
  emptyFrameSubtext: {
    fontSize: 12,
    color: colors.neutral[400],
    marginTop: spacing.xs,
  },
  selectedBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderColor: colors.primary[500],
    borderRadius: 2,
  },
  sticker: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
});