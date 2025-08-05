import React, { useState } from 'react';
import MoreOption from './moreoption';

interface SubVariant {
  id: string;
  name: string;
  description: string;
  stock: number;
  extraCharge: number;
}

interface VariantGroup {
  id: string;
  name: string;
  isEnabled: boolean;
  isRequired: boolean;
  description: string;
  subVariants: SubVariant[];
  itemId: string;
}

interface VariantCardProps {
  variants: VariantGroup[]; // Array of variants instead of single variant
  onToggleEnabled?: (id: string, enabled: boolean) => void;
  onEditSubVariant?: (subVariant: SubVariant) => void;
  onDeleteSubVariant?: (subVariantId: string) => void;
  onAddSubVariant?: (variantGroupId: string) => void;
  onEditVariant?: (variant: VariantGroup) => void;
}

export default function VariantCard({ 
  variants,
  onToggleEnabled,
  onEditSubVariant,
  onDeleteSubVariant,
  onAddSubVariant,
  onEditVariant
}: VariantCardProps) {
  const [expandedVariants, setExpandedVariants] = useState<string[]>([]);

  const toggleExpand = (variantId: string) => {
    const isCurrentlyExpanded = expandedVariants.includes(variantId);
    
    if (isCurrentlyExpanded) {
      // Jika sedang terbuka, tutup saja
      setExpandedVariants(prev => prev.filter(id => id !== variantId));
    } else {
      // Jika belum terbuka, tutup semua yang lain dan buka yang ini
      setExpandedVariants([variantId]);
      // Langsung panggil onEditVariant untuk membuka form
      const selectedVariant = variants.find(v => v.id === variantId);
      if (selectedVariant && onEditVariant) {
        onEditVariant(selectedVariant);
      }
    }
  };

  return (
    <div className="w-full mb-4">
      {variants.length === 0 ? (
        // Empty state when no variants exist - similar to ItemGrid style
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-[var(--color-gray)] rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-[var(--color-text-primary)] text-xl font-semibold mb-2">
            No Variants Available
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm max-w-md">
            This item doesn't have any variants yet. Click the "Add Variant" button above to create your first variant group.
          </p>
        </div>
      ) : (
        // Existing variants display
        <div className="bg-[var(--color-black)] shadow-lg border border-[var(--color-card-border)] rounded-3xl overflow-hidden">
          {variants.map((variant, index) => (
          <React.Fragment key={variant.id}>

            {/* Variant Header */}
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[var(--color-palette-1)] hover:bg-opacity-20 transition-colors"
              onClick={() => toggleExpand(variant.id)}
            >
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">{variant.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{variant.description}</p>
              </div>
              
              {/* Toggle Switch */}
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={variant.isEnabled}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleEnabled?.(variant.id, e.target.checked);
                  }}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  variant.isEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-[2px] bg-white rounded-full w-5 h-5 transition-transform duration-200 ease-in-out ${
                    variant.isEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'
                  }`}></div>
                </div>
              </div>
            </div>

            {/* Expanded Varieties */}
            {expandedVariants.includes(variant.id) && (
              <div className="border-t border-[var(--color-card-border)] bg-[var(--color-dark)] p-4">
                {/* Sub-variants table */}
                <div className="mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--color-card-border)]">
                        <th className="py-2 text-left text-[var(--color-text-primary)]">Variety Name</th>
                        <th className="py-2 text-left text-[var(--color-text-primary)]">Description</th>
                        <th className="py-2 text-center text-[var(--color-text-primary)]">Stock</th>
                        <th className="py-2 text-center text-[var(--color-text-primary)]">Extra Charge</th>
                        <th className="py-2 text-center text-[var(--color-text-primary)]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variant.subVariants?.map(subVariant => (
                        <tr key={subVariant.id} className="border-b border-[var(--color-card-border)] ">
                          <td className="py-2 text-[var(--color-text-primary)]">{subVariant.name}</td>
                          <td className="py-2 text-[var(--color-text-primary)]">{subVariant.description}</td>
                          <td className="py-2 text-center text-[var(--color-text-primary)]">{subVariant.stock}</td>
                          <td className="py-2 text-center text-[var(--color-text-primary)]">
                            {subVariant.extraCharge > 0 ? `+Rp ${subVariant.extraCharge.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex items-center justify-center">
                              <MoreOption
                                onEdit={() => onEditSubVariant?.(subVariant)}
                                onDelete={() => onDeleteSubVariant?.(subVariant.id)}
                                position="left"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Add button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddSubVariant?.(variant.id);
                  }}
                  className="w-full py-2 font-semibold px-4 bg-[var(--color-white)] shadow-lg text-black rounded-lg hover:bg-opacity-80 transition-colors text-sm"
                >
                  + Add Variety
                </button>
              </div>
            )}

            {/* HR separator between variants (except for last item) */}
            {index < variants.length - 1 && (
              <hr className="border-[var(--color-card-border)]" />
            )}
          </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}