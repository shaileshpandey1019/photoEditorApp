/**
 * BottomSheet Component - Photo Collage Maker
 * Animated bottom sheet modal for tool panels
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '@/theme';

// ============================================
// TYPES
// ============================================
export type SnapPoint = number | string;

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  snapPoints?: SnapPoint[];
  initialSnapIndex?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  enableDrag?: boolean;
  enableBackdrop?: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// COMPONENT
// ============================================
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = ['25%', '50%', '75%', '90%'],
  initialSnapIndex = 1,
  children,
  style,
  contentStyle,
  enableDrag = true,
  enableBackdrop = true,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const currentSnapIndex = useRef(initialSnapIndex);

  // Parse snap point to pixels
  const parseSnapPoint = (point: SnapPoint): number => {
    if (typeof point === 'string') {
      if (point.endsWith('%')) {
        return (parseFloat(point) / 100) * SCREEN_HEIGHT;
      }
    }
    return point as number;
  };

  // Get snap points in pixels
  const snapPointsPixels = snapPoints.map(parseSnapPoint);

  // Show/hide animation
  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: snapPointsPixels[currentSnapIndex.current],
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [isVisible]);

  // Pan responder for drag gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enableDrag && isVisible,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        enableDrag && isVisible && Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(snapPointsPixels[currentSnapIndex.current] + gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentPosition = snapPointsPixels[currentSnapIndex.current] + gestureState.dy;
        
        // Find nearest snap point
        let nearestIndex = 0;
        let minDistance = Math.abs(currentPosition - snapPointsPixels[0]);
        
        snapPointsPixels.forEach((point, index) => {
          const distance = Math.abs(currentPosition - point);
          if (distance < minDistance) {
            minDistance = distance;
            nearestIndex = index;
          }
        });

        // Check if user swiped down enough to close
        if (gestureState.dy > 100 && currentSnapIndex.current === 0) {
          onClose();
        } else {
          currentSnapIndex.current = nearestIndex;
          Animated.spring(translateY, {
            toValue: snapPointsPixels[nearestIndex],
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    })
  ).current;

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      {enableBackdrop && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop]} />
        </TouchableWithoutFeedback>
      )}

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        {/* Handle */}
        <View style={styles.handleContainer} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        {/* Content */}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Animated.View>
    </>
  );
};

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    ...shadows.xl,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingBottom: spacing.xs,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral[300],
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.xl,
  },
});

export default BottomSheet;