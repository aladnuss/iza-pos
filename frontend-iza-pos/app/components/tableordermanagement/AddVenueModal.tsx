import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddVenueModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

const AddVenueModal: React.FC<AddVenueModalProps> = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) setName('');
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[380px] max-w-full bg-white dark:bg-[var(--color-black)] rounded-2xl shadow-xl flex flex-col items-center px-8 pt-8 pb-6">
        {/* Tombol close kanan atas */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} />
        </button>
        {/* Judul */}
        <h2 className="text-xl font-bold text-[var(--color-white)] mb-1 text-center">Add Venue</h2>
        {/* Input nama venue */}
        <input
          className="p-3 border border-[var(--color-card-border)] rounded-lg w-full text-base bg-[var(--color-dark)] text-white mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark)]"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Venue name..."
        />
        {/* Tombol aksi */}
        <div className="flex w-full gap-3 mt-2">
          <button
            className="flex-1 py-3 rounded-lg border border-[var(--color-card-border)] text-[var(--color-gray)] font-semibold bg-white dark:bg-[var(--color-black)] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-[var(--color-dark)] border border-[var(--color-card-border)] text-white font-bold hover:bg-green-700 transition"
            onClick={() => { if (name.trim()) onConfirm(name.trim()); }}
            disabled={!name.trim()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVenueModal; 