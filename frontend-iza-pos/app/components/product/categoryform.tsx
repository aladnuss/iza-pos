import React, { useState, useEffect } from 'react';
import DeleteTrash from '../general/deletetrash';
import SelectIconDropdown from '../general/SelectIconDropdown';

interface Category {
  id?: string;
  name: string;
  description?: string;
  color?: string;
  iconId?: string;
}

interface CategoryFormProps {
  initial?: Category;
  onSubmit: (category: Category) => void;
  onDelete?: (category: Category) => void;
  onClose?: () => void; // opsional, untuk tombol tutup sidebar
}

export default function CategoryFormCard({ initial, onSubmit, onDelete, onClose }: CategoryFormProps) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [color, setColor] = useState(initial?.color || '#8B4513');
  const [iconId, setIconId] = useState(initial?.iconId || 'store');

  // Update form state when initial props change
  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setColor(initial?.color || '#8B4513');
    setIconId(initial?.iconId || 'store');
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ ...initial, name, description, color, iconId });
  }

  // Card sidebar (bukan fixed, ambil ruang dari parent flex)
  return (
    <div className="h-full w-80 max-w-sm bg-[var(--color-black)]  flex flex-col border border-[var(--color-card-border)] rounded-3xl ml-auto overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[var(--color-card-border)]">
        <h2 className="text-white text-lg font-semibold">{initial?.id ? "Edit Kategori" : "Tambah Kategori"}</h2>
        <div className="flex items-center gap-2">
          {/* Debug: Always show delete button */}
          <DeleteTrash 
            onDelete={() => console.log('Delete clicked - Category')} 
            itemName="kategori"
          />
          
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="mb-4">
          <label className="block text-white mb-1">Nama Kategori</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Deskripsi</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        
        {/* Icon Selection */}
        <div className="mb-4">
          <label className="block text-white mb-1">Icon</label>
          <SelectIconDropdown
            selectedIcon={iconId}
            onIconSelect={setIconId}
            placeholder="Pilih icon"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-1">Warna</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              className="w-12 h-10 rounded border-none cursor-pointer"
              value={color} 
              onChange={e => setColor(e.target.value)} 
            />
            <input 
              className="flex-1 rounded bg-[var(--color-palette-1)] p-2" 
              value={color} 
              onChange={e => setColor(e.target.value)} 
              placeholder="#8B4513"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button type="submit" className="w-full py-3 rounded-xl text-black text-sm font-bold transition-colors bg-[var(--color-white)]  shadow-lg hover:bg-[var(--color-dark)]">Simpan</button>
        </div>
      </form>
    </div>
  );
}