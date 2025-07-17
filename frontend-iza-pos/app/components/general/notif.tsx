import React from "react";

const Notif: React.FC = () => {
  return (
    <div className="relative w-10 h-10 flex bg-[var(--color-dark)] items-center border border-3xl border-[var(--color-card-border)] rounded-2xl justify-center">
      {/* Badge */}
      <span className="absolute -top-1 -left-1 bg-[var(--color-palette-4)] text-[var(--color-black)] font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md z-10">
        12
      </span>
      {/* Bell Icon (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="#555"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    </div>
  );
};

export default Notif; 