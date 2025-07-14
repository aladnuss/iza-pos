"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil data user dari localStorage (recentUsers dan currentUserEmail)
    const recent = JSON.parse(localStorage.getItem("recentUsers") || "[]");
    const currentUserEmail = localStorage.getItem("currentUserEmail") || "";
    const currentUser = recent.find((u: any) => u.email === currentUserEmail);
    if (currentUser) {
      setUser({ name: currentUser.name, email: currentUser.email });
    } else {
      // Jika tidak ada user, redirect ke login
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    // Hapus data login dari localStorage
    localStorage.removeItem("currentUserEmail");
    // (Opsional) Hapus recentUsers jika ingin benar-benar bersih
    // localStorage.removeItem("recentUsers");
    router.replace("/login");
  }

  if (!user) return null;

  return (
    <main className="flex-1 flex flex-col items-start justify-start p-16 bg-[var(--color-black)]">
      <div className="w-full max-w-4xl bg-[var(--color-black)] rounded-lg shadow p-12 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-left text-[var(--color-white)]">Akun</h2>
        <div className="flex flex-col gap-4 mb-8 ml-2">
          <div className="flex flex-row gap-12">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <span className="font-semibold text-[var(--color-gray)]">Nama</span>
              <span className="font-semibold text-[var(--color-gray)]">Email</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[var(--color-white)]">{user.name}</span>
              <span className="text-[var(--color-white)]">{user.email}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 border-2 border-indigo-600 rounded-full text-indigo-200 font-bold hover:bg-indigo-900 transition-colors mt-4"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
