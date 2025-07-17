import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Variant {
  name: string;
  required: boolean;
  options: string[];
}

interface ItemFormPanelProps {
  initialData?: { name: string; description: string; price: number; itemId: string; photo?: string; variants?: Variant[] };
  onSave: (data: { name: string; description: string; price: number; itemId: string; photo?: string; variants?: Variant[] }) => void;
  onCancel?: () => void;
  onDeleteItem?: () => void;
  onShowVariantTable?: () => void;
}

const ItemFormPanel: React.FC<ItemFormPanelProps> = ({ initialData, onSave, onCancel, onDeleteItem, onShowVariantTable }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price || 0);
  const [itemId, setItemId] = useState(initialData?.itemId || '');
  const [photo, setPhoto] = useState<string | undefined>(initialData?.photo);
  const [variants, setVariants] = useState<Variant[]>(initialData?.variants || []);
  React.useEffect(() => {
    setName(initialData?.name || '');
    setDescription(initialData?.description || '');
    setPrice(initialData?.price || 0);
    setItemId(initialData?.itemId || '');
    setPhoto(initialData?.photo);
    setVariants(initialData?.variants || []);
  }, [initialData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Add Variant logic (sederhana)
  const [variantName, setVariantName] = useState('');
  const [variantRequired, setVariantRequired] = useState(false);
  const [variantOptions, setVariantOptions] = useState('');

  const handleAddVariant = () => {
    if (!variantName || !variantOptions) return;
    setVariants([...variants, { name: variantName, required: variantRequired, options: variantOptions.split(',').map(s => s.trim()) }]);
    setVariantName('');
    setVariantRequired(false);
    setVariantOptions('');
  };

  return (
    <aside className="w-80 h-full bg-[var(--color-black)] text-white flex flex-col rounded-2xl overflow-hidden p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Item Form</h2>
        <div className="flex items-center gap-2">
          <button className="text-xs text-[var(--color-gray)] underline" onClick={() => { setName(''); setDescription(''); setPrice(0); setItemId(''); setPhoto(undefined); setVariants([]); }}>Reset</button>
          <button className="text-[var(--color-gray)] hover:text-red-500" onClick={onDeleteItem} title="Delete Item">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <label className="mb-2 text-sm">Item Name</label>
      <input className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={name} onChange={e => setName(e.target.value)} />
      <label className="mb-2 text-sm">Description</label>
      <textarea className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={description} onChange={e => setDescription(e.target.value)} />
      <label className="mb-2 text-sm">Price</label>
      <input type="number" className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={price} onChange={e => setPrice(Number(e.target.value))} />
      <label className="mb-2 text-sm">Item ID</label>
      <input className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={itemId} onChange={e => setItemId(e.target.value)} />
      <label className="mb-2 text-sm">Add Photo</label>
      <input type="file" accept="image/*" className="mb-3" onChange={handlePhotoChange} />
      {photo && <img src={photo} alt="Preview" className="mb-3 w-full h-32 object-cover rounded" />}
      {/* Add Variants */}
      <div className="flex-1" />
      <div className="flex items-center gap-2 mb-2">
        <hr className="flex-1 border-t border-[var(--color-palette-4)] opacity-50" />
        <button
          type="button"
          className="text-[var(--color-white)] text-sm font-semibold hover:text-[var(--color-palette-4)] transition px-2"
          style={{ background: "none", border: "none", boxShadow: "none", padding: 0, cursor: "pointer", textDecoration: "none" }}
          onClick={onShowVariantTable}
        >
          Variant List
        </button>
        <hr className="flex-1 border-t border-[var(--color-palette-4)] opacity-50" />
      </div>
      <button className="bg-[var(--color-white)] text-black py-2 rounded-xl font-bold mt-2 w-full" onClick={() => onSave({ name, description, price, itemId, photo, variants })}>Save</button>
    </aside>
  );
};

export default ItemFormPanel; 