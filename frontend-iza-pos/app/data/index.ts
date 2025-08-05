// app/data/index.ts
// Central export file for all dummy data and types

// Types
export * from './types';

// Dummy Data
export { DUMMY_CATEGORIES, PALETTE_COLORS } from './dummyCategories';
export { DUMMY_ITEMS } from './dummyItems';
export { DUMMY_VARIANT_GROUPS } from './dummyVariants';

// Import for utility functions
import { DUMMY_CATEGORIES } from './dummyCategories';
import { DUMMY_ITEMS } from './dummyItems';
import { DUMMY_VARIANT_GROUPS } from './dummyVariants';
import type { Item } from './types';

// Utility functions for data manipulation
export const getAllItems = (): Item[] => {
  return Object.values(DUMMY_ITEMS).flat();
};

export const getItemsByCategory = (categoryId: string): Item[] => {
  return DUMMY_ITEMS[categoryId] || [];
};

export const getVariantsByItem = (itemId: string) => {
  return DUMMY_VARIANT_GROUPS.filter(variant => variant.itemId === itemId);
};

export const getCategoryById = (categoryId: string) => {
  return DUMMY_CATEGORIES.find(cat => cat.id === categoryId);
};

export const getItemById = (itemId: string): Item | undefined => {
  const allItems = getAllItems();
  return allItems.find(item => item.id === itemId);
};
