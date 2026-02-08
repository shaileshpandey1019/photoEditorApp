/**
 * History Management Hook
 * Manages undo/redo functionality for canvas edits
 * Limited to MAX_HISTORY_SIZE to prevent memory leaks
 */

import { useState, useCallback, useRef } from 'react';
import { MAX_HISTORY_SIZE } from '../utils/export';

export interface HistoryAction {
  id: string;
  type: 'add_photo' | 'remove_photo' | 'add_sticker' | 'remove_sticker' | 'add_text' | 'remove_text' | 'transform' | 'style_change';
  timestamp: number;
  data: any;
  undoData?: any;
}

export interface HistoryState {
  past: HistoryAction[];
  present: HistoryAction | null;
  future: HistoryAction[];
}

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: null,
    future: [],
  });

  const historyRef = useRef(history);
  historyRef.current = history;

  /**
   * Add a new action to history
   * Only stores transforms and metadata, NOT full images
   */
  const pushAction = useCallback((action: HistoryAction) => {
    setHistory((prev) => {
      const newPast = [...prev.past];
      
      // Add current present to past if exists
      if (prev.present) {
        newPast.push(prev.present);
      }

      // Limit history size to prevent memory issues
      if (newPast.length > MAX_HISTORY_SIZE) {
        newPast.shift(); // Remove oldest action
      }

      return {
        past: newPast,
        present: action,
        future: [], // Clear future when new action is added
      };
    });
  }, []);

  /**
   * Undo the last action
   */
  const undo = useCallback((): HistoryAction | null => {
    let undoneAction: HistoryAction | null = null;

    setHistory((prev) => {
      if (prev.past.length === 0) {
        return prev; // Nothing to undo
      }

      const newPast = [...prev.past];
      const lastAction = newPast.pop()!;
      undoneAction = lastAction;

      return {
        past: newPast,
        present: lastAction,
        future: [prev.present, ...prev.future].filter(Boolean) as HistoryAction[],
      };
    });

    return undoneAction;
  }, []);

  /**
   * Redo the last undone action
   */
  const redo = useCallback((): HistoryAction | null => {
    let redoneAction: HistoryAction | null = null;

    setHistory((prev) => {
      if (prev.future.length === 0) {
        return prev; // Nothing to redo
      }

      const newFuture = [...prev.future];
      const nextAction = newFuture.shift()!;
      redoneAction = nextAction;

      return {
        past: [...prev.past, prev.present].filter(Boolean) as HistoryAction[],
        present: nextAction,
        future: newFuture,
      };
    });

    return redoneAction;
  }, []);

  /**
   * Check if undo is available
   */
  const canUndo = useCallback((): boolean => {
    return historyRef.current.past.length > 0;
  }, []);

  /**
   * Check if redo is available
   */
  const canRedo = useCallback((): boolean => {
    return historyRef.current.future.length > 0;
  }, []);

  /**
   * Clear all history
   */
  const clearHistory = useCallback(() => {
    setHistory({
      past: [],
      present: null,
      future: [],
    });
  }, []);

  /**
   * Get current history size
   */
  const getHistorySize = useCallback((): number => {
    return historyRef.current.past.length;
  }, []);

  return {
    history,
    pushAction,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    getHistorySize,
  };
};

/**
 * Helper functions for creating history actions
 */
export const createPhotoAction = (
  type: 'add_photo' | 'remove_photo',
  frameId: string,
  uri?: string
): HistoryAction => ({
  id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type,
  timestamp: Date.now(),
  data: {
    frameId,
    uri, // Only store URI reference, NOT the full image
  },
});

export const createStickerAction = (
  type: 'add_sticker' | 'remove_sticker',
  stickerId: string,
  transform?: { x: number; y: number; scale: number; rotation: number }
): HistoryAction => ({
  id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type,
  timestamp: Date.now(),
  data: {
    stickerId,
    transform, // Only store transform data
  },
});

export const createTextAction = (
  type: 'add_text' | 'remove_text',
  textId: string,
  content?: string,
  transform?: { x: number; y: number; scale: number; rotation: number }
): HistoryAction => ({
  id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type,
  timestamp: Date.now(),
  data: {
    textId,
    content,
    transform, // Only store transform data
  },
});

export const createTransformAction = (
  itemId: string,
  itemType: 'photo' | 'sticker' | 'text',
  beforeTransform: { x: number; y: number; scale: number; rotation: number },
  afterTransform: { x: number; y: number; scale: number; rotation: number }
): HistoryAction => ({
  id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type: 'transform',
  timestamp: Date.now(),
  data: {
    itemId,
    itemType,
    transform: afterTransform,
  },
  undoData: {
    transform: beforeTransform,
  },
});

export const createStyleChangeAction = (
  itemId: string,
  itemType: 'text',
  beforeStyle: any,
  afterStyle: any
): HistoryAction => ({
  id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type: 'style_change',
  timestamp: Date.now(),
  data: {
    itemId,
    itemType,
    style: afterStyle,
  },
  undoData: {
    style: beforeStyle,
  },
});