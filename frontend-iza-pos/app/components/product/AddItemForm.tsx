import React, { useState } from 'react';

interface AddItemFormProps {
  onSave: (data: { name: string; description: string; price: number; itemId: string; photo?: string }) => void;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [itemId, setItemId] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <aside className="w-80 bg-[var(--color-black)] text-white flex flex-col rounded-2xl overflow-hidden p-6">
      <h2 className="text-lg font-semibold mb-4">Add Item</h2>
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
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 rounded bg-gray-600 text-white font-semibold" onClick={onCancel}>Cancel</button>
        <button className="flex-1 py-2 rounded bg-[var(--color-white)] text-black font-bold" onClick={() => onSave({ name, description, price, itemId, photo })}>Save</button>
      </div>
    </aside>
  );
};

export default AddItemForm; 