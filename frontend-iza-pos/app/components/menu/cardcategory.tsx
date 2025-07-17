import React from 'react';

interface CategoryCardProps {
  name: string;
  itemCount: number;
  bgColor: string;
  width?: string;
  height?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PALETTE_COLORS = [
  '#2D4F2B',
  '#708A58',
  '#FFA673',
  '#FF4F0F',
  '#FF7D29',
  '#D2C1B6',
];

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  itemCount,
  bgColor,
  width = '225px',
  height = '121px',
  isActive = false,
  onClick,
}) => {
  return (
    <div
    className={`relative rounded-3xl shadow-lg border flex flex-col justify-between p-5 mb-2 transition text-left shadow-md cursor-pointer overflow-hidden`}
    style={{ background: bgColor, borderColor: 'var(--color-card-border)', width, height }}
    onClick={onClick}
    >
    <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 z-0 ${
        isActive ? 'opacity-40' : 'opacity-0 hover:opacity-10 text-white'
        }`}
    ></div>

    <div className="flex-1 flex flex-col justify-between relative z-10">
        
        <div>
        <p  className={`text-xl font-semibold mb-1 ${isActive ? 'text-white ' : 'text-gray-900'}`} style={{ color: 'var(--color-foreground)' }}>{name}</p>
        <p   className={`text-sm mb-1 ${isActive ? 'text-white ' : 'text-gray-500'}`} style={{ color: 'var(--color-black)' }}>
          {itemCount} items
        </p>
        </div>
    </div>
    </div>
  );
};

export default CategoryCard;
