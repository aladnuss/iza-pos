// app/components/product/ItemCard.tsx
"use client";

import React from 'react';

// Define Item interface to ensure consistency
interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  variantCount: number;
  categoryId: string;
}

interface ItemCardProps {
  items: Item[]; // Array of items to display
  onItemClick: (itemId: string) => void; // For navigating to variants
  formatPrice: (price: number) => string; // Pass the price formatter
  // Menu-specific props (optional)
  isMenuMode?: boolean; // Enable menu mode with +/- buttons
  itemQuantities?: { [itemId: string]: number }; // Current quantities in cart
  onIncrement?: (itemId: string) => void; // Increment quantity
  onDecrement?: (itemId: string) => void; // Decrement quantity
}

export default function ItemCard({ 
  items, 
  onItemClick, 
  formatPrice, 
  isMenuMode = false,
  itemQuantities = {},
  onIncrement,
  onDecrement
}: ItemCardProps) {
  
  // Empty state
  if (items.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-[var(--color-gray)] rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">🍽️</span>
        </div>
        <h3 className="text-[var(--color-text-primary)] text-xl font-semibold mb-2">
          No Items Yet
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm max-w-md">
          This category doesn't have any items yet. Click the "Add Item" button above to add your first item.
        </p>
      </div>
    );
  }

  // Render individual item card
  const renderItem = (item: Item) => {
    const quantity = itemQuantities[item.id] || 0;
    
    const handleCardClick = () => {
      if (!isMenuMode) {
        onItemClick(item.id); // Normal product mode - navigate to variants
      }
      // In menu mode, card click doesn't navigate
    };

    const handleIncrement = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click
      onIncrement?.(item.id);
    };

    const handleDecrement = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click
      onDecrement?.(item.id);
    };

    return (
      <div
        key={item.id}
        className={`bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-3xl overflow-hidden
                   hover:border-gray-500 transition-all group flex flex-col
                   ${!isMenuMode ? 'cursor-pointer' : ''} 
                   ${isMenuMode && quantity > 0 ? 'border-green-500' : ''}`}
        onClick={handleCardClick}
      >
        {/* Image placeholder */}
        <div className="w-full h-40 bg-[var(--color-gray)] flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl">🍵</span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold text-lg">{item.name}</h3>
          </div>

          {item.description && (
            <p className="text-[var(--color-gray)] text-sm mb-3">{item.description}</p>
          )}

          <div className="flex items-center justify-between mt-auto">
            <span className="text-green-400 font-semibold">
              {formatPrice(item.price)}
            </span>
            
            {isMenuMode ? (
              <div className="ml-2 flex items-center gap-2">
                {quantity > 0 ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleDecrement}
                      className="w-7 h-7 rounded-full bg-gray-600 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                    >
                      <span className="text-lg font-bold mb-[2px]">−</span>
                    </button>
                    <span className="text-white font-semibold min-w-[24px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-7 h-7 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
                    >
                      <span className="text-lg font-bold mb-[2px]">+</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleIncrement}
                    className="px-3 py-1 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
                  >
                    Add
                  </button>
                )}
              </div>
            ) : (
              <span className="text-[var(--color-gray)] text-sm">
                {item.variantCount} variants
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Return all items
  return (
    <>
      {items.map(item => renderItem(item))}
    </>
  );
}
