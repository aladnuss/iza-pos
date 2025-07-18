import React from 'react';
import { Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  title?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ open, message, onConfirm, onCancel, confirmText = 'Delete', title = 'Delete' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[380px] max-w-full bg-white dark:bg-[var(--color-black)] rounded-2xl shadow-xl flex flex-col items-center px-8 pt-8 pb-6">
        {/* Tombol close kanan atas */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={22} />
        </button>
        {/* Icon trash merah */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-dark)] mb-4">
          <Trash2 size={36} className="text-[var(--color-gray)]" />
        </div>
        {/* Judul */}
        <h2 className="text-xl font-bold text-[var(--color-white)] mb-1 text-center">{title}</h2>
        {/* Deskripsi */}
        <p className="text-[var(--color-gray)] text-center mb-6 text-base">{message}</p>
        {/* Tombol aksi */}
        <div className="flex w-full gap-3 mt-2">
          <button
            className="flex-1 py-3 rounded-lg border border-[var(--color-card-border)] text-[var(--color-gray)] font-semibold bg-white dark:bg-[var(--color-black)] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-3 rounded-lg bg-[var(--color-dark)] border border-[var(--color-card-border)] text-white font-bold hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal; 