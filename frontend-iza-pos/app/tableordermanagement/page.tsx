"use client";
import React, { useState, useRef } from 'react';
import HeaderContent from '../components/tableordermanagement/HeaderContent';
import AddVenueModal from '../components/tableordermanagement/AddVenueModal';
import AddTableModal from '../components/tableordermanagement/AddTableModal';
import RoomCanvas from '../components/tableordermanagement/RoomCanvas';
import OrderManagementPanel from '../components/tableordermanagement/OrderManagementPanel';

const TableOrderManagementPage = () => {
  const [venue, setVenue] = useState('Floor 1');
  const [venues, setVenues] = useState(['Floor 1']);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [showAddTable, setShowAddTable] = useState(false);

  const handleAddVenue = (name: string) => {
    setVenues(vs => [...vs, name]);
    setVenue(name);
    setTables(t => ({ ...t, [name]: [] }));
    setShowAddVenue(false);
  };

  // State daftar meja
  const [tables, setTables] = useState<Record<string, {
    id: number;
    label: string;
    seats: number;
    x: number;
    y: number;
    type: string;
    status: 'available' | 'not_available' | 'booked';
  }[]>>({
    'Floor 1': [
      { id: 1, label: "A1", seats: 4, x: 64, y: 96, type: 'rectangle', status: 'available' },
      { id: 2, label: "B2", seats: 6, x: 256, y: 192, type: 'rectangle', status: 'available' },
    ]
  });
  // Untuk drag
  const [draggedId, setDraggedId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [dragBackup, setDragBackup] = useState(null); // backup posisi sebelum drag
  const [isLayoutDirty, setIsLayoutDirty] = useState(false); // true jika ada perubahan posisi meja
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [showEditTable, setShowEditTable] = useState(false);

  // Mulai drag
  const handleDragStart = (e, table) => {
    e.preventDefault();
    setDraggedId(table.id);
    setDragBackup((tables[venue] || []).map(t => ({ ...t })));
    const rect = e.target.getBoundingClientRect();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setDragPos({
      x: table.x,
      y: table.y,
    });
    document.body.style.userSelect = 'none';
  };

  // Saat drag
  const handleDrag = (e) => {
    if (draggedId === null) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const canvas = document.getElementById('room-canvas');
    const canvasRect = canvas.getBoundingClientRect();
    let newX = clientX - canvasRect.left - dragOffset.x;
    let newY = clientY - canvasRect.top - dragOffset.y;
    // Clamp agar tidak keluar canvas
    newX = Math.max(0, Math.min(newX, canvasRect.width - 80));
    newY = Math.max(0, Math.min(newY, canvasRect.height - 80));
    setDragPos({ x: newX, y: newY });
    setTables(t => ({
      ...t,
      [venue]: (t[venue] || []).map(table => table.id === draggedId ? { ...table, x: newX, y: newY } : table)
    }));
  };

  // Selesai drag
  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOffset({ x: 0, y: 0 });
    setDragPos({ x: 0, y: 0 });
    setIsLayoutDirty(true); // show save/cancel
    document.body.style.userSelect = '';
  };

  // Save posisi
  const handleSave = () => {
    setDraggedId(null);
    setDragBackup(null);
    setIsLayoutDirty(false);
  };
  // Cancel drag
  const handleCancel = () => {
    if (dragBackup) setTables(t => ({ ...t, [venue]: dragBackup }));
    setDraggedId(null);
    setDragBackup(null);
    setIsLayoutDirty(false);
  };

  // Attach global event saat drag
  React.useEffect(() => {
    if (draggedId !== null) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag, { passive: false });
      window.addEventListener('touchend', handleDragEnd);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [draggedId]);

  // Handler tambah meja (default persegi panjang, 4 kursi)
  const handleAddTable = () => {
    setTables(t => {
      const arr = t[venue] || [];
      const nextId = arr.length ? Math.max(...arr.map(t => t.id)) + 1 : 1;
      const nextLabel = `A${nextId}`;
      return {
        ...t,
        [venue]: [
          ...arr,
          {
            id: nextId,
            label: nextLabel,
            seats: 4,
            x: 32 + arr.length * 40,
            y: 32 + arr.length * 40,
            type: 'rectangle',
            status: 'available',
          },
        ]
      };
    });
  };

  // Legend dinamis sesuai status meja di venue aktif
  const legendConfig = [
    { status: 'available', color: 'bg-green-400', label: 'Available' },
    { status: 'not_available', color: 'bg-gray-400', label: 'Not Available' },
    { status: 'booked', color: 'bg-yellow-400', label: 'Booked' },
  ];

  return (
    <div className="h-full flex flex-col">
      <main className="flex-1 flex flex-col  ml-1 px-5 pb-2">
        <section className="flex flex-col flex-1 min-h-0">
          {/* Header */}
          <HeaderContent
            venues={venues}
            activeVenue={venue}
            onSelectVenue={setVenue}
            onAddVenue={() => setShowAddVenue(true)}
          />
          {/* Main Content */}
          <div className="flex flex-1 gap-2 mt-2 min-h-0 h-full">
            {/* Card Konten Table Management (Tengah) */}
            <div className="flex-1 bg-[var(--color-black)] rounded-2xl shadow border border-[var(--color-card-border)] p-6 min-h-0 h-full flex flex-col relative">
              {/* Konten table management (canvas, drag meja, dsb) akan di sini */}
              <RoomCanvas
                tables={tables[venue] || []}
                setTables={arr => setTables(t => ({ ...t, [venue]: arr }))}
                onAddTable={() => setShowAddTable(true)}
                isLayoutDirty={isLayoutDirty}
                onSave={handleSave}
                onCancel={handleCancel} 
                draggedId={draggedId}
                setDraggedId={setDraggedId}
                dragOffset={dragOffset}
                setDragOffset={setDragOffset}
                dragPos={dragPos}
                setDragPos={setDragPos}
                dragBackup={dragBackup}
                setDragBackup={setDragBackup}
                onStartDrag={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onEditTable={(table) => { setSelectedTable(table); setShowEditTable(true); }}
              />
              {/* Legend status meja di bawah canvas (selalu tampil semua status) */}
              <div className="flex justify-center mt-6">
                <div className="flex gap-6 items-center px-8 py-3 rounded-2xl bg-[var(--color-dark)] shadow border border-[var(--color-card-border)]">
                  {legendConfig.map(l => (
                    <div className="flex items-center gap-2" key={l.status}>
                      <span className={`inline-block w-5 h-5 rounded ${l.color} border border-gray-300`} />
                      <span className="text-sm text-white">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Card Table List (Kanan) */}
            <OrderManagementPanel />
          </div>
        </section>
      </main>
      <AddVenueModal
        open={showAddVenue}
        onClose={() => setShowAddVenue(false)}
        onConfirm={handleAddVenue}
      />
      {/* Modal Add Table */}
      <AddTableModal
        open={showAddTable}
        onClose={() => setShowAddTable(false)}
        onConfirm={({ type, seats, status }) => {
          setTables(t => {
            const arr = t[venue] || [];
            const nextId = arr.length ? Math.max(...arr.map(t => t.id)) + 1 : 1;
            const nextLabel = `A${nextId}`;
            return {
              ...t,
              [venue]: [
                ...arr,
                {
                  id: nextId,
                  label: nextLabel,
                  seats,
                  x: 32 + arr.length * 40,
                  y: 32 + arr.length * 40,
                  type,
                  status: status || 'available',
                },
              ]
            };
          });
          setShowAddTable(false);
        }}
      />
      {/* Modal Edit Table */}
      <AddTableModal
        open={showEditTable}
        onClose={() => { setShowEditTable(false); setSelectedTable(null); }}
        onConfirm={({ type, seats, status }) => {
          if (!selectedTable) return;
          setTables(t => ({
            ...t,
            [venue]: (t[venue] || []).map(table => table.id === selectedTable.id ? { ...table, type, seats, status } : table)
          }));
          setShowEditTable(false);
          setSelectedTable(null);
        }}
        {...(selectedTable ? {
          // Default value untuk edit
          defaultType: selectedTable.type,
          defaultSeats: selectedTable.seats,
          defaultStatus: selectedTable.status,
          isEdit: true,
          onDelete: () => {
            setTables(t => ({
              ...t,
              [venue]: (t[venue] || []).filter(table => table.id !== selectedTable.id)
            }));
            setShowEditTable(false);
            setSelectedTable(null);
          }
        } : {})}
      />
    </div>
  );
};

export default TableOrderManagementPage;
