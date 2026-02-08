/**
 * Device Performance Detection
 * Helps determine appropriate export quality based on device capabilities
 */
import { Platform } from 'react-native';

export interface DeviceCapabilities {
  totalRAM: number; // MB
  isLowEnd: boolean;
  isMidRange: boolean;
  isHighEnd: boolean;
  maxExportResolution: number;
  recommendedExportQuality: 'low' | 'medium' | 'high';
}

// RAM thresholds in MB
const RAM_THRESHOLDS = {
  LOW_END: 2048,   // 2GB and below
  MID_RANGE: 4096, // 3-4GB
  HIGH_END: 6144,  // 6GB and above
};

// Export resolutions
const EXPORT_RESOLUTIONS = {
  LOW_END: 1080,    // 1080p for low-end devices
  MID_RANGE: 1920,  // 1080p for mid-range (can go higher but safer)
  HIGH_END: 2160,   // 4K for high-end devices
};

/**
 * Get device capabilities
 * Note: Actual RAM detection requires native modules
 * This is a simplified version with platform-specific defaults
 */
export const getDeviceCapabilities = (): DeviceCapabilities => {
  // In production, you'd use a native module like react-native-device-info
  // For now, we use platform defaults and can be enhanced
  const isAndroid = Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';

  // Default values (these should be replaced with actual device detection)
  // For now, we assume mid-range by default
  const totalRAM = isIOS ? 6144 : 4096; // iOS devices generally have more RAM

  const isLowEnd = totalRAM <= RAM_THRESHOLDS.LOW_END;
  const isMidRange = totalRAM > RAM_THRESHOLDS.LOW_END && totalRAM < RAM_THRESHOLDS.HIGH_END;
  const isHighEnd = totalRAM >= RAM_THRESHOLDS.HIGH_END;

  let maxExportResolution: number;
  let recommendedExportQuality: 'low' | 'medium' | 'high';

  if (isLowEnd) {
    maxExportResolution = EXPORT_RESOLUTIONS.LOW_END;
    recommendedExportQuality = 'low';
  } else if (isHighEnd) {
    maxExportResolution = EXPORT_RESOLUTIONS.HIGH_END;
    recommendedExportQuality = 'high';
  } else {
    maxExportResolution = EXPORT_RESOLUTIONS.MID_RANGE;
    recommendedExportQuality = 'medium';
  }

  return {
    totalRAM,
    isLowEnd,
    isMidRange,
    isHighEnd,
    maxExportResolution,
    recommendedExportQuality,
  };
};

/**
 * Check if device can handle 4K export
 */
export const canExport4K = (): boolean => {
  const capabilities = getDeviceCapabilities();
  return capabilities.isHighEnd;
};

/**
 * Get appropriate export resolution for user
 * @param userIsPro - Whether user has Pro subscription
 * @param requestedQuality - User's requested quality
 * @returns Safe export resolution
 */
export const getSafeExportResolution = (
  userIsPro: boolean,
  requestedQuality: 'low' | 'medium' | 'high'
): number => {
  const capabilities = getDeviceCapabilities();

  // Free users are limited to 1080p
  if (!userIsPro) {
    return EXPORT_RESOLUTIONS.LOW_END;
  }

  // Pro users get device-appropriate resolution
  switch (requestedQuality) {
    case 'high':
      return Math.min(EXPORT_RESOLUTIONS.HIGH_END, capabilities.maxExportResolution);
    case 'medium':
      return Math.min(EXPORT_RESOLUTIONS.MID_RANGE, capabilities.maxExportResolution);
    case 'low':
    default:
      return EXPORT_RESOLUTIONS.LOW_END;
  }
};

/**
 * Show warning for 4K export on mid-range devices
 */
export const shouldShow4KWarning = (
  userIsPro: boolean,
  requestedQuality: 'low' | 'medium' | 'high'
): boolean => {
  if (!userIsPro || requestedQuality !== 'high') {
    return false;
  }

  const capabilities = getDeviceCapabilities();
  return capabilities.isMidRange;
};

/**
 * Get export warning message
 */
export const getExportWarningMessage = (
  userIsPro: boolean,
  requestedQuality: 'low' | 'medium' | 'high'
): string | null => {
  if (!userIsPro) {
    return 'Free users are limited to 1080p export. Upgrade to Pro for higher resolutions.';
  }

  if (shouldShow4KWarning(userIsPro, requestedQuality)) {
    return '4K export may be slow on your device. Consider using 1080p for better performance.';
  }

  return null;
};