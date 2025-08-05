"use client";
import React, { useState } from "react";
import SearchBar from "./searchbar";
import Notif from "./notif";
import BackButton from "./BackButton";

interface HeaderContentProps {
  title?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showAddItem?: boolean;
  addButtonLabel?: string;
  onAddItem?: () => void;
  itemSearchValue?: string;
  onItemSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showBackButton?: boolean;
  onBack?: () => void;
  placeholder?: string; // Add this line
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  onButtonClick,
  buttonLabel,
  showAddItem,
  onAddItem,
  addButtonLabel,
  itemSearchValue,
  onItemSearchChange,
  showBackButton,
  onBack,
  title,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full flex items-center pb-2">
      <div className="flex items-center w-full bg-[var(--color-black)] border border-[var(--color-card-border)] rounded-3xl px-4 py-2 mt-2 mb-2 shadow-sm">
        {/* Default SearchBar dan Notif */}
        {!showAddItem && (
          <>
            <SearchBar
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder={placeholder || "Cari kategori..."}
            />
            <div className="ml-2">
              <Notif />
            </div>
            {onButtonClick && (
              <button
                className="ml-auto px-4 py-2 bg-[var(--color-dark)] text-white rounded-2xl border w-52 border-[var(--color-card-border)] font-semibold hover:bg-[var(--color-black)] transition"
                onClick={onButtonClick}
              >
                {buttonLabel}
              </button>
            )}
          </>
        )}
        {/* SearchBar, Add Item, dan BackButton khusus panel item */}
        {showAddItem && (
          <div className="flex items-center py-2 gap-2 w-full">
            <SearchBar
              value={itemSearchValue}
              onChange={onItemSearchChange}
              placeholder={placeholder || "Cari item..."}
              className="min-w-[180px]"
            />
            <Notif />
            {!showBackButton && title && (
              <span className="font-bold text-lg">{title}</span>
            )}
            {/* Spacer untuk mendorong Add Item button ke kanan */}
            <div className="flex-1" />
            {/* Buttons container */}
            <div className="flex items-center gap-2">
              {onAddItem && (
                <button
                  className="w-40 px-4 py-2 bg-[var(--color-dark)] text-white rounded-2xl border border-[var(--color-card-border)] font-semibold hover:bg-[var(--color-black)] transition"
                  onClick={onAddItem}
                >
                  {addButtonLabel || 'Add Item +'}
                </button>
              )}
              {showBackButton && (
                <BackButton onClick={onBack} />
              )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;