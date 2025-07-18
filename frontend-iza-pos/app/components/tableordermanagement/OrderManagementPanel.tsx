import React, { useState } from 'react';

// Dummy data untuk contoh
const dummyOrders = [
  {
    id: 412,
    table: 'A1',
    time: '10 AM',
    items: [
      { qty: 1, name: 'Fish and chips', price: 17.5 },
      { qty: 1, name: 'Lemonade', price: 7.25 },
      { qty: 3, name: 'Cappuccino', price: 8.0 },
      { qty: 3, name: 'Apple pie', price: 11.5 },
    ],
    
  },
];

const venues = ['All Venue', 'Floor 1', 'Floor 2'];

const OrderManagementPanel: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [venue, setVenue] = useState('All Venue');
  const [search, setSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(dummyOrders[0].id);

  // Format tanggal (bisa diganti dengan datepicker)
  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  // Navigasi tanggal
  const changeDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  return (
    <aside className="w-[350px] min-h-[600px] bg-[var(--color-black)] rounded-3xl shadow-lg p-4 flex flex-col gap-4 border border-[var(--color-card-border)]">
      {/* date */}
      <div className="flex items-center justify-center gap-2">
        <button className="w-9 h-9 rounded-full bg-[var(--color-dark)] flex items-center justify-center text-white text-xl font-bold" onClick={() => changeDate(-1)}>
          &#8592;
        </button>
        <input
          type="date"
          value={selectedDate.toISOString().slice(0, 10)}
          onChange={e => setSelectedDate(new Date(e.target.value))}
          className="bg-[var(--color-dark)] text-white rounded-2xl px-4 py-2 border border-[var(--color-card-border)] font-sans text-base w-[140px] text-center"
        />
        <button className="w-9 h-9 rounded-full bg-[var(--color-dark)] flex items-center justify-center text-white text-xl font-bold" onClick={() => changeDate(1)}>
          &#8594;
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search table/order..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-[var(--color-dark)] text-white rounded-2xl pl-3 px-2 py-2 border border-[var(--color-card-border)] font-sans text-base"
        />
        <select
          value={venue}
          onChange={e => setVenue(e.target.value)}
          className="bg-[var(--color-dark)] text-white rounded-2xl px-2 py-2 border border-[var(--color-card-border)] font-sans text-base"
        >
          {venues.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>


      {dummyOrders.map(order => (
        <div key={order.id} className="flex items-center gap-3 mb-4">
          {/* Jam (bulat, terpisah) */}
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-black)] flex items-center justify-center text-white font-bold text-lg border border-[var(--color-card-border)]">
            {order.time}
          </div>
          {/* Card info order (Table, Order #, dropdown) */}
          <div className="flex-1 bg-[var(--color-dark)] rounded-2xl px-4 py-2 flex items-center gap-2 relative">

            <span className="font-bold text-base text-white">Table <span className="text-green-400">{order.table}</span></span>
            <span className="ml-2 text-xs text-gray-400">Order #{order.id}</span>
            <button
              className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-white bg-[var(--color-gray)]"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              aria-label="Expand order"
            >
              {expandedOrder === order.id ? '▲' : '▼'}
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default OrderManagementPanel; 