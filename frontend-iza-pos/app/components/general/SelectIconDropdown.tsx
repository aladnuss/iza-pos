"use client";

import React, { useState, useRef, useEffect } from 'react';
import { getIconById, getIconNameById, AVAILABLE_ICONS } from './SelectIcon';
import { FaChevronDown } from 'react-icons/fa';

interface SelectIconDropdownProps {
  selectedIcon?: string;
  onIconSelect: (iconId: string) => void;
  placeholder?: string;
}

export default function SelectIconDropdown({ 
  selectedIcon, 
  onIconSelect, 
  placeholder = "Select an icon" 
}: SelectIconDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIconSelect = (iconId: string) => {
    onIconSelect(iconId);
    setIsOpen(false);
  };

  const SelectedIconComponent = selectedIcon ? getIconById(selectedIcon) : null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[var(--color-palette-1)] border border-[var(--color-card-border)] rounded px-4 py-3 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          {SelectedIconComponent ? (
            <>
              <div className="w-8 h-8 bg-[var(--color-dark)] rounded-lg flex items-center justify-center">
                <SelectedIconComponent className="w-4 h-4 text-white" />
              </div>
              <span className="text-white">{getIconNameById(selectedIcon!)}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <FaChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="grid grid-cols-6 gap-1">
              {AVAILABLE_ICONS.map((iconData) => {
                const IconComponent = iconData.icon;
                const isSelected = selectedIcon === iconData.id;
                
                return (
                  <button
                    key={iconData.id}
                    type="button"
                    onClick={() => handleIconSelect(iconData.id)}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center transition-all
                      ${isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-[var(--color-gray)] hover:bg-gray-600 text-gray-300 hover:text-white'
                      }
                    `}
                    title={iconData.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
