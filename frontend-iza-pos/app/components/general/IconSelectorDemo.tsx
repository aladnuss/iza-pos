// Example usage of SelectIcon component
// This shows how to integrate the icon selector in any form

import React, { useState } from 'react';
import SelectIcon, { getIconById, getIconNameById, AVAILABLE_ICONS } from './SelectIcon';

export default function IconSelectorDemo() {
  const [selectedIcon, setSelectedIcon] = useState('coffee');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryColor, setCategoryColor] = useState('#8B4513');

  const IconComponent = getIconById(selectedIcon);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl mb-8">Icon Selector Demo</h1>
      
      {/* Preview Card */}
      <div className="bg-black border border-gray-700 rounded-2xl p-6 mb-8 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: categoryColor }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">Sample Category</h3>
        <p className="text-gray-400 text-sm mb-1">Category with {getIconNameById(selectedIcon)} icon</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-gray-400 text-sm">5 items</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">Select Icon:</label>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <IconComponent className="w-5 h-5" />
            {getIconNameById(selectedIcon)}
          </button>
        </div>

        <div>
          <label className="block text-white mb-2">Category Color:</label>
          <input
            type="color"
            value={categoryColor}
            onChange={(e) => setCategoryColor(e.target.value)}
            className="w-16 h-10 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Available Icons List */}
      <div className="mt-8">
        <h2 className="text-white text-xl mb-4">Available Icons ({AVAILABLE_ICONS.length})</h2>
        <div className="grid grid-cols-8 gap-2 max-w-2xl">
          {AVAILABLE_ICONS.map((iconData) => {
            const Icon = iconData.icon;
            return (
              <div key={iconData.id} className="text-center">
                <button
                  onClick={() => setSelectedIcon(iconData.id)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all mb-1 ${
                    selectedIcon === iconData.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
                <span className="text-xs text-gray-400">{iconData.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Icon Selector Modal */}
      <SelectIcon
        selectedIcon={selectedIcon}
        onIconSelect={setSelectedIcon}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
