import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (val: string) => void; // HANYA string, bukan event
    className?: string;
  }

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find(opt => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className || ''}`}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[var(--color-dark)] px-4 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-[var(--color-gray)] ring-inset hover:bg-[var(--color-gray)]"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? selected.label : 'Select'}
        <ChevronDown className="-mr-1 w-5 h-5 text-white" />
      </button>
      {open && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-[var(--color-dark)] shadow-lg ring-1 ring-black/5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((opt, idx) => (
              <button
                key={opt.value}
                className={`block w-full px-4 py-2 text-left text-sm text-white hover:bg-[var(--color-gray)] ${opt.value === value ? 'font-bold' : ''}`}
                role="menuitem"
                tabIndex={-1}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;