import React, { useState } from 'react';
import CustomSelect from '../general/costumselect';

const FILTERS = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Yearly', value: 'yearly' },
];

const foodData = [
  { img: 'coffeedummy.jpg', name: 'Nasi Goreng', qty: 120 },
  { img: 'coffeedummy.jpg', name: 'Mie Ayam', qty: 98 },
  { img: 'coffeedummy.jpg', name: 'Mie Ayam', qty: 98 },
  { img: 'coffeedummy.jpg', name: 'Mie Ayam', qty: 98 },
  { img: 'coffeedummy.jpg', name: 'Mie Ayam', qty: 98 },

];
const drinkData = [
  { img: 'coffeedummy.jpg', name: 'Es Teh', qty: 150 },
  { img: 'coffeedummy.jpg', name: 'Kopi Hitam', qty: 80 },
  { img: 'coffeedummy.jpg', name: 'Kopi Hitam', qty: 80 },
  { img: 'coffeedummy.jpg', name: 'Kopi Hitam', qty: 80 },
  { img: 'coffeedummy.jpg', name: 'Kopi Hitam', qty: 80 },
];

const BestSellerCard: React.FC = () => {
  const [filter, setFilter] = useState('today');

  return (
    <div className='bg-[var(--color-black)] border-1 rounded-3xl shadow-md h-[470px]' style={{ borderColor: 'var(--color-card-border)' }}>
      <div className='text-white flex justify-between pl-3 pt-3 pb-3 pr-4'>   
        <p className='p-2 font-bold text-lg'>Best Seller</p>
        <CustomSelect options={FILTERS} value={filter} onChange={setFilter} />
      </div>


      <hr className="border-[var(--color-dark)] w-117 mx-auto" />


        {/* Food List */}
        <div className='grid grid-cols-2 gap-6 p-5'>
            <div className='pr-2'>
            <h3 className="text-base font-semibold mb-2">Food</h3>
            <div className="space-y-2">
                {foodData.map((item, idx) => (
                <div key={idx} className="flex items-center bg-[var(--color-black)] rounded-lg p-2">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                    <div>
                    <div className="text-base font-semibold">{item.name}</div>
                    <div className="text-xs text-[var(--color-gray)]">Order: {item.qty}</div>
                    </div>
                </div>
                ))}
            </div>
            </div>
            {/* Drink List */}
            <div className='pl-2'>
            <h3 className="text-base font-semibold mb-2">Drink</h3>
            <div className="space-y-2">
                {drinkData.map((item, idx) => (
                <div key={idx} className="flex items-center bg-[var(--color-black)] rounded-lg p-2">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                    <div>
                    <div className="text-base font-semibold">{item.name}</div>
                    <div className="text-xs text-[var(--color-gray)]">Order: {item.qty}</div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  );
};

export default BestSellerCard;