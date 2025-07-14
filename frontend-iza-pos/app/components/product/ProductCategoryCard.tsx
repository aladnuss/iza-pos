import React from 'react';

interface ProductCategoryCardProps {
  name: string;
  itemCount: number;
  bgColor: string;
  width?: string;
  height?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
  name,
  itemCount,
  bgColor,
  width = '220px',
  height = '125px',
  isActive = false,
  onClick,
}) => {
  return (
    <div
      className={`relative rounded-2xl border flex flex-col justify-between p-5 transition text-left shadow-md cursor-pointer overflow-hidden`}
      style={{ background: bgColor, borderColor: 'var(--color-gray)', width, height }}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 z-0 ${
          isActive ? 'opacity-40' : 'opacity-0 hover:opacity-10 text-white'
        }`}
      ></div>
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div className="mb-2"></div>
        <div>
          <p className={`text-xl font-semibold mb-1 ${isActive ? 'text-white ' : 'text-gray-900'}`} style={{ color: 'var(--color-foreground)' }}>{name}</p>
          <p className={`text-sm mb-1 ${isActive ? 'text-white ' : 'text-gray-500'}`} style={{ color: 'var(--color-black)' }}>
            {itemCount} items
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard; 