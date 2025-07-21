import React, { useState } from 'react';
import SearchBar from '../general/searchbar';
import { Calendar, Filter } from 'lucide-react';

// Dummy data untuk contoh
const dummyOrders = [
  { id: 1, name: 'Denial Atchison', status: 'BREAKFAST', statusColor: 'bg-yellow-300 text-white', table: 8, time: '10:00 AM', items: [{ qty: 2, name: 'Coffee', price: 5.50 }, { qty: 1, name: 'Toast', price: 3.00 }] },
];

const venues = ['All Venue', 'Floor 1', 'Floor 2'];

const OrderManagementPanel: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venue, setVenue] = useState('All Venue');
  const [search, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);

  // Format tanggal (bisa diganti dengan datepicker)
  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Navigasi tanggal
  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  return (
    <aside className="w-[350px] min-h-[600px] bg-[var(--color-black)] rounded-3xl shadow-lg p-5 flex flex-col gap-4 border border-[var(--color-card-border)]">
      {/* date */}
      <div className="w-full">
        <h2 className="text-xl font-bold text-[var(--color-white)] mb-4">Order List</h2>
        <hr className="border-t border-[var(--color-card-border)] " />
      </div>
      {/* Hapus baris input tanggal dan tombol panah kiri/kanan di atas search bar. */}

      {/* Search & Filter */}
      <div className="flex items-center gap-2 w-full max-w-full relative">
        {/* Custom search bar, bukan import SearchBar */}
        <div className="relative flex-1 min-w-0">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search order..."
            className="bg-[var(--color-dark)] text-white pl-10 pr-4 py-2 rounded-2xl w-full border border-[var(--color-card-border)] focus:outline-none"
          />
        </div>
        {/* Logo kalender */}
        <button className="w-10 h-10 p-2 rounded-xl bg-[var(--color-dark)] hover:bg-[var(--color-gray)] border border-[var(--color-card-border)] flex items-center justify-center" title="Calendar">
          <Calendar className="w-5 h-5 text-white" />
        </button>
        {/* Logo filter */}
        <div className="relative">
          <button
            className="w-10 h-10 p-2 rounded-xl bg-[var(--color-dark)] hover:bg-[var(--color-gray)] border border-[var(--color-card-border)] flex items-center justify-center"
            title="Filter"
            onClick={() => setShowVenueDropdown(v => !v)}
          >
            <Filter className="w-5 h-5 text-white" />
          </button>
          {showVenueDropdown && (
            <div className="absolute right-0 mt-2 z-50 bg-[var(--color-black)] border border-gray-200 rounded-xl shadow min-w-[120px] py-2">
              {venues.map(v => (
                <button
                  key={v}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${venue === v ? 'font-bold text-[var(--color-white)]' : 'text-gray-700'}`}
                  onClick={() => { setVenue(v); setShowVenueDropdown(false); }}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>


      {dummyOrders.filter(order => 'name' in order && 'status' in order && 'table' in order && 'time' in order).map(order => {
        const o = order as { id: number; name: string; status: string; table: number; time: string; items: { qty: number; name: string; price: number }[] };
        return (
          <div key={o.id} className="flex flex-col gap-">
            <div className="flex items-center gap-3">
              <div className="w-17 h-17 rounded-2xl bg-[var(--color-black)] shadow-sm flex flex-col items-center justify-center text-white font-bold text-lg border border-[var(--color-card-border)]">
                <span className="text-base font-semibold leading-tight">{o.time.split(' ')[0]}</span>
                <span className="text-xs font-medium mt-1">{o.time.split(' ')[1]}</span>
              </div>
              <div className="flex-1 bg-[var(--color-black)] rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2 border border-[var(--color-card-border)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base text-white">{o.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-gray-600 text-sm">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      Table #{o.table}
                    </span>
                    <span className="border-l border-gray-300 h-4 mx-2"></span>
                    <span className="text-xs text-gray-400">Order #{o.id}</span>
                  </div>
                </div>
                <button
                  className="ml-auto flex items-center p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Dropdown table detail order di bawah card utama */}
            {expandedOrder === o.id && (
              <div className="bg-[var(--color-dark)] rounded-xl p-3 mt-2 border border-[var(--color-card-border)]">
                <table className="w-full text-xs text-white">
                  <thead>
                    <tr>
                      <th className="py-1 text-left">QT</th>
                      <th className="py-1 text-left">Items</th>
                      <th className="py-1 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {o.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-1">{item.qty}</td>
                        <td className="py-1">{item.name}</td>
                        <td className="py-1 text-right">${item.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr className="my-2 border-[var(--color-card-border)]" />
                <div className="flex justify-between text-white text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">${o.items.reduce((sum, i) => sum + i.price, 0).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default OrderManagementPanel; 