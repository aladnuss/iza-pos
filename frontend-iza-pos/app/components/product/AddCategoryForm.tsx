import React, { useState } from 'react';

interface AddCategoryFormProps {
  onSave: (data: { name: string; description: string }) => void;
  onCancel: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <aside className="w-80 bg-[var(--color-black)] text-white flex flex-col rounded-2xl overflow-hidden p-6">
      <h2 className="text-lg font-semibold mb-4">Add Category</h2>
      <label className="mb-2 text-sm">Category Name</label>
      <input className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={name} onChange={e => setName(e.target.value)} />
      <label className="mb-2 text-sm">Description</label>
      <textarea className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={description} onChange={e => setDescription(e.target.value)} />
      <div className="flex gap-2 mt-4">
        <button className="flex-1 py-2 rounded bg-gray-600 text-white font-semibold" onClick={onCancel}>Cancel</button>
        <button className="flex-1 py-2 rounded bg-[var(--color-white)] text-black font-bold" onClick={() => onSave({ name, description })}>Save</button>
      </div>
    </aside>
  );
};

export default AddCategoryForm; 