import React, { useState, useEffect } from 'react';
import DeleteTrash from '../general/deletetrash';
import CloseButton from '../general/CloseButton';

interface VariantGroup {
  id?: string;
  name: string;
  isEnabled: boolean;
  isRequired: boolean;
  description: string;
  itemId: string;
}

interface VariantFormProps {
  initial?: VariantGroup;
  itemId: string;
  onSubmit: (variant: VariantGroup) => void;
  onDelete?: (variant: VariantGroup) => void;
  onClose?: () => void;
}

export default function VariantForm({ initial, itemId, onSubmit, onDelete, onClose }: VariantFormProps) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [isRequired, setIsRequired] = useState(initial?.isRequired || false);

  // Reset form state when initial changes
  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setIsRequired(initial?.isRequired || false);
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ 
      ...initial, 
      name, 
      description,
      isRequired,
      isEnabled: true,
      itemId 
    });
  }

  return (
    <div className="h-full w-80 bg-[var(--color-black)] flex flex-col border border-[var(--color-card-border)] rounded-3xl ml-auto overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[var(--color-card-border)]">
        <h2 className="text-white text-lg font-semibold">Variant form</h2>
        <div className="flex items-center gap-2">
          {onDelete && initial?.id && (
            <DeleteTrash 
              onDelete={() => onDelete(initial)} 
              itemName="variant"
            />
          )}
          <CloseButton onClose={onClose} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="mb-4">
          <label className="block text-white mb-1">Variant name</label>
          <input 
            className="w-full rounded bg-[var(--color-palette-1)] p-2 text-white placeholder-gray-400" 
            placeholder="Espresso"
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1">Deskripsi</label>
          <input 
            className="w-full rounded bg-[var(--color-palette-1)] p-2 text-white placeholder-gray-400" 
            placeholder="Strong coffee shot"
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Is Required?</label>
          <div className="w-full rounded bg-[var(--color-palette-1)] p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Is the customer required to select at least one option from this variant? Allow multiple selections? For variants like toppings, can more than one option be selected?
                </p>
              </div>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  isRequired ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  <div className={`absolute top-[2px] bg-white rounded-full w-5 h-5 transition-transform duration-200 ease-in-out ${
                    isRequired ? 'translate-x-[22px]' : 'translate-x-[2px]'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <button type="submit" className="w-full py-3 rounded-xl text-black text-sm font-bold transition-colors bg-[var(--color-white)] hover:bg-[var(--color-dark)]">Simpan</button>
        </div>
      </form>
    </div>
  );
}