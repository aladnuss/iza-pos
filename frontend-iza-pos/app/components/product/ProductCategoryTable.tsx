import React, { useState } from 'react';

// Tipe data untuk item pada kategori
interface Item {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// Props untuk tabel kategori produk
interface ProductCategoryTableProps {
  categories: Array<{
    id: string;
    name: string;
    itemCount: number;
    description?: string;
    status?: boolean;
    items?: Item[];
  }>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: boolean) => void;
}

// Komponen utama tabel kategori produk
const ProductCategoryTable: React.FC<ProductCategoryTableProps> = ({ categories, onEdit, onDelete, onStatusChange }) => {
  // State untuk baris yang sedang di-expand (item list)
  const [openRow, setOpenRow] = useState<number | null>(null);
  // State untuk popout menu aksi (titik tiga)
  const [actionMenu, setActionMenu] = useState<number | null>(null);
  // State untuk status aktif/nonaktif kategori
  const [statusMap, setStatusMap] = useState<{ [id: string]: boolean }>(
    Object.fromEntries(categories.map(cat => [cat.id, cat.status ?? true]))
  );

  // Handler untuk toggle status kategori
  const handleToggleStatus = (catId: string) => {
    setStatusMap(prev => {
      const newStatus = !prev[catId];
      if (onStatusChange) onStatusChange(catId, newStatus);
      return { ...prev, [catId]: newStatus };
    });
  };

  return (
    // Wrapper tabel yang mengisi ruang sisa di bawah header, responsive, dan scrollable
    <div className="flex-1 min-h-0 rounded-3xl border border-[var(--color-card-border)] bg-[var(--color-black)] overflow-y-auto mb-2">
      <table className="min-w-full text-sm text-left">
        {/* Header tabel */}
        <thead className="bg-[var(--color-black)] text-white sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-semibold">No</th>
            <th className="px-4 py-3 font-semibold">Nama Kategori</th>
            <th className="px-4 py-3 font-semibold">Jumlah Item</th>
            <th className="px-4 py-3 font-semibold">Deskripsi</th>
            <th className="px-4 py-3 font-semibold text-center">Status</th>
            <th className="px-4 py-3 font-semibold text-center">Item List</th>
            <th className="px-4 py-3 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Render baris utama kategori */}
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              {/* Baris utama kategori */}
              <tr className="border-b border-[var(--color-card-border)]">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 font-semibold">{cat.name}</td>
                <td className="px-4 py-3">{cat.itemCount}</td>
                <td className="px-4 py-3">{cat.description || '-'}</td>
                {/* Kolom status aktif/nonaktif */}
                <td className="px-4 py-3 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={statusMap[cat.id]} onChange={() => handleToggleStatus(cat.id)} className="sr-only peer" />
                    <div className={`w-9 h-5 rounded-full transition ${statusMap[cat.id] ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </label>
                </td>
                {/* Kolom tombol expand/collapse item list */}
                <td className="px-4 py-3 text-center">
                  <button onClick={() => setOpenRow(openRow === idx ? null : idx)} aria-label="Show Items">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
                {/* Kolom tombol titik tiga (aksi) */}
                <td className="px-4 py-3 text-center relative">
                  <button onClick={() => setActionMenu(actionMenu === idx ? null : idx)} className="p-2 rounded-full hover:bg-gray-200 transition" aria-label="Actions">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2" fill="currentColor" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                      <circle cx="19" cy="12" r="2" fill="currentColor" />
                    </svg>
                  </button>
                  {/* Popout menu aksi (edit/hapus) */}
                  {actionMenu === idx && (
                    <div className="absolute right-0 mt-2 w-28 bg-[var(--color-black)] border border-gray-200 rounded-lg shadow-lg z-20">
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setActionMenu(null); onEdit && onEdit(cat.id); }}>Edit</button>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => { setActionMenu(null); onDelete && onDelete(cat.id); }}>Hapus</button>
                    </div>
                  )}
                </td>
              </tr>
              {/* Baris sub-table item list (expand) */}
              {openRow === idx && cat.items && cat.items.length > 0 && (
                <tr>
                  <td colSpan={7} className="p-3">
                    {/* Sub-table daftar item pada kategori */}
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="py-1 text-left">Item Name</th>
                          <th className="py-1 text-left">Description</th>
                          <th className="py-1 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.items.map(item => (
                          <tr key={item.id} className="bg-[var(--color-black)]">
                            <td className="py-1">{item.name}</td>
                            <td className="py-1">{item.description || '-'}</td>
                            <td className="py-1 text-right">Rp {item.price.toLocaleString('id-ID')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryTable; 