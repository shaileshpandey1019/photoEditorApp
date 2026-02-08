import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme';

interface SnapGuidesProps {
  showVertical?: boolean;
  showHorizontal?: boolean;
  showCenter?: boolean;
  showCorners?: boolean;
  verticalPosition?: number;
  horizontalPosition?: number;
  opacity?: number;
  style?: any;
}

export const SnapGuides: React.FC<SnapGuidesProps> = ({
  showVertical = false,
  showHorizontal = false,
  showCenter = false,
  showCorners = false,
  verticalPosition = 50,
  horizontalPosition = 50,
  opacity = 0.6,
  style,
}) => {
  const opacityValue = new Animated.Value(opacity);

  React.useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: showVertical || showHorizontal || showCenter || showCorners ? opacity : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [showVertical, showHorizontal, showCenter, showCorners, opacity]);

  return (
    <View style={[styles.container, style]}>
      {/* Vertical guide */}
      <Animated.View
        style={[
          styles.guideLine,
          styles.verticalGuide,
          {
            left: `${verticalPosition}%`,
            opacity: opacityValue,
          },
          !showVertical && styles.hidden,
        ]}
      />
      
      {/* Horizontal guide */}
      <Animated.View
        style={[
          styles.guideLine,
          styles.horizontalGuide,
          {
            top: `${horizontalPosition}%`,
            opacity: opacityValue,
          },
          !showHorizontal && styles.hidden,
        ]}
      />
      
      {/* Center guides */}
      <Animated.View
        style={[
          styles.guideLine,
          styles.verticalGuide,
          styles.centerGuide,
          {
            opacity: opacityValue,
          },
          !showCenter && styles.hidden,
        ]}
      />
      <Animated.View
        style={[
          styles.guideLine,
          styles.horizontalGuide,
          styles.centerGuide,
          {
            opacity: opacityValue,
          },
          !showCenter && styles.hidden,
        ]}
      />
      
      {/* Corner guides */}
      {showCorners && (
        <Animated.View style={{ opacity: opacityValue }}>
          <View style={[styles.cornerGuide, styles.topLeft]} />
          <View style={[styles.cornerGuide, styles.topRight]} />
          <View style={[styles.cornerGuide, styles.bottomLeft]} />
          <View style={[styles.cornerGuide, styles.bottomRight]} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  guideLine: {
    position: 'absolute',
    backgroundColor: colors.accent.cyan,
    zIndex: 999,
  },
  verticalGuide: {
    width: 1,
    top: 0,
    bottom: 0,
  },
  horizontalGuide: {
    height: 1,
    left: 0,
    right: 0,
  },
  centerGuide: {
    left: '50%',
    top: '50%',
  },
  hidden: {
    display: 'none',
  },
  cornerGuide: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: colors.accent.cyan,
    borderWidth: 1,
  },
  topLeft: {
    top: 20,
    left: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 20,
    right: 20,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});