import React from "react";

interface BackButtonWithTitleProps {
  onClick?: () => void;
  title: string;
  className?: string;
}

const BackButtonWithTitle: React.FC<BackButtonWithTitleProps> = ({ onClick, title, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center font-semibold rounded-2xl hover:opacity-90 gap-2 px-4 border border-[var(--color-card-border)] bg-[var(--color-dark)] text-[var(--color-white)] h-10 ${className}`}
    aria-label="Back"
  >
    <span className="relative -top-[1px] text-[17px]">←</span>
    <span className="text-[17px] font-semibold">{title}</span>
  </button>
);

export default BackButtonWithTitle; 