/**
 * Gesture Utilities - Photo Collage Maker
 * Helper functions for handling gestures on canvas items
 */

import { PanResponder, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// GESTURE CONFIG
// ============================================
export const GESTURE_CONFIG = {
  ROTATION_THRESHOLD: 10, // degrees
  PINCH_THRESHOLD: 0.1, // scale
  DRAG_THRESHOLD: 5, // pixels
  SNAP_THRESHOLD: 20, // pixels
  MIN_SCALE: 0.5,
  MAX_SCALE: 3,
  BOUNDARY_PADDING: 50,
};

// ============================================
// TRANSFORM STATE
// ============================================
export interface TransformState {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export const initialTransform: TransformState = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
};

// ============================================
// SNAP TO GRID
// ============================================
export const snapToGrid = (
  value: number,
  gridSize: number = 10
): number => {
  return Math.round(value / gridSize) * gridSize;
};

// ============================================
// SNAP TO CENTER
// ============================================
export const snapToCenter = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  threshold: number = GESTURE_CONFIG.SNAP_THRESHOLD
): { x: number; y: number; snapped: boolean } => {
  const distX = Math.abs(x - centerX);
  const distY = Math.abs(y - centerY);
  
  if (distX < threshold && distY < threshold) {
    return { x: centerX, y: centerY, snapped: true };
  }
  
  return { x, y, snapped: false };
};

// ============================================
// CLAMP VALUE
// ============================================
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// ============================================
// CLAMP SCALE
// ============================================
export const clampScale = (scale: number): number => {
  return clamp(
    scale,
    GESTURE_CONFIG.MIN_SCALE,
    GESTURE_CONFIG.MAX_SCALE
  );
};

// ============================================
// CALCULATE BOUNDARIES
// ============================================
export const calculateBoundaries = (
  itemWidth: number,
  itemHeight: number,
  containerWidth: number,
  containerHeight: number
): { minX: number; maxX: number; minY: number; maxY: number } => {
  const padding = GESTURE_CONFIG.BOUNDARY_PADDING;
  
  return {
    minX: -itemWidth / 2 + padding,
    maxX: containerWidth - itemWidth / 2 - padding,
    minY: -itemHeight / 2 + padding,
    maxY: containerHeight - itemHeight / 2 - padding,
  };
};

// ============================================
// CHECK BOUNDARIES
// ============================================
export const checkBoundaries = (
  x: number,
  y: number,
  boundaries: { minX: number; maxX: number; minY: number; maxY: number }
): { x: number; y: number } => {
  return {
    x: clamp(x, boundaries.minX, boundaries.maxX),
    y: clamp(y, boundaries.minY, boundaries.maxY),
  };
};

// ============================================
// ROTATE AROUND POINT
// ============================================
export const rotateAroundPoint = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  angle: number
): { x: number; y: number } => {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  
  const dx = x - centerX;
  const dy = y - centerY;
  
  return {
    x: centerX + dx * cos - dy * sin,
    y: centerY + dx * sin + dy * cos,
  };
};

// ============================================
// NORMALIZE ANGLE
// ============================================
export const normalizeAngle = (angle: number): number => {
  while (angle > 180) angle -= 360;
  while (angle < -180) angle += 360;
  return angle;
};

// ============================================
// RESET TRANSFORM
// ============================================
export const resetTransform = (
  setTransform: (transform: TransformState) => void
): void => {
  setTransform(initialTransform);
};

// ============================================
// DOUBLE TAP TO RESET
// ============================================
export const createDoubleTapHandler = (
  onDoubleTap: () => void,
  delay: number = 300
): { handleTap: () => void; } => {
  let lastTap = 0;
  
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap < delay) {
      onDoubleTap();
    }
    lastTap = now;
  };
  
  return { handleTap };
};

// ============================================
// LONG PRESS HANDLER
// ============================================
export const createLongPressHandler = (
  onLongPress: () => void,
  delay: number = 500
): PanResponderCallbacks => {
  let longPressTimer: NodeJS.Timeout | null = null;
  
  return {
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      longPressTimer = setTimeout(() => {
        onLongPress();
        longPressTimer = null;
      }, delay);
    },
    onPanResponderRelease: () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    },
    onPanResponderTerminate: () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    },
  } as any;
};

// ============================================
// ANIMATED TRANSFORM STYLE
// ============================================
export const useAnimatedTransform = (
  x: Animated.SharedValue<number>,
  y: Animated.SharedValue<number>,
  scale: Animated.SharedValue<number>,
  rotation: Animated.SharedValue<number>
) => {
  return useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });
};

// ============================================
// SPRING ANIMATION
// ============================================
export const animateToTarget = (
  value: Animated.SharedValue<number>,
  target: number,
  stiffness: number = 300,
  damping: number = 30
) => {
  'worklet';
  value.value = withSpring(target, {
    stiffness,
    damping,
  });
};

// ============================================
// ANIMATE TO TARGET (WITH CALLBACK)
// ============================================
export const animateToTargetWithCallback = (
  value: Animated.SharedValue<number>,
  target: number,
  callback: () => void,
  stiffness: number = 300,
  damping: number = 30
) => {
  'worklet';
  value.value = withSpring(
    target,
    {
      stiffness,
      damping,
    },
    (finished) => {
      if (finished) {
        runOnJS(callback)();
      }
    }
  );
};

export default {
  GESTURE_CONFIG,
  initialTransform,
  snapToGrid,
  snapToCenter,
  clamp,
  clampScale,
  calculateBoundaries,
  checkBoundaries,
  rotateAroundPoint,
  normalizeAngle,
  resetTransform,
  createDoubleTapHandler,
  createLongPressHandler,
  useAnimatedTransform,
  animateToTarget,
  animateToTargetWithCallback,
};