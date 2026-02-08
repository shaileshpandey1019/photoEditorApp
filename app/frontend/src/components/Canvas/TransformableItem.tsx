import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { colors } from '../../theme';
import { TransformState, GESTURE_CONFIG } from '../../utils/gestures';
import { useProFeatures } from '../../hooks/useProFeatures';

interface TransformableItemProps {
  id: string;
  children: React.ReactNode;
  initialTransform?: Partial<TransformState>;
  bounds: { width: number; height: number };
  itemSize: { width: number; height: number };
  onUpdate?: (transform: TransformState) => void;
  isSelected?: boolean;
  onSelect?: () => void;
  onDeselect?: () => void;
  isPremium?: boolean;
  enableRotation?: boolean;
  enableScaling?: boolean;
  enableDrag?: boolean;
  snapToGrid?: boolean;
  snapToCenter?: boolean;
  showHandles?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const TransformableItem: React.FC<TransformableItemProps> = ({
  id,
  children,
  initialTransform,
  bounds,
  itemSize,
  onUpdate,
  isSelected,
  onSelect,
  onDeselect,
  isPremium = false,
  enableRotation = true,
  enableScaling = true,
  enableDrag = true,
  snapToGrid = false,
  snapToCenter = false,
  showHandles = true,
}) => {
  const { requestFeatureAccess } = useProFeatures();
  
  const transform = useRef<TransformState>({
    x: initialTransform?.x || 0,
    y: initialTransform?.y || 0,
    scale: initialTransform?.scale || 1,
    rotation: initialTransform?.rotation || 0,
  });

  const pan = useRef(new Animated.ValueXY({ x: transform.current.x, y: transform.current.y })).current;
  const scale = useRef(new Animated.Value(transform.current.scale)).current;
  const rotation = useRef(new Animated.Value(transform.current.rotation)).current;

  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [lastDistance, setLastDistance] = useState(0);
  const [lastAngle, setLastAngle] = useState(0);

  const updateTransform = () => {
    const newTransform: TransformState = {
      x: pan.x._value,
      y: pan.y._value,
      scale: scale._value,
      rotation: rotation._value,
    };
    transform.current = newTransform;
    onUpdate?.(newTransform);
  };

  const calculateDistance = (touches: any[]): number => {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateAngle = (touches: any[]): number => {
    const dx = touches[0].pageX - touches[1].pageX;
    const dy = touches[0].pageY - touches[1].pageY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (evt: GestureResponderEvent) => {
        const { nativeEvent } = evt;
        
        if (nativeEvent.numberActiveTouches === 1) {
          // Single touch - drag
          if (!enableDrag) return;
          
          if (isPremium) {
            const canAccess = requestFeatureAccess('advanced-editing');
            if (!canAccess) return;
          }

          setIsDragging(true);
          pan.setOffset({ x: pan.x._value, y: pan.y._value });
          pan.setValue({ x: 0, y: 0 });
          onSelect?.();
        } else if (nativeEvent.numberActiveTouches === 2) {
          // Two touches - pinch and rotate
          const distance = calculateDistance(nativeEvent.touches);
          const angle = calculateAngle(nativeEvent.touches);
          
          setLastDistance(distance);
          setLastAngle(angle);
          
          if (enableScaling) {
            setIsScaling(true);
            scale.setOffset(scale._value);
            scale.setValue(1);
          }
          
          if (enableRotation) {
            setIsRotating(true);
            rotation.setOffset(rotation._value);
            rotation.setValue(0);
          }
          
          onSelect?.();
        }
      },

      onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const { nativeEvent } = evt;
        
        if (nativeEvent.numberActiveTouches === 1 && isDragging) {
          // Drag
          let newX = gestureState.dx;
          let newY = gestureState.dy;

          // Apply snap to grid
          if (snapToGrid) {
            const snapThreshold = GESTURE_CONFIG.SNAP_THRESHOLD;
            const gridSize = 20;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const absoluteX = newX + pan.x._offset;
            const absoluteY = newY + pan.y._offset;
            
            if (Math.abs(absoluteX - centerX) < snapThreshold) {
              newX = centerX - pan.x._offset;
            } else if (Math.abs(absoluteX % gridSize) < snapThreshold) {
              newX = Math.round(absoluteX / gridSize) * gridSize - pan.x._offset;
            }
            
            if (Math.abs(absoluteY - centerY) < snapThreshold) {
              newY = centerY - pan.y._offset;
            } else if (Math.abs(absoluteY % gridSize) < snapThreshold) {
              newY = Math.round(absoluteY / gridSize) * gridSize - pan.y._offset;
            }
          }

          // Clamp to bounds
          const halfWidth = (itemSize.width * scale._value) / 2;
          const halfHeight = (itemSize.height * scale._value) / 2;
          const padding = GESTURE_CONFIG.BOUNDARY_PADDING;

          const minX = -bounds.width / 2 + halfWidth - padding;
          const maxX = bounds.width / 2 - halfWidth + padding;
          const minY = -bounds.height / 2 + halfHeight - padding;
          const maxY = bounds.height / 2 - halfHeight + padding;

          newX = Math.max(minX, Math.min(maxX, newX));
          newY = Math.max(minY, Math.min(maxY, newY));

          pan.setValue({ x: newX, y: newY });
        } else if (nativeEvent.numberActiveTouches === 2) {
          // Two touches - pinch and rotate
          const distance = calculateDistance(nativeEvent.touches);
          const angle = calculateAngle(nativeEvent.touches);

          // Pinch to scale
          if (isScaling) {
            const scaleChange = distance / lastDistance;
            const newScale = scaleChange;
            
            const minScale = GESTURE_CONFIG.MIN_SCALE;
            const maxScale = GESTURE_CONFIG.MAX_SCALE;
            
            const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));
            scale.setValue(clampedScale);
            setLastDistance(distance);
          }

          // Rotate
          if (isRotating) {
            const angleChange = angle - lastAngle;
            rotation.setValue(angleChange);
            setLastAngle(angle);
          }
        }
      },

      onPanResponderRelease: () => {
        if (isDragging) {
          pan.flattenOffset();
          setIsDragging(false);
        }
        
        if (isScaling) {
          scale.flattenOffset();
          setIsScaling(false);
        }
        
        if (isRotating) {
          rotation.flattenOffset();
          setIsRotating(false);
        }

        // Normalize angle to -180 to 180
        const normalizedRotation = rotation._value % 360;
        const finalRotation = normalizedRotation > 180 ? normalizedRotation - 360 : normalizedRotation;
        rotation.setValue(finalRotation);

        updateTransform();
      },

      onPanResponderTerminate: () => {
        if (isDragging) {
          pan.flattenOffset();
          setIsDragging(false);
        }
        
        if (isScaling) {
          scale.flattenOffset();
          setIsScaling(false);
        }
        
        if (isRotating) {
          rotation.flattenOffset();
          setIsRotating(false);
        }

        updateTransform();
      },

      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  const handleDoublePress = () => {
    // Reset transform to center
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();

    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    Animated.spring(rotation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const transformStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      { scale: scale },
      { rotate: rotation.interpolate({
        inputRange: [-360, 360],
        outputRange: ['-360deg', '360deg'],
      })},
    ],
  };

  return (
    <Animated.View
      ref={panResponder as any}
      {...panResponder.panHandlers}
      style={[
        styles.container,
        transformStyle,
        isSelected && styles.selected,
      ]}
    >
      <View style={styles.itemContainer}>
        {children}
      </View>
      
      {isSelected && showHandles && (
        <>
          <View style={[styles.handle, styles.handleTopLeft]} />
          <View style={[styles.handle, styles.handleTopRight]} />
          <View style={[styles.handle, styles.handleBottomLeft]} />
          <View style={[styles.handle, styles.handleBottomRight]} />
          <View style={[styles.handle, styles.handleTop]} />
          <View style={[styles.handle, styles.handleBottom]} />
          <View style={[styles.handle, styles.handleLeft]} />
          <View style={[styles.handle, styles.handleRight]} />
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '100%',
    height: '100%',
  },
  selected: {
    zIndex: 100,
  },
  handle: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary[500],
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  handleTopLeft: {
    top: -8,
    left: -8,
  },
  handleTopRight: {
    top: -8,
    right: -8,
  },
  handleBottomLeft: {
    bottom: -8,
    left: -8,
  },
  handleBottomRight: {
    bottom: -8,
    right: -8,
  },
  handleTop: {
    top: -8,
    left: '50%',
    marginLeft: -8,
  },
  handleBottom: {
    bottom: -8,
    left: '50%',
    marginLeft: -8,
  },
  handleLeft: {
    left: -8,
    top: '50%',
    marginTop: -8,
  },
  handleRight: {
    right: -8,
    top: '50%',
    marginTop: -8,
  },
});