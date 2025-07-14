import React from 'react';

interface ProductItemCardProps {
  name: string;
  price: number;
  itemId: string;
  bgColor?: string;
  isActive?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

function darkenColor(hex: string, amount = 0.2) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const num = parseInt(c, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) - 255 * amount);
  let g = Math.max(0, ((num >> 8) & 0xff) - 255 * amount);
  let b = Math.max(0, (num & 0xff) - 255 * amount);
  return `rgb(${r},${g},${b})`;
}

const ProductItemCard: React.FC<ProductItemCardProps> = ({ name, price, itemId, bgColor, isActive, onClick }) => {
  const darkBg = bgColor ? darkenColor(bgColor, 0.18) : 'var(--color-gray)';
  return (
    <div
      className={`relative w-[220px] h-[130px] rounded-2xl border shadow-md p-4 text-left overflow-hidden flex flex-col justify-between transition-colors duration-300 cursor-pointer hover:brightness-90`}
      style={{ background: isActive ? darkBg : (bgColor || 'var(--color-dark)'), borderColor: 'var(--color-gray)' }}
      onClick={onClick}
    >
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl transition-colors duration-300 z-20" style={{ backgroundColor: darkBg }}></div>
      <div className="absolute inset-0 transition-opacity duration-200 z-0 pointer-events-none group-hover:opacity-10" style={{ background: darkBg, opacity: isActive ? 0.10 : 0 }}></div>
      <div className="relative z-10 h-full flex flex-col justify-between text-[var(--color-white)]">
        <div>
          <div className="text-xs mb-1" style={{ color: 'var(--color-black)' }}>ID: {itemId}</div>
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-black)' }}>{name}</div>
          <div className="text-xs mb-2" style={{ color: 'var(--color-black)' }}>Rp {price.toLocaleString('id-ID')}</div>
        </div>
        {/* No action buttons */}
      </div>
    </div>
  );
};

export default ProductItemCard; 