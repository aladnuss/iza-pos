import React, { useState, useEffect } from 'react';
import DeleteTrash from '../general/deletetrash';
import CloseButton from '../general/CloseButton';

interface Item {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId: string;
}

interface ItemFormProps {
  initial?: Item;
  categoryId: string;
  onSubmit: (item: Item) => void;
  onDelete?: (item: Item) => void;
  onShowVariants?: () => void;
  onClose?: () => void;
}

export default function ItemForm({ initial, categoryId, onSubmit, onDelete, onShowVariants, onClose }: ItemFormProps) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price?.toString() || '');
  const [image, setImage] = useState(initial?.image || '');
  const [isVariantEnabled, setIsVariantEnabled] = useState(false);

  // Reset form state when initial changes (e.g. when selecting a different item)
  useEffect(() => {
    setName(initial?.name || '');
    setDescription(initial?.description || '');
    setPrice(initial?.price?.toString() || '');
    setImage(initial?.image || '');
    setIsVariantEnabled(false);
  }, [initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ ...initial, name, description, price: Number(price), image, categoryId });
  }

  return (
    <div className="h-full w-80 max-w-sm bg-[var(--color-black)] flex flex-col border border-[var(--color-card-border)] rounded-3xl ml-auto overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-[var(--color-card-border)]">
        <h2 className="text-white text-lg font-semibold">{initial?.id ? "Edit Item" : "Tambah Item"}</h2>
        <div className="flex items-center gap-2">
          
          {onDelete && initial?.id && (
            <DeleteTrash 
              onDelete={() => onDelete(initial)} 
              itemName="item"
            />
          )}
          <CloseButton onClose={onClose} />
          
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-4">
        <div className="mb-4">
          <label className="block text-white mb-1">Nama Item</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Deskripsi</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">Harga</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1">URL Gambar</label>
          <input className="w-full rounded bg-[var(--color-palette-1)] p-2" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        {initial?.id && (
          <div className="mb-4">
            <label className="block text-white mb-1">Variant List</label>
            <div className="w-full rounded bg-[var(--color-palette-1)] p-4 cursor-pointer" onClick={onShowVariants}>
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    <span className="font-bold underline">Enable </span> 
                    this option if your product has variations (e.g., size, color, or type). 
                    <span className="font-bold underline">Tap</span> this area to manage the details of each variant.
                  </p>
                </div>
                <div className="relative inline-flex items-center">
                  <div 
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                      isVariantEnabled ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVariantEnabled(!isVariantEnabled);
                    }}
                  >
                    <div 
                      className={`absolute top-[2px] bg-white rounded-full w-5 h-5 transition-transform duration-200 ease-in-out ${
                        isVariantEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 mt-auto">
          <button type="submit" className="w-full py-3 rounded-xl text-black text-sm font-bold transition-colors bg-[var(--color-white)] hover:bg-[var(--color-dark)]">Simpan</button>
        </div>
      </form>
    </div>
  );
}