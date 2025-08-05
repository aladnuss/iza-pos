import React, { useState, useRef, useEffect } from 'react';

interface MoreOptionProps {
  onEdit?: () => void;
  onDelete?: () => void;
  position?: 'left' | 'right';
}

export default function MoreOption({ onEdit, onDelete, position = 'right' }: MoreOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    onEdit?.();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Three dots button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 rounded-full hover:bg-[var(--color-palette-1)] hover:bg-opacity-20 transition-colors text-gray-400 hover:text-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="5" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="19" r="2" fill="currentColor" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-lg shadow-lg z-50 min-w-[120px] ${
            position === 'left' ? 'right-0' : 'left-0'
          }`}
        >
          {onEdit && (
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-white hover:bg-[var(--color-palette-1)] hover:bg-opacity-20 transition-colors text-sm flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-600 hover:bg-opacity-20 transition-colors text-sm flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline
                  points="3,6 5,6 21,6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
}
