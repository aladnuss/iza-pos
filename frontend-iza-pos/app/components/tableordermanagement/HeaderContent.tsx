import React from 'react';
import Notif from '../general/notif';
import SearchBar from '../general/searchbar';

interface HeaderContentProps {
  venues: string[];
  activeVenue: string;
  onSelectVenue: (v: string) => void;
  onAddVenue: () => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ venues, activeVenue, onSelectVenue, onAddVenue }) => {
  return (
    <div className="flex items-center justify-between w-full bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-3xl px-4 mt-2 py-2 shadow-inner shadow-lg">
      <div className="flex-1 min-w-0">
        <div className="overflow-x-auto whitespace-nowrap py-2 scrollbar-thin   scrollbar-track-transparent max-w-[750px] flex gap-2">
          {venues.map(v => (
            <button
              key={v}
              className={`inline-block px-6 py-2 rounded-2xl font-bold text-base font-sans border border-[var(--color-card-border)] transition ${activeVenue === v ? 'bg-[var(--color-gray)] text-black' : 'bg-[var(--color-dark)] text-white'}`}
              style={{ fontFamily: 'var(--font-main)' }}
              onClick={() => onSelectVenue(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Notif />
        <button
          className="px-8 py-2 bg-[var(--color-dark)] text-white rounded-2xl border border-[var(--color-card-border)] font-bold text-base font-sans hover:bg-[var(--color-black)] transition"
          style={{ fontFamily: 'var(--font-main)' }}
          onClick={onAddVenue}
        >
          Add Venue +
        </button>
      </div>
    </div>
  );
};

export default HeaderContent; 