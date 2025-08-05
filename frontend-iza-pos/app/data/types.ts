// app/data/types.ts
// Centralized type definitions for the application

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  color: string;
  iconId?: string; // Icon ID for SelectIcon
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  variantCount: number;
  categoryId: string;
}

export interface SubVariant {
  id: string;
  name: string;
  description: string;
  stock: number;
  extraCharge: number;
}

export interface VariantGroup {
  id: string;
  name: string;
  isEnabled: boolean;
  isRequired: boolean;
  description: string;
  subVariants: SubVariant[];
  itemId: string;
}

// Additional types for menu functionality
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ItemQuantities {
  [itemId: string]: number;
}
