"use client";

import React, { useState } from 'react';
import ProductCategoryCard from '../components/product/ProductCategoryCard';
import ProductItemCard from '../components/product/ProductItemCard';
import ProductFormPanel from '../components/product/ProductFormPanel';
import SearchBar from '../components/searchbar';
import DeleteConfirmModal from '../components/product/DeleteConfirmModal';
import AddCategoryForm from '../components/product/AddCategoryForm';
import AddItemForm from '../components/product/AddItemForm';
import BackButton from '../components/BackButton';
import AddVariantTable from '../components/product/AddVariantTable';
import { VariantType } from '../components/product/AddVariantTable';

const DUMMY_CATEGORIES = [
  { id: 'beverage', name: 'Beverage', itemCount: 8, bgColor: '#e3f6f5', description: 'All drinks' },
  { id: 'snack', name: 'Snack', itemCount: 6, bgColor: '#f3e8ff', description: 'Light snacks' },
  { id: 'main', name: 'Main Course', itemCount: 7, bgColor: '#ffe4ef', description: 'Main dishes' },
];

const INITIAL_ITEMS = {
  beverage: [
    { id: 'bev1', name: 'Cappuccino', price: 25000, description: 'Hot cappuccino', variants: [
      { id: 1, name: "Size", description: "Ukuran minuman", status: true, variants: [
        { id: 1, name: "Regular", description: "Ukuran biasa", price: 0 },
        { id: 2, name: "Large", description: "Ukuran besar", price: 5000 },
      ] },
      { id: 2, name: "Sugar Level", description: "Tingkat kemanisan", status: false, variants: [
        { id: 1, name: "Normal", description: "Standar", price: 0 },
        { id: 2, name: "Less", description: "Sedikit gula", price: 0 },
      ] },
    ] },
    { id: 'bev2', name: 'Latte', price: 23000, description: 'Creamy latte', variants: [
      { id: 1, name: "Milk Type", description: "Jenis susu", status: true, variants: [
        { id: 1, name: "Full Cream", description: "Susu full cream", price: 0 },
        { id: 2, name: "Almond", description: "Susu almond", price: 7000 },
      ] },
    ] },
    { id: 'bev3', name: 'Americano', price: 20000, description: 'Black coffee', variants: [] },
    { id: 'bev4', name: 'Espresso', price: 18000, description: 'Strong espresso', variants: [] },
    { id: 'bev5', name: 'Mocha', price: 27000, description: 'Chocolate coffee', variants: [] },
    { id: 'bev6', name: 'Matcha Latte', price: 29000, description: 'Green tea latte', variants: [] },
    { id: 'bev7', name: 'Caramel Macchiato', price: 32000, description: 'Sweet caramel', variants: [] },
    { id: 'bev8', name: 'Vanilla Latte', price: 26000, description: 'Vanilla flavor', variants: [] },
  ],
  snack: [
    { id: 'snk1', name: 'French Fries', price: 18000, description: 'Crispy fries', variants: [] },
    { id: 'snk2', name: 'Potato Wedges', price: 20000, description: 'Seasoned wedges', variants: [] },
    { id: 'snk3', name: 'Onion Rings', price: 21000, description: 'Fried onion rings', variants: [] },
    { id: 'snk4', name: 'Chicken Nuggets', price: 22000, description: 'Crispy nuggets', variants: [] },

  ],
  main: [
    { id: 'main1', name: 'Chicken Steak', price: 40000, description: 'Grilled chicken steak', variants: [] },
    { id: 'main2', name: 'Beef Steak', price: 50000, description: 'Juicy beef steak', variants: [] },
    { id: 'main3', name: 'Fish Steak', price: 42000, description: 'Fish fillet steak', variants: [] },
    { id: 'main4', name: 'Spaghetti', price: 35000, description: 'Classic spaghetti', variants: [] },
    { id: 'main5', name: 'Lasagna', price: 37000, description: 'Layered pasta', variants: [] },
    { id: 'main6', name: 'Chicken Rice', price: 30000, description: 'Rice with chicken', variants: [] },
    { id: 'main7', name: 'Egg Fried Rice', price: 28000, description: 'Fried rice with egg', variants: [] },
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

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [formType, setFormType] = useState<'category' | 'item'>('category');
  const [items, setItems] = useState<any>(INITIAL_ITEMS);
  const [categories, setCategories] = useState(DUMMY_CATEGORIES);
  const [searchValue, setSearchValue] = useState('');
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [panelMode, setPanelMode] = useState<'category' | 'item'>('category');
  const [formMode, setFormMode] = useState<'edit-category' | 'edit-item' | 'add-category' | 'add-item'>('edit-category');
  const [showVariantTable, setShowVariantTable] = useState(false);

  // Ambil data kategori/item aktif langsung dari state
  const activeCategory = selectedCategory ? categories.find((c: any) => c.id === selectedCategory) : null;
  const activeItem = selectedCategory && selectedItemId
    ? items[selectedCategory].find((it: any) => it.id === selectedItemId)
    : null;

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setPanelMode('item');
    setSelectedItemId(null);
    setFormMode('edit-category'); // pastikan form kanan berubah ke edit kategori
    if (formType !== 'category') setFormType('category');
  };

  const handleBackToCategory = () => {
    setPanelMode('category');
    setSelectedCategory(null);
    setSelectedItemId(null);
  };

  const handleItemClick = (item: any) => {
    setSelectedItemId(item.id);
    setFormType('item');
    setFormMode('edit-item'); // pastikan form kanan berubah ke edit item
  };

  const handleDeleteItem = (itemId: string) => {
    if (!selectedCategory) return;
    setItems((prev: any) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((item: any) => item.id !== itemId)
    }));
    setSelectedItemId(null);
    setFormType('category');
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    setShowDeleteCategoryModal(true);
  };
  const confirmDeleteCategory = () => {
    if (!selectedCategory) return;
    setCategories((prev: any) => prev.filter((cat: any) => cat.id !== selectedCategory));
    setSelectedCategory(null);
    setFormType('category');
    setShowDeleteCategoryModal(false);
  };
  const cancelDeleteCategory = () => setShowDeleteCategoryModal(false);

  const handleDeleteItemForm = () => {
    if (!selectedCategory || !selectedItemId) return;
    setShowDeleteItemModal(true);
  };
  const confirmDeleteItem = () => {
    if (!selectedCategory || !selectedItemId) return;
    setItems((prev: any) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((item: any) => item.id !== selectedItemId)
    }));
    setSelectedItemId(null);
    setFormType('category');
    setShowDeleteItemModal(false);
  };
  const cancelDeleteItem = () => setShowDeleteItemModal(false);

  const handleSave = (data: any) => {
    if (formType === 'category' && selectedCategory) {
      setCategories((prev: any) => prev.map((cat: any) =>
        cat.id === selectedCategory ? { ...cat, name: data.name, description: data.description } : cat
      ));
    } else if (formType === 'item' && selectedCategory && selectedItemId) {
      setItems((prev: any) => ({
        ...prev,
        [selectedCategory]: prev[selectedCategory].map((item: any) =>
          item.id === selectedItemId ? { ...item, ...data, id: data.itemId } : item
        )
      }));
    } else {
      alert('Saved! (dummy)');
    }
  };

  // Handler untuk Add Category
  const handleAddCategory = () => setFormMode('add-category');
  const handleSaveAddCategory = (data: { name: string; description: string }) => {
    setCategories(prev => [
      ...prev,
      { id: data.name.toLowerCase().replace(/\s+/g, '-'), name: data.name, itemCount: 0, bgColor: PALETTE_COLORS[prev.length % PALETTE_COLORS.length], description: data.description }
    ]);
    setFormMode('edit-category');
  };
  const handleCancelAddCategory = () => setFormMode('edit-category');
  // Handler untuk Add Item
  const handleAddItem = () => {
    setFormMode('add-item');
    setSelectedItemId(null); // reset item yang aktif
  };
  const handleSaveAddItem = (data: { name: string; description: string; price: number; itemId: string; photo?: string }) => {
    if (!selectedCategory) return;
    setItems(prev => ({
      ...prev,
      [selectedCategory]: [
        ...(prev[selectedCategory] || []),
        { id: data.itemId, name: data.name, price: data.price, description: data.description, photo: data.photo, variants: [] }
      ]
    }));
    setFormMode('edit-category');
  };
  const handleCancelAddItem = () => setFormMode('edit-category');

  const handleVariantsChange = (categoryId: string, itemId: string, newVariants: VariantType[]) => {
    setItems((prev: any) => ({
      ...prev,
      [categoryId]: prev[categoryId].map((item: any) =>
        item.id === itemId ? { ...item, variants: newVariants } : item
      )
    }));
  };

  // Filter categories dan items berdasarkan search
  const filteredCategories = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredItems = (selectedCategory && items[selectedCategory])
    ? items[selectedCategory].filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="h-screen flex">
      {/* Panel Kiri: Category Card atau Item List */}
      <div className="flex-1 flex flex-col p-6">
        {panelMode === 'category' && (
          <div>
            <div className="flex items-center mb-4 gap-2">
              <SearchBar
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Cari kategori..."
                className="min-w-[180px]"
              />
              <button
                className="px-4 py-2 bg-[var(--color-dark)] text-white rounded-lg font-semibold hover:bg-[var(--color-black)] transition"
                onClick={handleAddCategory}>
                Add Category +
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat: any, idx: number) => (
                  <ProductCategoryCard
                    key={cat.id}
                    name={cat.name}
                    itemCount={items[cat.id]?.length || 0}
                    bgColor={PALETTE_COLORS[idx % PALETTE_COLORS.length]}
                    isActive={selectedCategory === cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                  />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-400">Kategori tidak ditemukan</p>
              )}
            </div>
          </div>
        )}
        {panelMode === 'item' && selectedCategory && (
          <div>
            {showVariantTable ? (
              <AddVariantTable
                variants={activeItem?.variants || []}
                onVariantsChange={newVariants => handleVariantsChange(selectedCategory, selectedItemId, newVariants)}
                onBack={() => setShowVariantTable(false)}
                onAddVariant={handleAddItem}
              />
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <SearchBar
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      placeholder="Cari item..."
                      className="min-w-[180px]"
                    />
                    <button
                      className="px-4 py-2 bg-[var(--color-dark)] text-white rounded-lg font-semibold hover:bg-[var(--color-black)] transition"
                      onClick={handleAddItem}>
                      Add Item +
                    </button>
                  </div>
                  <BackButton onClick={handleBackToCategory}></BackButton>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item: any) => (
                      <ProductItemCard
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        itemId={item.id}
                        isActive={selectedItemId === item.id}
                        bgColor={PALETTE_COLORS[categories.findIndex((cat: any) => cat.id === selectedCategory) % PALETTE_COLORS.length]}
                        onClick={() => handleItemClick(item)}
                      />
                    ))
                  ) : (
                    <p className="col-span-3 text-center text-gray-400">Item tidak ditemukan</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* Panel Form */}
      <aside className="w-80 h-screen max-h-screen bg-[var(--color-black)] text-white border-l border-[var(--color-card-border)] flex flex-col overflow-hidden">
        {formMode === 'add-category' && (
          <AddCategoryForm
            onSave={handleSaveAddCategory}
            onCancel={handleCancelAddCategory}
          />
        )}
        {formMode === 'add-item' && (
          <AddItemForm
            onSave={handleSaveAddItem}
            onCancel={handleCancelAddItem}
          />
        )}
        {formMode === 'edit-category' && (
          <ProductFormPanel
            type="category"
            initialData={activeCategory ? { name: activeCategory.name, description: activeCategory.description } : null}
            onSave={handleSave}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
        {formMode === 'edit-item' && (
          <ProductFormPanel
            type="item"
            initialData={activeItem ? { ...activeItem } : null}
            onSave={handleSave}
            onDeleteItem={handleDeleteItemForm}
            onShowVariantTable={() => setShowVariantTable(true)}
          />
        )}
      </aside>
      {/* Delete Confirm Modals */}
      <DeleteConfirmModal
        open={showDeleteCategoryModal}
        message="Apakah Anda yakin ingin menghapus kategori ini?"
        onConfirm={confirmDeleteCategory}
        onCancel={cancelDeleteCategory}
        confirmText="Hapus Kategori"
      />
      <DeleteConfirmModal
        open={showDeleteItemModal}
        message="Apakah Anda yakin ingin menghapus item ini?"
        onConfirm={confirmDeleteItem}
        onCancel={cancelDeleteItem}
        confirmText="Hapus Item"
      />
    </div>
  );
}