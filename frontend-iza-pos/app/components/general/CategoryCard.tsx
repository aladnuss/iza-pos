// app/components/product/CategoryCard.tsx
"use client";

import React from 'react';
import { getIconById } from './SelectIcon';

// Define Category interface to ensure consistency
interface Category {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  color: string; // This will be used for the icon background
  iconId?: string; // Icon ID for the category
}

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  // Get the appropriate icon component
  const IconComponent = getIconById(category.iconId || 'store');

  return (
    <div
      key={category.id}
      className="bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-3xl p-6
                 hover:border-gray-500 transition-all cursor-pointer group flex flex-col justify-between"
      onClick={() => onClick(category.id)}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon with colored background */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: category.color }}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
      {category.description && (
        <p className="text-[var(--color-gray)] text-sm mb-1">{category.description}</p>
      )}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[var(--color-gray)] text-sm">
          {category.itemCount} items
        </span>
      </div>
    </div>
  );
}