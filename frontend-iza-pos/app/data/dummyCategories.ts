// app/data/dummyCategories.ts
import { Category } from './types';

export const DUMMY_CATEGORIES: Category[] = [
  { 
    id: 'coffee', 
    name: 'Coffee', 
    description: 'Hot & Cold Coffee', 
    itemCount: 3, 
    color: '#8B4513',
    iconId: 'coffee'
  },
  { 
    id: 'tea', 
    name: 'Tea', 
    description: 'Various Tea Options', 
    itemCount: 2, 
    color: '#388E3C',
    iconId: 'leaf'
  },
  { 
    id: 'pastry', 
    name: 'Pastry', 
    description: 'Fresh Baked Goods', 
    itemCount: 4, 
    color: '#FFD600',
    iconId: 'bread'
  },
  { 
    id: 'snacks', 
    name: 'Snacks', 
    description: 'Light Snacks', 
    itemCount: 2, 
    color: '#EF5350',
    iconId: 'cookie'
  },
  { 
    id: 'breakfast', 
    name: 'Breakfast', 
    description: 'Hearty morning meals', 
    itemCount: 4, 
    color: '#e3f6f5',
    iconId: 'egg'
  },
  { 
    id: 'soups', 
    name: 'Soups', 
    description: 'Warm and comforting bowls', 
    itemCount: 13, 
    color: '#f3e8ff',
    iconId: 'utensils'
  },
  { 
    id: 'pasta', 
    name: 'Pasta', 
    description: 'Classic Italian dishes', 
    itemCount: 10, 
    color: '#cce6f7',
    iconId: 'pizza'
  },
];

// Color palette for dynamic assignment if needed
export const PALETTE_COLORS = [
  '#56DFCF',
  '#708A58',
  '#FFA673',
  '#FF4F0F',
  '#FF7D29',
  '#D2C1B6',
];
