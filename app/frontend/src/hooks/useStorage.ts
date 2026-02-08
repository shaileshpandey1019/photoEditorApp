/**
 * useStorage Hook - Photo Collage Maker
 * Manages AsyncStorage for offline-first data persistence
 */

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  COLLAGES: '@photocollage_collages',
  RECENT_TEMPLATES: '@photocollage_recent_templates',
  PRO_STATUS: '@photocollage_pro_status',
  USER_PREFERENCES: '@photocollage_preferences',
} as const;

// ============================================
// TYPES
// ============================================
export interface Collage {
  id: string;
  templateId: string;
  thumbnail: string;
  photos: Array<{ frameId: string; uri: string }>;
  stickers?: Array<{ id: string; assetPath: string; x: number; y: number; scale: number; rotation: number }>;
  texts?: Array<{ id: string; content: string; x: number; y: number; fontSize: number; color: string }>;
  createdAt: number;
  updatedAt: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  defaultAspectRatio: string;
  exportQuality: 'low' | 'medium' | 'high';
}

// ============================================
// HOOK
// ============================================
export function useStorage() {
  const [collages, setCollages] = useState<Collage[]>([]);
  const [recentTemplates, setRecentTemplates] = useState<string[]>([]);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    defaultAspectRatio: '1:1',
    exportQuality: 'high',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  // Load all data from storage
  const loadAllData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadCollages(),
        loadRecentTemplates(),
        loadProStatus(),
        loadPreferences(),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // COLLAGES
  // ============================================
  const loadCollages = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.COLLAGES);
      if (data) {
        setCollages(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading collages:', error);
    }
  };

  const saveCollage = async (collage: Omit<Collage, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCollage: Collage = {
        ...collage,
        id: `collage_${Date.now()}`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const updatedCollages = [newCollage, ...collages];
      await AsyncStorage.setItem(STORAGE_KEYS.COLLAGES, JSON.stringify(updatedCollages));
      setCollages(updatedCollages);
      return newCollage;
    } catch (error) {
      console.error('Error saving collage:', error);
      throw error;
    }
  };

  const updateCollage = async (id: string, updates: Partial<Collage>) => {
    try {
      const updatedCollages = collages.map(c =>
        c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
      );
      await AsyncStorage.setItem(STORAGE_KEYS.COLLAGES, JSON.stringify(updatedCollages));
      setCollages(updatedCollages);
    } catch (error) {
      console.error('Error updating collage:', error);
      throw error;
    }
  };

  const deleteCollage = async (id: string) => {
    try {
      const updatedCollages = collages.filter(c => c.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.COLLAGES, JSON.stringify(updatedCollages));
      setCollages(updatedCollages);
    } catch (error) {
      console.error('Error deleting collage:', error);
      throw error;
    }
  };

  const getCollageById = (id: string) => {
    return collages.find(c => c.id === id);
  };

  // ============================================
  // RECENT TEMPLATES
  // ============================================
  const loadRecentTemplates = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_TEMPLATES);
      if (data) {
        setRecentTemplates(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading recent templates:', error);
    }
  };

  const addRecentTemplate = async (templateId: string) => {
    try {
      const updated = [templateId, ...recentTemplates.filter(id => id !== templateId)].slice(0, 10);
      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_TEMPLATES, JSON.stringify(updated));
      setRecentTemplates(updated);
    } catch (error) {
      console.error('Error adding recent template:', error);
    }
  };

  // ============================================
  // PRO STATUS
  // ============================================
  const loadProStatus = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PRO_STATUS);
      if (data) {
        setIsPro(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading pro status:', error);
    }
  };

  const setProStatus = async (proStatus: boolean) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRO_STATUS, JSON.stringify(proStatus));
      setIsPro(proStatus);
    } catch (error) {
      console.error('Error setting pro status:', error);
    }
  };

  // ============================================
  // USER PREFERENCES
  // ============================================
  const loadPreferences = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (data) {
        setPreferences(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    try {
      const updated = { ...preferences, ...updates };
      await AsyncStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
      setPreferences(updated);
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  // ============================================
  // CLEAR ALL DATA
  // ============================================
  const clearAllData = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.COLLAGES,
        STORAGE_KEYS.RECENT_TEMPLATES,
        STORAGE_KEYS.PRO_STATUS,
        STORAGE_KEYS.USER_PREFERENCES,
      ]);
      setCollages([]);
      setRecentTemplates([]);
      setIsPro(false);
      setPreferences({
        theme: 'light',
        defaultAspectRatio: '1:1',
        exportQuality: 'high',
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  };

  return {
    // State
    collages,
    recentTemplates,
    isPro,
    preferences,
    isLoading,

    // Collages
    saveCollage,
    updateCollage,
    deleteCollage,
    getCollageById,

    // Recent Templates
    addRecentTemplate,

    // Pro Status
    setProStatus,

    // Preferences
    updatePreferences,

    // Clear
    clearAllData,
  };
}

export default useStorage;