/**
 * Template System - Photo Collage Maker
 * 20+ Professional templates with multiple aspect ratios
 */

export type AspectRatio = '1:1' | '4:5' | '9:16' | 'freeform';
export type TemplateCategory = 'grid' | 'creative' | 'minimal' | 'artistic';

export interface Frame {
  id: string;
  x: number;       // percentage (0-100)
  y: number;       // percentage (0-100)
  width: number;   // percentage (0-100)
  height: number;  // percentage (0-100)
  rotation?: number; // degrees
  zIndex?: number;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  aspectRatio: AspectRatio;
  frames: Frame[];
  thumbnail?: string;
  isPremium?: boolean;
}

// ============================================
// GRID TEMPLATES (Clean, symmetrical layouts)
// ============================================
export const gridTemplates: Template[] = [
  {
    id: 'grid-2x1',
    name: 'Side by Side',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 50, height: 100 },
      { id: 'f2', x: 50, y: 0, width: 50, height: 100 },
    ],
    isPremium: false,
  },
  {
    id: 'grid-1x2',
    name: 'Top & Bottom',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 50 },
      { id: 'f2', x: 0, y: 50, width: 100, height: 50 },
    ],
    isPremium: false,
  },
  {
    id: 'grid-2x2',
    name: 'Classic Grid',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 50, height: 50 },
      { id: 'f2', x: 50, y: 0, width: 50, height: 50 },
      { id: 'f3', x: 0, y: 50, width: 50, height: 50 },
      { id: 'f4', x: 50, y: 50, width: 50, height: 50 },
    ],
    isPremium: false,
  },
  {
    id: 'grid-3x1',
    name: 'Triple Strip',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 33.33, height: 100 },
      { id: 'f2', x: 33.33, y: 0, width: 33.34, height: 100 },
      { id: 'f3', x: 66.67, y: 0, width: 33.33, height: 100 },
    ],
    isPremium: false,
  },
  {
    id: 'grid-1x3',
    name: 'Triple Stack',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 33.33 },
      { id: 'f2', x: 0, y: 33.33, width: 100, height: 33.34 },
      { id: 'f3', x: 0, y: 66.67, width: 100, height: 33.33 },
    ],
    isPremium: false,
  },
  {
    id: 'grid-2x3',
    name: 'Six Grid',
    category: 'grid',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 33.33, height: 50 },
      { id: 'f2', x: 33.33, y: 0, width: 33.34, height: 50 },
      { id: 'f3', x: 66.67, y: 0, width: 33.33, height: 50 },
      { id: 'f4', x: 0, y: 50, width: 33.33, height: 50 },
      { id: 'f5', x: 33.33, y: 50, width: 33.34, height: 50 },
      { id: 'f6', x: 66.67, y: 50, width: 33.33, height: 50 },
    ],
    isPremium: false,
  },
];

// ============================================
// CREATIVE TEMPLATES (Asymmetric, unique layouts)
// ============================================
export const creativeTemplates: Template[] = [
  {
    id: 'creative-panorama',
    name: 'Panorama',
    category: 'creative',
    aspectRatio: '4:5',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 70, height: 100 },
      { id: 'f2', x: 70, y: 0, width: 30, height: 50 },
      { id: 'f3', x: 70, y: 50, width: 30, height: 50 },
    ],
    isPremium: false,
  },
  {
    id: 'creative-diagonal',
    name: 'Diagonal Split',
    category: 'creative',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 60, height: 60 },
      { id: 'f2', x: 40, y: 40, width: 60, height: 60 },
    ],
    isPremium: true,
  },
  {
    id: 'creative-offset',
    name: 'Offset',
    category: 'creative',
    aspectRatio: '4:5',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 60, height: 70 },
      { id: 'f2', x: 40, y: 30, width: 60, height: 70 },
    ],
    isPremium: false,
  },
  {
    id: 'creative-l-shape',
    name: 'L-Shape',
    category: 'creative',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 40, height: 100 },
      { id: 'f2', x: 40, y: 0, width: 60, height: 40 },
      { id: 'f3', x: 40, y: 40, width: 60, height: 60 },
    ],
    isPremium: true,
  },
  {
    id: 'creative-focus',
    name: 'Focus Point',
    category: 'creative',
    aspectRatio: '4:5',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 100 },
      { id: 'f2', x: 25, y: 25, width: 50, height: 50, zIndex: 10 },
    ],
    isPremium: true,
  },
];

// ============================================
// MINIMAL TEMPLATES (Clean, simple layouts)
// ============================================
export const minimalTemplates: Template[] = [
  {
    id: 'minimal-single',
    name: 'Single Photo',
    category: 'minimal',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 100 },
    ],
    isPremium: false,
  },
  {
    id: 'minimal-frame',
    name: 'Frame Within',
    category: 'minimal',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 100 },
      { id: 'f2', x: 10, y: 10, width: 80, height: 80, zIndex: 10 },
    ],
    isPremium: false,
  },
  {
    id: 'minimal-corners',
    name: 'Corner Accents',
    category: 'minimal',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 100 },
      { id: 'f2', x: 5, y: 5, width: 20, height: 20, zIndex: 10 },
      { id: 'f3', x: 75, y: 75, width: 20, height: 20, zIndex: 10 },
    ],
    isPremium: true,
  },
  {
    id: 'minimal-strip',
    name: 'Photo Strip',
    category: 'minimal',
    aspectRatio: '9:16',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 100, height: 25 },
      { id: 'f2', x: 0, y: 25, width: 100, height: 25 },
      { id: 'f3', x: 0, y: 50, width: 100, height: 25 },
      { id: 'f4', x: 0, y: 75, width: 100, height: 25 },
    ],
    isPremium: false,
  },
];

// ============================================
// ARTISTIC TEMPLATES (Overlapping, rotated, unique)
// ============================================
export const artisticTemplates: Template[] = [
  {
    id: 'artistic-polaroid',
    name: 'Polaroid Stack',
    category: 'artistic',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 10, y: 10, width: 80, height: 80, rotation: -5, zIndex: 1 },
      { id: 'f2', x: 5, y: 5, width: 80, height: 80, rotation: 5, zIndex: 2 },
    ],
    isPremium: true,
  },
  {
    id: 'artistic-scatter',
    name: 'Scattered',
    category: 'artistic',
    aspectRatio: 'freeform',
    frames: [
      { id: 'f1', x: 5, y: 10, width: 40, height: 40, rotation: -10, zIndex: 1 },
      { id: 'f2', x: 55, y: 5, width: 40, height: 40, rotation: 8, zIndex: 2 },
      { id: 'f3', x: 20, y: 55, width: 40, height: 40, rotation: 5, zIndex: 3 },
    ],
    isPremium: true,
  },
  {
    id: 'artistic-film',
    name: 'Film Strip',
    category: 'artistic',
    aspectRatio: '9:16',
    frames: [
      { id: 'f1', x: 10, y: 5, width: 80, height: 20 },
      { id: 'f2', x: 10, y: 25, width: 80, height: 20 },
      { id: 'f3', x: 10, y: 45, width: 80, height: 20 },
      { id: 'f4', x: 10, y: 65, width: 80, height: 20 },
    ],
    isPremium: false,
  },
  {
    id: 'artistic-mosaic',
    name: 'Mosaic',
    category: 'artistic',
    aspectRatio: '1:1',
    frames: [
      { id: 'f1', x: 0, y: 0, width: 50, height: 50 },
      { id: 'f2', x: 50, y: 0, width: 50, height: 50 },
      { id: 'f3', x: 25, y: 25, width: 50, height: 50, zIndex: 10 },
    ],
    isPremium: true,
  },
];

// ============================================
// ALL TEMPLATES COMBINED
// ============================================
export const allTemplates: Template[] = [
  ...gridTemplates,
  ...creativeTemplates,
  ...minimalTemplates,
  ...artisticTemplates,
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get templates by aspect ratio
 */
export function getTemplatesByAspectRatio(ratio: AspectRatio): Template[] {
  return allTemplates.filter(t => t.aspectRatio === ratio);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return allTemplates.filter(t => t.category === category);
}

/**
 * Get premium templates
 */
export function getPremiumTemplates(): Template[] {
  return allTemplates.filter(t => t.isPremium);
}

/**
 * Get free templates
 */
export function getFreeTemplates(): Template[] {
  return allTemplates.filter(t => !t.isPremium);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return allTemplates.find(t => t.id === id);
}

/**
 * Get featured templates (for home screen)
 */
export function getFeaturedTemplates(): Template[] {
  return [
    gridTemplates[0],   // Side by Side
    gridTemplates[2],   // Classic Grid
    creativeTemplates[0], // Panorama
    minimalTemplates[0], // Single Photo
    artisticTemplates[0], // Polaroid Stack
  ];
}

/**
 * Get recently used templates (would be from storage)
 */
export function getRecentTemplates(templateIds: string[]): Template[] {
  return templateIds
    .map(id => getTemplateById(id))
    .filter((t): t is Template => t !== undefined);
}

// ============================================
// ASPECT RATIO OPTIONS
// ============================================
export const aspectRatios: { label: string; value: AspectRatio; width: number; height: number }[] = [
  { label: '1:1', value: '1:1', width: 1, height: 1 },
  { label: '4:5', value: '4:5', width: 4, height: 5 },
  { label: '9:16', value: '9:16', width: 9, height: 16 },
  { label: 'Free', value: 'freeform', width: 1, height: 1 },
];

export default allTemplates;