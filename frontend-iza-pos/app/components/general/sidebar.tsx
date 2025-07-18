"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "../dashboard/profile";
import ThemeToggle from "./ThemeToggle";

const menus = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Menu", href: "/menu" },
  { name: "Product", href: "/product" },
  { name: "Table Order Management", href: "/tableordermanagement" },
  { name: "Table Management", href: "/tablemanagement" },

  { name: "Accounting", href: "/accounting" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-[calc(100vh-15px)] flex flex-col justify-between bg-[var(--color-black)] py-6 px-4 border border-[var(--color-card-border)] rounded-3xl shadow-lg mt-2 ml-4  fixed z-50">
      {/* Bagian Atas: Logo + Menu */}
      <div>
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-[var(--color-dark)] rounded-lg" />
          <span className="text-2xl font-bold text-[var(--color-white)]">Iza POS</span>
        </div>

        {/* Menu List */}
        <nav className="flex  flex-col gap-1 mt-9">
          {menus.map((menu) => {
            const isActive = pathname === menu.href;
            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`px-4 py-2 rounded-2xl font-medium transition-colors text-lg mb-1 ${
                  isActive
                    ? "bg-[var(--color-dark)] text-[var(--color-white)] font-semibold"
                    : "text-[var(--color-gray)] hover:bg-[var(--color-dark)] hover:text-[var(--color-white)]"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bagian Bawah: ThemeToggle + Profile + Footer */}
      <div>
        <ThemeToggle />
        <Profile />
        <div className="text-xs text-gray-500 dark:text-neutral-400 font-medium text-center mt-8">
          © 2025 IZA POS. All rights reserved
        </div>
      </div>
    </aside>
  );
}
