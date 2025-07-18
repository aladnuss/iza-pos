"use client";

import React, { useState } from 'react';
import CategoryCard from '../components/menu/cardcategory';
import CardItem from '../components/menu/carditem';
import OrderPanel from '../components/menu/orderpanel';

import HeaderContent from '../components/general/HeaderContent';

const DUMMY_CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', itemCount: 13, bgColor: '#e3f6f5' },
  { id: 'soups', name: 'Soups', itemCount: 8, bgColor: '#f3e8ff' },
  { id: 'pasta', name: 'Pasta', itemCount: 10, bgColor: '#cce6f7' },
  { id: 'sou3p2s', name: 'Soups', itemCount: 8, bgColor: '#f3e8ff' },
  { id: 'pa3st2a', name: 'Pasta', itemCount: 10, bgColor: '#cce6f7' },
  { id: 'sou2ps', name: 'Soups', itemCount: 8, bgColor: '#f3e8ff' },
  { id: 'pa3sta', name: 'Pasta', itemCount: 10, bgColor: '#cce6f7' },
];

const DUMMY_ITEMS = {
  breakfast: [
    { id: 'fish', name: 'Fish and chips', price: 7.5 },
    { id: 'chicken', name: 'Roast chicken', price: 12.75 },
    { id: 'fissh', name: 'Fish and chips', price: 7.5 },
    { id: 'chicsken', name: 'Roast chicken', price: 12.75 },
  ],
  soups: [
    { id: 'soup1', name: 'Tomato Soup', price: 5.0 },
    { id: 'soup2', name: 'Chicken Soup', price: 6.0 },
    { id: 'soup3', name: 'Miso Soup', price: 6.5 },
    { id: 'soup4', name: 'Miso Soup', price: 6.5 },
    { id: 'soup5', name: 'Miso Soup', price: 6.5 },
    { id: 'soup6', name: 'Miso Soup', price: 6.5 },
    { id: 'soup7', name: 'Miso Soup', price: 6.5 },
    { id: 'soup8', name: 'Miso Soup', price: 6.5 },
    { id: 'soup9', name: 'Miso Soup', price: 6.5 },
    { id: 'soup10', name: 'Miso Soup', price: 6.5 },
    { id: 'soup11', name: 'Miso Soup', price: 6.5 },
    { id: 'soup12', name: 'Miso Soup', price: 6.5 },
    { id: 'soup13', name: 'Miso Soup', price: 6.5 },
  ],
};

const PALETTE_COLORS = [
  '#56DFCF',
  '#708A58',
  '#FFA673',
  '#FF4F0F',
  '#FF7D29',
  '#D2C1B6',
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemCounts, setItemCounts] = useState<{ [itemId: string]: number }>({});
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
  };

  const handleIncrement = (itemId: string) => {
    setItemCounts((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const handleDecrement = (itemId: string) => {
    setItemCounts((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  };

  const handlePlaceOrder = () => {
    alert("Order placed!");
  };

  const activeCategory = DUMMY_CATEGORIES.find((cat) => cat.id === selectedCategory);

  // Gabungkan semua item dari semua kategori
  const allItems = Object.values(DUMMY_ITEMS).flat();

  // Assign palette color ke setiap kategori (TIDAK adaptif theme)
  const categoriesWithColor = DUMMY_CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchValue.toLowerCase())
  ).map((cat, idx) => ({
    ...cat,
    palette: PALETTE_COLORS[idx % PALETTE_COLORS.length],
  }));

  const orderItems = Object.entries(itemCounts)
    .filter(([_, count]) => count > 0)
    .map(([id, quantity]) => {
      const item = allItems.find((it) => it.id === id);
      return item ? { id, name: item.name, price: item.price, quantity } : null;
    })
    .filter(Boolean) as { id: string; name: string; price: number; quantity: number }[];

  return (
    <div className="h-screen flex">
      <main className="flex flex-1 ml-3 overflow-auto">
        <section className="flex flex-col pl-3 flex-1 overflow-hidden min-h-0">
          {/* SearchBar */}
    <div className='mr-2'>
            <HeaderContent />
            </div>

          {/* Category Section */}
          <div className="grid grid-cols-3 overflow-y-auto h-[300px]">
            {categoriesWithColor.length > 0 ? (
              categoriesWithColor.map((cat, idx) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  itemCount={cat.itemCount}
                  bgColor={cat.palette}
                  isActive={selectedCategory === cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400">Kategori tidak ditemukan</p>
            )}
          </div>

          <hr className="border-[var(--color-card-border)] w-11/12 mx-auto" />

          {/* Item List Section */}
          <div className="grid grid-cols-3 gap-2 h-[500px] pr-2 mt-2 mb-3 overflow-y-auto place-content-start" style={{ gridAutoRows: 'min-content' }}>
            {selectedCategory && DUMMY_ITEMS[selectedCategory] ? (
              DUMMY_ITEMS[selectedCategory].map((item) => (
                <CardItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  count={itemCounts[item.id] || 0}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                  active={(itemCounts[item.id] || 0) > 0}
                  bgColor={categoriesWithColor.find(cat => cat.id === selectedCategory)?.palette}
                />
              ))
            ) : (
              <p className="flex items-center justify-center h-[390px] text-2sm font-semibold text-[var(--color-gray)] col-span-3">
                Pilih kategori untuk melihat item
              </p>
            )}
          </div>
        </section>
        {/* Side Panel */}
        <OrderPanel
          items={orderItems}
          onPlaceOrder={handlePlaceOrder}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
      </main>
    </div>
  );
}