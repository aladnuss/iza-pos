import React, { useState } from "react";
import SearchBar from '../general/searchbar';
import BackButton from '../general/BackButton';
import VariantTableActions from './VariantTableActions';
import HeaderContent from '../general/HeaderContent';

export interface VariantType {
  id: number;
  name: string;
  description: string;
  status: boolean;
  variants: Array<{ id: number; name: string; description: string; price: number }>;
}

const AddVariantTable: React.FC<{
  variants: VariantType[];
  onVariantsChange: (newVariants: VariantType[]) => void;
  onBack?: () => void;
  onAddVariant?: () => void;
  onEditVariant?: (variant: VariantType, index: number) => void;
}> = ({ variants, onVariantsChange, onBack, onAddVariant, onEditVariant }) => {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);

  const filtered = variants.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));

  const handleToggleStatus = (idx: number) => {
    const newVariants = variants.map((v, i) => i === idx ? { ...v, status: !v.status } : v);
    onVariantsChange(newVariants);
  };

  return (
    <div className="">
      <HeaderContent
        showAddItem
        itemSearchValue={search}
        onItemSearchChange={e => setSearch(e.target.value)}
        onAddItem={onAddVariant}
        addButtonLabel="Add Variant +"
        showBackButton={!!onBack}
        onBack={onBack}
      />

      <div className="bg-[var(--color-black)] text-white p-5 rounded-2xl w-full">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-card-border)]">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-center">Status</th>
              <th className="py-2 text-center">Variants</th>
              <th className="py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((variant, idx) => (
              <React.Fragment key={variant.id}>
                <tr key={variant.id} className="border-b border-[var(--color-card-border)]">
                  <td className="py-2">{variant.name}</td>
                  <td className="py-2">{variant.description}</td>
                  <td className="py-2 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={variant.status} onChange={() => handleToggleStatus(idx)} className="sr-only peer" />
                      <div className={`w-9 h-5 rounded-full transition ${variant.status ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    </label>
                  </td>
                  <td className="py-2 text-center">
                    <button onClick={() => setOpenRow(openRow === idx ? null : idx)} aria-label="Show Variants">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-2 text-center">
                    <VariantTableActions
                      onEdit={() => onEditVariant && onEditVariant(variant, idx)}
                      onDelete={() => {/* TODO: handle delete variant */}}
                    />
                  </td>
                </tr>
                {openRow === idx && (
                  <tr key={`subtable-${variant.id}`}>
                    <td colSpan={5} className="bg-[var(--color-dark)] p-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr>
                            <th className="py-1 text-left">Variant Name</th>
                            <th className="py-1 text-left">Description</th>
                            <th className="py-1 text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {variant.variants.map(v => (
                            <tr key={v.id}>
                              <td className="py-1">{v.name}</td>
                              <td className="py-1">{v.description}</td>
                              <td className="py-1 text-right">Rp {v.price.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddVariantTable; 