"use client";

import React, { useState } from 'react';
// Import icons from react-icons
import { 
  FaCoffee, FaUtensils, FaBreadSlice, FaCookie, FaAppleAlt, FaCheese,
  FaPizzaSlice, FaHamburger, FaIceCream, FaWineBottle, FaBeer, FaLeaf,
  FaFish, FaEgg, FaCarrot, FaPepperHot, FaSeedling, FaDrumstickBite,
  FaCandyCane, FaGlassWhiskey, FaCocktail, FaBlender, FaBirthdayCake,
  FaHotdog, FaLemon, FaStore, FaShoppingCart, FaTruck, FaBox,
  FaGift, FaStar, FaHeart, FaThumbsUp, FaFire, FaSnowflake,
  FaSun, FaMoon, FaCloud, FaUmbrella, FaMusic, FaGamepad
} from 'react-icons/fa';

// Define available icons with their names
const AVAILABLE_ICONS = [
  { name: 'Coffee', icon: FaCoffee, id: 'coffee' },
  { name: 'Utensils', icon: FaUtensils, id: 'utensils' },
  { name: 'Bread', icon: FaBreadSlice, id: 'bread' },
  { name: 'Cookie', icon: FaCookie, id: 'cookie' },
  { name: 'Apple', icon: FaAppleAlt, id: 'apple' },
  { name: 'Cheese', icon: FaCheese, id: 'cheese' },
  { name: 'Pizza', icon: FaPizzaSlice, id: 'pizza' },
  { name: 'Burger', icon: FaHamburger, id: 'burger' },
  { name: 'Ice Cream', icon: FaIceCream, id: 'icecream' },
  { name: 'Wine', icon: FaWineBottle, id: 'wine' },
  { name: 'Beer', icon: FaBeer, id: 'beer' },
  { name: 'Leaf', icon: FaLeaf, id: 'leaf' },
  { name: 'Fish', icon: FaFish, id: 'fish' },
  { name: 'Egg', icon: FaEgg, id: 'egg' },
  { name: 'Carrot', icon: FaCarrot, id: 'carrot' },
  { name: 'Pepper', icon: FaPepperHot, id: 'pepper' },
  { name: 'Seedling', icon: FaSeedling, id: 'seedling' },
  { name: 'Chicken', icon: FaDrumstickBite, id: 'chicken' },
  { name: 'Candy', icon: FaCandyCane, id: 'candy' },
  { name: 'Whiskey', icon: FaGlassWhiskey, id: 'whiskey' },
  { name: 'Cocktail', icon: FaCocktail, id: 'cocktail' },
  { name: 'Blender', icon: FaBlender, id: 'blender' },
  { name: 'Birthday Cake', icon: FaBirthdayCake, id: 'cake' },
  { name: 'Hotdog', icon: FaHotdog, id: 'hotdog' },
  { name: 'Lemon', icon: FaLemon, id: 'lemon' },
  { name: 'Store', icon: FaStore, id: 'store' },
  { name: 'Cart', icon: FaShoppingCart, id: 'cart' },
  { name: 'Truck', icon: FaTruck, id: 'truck' },
  { name: 'Box', icon: FaBox, id: 'box' },
  { name: 'Gift', icon: FaGift, id: 'gift' },
  { name: 'Star', icon: FaStar, id: 'star' },
  { name: 'Heart', icon: FaHeart, id: 'heart' },
  { name: 'Thumbs Up', icon: FaThumbsUp, id: 'thumbsup' },
  { name: 'Fire', icon: FaFire, id: 'fire' },
  { name: 'Snowflake', icon: FaSnowflake, id: 'snowflake' },
  { name: 'Sun', icon: FaSun, id: 'sun' },
  { name: 'Moon', icon: FaMoon, id: 'moon' },
  { name: 'Cloud', icon: FaCloud, id: 'cloud' },
  { name: 'Umbrella', icon: FaUmbrella, id: 'umbrella' },
  { name: 'Music', icon: FaMusic, id: 'music' },
  { name: 'Gaming', icon: FaGamepad, id: 'gaming' },
];

interface SelectIconProps {
  selectedIcon?: string;
  onIconSelect: (iconId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function SelectIcon({ selectedIcon, onIconSelect, isOpen, onClose }: SelectIconProps) {
  if (!isOpen) return null;

  const handleIconClick = (iconId: string) => {
    onIconSelect(iconId);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">Select Icon</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 max-h-80 overflow-y-auto">
          {AVAILABLE_ICONS.map((iconData) => {
            const IconComponent = iconData.icon;
            const isSelected = selectedIcon === iconData.id;
            
            return (
              <button
                key={iconData.id}
                onClick={() => handleIconClick(iconData.id)}
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center transition-all
                  ${isSelected 
                    ? 'bg-blue-500 text-white border-2 border-blue-400' 
                    : 'bg-[var(--color-gray)] hover:bg-gray-600 text-gray-300 hover:text-white border-2 border-transparent'
                  }
                `}
                title={iconData.name}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export function to get icon component by ID
export const getIconById = (iconId: string) => {
  const iconData = AVAILABLE_ICONS.find(icon => icon.id === iconId);
  return iconData ? iconData.icon : FaStore; // Default fallback icon
};

// Export function to get icon name by ID
export const getIconNameById = (iconId: string) => {
  const iconData = AVAILABLE_ICONS.find(icon => icon.id === iconId);
  return iconData ? iconData.name : 'Store';
};

// Export available icons list for reference
export { AVAILABLE_ICONS };
