import React from 'react';

interface Table {
  id: number;
  label: string;
  seats: number;
  x: number;
  y: number;
  type: string;
  status: 'available' | 'not_available' | 'booked';
}

interface RoomCanvasProps {
  tables: Table[];
  setTables: (tables: Table[]) => void;
  onAddTable: () => void;
  isLayoutDirty: boolean;
  onSave: () => void;
  onCancel: () => void;
  draggedId: number | null;
  setDraggedId: React.Dispatch<React.SetStateAction<number | null>>;
  dragOffset: { x: number; y: number };
  setDragOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  dragPos: { x: number; y: number };
  setDragPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  dragBackup: Table[] | null;
  setDragBackup: React.Dispatch<React.SetStateAction<Table[] | null>>;
  onStartDrag: (e: any, table: Table) => void;
  onDrag: (e: any) => void;
  onDragEnd: () => void;
  onEditTable: (table: Table) => void;
}

const RoomCanvas: React.FC<RoomCanvasProps> = ({
  tables,
  setTables,
  onAddTable,
  isLayoutDirty,
  onSave,
  onCancel,
  draggedId,
  setDraggedId,
  dragOffset,
  setDragOffset,
  dragPos,
  setDragPos,
  dragBackup,
  setDragBackup,
  onStartDrag,
  onDrag,
  onDragEnd,
  onEditTable,
}) => {
  React.useEffect(() => {
    if (draggedId !== null) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDrag, { passive: false });
      window.addEventListener('touchend', onDragEnd);
    } else {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', onDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [draggedId]);

  // Untuk membedakan drag vs click
  const dragTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const [dragging, setDragging] = React.useState(false);

  // Helper untuk warna meja
  const getTableColor = (status: 'available' | 'not_available' | 'booked') => {
    if (status === 'available') return 'bg-green-400';
    if (status === 'not_available') return 'bg-gray-400';
    if (status === 'booked') return 'bg-yellow-400';
    return 'bg-white';
  };

  return (
    <div id="room-canvas" className="w-full flex-1 bg-[var(--color-black)] rounded-xl relative overflow-x-hidden overflow-y-hidden border-dashed border border-[var(--color-card-border)] min-h-[300px] touch-none 
      bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" style={{ touchAction: 'none', overscrollBehavior: 'none' }}>
      {/* Button Add Table di dalam canvas */}
      <button
        className="absolute top-4 right-4 z-10 bg-[var(--color-dark)]   border border-[var(--color-card-border)] text-white font-bold px-5 py-2 rounded-2xl shadow hover:bg-[var(--color-gray)] transition"
        onClick={onAddTable}
      >
        Add Table +
      </button>
      {tables.map((table) => {
        // Clamp posisi meja agar tidak keluar canvas
        let left = table.x;
        let top = table.y;
        // Ukuran meja tergantung type
        let width = 80, height = 80;
        if (table.type === 'rectangle') { width = 112; height = 64; }
        if (table.type === 'square' || table.type === 'circle') { width = 80; height = 80; }
        // Clamp ke dalam canvas
        const canvas = typeof window !== 'undefined' ? document.getElementById('room-canvas') : null;
        const canvasW = canvas ? canvas.offsetWidth : 600;
        const canvasH = canvas ? canvas.offsetHeight : 400;
        left = Math.max(0, Math.min(left, canvasW - width));
        top = Math.max(0, Math.min(top, canvasH - height));
        return (
          <div
            key={table.id}
            className="absolute flex flex-col items-center cursor-move select-none"
            style={{ left, top, zIndex: draggedId === table.id ? 20 : 10 }}
            onMouseDown={e => {
              setDragging(false);
              dragTimeout.current = setTimeout(() => {
                setDragging(true);
                onStartDrag(e, table);
              }, 100);
            }}
            onMouseUp={e => {
              if (dragTimeout.current) clearTimeout(dragTimeout.current);
              if (!dragging) {
                // Ini klik, bukan drag
                onEditTable(table);
              }
              setDragging(false);
            }}
            onTouchStart={e => {
              setDragging(false);
              dragTimeout.current = setTimeout(() => {
                setDragging(true);
                onStartDrag(e, table);
              }, 100);
            }}
            onTouchEnd={e => {
              if (dragTimeout.current) clearTimeout(dragTimeout.current);
              if (!dragging) {
                onEditTable(table);
              }
              setDragging(false);
            }}
          >
            <div className="relative">
              {/* Kursi visual */}
              {(table.type === 'circle') && (() => {
                // Kursi bulat: titik kecil mengelilingi bulatan, beri gap jika terlalu banyak
                const seats = table.seats;
                const r = 56;
                const minGap = 12; // minimal jarak antar kursi
                const maxSeats = Math.floor((2 * Math.PI * r) / minGap);
                const actualSeats = Math.min(seats, maxSeats);
                return [...Array(actualSeats)].map((_, i) => {
                  const angle = (2 * Math.PI * i) / actualSeats;
                  const x = Math.round(Math.cos(angle) * r);
                  const y = Math.round(Math.sin(angle) * r);
                  return (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-gray-400 border-2 border-white rounded-full"
                      style={{
                        left: `calc(50% + ${x}px - 8px)`,
                        top: `calc(50% + ${y}px - 8px)`,
                      }}
                    />
                  );
                });
              })()}
              {(table.type === 'square') && (() => {
                // Kursi square: 4 sisi, distribusi merata, kursi panjang jika 1 di sisi
                const seats = table.seats;
                const w = 80;
                const h = 80;
                const margin = 10;
                const minSeatW = 16, minSeatH = 8, maxSeatW = 32, maxSeatH = 32, seatGap = 4;
                // Bagi kursi ke 4 sisi secara merata, sisa ke sisi atas, kanan, bawah, kiri
                const base = Math.floor(seats / 4);
                const sisa = seats % 4;
                const perSide = [base, base, base, base]; // top, right, bottom, left
                for (let i = 0; i < sisa; i++) {
                  perSide[i]++;
                }
                const result = [];
                // Top
                if (perSide[0] === 1) {
                  result.push(
                    <div
                      key={`top-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `${margin}px`,
                        top: `-${margin + 7}px`,
                        width: `${w - 2 * margin}px`,
                        height: `12px`,
                      }}
                    />
                  );
                } else if (perSide[0] > 1) {
                  const seatW = Math.max(minSeatW, Math.min(maxSeatW, ((w - 2 * margin - (perSide[0] - 1) * seatGap) / perSide[0])));
                  for (let i = 0; i < perSide[0]; i++) {
                    result.push(
                      <div
                        key={`top-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `${seatW}px`,
                          height: `10px`,
                          left: `${margin + i * (seatW + seatGap)}px`,
                          top: `-${margin + 10}px`,
                        }}
                      />
                    );
                  }
                }
                // Right
                if (perSide[1] === 1) {
                  result.push(
                    <div
                      key={`right-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `calc(${w}px + ${margin - 4}px)`,
                        top: `${margin}px`,
                        width: `12px`,
                        height: `${h - 2 * margin}px`,
                      }}
                    />
                  );
                } else if (perSide[1] > 1) {
                  const seatH = Math.max(minSeatH, Math.min(maxSeatH, ((h - 2 * margin - (perSide[1] - 1) * seatGap) / perSide[1])));
                  for (let i = 0; i < perSide[1]; i++) {
                    result.push(
                      <div
                        key={`right-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `10px`,
                          height: `${seatH}px`,
                          left: `calc(${w}px + ${margin - 2}px)` ,
                          top: `${margin + i * (seatH + seatGap)}px`,
                        }}
                      />
                    );
                  }
                }
                // Bottom
                if (perSide[2] === 1) {
                  result.push(
                    <div
                      key={`bottom-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `${margin}px`,
                        top: `calc(${h}px + ${margin - 6}px)` ,
                        width: `${w - 2 * margin}px`,
                        height: `12px`,
                      }}
                    />
                  );
                } else if (perSide[2] > 1) {
                  const seatW = Math.max(minSeatW, Math.min(maxSeatW, ((w - 2 * margin - (perSide[2] - 1) * seatGap) / perSide[2])));
                  for (let i = 0; i < perSide[2]; i++) {
                    result.push(
                      <div
                        key={`bottom-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `${seatW}px`,
                          height: `10px`,
                          left: `${margin + i * (seatW + seatGap)}px`,
                          top: `calc(${h}px + ${margin - 6}px)`,
                        }}
                      />
                    );
                  }
                }
                // Left
                if (perSide[3] === 1) {
                  result.push(
                    <div
                      key={`left-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `-${margin + 7}px`,
                        top: `${margin}px`,
                        width: `12px`,
                        height: `${h - 2 * margin}px`,
                      }}
                    />
                  );
                } else if (perSide[3] > 1) {
                  const seatH = Math.max(minSeatH, Math.min(maxSeatH, ((h - 2 * margin - (perSide[3] - 1) * seatGap) / perSide[3])));
                  for (let i = 0; i < perSide[3]; i++) {
                    result.push(
                      <div
                        key={`left-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `10px`,
                          height: `${seatH}px`,
                          left: `-${margin + 8}px`,
                          top: `${margin + i * (seatH + seatGap)}px`,
                        }}
                      />
                    );
                  }
                }
                return result;
              })()}
              {(table.type === 'rectangle') && (() => {
                // Kursi rectangle: hanya atas & bawah, kursi panjang jika 1 di sisi
                const seats = table.seats;
                const w = 112;
                const h = 64;
                const margin = 10;
                const minSeatW = 16, maxSeatW = 32, seatGap = 4;
                // Bagi kursi ke 2 sisi (atas, bawah)
                const perSide = [0, 0]; // top, bottom
                let sisa = seats;
                let idx = 0;
                while (sisa > 0) {
                  perSide[idx % 2]++;
                  sisa--;
                  idx++;
                }
                const result = [];
                // Top
                if (perSide[0] === 1) {
                  result.push(
                    <div
                      key={`top-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `${margin}px`,
                        top: `-${margin + 4}px`, // sebelumnya -${margin + 12}px
                        width: `${w - 2 * margin}px`,
                        height: `12px`,
                      }}
                    />
                  );
                } else if (perSide[0] > 1) {
                  const seatW = Math.max(minSeatW, Math.min(maxSeatW, ((w - 2 * margin - (perSide[0] - 1) * seatGap) / perSide[0])));
                  const totalSeatsW = seatW * perSide[0] + seatGap * (perSide[0] - 1);
                  const leftStart = (w - totalSeatsW) / 2;
                  for (let i = 0; i < perSide[0]; i++) {
                    result.push(
                      <div
                        key={`top-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `${seatW}px`,
                          height: `10px`,
                          left: `${leftStart + i * (seatW + seatGap)}px`,
                          top: `-${margin + 4}px`, // sebelumnya -${margin + 10}px
                        }}
                      />
                    );
                  }
                }
                // Bottom
                if (perSide[1] === 1) {
                  result.push(
                    <div
                      key={`bottom-long`}
                      className="absolute bg-gray-400 border-2 border-white rounded-md"
                      style={{
                        left: `${margin}px`,
                        top: `calc(${h}px + ${margin - 6}px)` ,
                        width: `${w - 2 * margin}px`,
                        height: `12px`,
                      }}
                    />
                  );
                } else if (perSide[1] > 1) {
                  const seatW = Math.max(minSeatW, Math.min(maxSeatW, ((w - 2 * margin - (perSide[1] - 1) * seatGap) / perSide[1])));
                  const totalSeatsW = seatW * perSide[1] + seatGap * (perSide[1] - 1);
                  const leftStart = (w - totalSeatsW) / 2;
                  for (let i = 0; i < perSide[1]; i++) {
                    result.push(
                      <div
                        key={`bottom-${i}`}
                        className="absolute bg-gray-400 border-2 border-white rounded-md"
                        style={{
                          width: `${seatW}px`,
                          height: `10px`,
                          left: `${leftStart + i * (seatW + seatGap)}px`,
                          top: `calc(${h}px + ${margin - 6}px)`,
                        }}
                      />
                    );
                  }
                }
                return result;
              })()}
              {/* Kotak meja */}
              {table.type === 'rectangle' && (
                <div className={`w-28 h-16 ${getTableColor(table.status)} border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center shadow`}>
                  <span className="font-bold text-lg">{table.label}</span>
                  <span className="text-xs text-gray-700">{table.seats} seats</span>
                </div>
              )}
              {table.type === 'square' && (
                 <div className={`w-20 h-20 ${getTableColor(table.status)} border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center shadow`}>
                   <span className="font-bold text-lg">{table.label}</span>
                   <span className="text-xs text-gray-700">{table.seats} seats</span>
                 </div>
              )}
              {table.type === 'circle' && (
                <div className={`w-20 h-20 ${getTableColor(table.status)} border-2 border-gray-400 rounded-full flex flex-col items-center justify-center shadow`}>
                  <span className="font-bold text-lg">{table.label}</span>
                  <span className="text-xs text-gray-700">{table.seats} seats</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* Save/Cancel button muncul jika layout dirty */}
      {isLayoutDirty && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex gap-4">
                    <button
            className="bg-[var(--color-black)] text-white border border-[var(--color-card-border] font-bold px-6 py-2 rounded-xl shadow transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-[var(--color-dark)] text-white border border-[var(--color-card-border] font-bold px-9 py-2 rounded-xl shadow  transition"
            onClick={onSave}
          >
            Save
          </button>

        </div>
      )}
    </div>
  );
};

export default RoomCanvas; 