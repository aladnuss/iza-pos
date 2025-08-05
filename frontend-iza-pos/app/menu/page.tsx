// app/menu/page.tsx
"use client";

import React, { useState } from 'react';

// --- IMPORTS FOR YOUR COMPONENTS ---
import CategoryCard from '../components/general/CategoryCard';
import ItemCard from '../components/general/ItemCard';
import OrderPanel from '../components/menu/orderpanel';
import HeaderContent from '../components/general/HeaderContent';

// --- IMPORT DUMMY DATA ---
import { 
  DUMMY_CATEGORIES, 
  DUMMY_ITEMS, 
  PALETTE_COLORS,
  getAllItems,
  getCategoryById,
  type Category,
  type Item,
  type OrderItem,
  type ItemQuantities
} from '../data';
  
export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [itemCounts, setItemCounts] = useState<ItemQuantities>({});
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

  const activeCategory = getCategoryById(selectedCategory || '');
  const allItems = getAllItems();

  // Filter categories for display
  const categoriesToDisplay = DUMMY_CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchValue.toLowerCase())
  ).map((cat, idx) => ({
    ...cat,
    // Prioritize color from DUMMY_CATEGORIES, fallback to palette if needed
    color: cat.color || PALETTE_COLORS[idx % PALETTE_COLORS.length],
  }));

  // Get order items for OrderPanel
  const orderItems: OrderItem[] = Object.entries(itemCounts)
    .filter(([_, count]) => count > 0)
    .map(([id, quantity]) => {
      const item = allItems.find((it) => it.id === id);
      return item ? { id, name: item.name, price: item.price, quantity } : null;
    })
    .filter(Boolean) as OrderItem[];

  return (
      <div className="h-screen flex">
        <main className="flex flex-1 overflow-auto">
          <section className="flex flex-col flex-1 ml-8 mr-4 overflow-hidden min-h-0">
            {/* HeaderContent Section */}
            <div className=''>
              {selectedCategory === null ? (
                <HeaderContent />
              ) : (
                <HeaderContent
                  showAddItem={true}
                  showBackButton={true}
                  onBack={() => setSelectedCategory(null)}
                  title={activeCategory?.name || 'Items'}
                  itemSearchValue={searchValue}
                  onItemSearchChange={(e) => setSearchValue(e.target.value)}
                />
              )}
            </div>
  
            {/* Conditional Rendering: Category View or Item View */}
            {selectedCategory === null ? (
              // Category Section (displays CategoryCards)
              <div className="flex flex-col flex-1">
                <div className="grid gap-4 grid-cols-3 place-content-start overflow-y-auto flex-1 "> {/* Adjusted grid layout */}
                  {categoriesToDisplay.length > 0 ? (
                    categoriesToDisplay.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        category={cat} // Pass the whole category object
                        onClick={(categoryId) => handleCategoryClick(categoryId)} // Pass the handler
                      />
                    ))
                  ) : (
                    <p className="col-span-4 text-center text-gray-400 mt-8">Kategori tidak ditemukan</p>
                  )}
                </div>
              </div>
            ) : (
              // Item Section (displays ItemGrid for the selected category)
              <div className="flex flex-col flex-1">
                <div className="grid grid-cols-3 gap-2 flex-1 mb-3 overflow-y-auto place-content-start" style={{ gridAutoRows: 'min-content' }}>
                  {DUMMY_ITEMS[selectedCategory] && DUMMY_ITEMS[selectedCategory].length > 0 ? (
                    <ItemCard
                      items={DUMMY_ITEMS[selectedCategory].filter(item => 
                        item.name.toLowerCase().includes(searchValue.toLowerCase())
                      )}
                      onItemClick={(itemId) => {
                        // Handle item click for menu (different from product page)
                        // Could add to cart or show item details
                        const item = DUMMY_ITEMS[selectedCategory].find(i => i.id === itemId);
                        if (item) {
                          handleIncrement(itemId); // Add to cart functionality
                        }
                      }}
                      formatPrice={price => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)}
                      isMenuMode={true}
                      itemQuantities={itemCounts}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                  ) : (
                    <p className="flex items-center justify-center h-[390px] text-2sm font-semibold text-[var(--color-gray)] col-span-3">
                      Tidak ada item di kategori ini atau tidak ditemukan.
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
          {/* Order Panel Side Component */}
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