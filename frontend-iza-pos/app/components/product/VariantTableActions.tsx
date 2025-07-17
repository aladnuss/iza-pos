import React, { useState, useRef, useEffect } from 'react';

interface VariantTableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const VariantTableActions: React.FC<VariantTableActionsProps> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Actions"
        type="button"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-[var(--color-dark)] border border-[var(--color-card-border)] rounded shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-[var(--color-black)] text-white"
            onClick={() => { setOpen(false); onEdit(); }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-red-600 text-white"
            onClick={() => { setOpen(false); onDelete(); }}
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
};

export default VariantTableActions; 