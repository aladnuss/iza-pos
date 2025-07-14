"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login gagal");
        return;
      }
      // Ambil data user dari response
      const data = await res.json();
      const user = {
        name: data.name || email.split("@")[0],
        email,
      };
      // Simpan ke recentUsers di localStorage, maksimal 2 user
      if (typeof window !== "undefined") {
        const recent = JSON.parse(localStorage.getItem("recentUsers") || "[]");
        // Hapus duplikat berdasarkan email
        const filtered = recent.filter((u: any) => u.email !== user.email);
        // Tambahkan user ke depan, maksimal 2 user
        const updated = [user, ...filtered].slice(0, 2);
        localStorage.setItem("recentUsers", JSON.stringify(updated));
        localStorage.setItem("currentUserEmail", user.email);
      }
      router.push("/dashboard");
    } catch (err) {
      setError("Terjadi kesalahan koneksi");
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-dark)', display: 'flex', flexDirection: 'column' }}>
      {/* Header/Navbar */}
      <header style={{ background: 'var(--color-white)', height: 64 }} className="flex items-center px-8 shadow-sm">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div style={{ width: 36, height: 36, background: 'var(--color-gray-dark)', borderRadius: 8 }} />
            <span className="text-xl font-bold" style={{ color: 'var(--color-dark)', letterSpacing: 1 }}>Iza POS</span>
            <span className="text-base font-medium" style={{ color: 'var(--color-gray)' }}> Log in</span>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-16 px-4 mx-auto">
          {/* Kiri: Logo & Brand */}
          <div className="flex flex-col items-center justify-center flex-1 mb-10 md:mb-0">
            {/* Logo besar */}
            <div className="mb-6">
              <svg width="120" height="120" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="72" height="72" rx="16" fill="var(--color-gray-dark)" />
                <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="48" fill="#FFFFFF" fontFamily="Arial, Helvetica, sans-serif">I</text>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-white)' }}>Iza POS</h2>
            <p className="text-base" style={{ color: 'var(--color-gray)' }}>Solusi kasir modern</p>
          </div>
          {/* Kanan: Card Login */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md">
            <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6 shadow-lg border border-gray-200">
              <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>Log in</h1>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ background: 'var(--color-white)', color: 'var(--color-dark)', borderColor: 'var(--color-gray-dark)' }}
                    placeholder="No. Handphone/Username/Email"
                    name="email"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ background: 'var(--color-white)', color: 'var(--color-dark)', borderColor: 'var(--color-gray-dark)' }}
                    placeholder="Password"
                    name="password"
                  />
                </div>
                <div className="flex justify-start mb-2">
                  <a href="#" className="text-sm text-blue-600 hover:underline">Lupa Password</a>
                </div>
                <button
                  type="submit"
                  className="w-full font-semibold py-2 rounded-lg transition-colors"
                  style={{ background: 'var(--color-dark)', color: 'var(--color-white)' }}
                >
                  LOG IN
                </button>
                {/* Divider ATAU */}
                <div className="flex items-center my-2 gap-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-semibold">ATAU</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 border border-[#676767] py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--color-dark)', background: 'transparent' }}
                >
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_17_40)">
                      <path d="M47.617 24.5455C47.617 22.8854 47.4781 21.5454 47.2726 20.1591H24.48V28.3273H37.6172C37.3617 30.2273 36.0454 32.9773 33.2726 34.9091L33.2335 35.1664L40.1344 40.5073L40.6172 40.9546C45.0454 36.9546 47.617 31.4546 47.617 24.5455Z" fill="#4285F4"/>
                      <path d="M24.48 47.4546C31.0454 47.4546 36.6172 45.2728 40.6172 40.9546L33.2726 34.9091C31.1617 36.4091 28.3617 37.4091 24.48 37.4091C18.0454 37.4091 12.6172 33.4091 10.6172 27.9546L10.3663 27.9749L3.22263 33.5455L3.1344 33.7728C7.11172 41.0909 15.0454 47.4546 24.48 47.4546Z" fill="#34A853"/>
                      <path d="M10.6172 27.9546C10.089 26.5682 9.77263 25.0455 9.77263 23.4546C9.77263 21.8637 10.089 20.3409 10.5726 18.9546L10.5617 18.6846L3.35713 13.0228L3.1344 13.1364C1.77263 15.8182 1 18.7728 1 21.9546C1 25.1364 1.77263 28.0909 3.1344 30.7728L10.6172 27.9546Z" fill="#FBBC05"/>
                      <path d="M24.48 9.5C29.0454 9.5 32.0454 11.4091 33.7726 12.9546L40.7726 6.13636C36.6172 2.40909 31.0454 0 24.48 0C15.0454 0 7.11172 6.36364 3.1344 13.1364L10.5726 18.9546C12.6172 13.5 18.0454 9.5 24.48 9.5Z" fill="#EA4335"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_17_40">
                        <rect width="48" height="48" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Login dengan Google
                </button>
                {error && <div className="text-red-500 text-sm">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer style={{ background: 'var(--color-white)' }} className="w-full py-10 border-t border-gray-200 ">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-8 text-sm mx-auto px-8 mt-3">
            <div>
              <div className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Layanan</div>
              <ul className="space-y-1">
                <li style={{ color: 'var(--color-gray)' }}>Bantuan</li>
                <li style={{ color: 'var(--color-gray)' }}>Pembayaran</li>
                <li style={{ color: 'var(--color-gray)' }}>Pengembalian</li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Jelajahi</div>
              <ul className="space-y-1">
                <li style={{ color: 'var(--color-gray)' }}>Tentang Kami</li>
                <li style={{ color: 'var(--color-gray)' }}>Kebijakan Privasi</li>
                <li style={{ color: 'var(--color-gray)' }}>Kontak</li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Pembayaran</div>
              <ul className="space-y-1">
                <li style={{ color: 'var(--color-gray)' }}>Bank Transfer</li>
                <li style={{ color: 'var(--color-gray)' }}>E-Wallet</li>
                <li style={{ color: 'var(--color-gray)' }}>Kartu Kredit</li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>Ikuti Kami</div>
              <ul className="space-y-1">
                <li style={{ color: 'var(--color-gray)' }}>Instagram</li>
                <li style={{ color: 'var(--color-gray)' }}>Facebook</li>
                <li style={{ color: 'var(--color-gray)' }}>LinkedIn</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-xs" style={{ color: 'var(--color-gray)' }}>
          © Iza POS 2025. Hak Cipta Dilindungi
        </div>
      </footer>
    </div>
  );
}
