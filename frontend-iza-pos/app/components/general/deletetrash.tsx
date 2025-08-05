import React, { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';

interface DeleteTrashProps {
  onDelete: () => void;
  itemName?: string;
  disabled?: boolean;
}

export default function DeleteTrash({ onDelete, itemName = "item", disabled = false }: DeleteTrashProps) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete();
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  if (disabled) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-600/20 rounded-lg transition-colors"
        title={`Hapus ${itemName}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 11v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11v6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {showModal && (
        <DeleteConfirmModal
          open={showModal}
          message={`Apakah Anda yakin ingin menghapus ${itemName} ini? Tindakan ini tidak dapat dibatalkan.`}
          title="Konfirmasi Hapus"
          confirmText="Hapus"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
}
