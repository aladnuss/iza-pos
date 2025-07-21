import React from 'react';

interface CardItemProps {
  name: string;
  price: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  active?: boolean;
  bgColor?: string;
}

function darkenColor(hex: string, amount = 0.2) {
  // hex: #RRGGBB, amount: 0..1
  let c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const num = parseInt(c, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) - 255 * amount);
  let g = Math.max(0, ((num >> 8) & 0xff) - 255 * amount);
  let b = Math.max(0, (num & 0xff) - 255 * amount);
  return `rgb(${r},${g},${b})`;
}

const CardItem: React.FC<CardItemProps> = ({ name, price, count, onIncrement, onDecrement, active, bgColor }) => {
  const textColor = 'text-[var(--color-white)]';
  const btnBase = `border rounded-md w-6 h-6 flex items-center justify-center text-sm font-bold text-[var(--color-white)] hover:bg-[var(--color-gray)] hover:text-[var(--color-black)]`;
  const darkBg = bgColor ? darkenColor(bgColor, 0.18) : 'var(--color-gray)';

  return (
    <div
      className="relative w-[225px] rounded-3xl border shadow-lg p-4 text-left overflow-hidden cursor-default flex flex-col justify-between transition-colors duration-300"
      style={{ background: active ? darkBg : (bgColor || 'var(--color-dark)'), borderColor: 'var(--color-gray)' }}
    >
      {/* Garis vertikal kiri */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-2xl transition-colors duration-300 z-20"
        style={{ backgroundColor: darkBg }}
      ></div>

      {/* Overlay gelap hanya saat hover/aktif */}
      <div
        className="absolute inset-0 transition-opacity duration-200 z-0 pointer-events-none group-hover:opacity-10"
        style={{ background: darkBg, opacity: active ? 0.10 : 0 }}
      ></div>

      {/* Konten */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${textColor}`}>
        <div>
          <div className="text-[10px] mb-1" style={{ color: 'var(--color-black)' }}>Orders → Kitchen</div>
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-black)' }}>{name}</div>
          <div className="text-xs mb-2" style={{ color: 'var(--color-black)' }}>${price.toFixed(2)}</div>
        </div>

        {/* Tombol kanan bawah */}
        <div className="flex justify-end mt-auto">
          <div className="flex items-center gap-2">
            <button
              className={`${btnBase} ${count === 0 ? 'bg-[var(--color-black)] opacity-50 cursor-not-allowed' : 'bg-[var(--color-black)] text-[var(--color-white)]'}`}
              onClick={onDecrement}
              disabled={count === 0}>
              –
            </button>
            <span className="text-sm font-semibold" style={{ color: 'var(--color-black)' }}>{count}</span>
            <button
              className={`${btnBase} ${count === 0 ? 'bg-[var(--color-black)] opacity-50 cursor-not-allowed' : 'bg-[var(--color-black)] text-[var(--color-white)]'}`}
              onClick={onIncrement}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
