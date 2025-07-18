import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search", value, onChange, className }) => {
  return (
    <div className={`relative ${className || "my-2"}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-400 w-4 h-5 " />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-[var(--color-dark)] text-white pl-10 pr-4 py-2 rounded-2xl w-62 border border-[var(--color-card-border)]"
      />
    </div>
  );
};

export default SearchBar;
