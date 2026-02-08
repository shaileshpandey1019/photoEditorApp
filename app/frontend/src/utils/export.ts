/**
 * Export Utilities - Photo Collage Maker
 * Functions for exporting collages to gallery and sharing
 */

import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import { Platform, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import {
  getSafeExportResolution,
  getExportWarningMessage,
  type DeviceCapabilities,
} from './device';

// ============================================
// EXPORT OPTIONS
// ============================================
export type ExportQuality = 'low' | 'medium' | 'high';
export type ExportFormat = 'png' | 'jpg';

export interface ExportOptions {
  quality: ExportQuality;
  format: ExportFormat;
  transparent?: boolean;
  watermark?: boolean;
  userIsPro?: boolean;
  showWarning?: boolean;
}

// ============================================
// QUALITY SETTINGS
// ============================================
const QUALITY_SETTINGS = {
  low: { width: 1080, quality: 0.7 },
  medium: { width: 1920, quality: 0.85 },
  high: { width: 2160, quality: 1.0 },
};

// ============================================
// HISTORY SETTINGS
// ============================================
export const MAX_HISTORY_SIZE = 20; // Limit to last 20 actions to prevent memory issues

// ============================================
// REQUEST PERMISSIONS
// ============================================
export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return false;
  }
};

// ============================================
// CAPTURE CANVAS
// ============================================
export const captureCanvas = async (
  ref: any,
  options: ExportOptions = { quality: 'high', format: 'png' }
): Promise<string> => {
  try {
    // Show warning if needed
    if (options.showWarning !== false) {
      const warning = getExportWarningMessage(
        options.userIsPro ?? false,
        options.quality
      );
      if (warning) {
        await new Promise<void>((resolve) => {
          Alert.alert(
            'Export Notice',
            warning,
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                  resolve();
                  throw new Error('Export cancelled by user');
                },
              },
              {
                text: 'Continue',
                onPress: () => resolve(),
              },
            ],
            { cancelable: false }
          );
        });
      }
    }

    // Get safe resolution based on device and user status
    const resolution = getSafeExportResolution(
      options.userIsPro ?? false,
      options.quality
    );
    const settings = QUALITY_SETTINGS[options.quality];
    
    const uri = await captureRef(ref, {
      format: options.format === 'png' ? 'png' : 'jpg',
      quality: settings.quality,
      width: resolution,
      result: 'tmpfile',
    });

    return uri;
  } catch (error) {
    console.error('Error capturing canvas:', error);
    if (error instanceof Error && error.message === 'Export cancelled by user') {
      throw error;
    }
    throw new Error('Failed to capture canvas');
  }
};

// ============================================
// SAVE TO GALLERY
// ============================================
export const saveToGallery = async (
  uri: string,
  filename: string = `collage_${Date.now()}`
): Promise<boolean> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Please grant photo library permission to save your collage.',
        [{ text: 'OK' }]
      );
      return false;
    }

    // Haptic feedback
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('Photo Collage Maker', asset, false);
    
    return true;
  } catch (error) {
    console.error('Error saving to gallery:', error);
    throw new Error('Failed to save to gallery');
  }
};

// ============================================
// SHARE COLLAGE
// ============================================
export const shareCollage = async (uri: string): Promise<void> => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    
    if (!isAvailable) {
      Alert.alert(
        'Sharing Not Available',
        'Sharing is not available on this device.',
        [{ text: 'OK' }]
      );
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: uri.endsWith('.png') ? 'image/png' : 'image/jpeg',
      dialogTitle: 'Share your collage',
    });
  } catch (error) {
    console.error('Error sharing:', error);
    throw new Error('Failed to share collage');
  }
};

// ============================================
// EXPORT AND SAVE
// ============================================
export const exportAndSave = async (
  ref: any,
  options: ExportOptions = { quality: 'high', format: 'png' }
): Promise<boolean> => {
  try {
    // Capture canvas
    const uri = await captureCanvas(ref, options);
    
    // Save to gallery
    const success = await saveToGallery(uri);
    
    return success;
  } catch (error) {
    console.error('Error exporting and saving:', error);
    throw error;
  }
};

// ============================================
// EXPORT AND SHARE
// ============================================
export const exportAndShare = async (
  ref: any,
  options: ExportOptions = { quality: 'high', format: 'png' }
): Promise<void> => {
  try {
    // Capture canvas
    const uri = await captureCanvas(ref, options);
    
    // Share
    await shareCollage(uri);
  } catch (error) {
    console.error('Error exporting and sharing:', error);
    throw error;
  }
};

// ============================================
// DELETE TEMP FILE
// ============================================
export const deleteTempFile = async (uri: string): Promise<void> => {
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (error) {
    console.error('Error deleting temp file:', error);
  }
};

// ============================================
// GET FILE SIZE
// ============================================
export const getFileSize = async (uri: string): Promise<number> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists && info.size ? info.size : 0;
  } catch (error) {
    console.error('Error getting file size:', error);
    return 0;
  }
};

// ============================================
// FORMAT FILE SIZE
// ============================================
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default {
  requestMediaLibraryPermissions,
  captureCanvas,
  saveToGallery,
  shareCollage,
  exportAndSave,
  exportAndShare,
  deleteTempFile,
  getFileSize,
  formatFileSize,
};