import React, { useState } from 'react';

interface Variasi {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface VariantFormProps {
  onSave: (data: { name: string; description: string; variasi: Variasi[] }) => void;
  onCancel?: () => void;
  initialData?: { name: string; description: string; variasi: Variasi[] };
}

const VariantForm: React.FC<VariantFormProps> = ({ onSave, onCancel, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [variasi, setVariasi] = useState<Variasi[]>(initialData?.variasi || []);
  const [showAdd, setShowAdd] = useState(false);
  const [newVar, setNewVar] = useState({ name: '', description: '', price: 0 });

  const handleAddVariasi = () => {
    if (!newVar.name) return;
    setVariasi([...variasi, { ...newVar, id: Date.now() }]);
    setNewVar({ name: '', description: '', price: 0 });
    setShowAdd(false);
  };

  const handleDeleteVar = (id: number) => {
    setVariasi(variasi.filter(v => v.id !== id));
  };

  return (
    <div className="bg-[var(--color-black)] text-white rounded-2xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Variant Form</h2>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Variant Name</label>
        <input
          className="w-full px-3 py-2 rounded bg-[var(--color-dark)] text-white"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Size"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          className="w-full px-3 py-2 rounded bg-[var(--color-dark)] text-white"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="e.g. Ukuran minuman"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-semibold">Variasi</label>
        {variasi.map(v => (
          <div key={v.id} className="flex items-center gap-2 mb-2 bg-[var(--color-dark)] p-2 rounded">
            <div className="flex-1">
              <div className="font-semibold">{v.name}</div>
              <div className="text-xs text-gray-400">{v.description}</div>
              <div className="text-xs">Rp {v.price.toLocaleString()}</div>
            </div>
            <button className="text-red-400 px-2" onClick={() => handleDeleteVar(v.id)}>Hapus</button>
          </div>
        ))}
        {showAdd ? (
          <div className="flex flex-col gap-2 bg-[var(--color-dark)] p-3 rounded mb-2">
            <input
              className="px-2 py-1 rounded bg-[var(--color-black)] text-white"
              value={newVar.name}
              onChange={e => setNewVar({ ...newVar, name: e.target.value })}
              placeholder="Nama Variasi"
            />
            <input
              className="px-2 py-1 rounded bg-[var(--color-black)] text-white"
              value={newVar.description}
              onChange={e => setNewVar({ ...newVar, description: e.target.value })}
              placeholder="Deskripsi"
            />
            <input
              className="px-2 py-1 rounded bg-[var(--color-black)] text-white"
              type="number"
              value={newVar.price}
              onChange={e => setNewVar({ ...newVar, price: Number(e.target.value) })}
              placeholder="Harga"
            />
            <div className="flex gap-2 mt-1">
              <button className="bg-green-600 px-3 py-1 rounded text-white" onClick={handleAddVariasi}>Simpan</button>
              <button className="bg-gray-600 px-3 py-1 rounded text-white" onClick={() => setShowAdd(false)}>Batal</button>
            </div>
          </div>
        ) : (
          <button className="bg-[var(--color-dark)] px-3 py-1 rounded text-white mt-2" onClick={() => setShowAdd(true)}>
            Add Variasi
          </button>
        )}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-[var(--color-white)] text-black py-2 rounded-xl font-bold w-full mt-2"
          onClick={() => onSave({ name, description, variasi })}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default VariantForm; 