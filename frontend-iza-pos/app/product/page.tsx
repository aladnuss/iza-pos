"use client";
import HeaderContent from '../components/general/HeaderContent';
import CategoryCard from '../components/general/CategoryCard';

import { useState } from 'react';
import ItemCard from '../components/general/ItemCard';
import CategoryForm from '../components/product/categoryform';
import ItemForm from '../components/product/itemform';
import VariantCard from '../components/general/VariantCard';
import VariantForm from '../components/product/variantform';

// Import dummy data
import { 
  DUMMY_CATEGORIES, 
  DUMMY_ITEMS, 
  DUMMY_VARIANT_GROUPS,
  getVariantsByItem,
  type Category,
  type Item,
  type VariantGroup
} from '../data';

export default function ProductPage() {
  // State management
  const [categories, setCategories] = useState<Category[]>(DUMMY_CATEGORIES);
  const [items, setItems] = useState<Item[]>(Object.values(DUMMY_ITEMS).flat());
  const [variantGroups, setVariantGroups] = useState<VariantGroup[]>(DUMMY_VARIANT_GROUPS);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVariantForm, setShowVariantForm] = useState(false);

  // Handler untuk Add Category
  const handleAddCategory = () => {
    setSelectedCategory(null); // Reset selected category untuk Add mode
    setShowCategoryForm(true);
  };

  // Handler untuk klik CategoryCard
  const handleCategoryClick = (category: Category) => {
    if (showCategoryForm) {
      // Jika sedang dalam mode Add Category, switch ke Edit mode dengan data category
      setSelectedCategory(category);
      // Force re-render form dengan data category yang baru
    } else {
      // Normal behavior: masuk ke item list, tutup form Add Category jika ada
      setShowCategoryForm(false);
      setSelectedCategory(category);
    }
  };

  // Handler untuk submit form Category (Add atau Edit)
  const handleCategorySubmit = (category: Category) => {
    if (category.id) {
      // Edit existing category
      setCategories(prev => 
        prev.map(cat => cat.id === category.id ? category : cat)
      );
    } else {
      // Add new category
      const newCategory = {
        ...category,
        id: `cat-${Date.now()}`, // Generate simple ID
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setShowCategoryForm(false);
    setSelectedCategory(null);
  };

  // Handler untuk close form Add Category
  const handleCategoryFormClose = () => {
    setShowCategoryForm(false);
    setSelectedCategory(null); // Reset selected category juga
  };

  // Handler untuk Add Item
  const handleAddItem = () => {
    // Tutup CategoryForm jika sedang terbuka
    if (showCategoryForm) {
      setShowCategoryForm(false);
    }
    setSelectedItem(null); // Reset selected item untuk Add mode
    setShowItemForm(true);
  };

  // Handler untuk klik ItemCard
  const handleItemClick = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      // Tutup CategoryForm jika sedang terbuka
      if (showCategoryForm) {
        setShowCategoryForm(false);
      }
      
      if (showItemForm) {
        // Jika sedang dalam mode Add Item, switch ke Edit mode dengan data item
        setSelectedItem(item);
      } else {
        // Normal behavior: buka ItemForm untuk edit atau show variants
        setSelectedItem(item);
        setShowItemForm(true); // Buka ItemForm
      }
    }
  };

  // Handler untuk submit form Item (Add atau Edit)
  const handleItemSubmit = (item: Item) => {
    if (item.id) {
      // Edit existing item
      setItems(prev => 
        prev.map(itm => itm.id === item.id ? item : itm)
      );
    } else {
      // Add new item
      const newItem = {
        ...item,
        id: `item-${Date.now()}`, // Generate simple ID
        categoryId: selectedCategory?.id || '',
      };
      setItems(prev => [...prev, newItem]);
    }
    setShowItemForm(false);
    setSelectedItem(null);
  };

  // Handler untuk close form Add Item
  const handleItemFormClose = () => {
    setShowItemForm(false);
    setSelectedItem(null);
  };

  // Handler untuk Add Variant
  const handleAddVariant = () => {
    // Tutup form lain jika sedang terbuka
    if (showCategoryForm) {
      setShowCategoryForm(false);
    }
    if (showItemForm) {
      setShowItemForm(false);
    }
    setSelectedVariant(null); // Reset selected variant untuk Add mode
    setShowVariantForm(true);
  };

  // Handler untuk submit form Variant (Add atau Edit)
  const handleVariantSubmit = (variant: VariantGroup) => {
    if (variant.id) {
      // Edit existing variant
      setVariantGroups(prev => 
        prev.map(v => v.id === variant.id ? variant : v)
      );
    } else {
      // Add new variant
      const newVariant = {
        ...variant,
        id: `variant-${Date.now()}`, // Generate simple ID
        itemId: selectedItem?.id || '',
      };
      setVariantGroups(prev => [...prev, newVariant]);
    }
    setShowVariantForm(false);
    setSelectedVariant(null);
  };

  // Handler untuk close form Add Variant
  const handleVariantFormClose = () => {
    setShowVariantForm(false);
    setSelectedVariant(null);
  };

  // Handler untuk back button di header (navigasi antar card)
  const handleBack = () => {
    if (showVariants) {
      if (showVariantForm) {
        // Jika sedang di Add/Edit Variant mode, tutup form saja
        setShowVariantForm(false);
        setSelectedVariant(null);
      } else {
        setShowVariants(false); // Kembali ke item list dari variant list
      }
    } else if (selectedCategory && (showCategoryForm || showItemForm)) {
      // Jika sedang di Add/Edit mode, kembali ke tampilan list tanpa form
      setShowCategoryForm(false);
      setShowItemForm(false);
      setSelectedCategory(null);
      setSelectedItem(null);
    } else {
      setSelectedItem(null); // Reset selected item jika ada
      setSelectedCategory(null); // Kembali ke category list dari item list
      setShowCategoryForm(false); // Pastikan form tertutup
      setShowItemForm(false);
      setShowVariantForm(false);
    }
  };

  // Filter items by selected category
  const filteredItems = selectedCategory ? items.filter(i => i.categoryId === selectedCategory.id) : [];
  // Filter variant groups by selected item
  const filteredVariantGroups = selectedItem ? variantGroups.filter(v => v.itemId === selectedItem.id) : [];

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col pl-8 pr-4 min-w-0 overflow-y-auto">
        {!selectedCategory ? (
          <HeaderContent
            title="Categories"
            buttonLabel="+ Add Category"
            onButtonClick={handleAddCategory}
          />
        ) : !showVariants ? (
          <HeaderContent
            showAddItem
            addButtonLabel="+ Add Item"
            onAddItem={handleAddItem}
            itemSearchValue=""
            onItemSearchChange={() => {}}
            showBackButton={true}
            onBack={handleBack}
          />
        ) : (
          <HeaderContent
            showAddItem
            addButtonLabel="+ Add Variant"
            onAddItem={handleAddVariant}
            itemSearchValue=""
            onItemSearchChange={() => {}}
            placeholder="Cari variant..."
            showBackButton={true}
            onBack={handleBack}
          />
        )}

        {!selectedCategory ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showCategoryForm ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
            {categories.map(cat => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onClick={() => handleCategoryClick(cat)}
              />
            ))}
          </div>
        ) : !showVariants ? (
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showItemForm ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
            <ItemCard
              items={filteredItems}
              onItemClick={handleItemClick}
              formatPrice={price => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)}
            />
          </div>
        ) : (
          <div className={`grid grid-cols-1 gap-4 ${showVariantForm ? 'lg:grid-cols-1' : ''}`}>
            <VariantCard
              variants={filteredVariantGroups}
              onToggleEnabled={(id, enabled) => {
                // Update variant group enabled status
                setVariantGroups(prevGroups => 
                  prevGroups.map(group => 
                    group.id === id ? { ...group, isEnabled: enabled } : group
                  )
                );
              }}
              onEditSubVariant={(subVariant) => {
                // Handle edit sub variant
                console.log('Edit sub variant:', subVariant);
              }}
              onDeleteSubVariant={(subVariantId) => {
                // Handle delete sub variant
                console.log('Delete sub variant:', subVariantId);
              }}
              onAddSubVariant={(variantGroupId) => {
                // Handle add new sub variant
                console.log('Add sub variant to group:', variantGroupId);
              }}
              onEditVariant={(variant) => {
                setSelectedVariant(variant);
                setShowVariantForm(true); // Eksplisit buka form
              }}
            />
          </div>
        )}
      </div>
      {/* Sidebar kanan: Form */}
      {showCategoryForm ? (
        <div className='my-2 mr-4'>
          <CategoryForm
            initial={selectedCategory}
            onSubmit={handleCategorySubmit}
            onClose={handleCategoryFormClose}
          />
        </div>
      ) : showItemForm ? (
        <div className='my-2 mr-4'>
          <ItemForm
            initial={selectedItem}
            categoryId={selectedCategory?.id}
            onSubmit={handleItemSubmit}
            onDelete={() => {}} // TODO: implement delete
            onShowVariants={() => setShowVariants(true)}
            onClose={handleItemFormClose}
          />
        </div>
      ) : showVariantForm ? (
        <div className='my-2 mr-4'>
          <VariantForm
            initial={selectedVariant}
            itemId={selectedItem?.id}
            onSubmit={handleVariantSubmit}
            onDelete={() => {}} // TODO: implement delete
            onClose={handleVariantFormClose}
          />
        </div>
      ) : showVariants ? (
        <div className='my-2 mr-4'>
          {selectedVariant ? (
            <VariantForm
              initial={selectedVariant}
              itemId={selectedItem?.id}
              onSubmit={handleVariantSubmit}
              onDelete={() => {}} // TODO: implement delete
              onClose={() => setSelectedVariant(null)}
            />
          ) : (
            <ItemForm
              initial={selectedItem}
              categoryId={selectedCategory?.id}
              onSubmit={handleItemSubmit}
              onDelete={() => {}} // TODO: implement delete
              onShowVariants={() => setShowVariants(true)}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      ) : selectedItem ? (
        <div className='my-2 mr-4'>
          <ItemForm
            initial={selectedItem}
            categoryId={selectedCategory?.id}
            onSubmit={handleItemSubmit}
            onDelete={() => {}} // TODO: implement delete
            onShowVariants={() => setShowVariants(true)}
            onClose={() => setSelectedItem(null)}
          />
        </div>
      ) : selectedCategory ? (
        <div className='my-2 mr-4'>
          <CategoryForm
            initial={selectedCategory}
            onSubmit={handleCategorySubmit}
            onClose={() => setSelectedCategory(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
