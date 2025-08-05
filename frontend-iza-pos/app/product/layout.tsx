import React from 'react';
import Sidebar from '../components/general/sidebar';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen">
      <aside className="w-[220px] bg-[var(--color-black)] text-white flex-shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}