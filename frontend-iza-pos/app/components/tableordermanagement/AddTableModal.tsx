import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddTableModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { type: string; seats: number; status: 'available' | 'not_available' | 'booked' }) => void;
  defaultType?: string;
  defaultSeats?: number;
  defaultStatus?: 'available' | 'not_available' | 'booked';
  isEdit?: boolean;
  onDelete?: () => void;
}

const TABLE_TYPES = [
  { value: 'rectangle', label: 'Persegi Panjang' },
  { value: 'square', label: 'Kotak' },
  { value: 'circle', label: 'Bulat' },
];

const TABLE_STATUS = [
  { value: 'available', label: 'Available' },
  { value: 'not_available', label: 'Not Available' },
  { value: 'booked', label: 'Booked' },
];

const AddTableModal: React.FC<AddTableModalProps> = ({ open, onClose, onConfirm, ...props }) => {
  const [type, setType] = useState(props.defaultType || 'rectangle');
  const [seats, setSeats] = useState(props.defaultSeats ?? 4);
  const [status, setStatus] = useState<'available' | 'not_available' | 'booked'>(props.defaultStatus || 'available');

  useEffect(() => {
    if (open) {
      setType(props.defaultType || 'rectangle');
      setSeats(props.defaultSeats ?? 4);
      setStatus(props.defaultStatus || 'available');
    }
  }, [open, props.defaultType, props.defaultSeats, props.defaultStatus]);

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
        <h2 className="text-xl font-bold text-[var(--color-white)] mb-1 text-center">{props.isEdit ? 'Edit Table' : 'Add Table'}</h2>
        {/* Dropdown tipe meja */}
        <select
          className="p-3 border border-[var(--color-card-border)] rounded-lg w-full text-base bg-[var(--color-dark)] text-white mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark)]"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          {TABLE_TYPES.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* Input jumlah kursi */}
        <input
          type="number"
          min={1}
          max={20}
          className="p-3 border border-[var(--color-card-border)] rounded-lg w-full text-base bg-[var(--color-dark)] text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark)]"
          value={seats}
          onChange={e => setSeats(Number(e.target.value))}
          placeholder="Jumlah kursi..."
        />
        {/* Dropdown status meja */}
        <select
          className="p-3 border border-[var(--color-card-border)] rounded-lg w-full text-base bg-[var(--color-dark)] text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-dark)]"
          value={status}
          onChange={e => setStatus(e.target.value as any)}
        >
          {TABLE_STATUS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {/* Tombol aksi */}
        <div className="flex w-full gap-3 mt-2">
          <button
            className="flex-1 py-3 rounded-lg border border-[var(--color-card-border)] text-[var(--color-gray)] font-semibold bg-white dark:bg-[var(--color-black)] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          {props.isEdit && props.onDelete && (
            <button
              className="flex-1 py-3 rounded-lg bg-red-600 border border-[var(--color-card-border)] text-white font-bold hover:bg-red-700 transition"
              onClick={props.onDelete}
            >
              Delete
            </button>
          )}
          <button
            className="flex-1 py-3 rounded-lg bg-[var(--color-dark)] border border-[var(--color-card-border)] text-white font-bold hover:bg-green-700 transition"
            onClick={() => { if (seats > 0) onConfirm({ type, seats, status }); }}
            disabled={seats < 1}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTableModal; 