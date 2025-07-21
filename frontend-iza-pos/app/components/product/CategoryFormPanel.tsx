import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface CategoryFormPanelProps {
  initialData?: { name: string; description: string };
  onSave: (data: { name: string; description: string }) => void;
  onReset?: () => void;
  onDeleteCategory?: () => void;
}

const CategoryFormPanel: React.FC<CategoryFormPanelProps> = ({ initialData, onSave, onReset, onDeleteCategory }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  React.useEffect(() => {
    setName(initialData?.name || '');
    setDescription(initialData?.description || '');
  }, [initialData]);

  if (!initialData) {
    return null;
  }
  return (
    <aside className="w-80 h-full bg-[var(--color-black)] text-white flex flex-col rounded-2xl overflow-hidden p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Category Form</h2>
        <div className="flex items-center gap-2">
          <button className="text-xs text-[var(--color-gray)] underline" onClick={() => { setName(''); setDescription(''); if(onReset) onReset(); }}>Reset</button>
          <button className="text-[var(--color-gray)] hover:text-red-500" onClick={onDeleteCategory} title="Delete Category">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <hr className='mb-3 border-[var(--color-gray)]' />
      <label className="mb-2 text-sm">Category Name</label>
      <input className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={name} onChange={e => setName(e.target.value)} />
      <label className="mb-2 text-sm">Description</label>
      <textarea className="mb-3 p-2 rounded bg-[var(--color-dark)] text-white" value={description} onChange={e => setDescription(e.target.value)} />
      <div className="flex-1" />
      <button className="bg-[var(--color-white)] text-black py-2 rounded-xl font-bold mt-4" onClick={() => onSave({ name, description })}>Save</button>
    </aside>
  );
};

export default CategoryFormPanel; 