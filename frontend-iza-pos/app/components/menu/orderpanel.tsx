"use client";

import React, { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { MoreVertical } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPanelProps {
  items: OrderItem[];
  onPlaceOrder: () => void;
  selectedPayment: string;
  setSelectedPayment: (method: string) => void;
  className?: string;
}

const PALETTE_COLORS = [
  '#606060', '#808080', '#A0A0A0', '#C0C0C0'
];

function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  const recent = JSON.parse(localStorage.getItem('recentUsers') || '[]');
  const currentUserEmail = localStorage.getItem('currentUserEmail') || '';
  return recent.find((u: any) => u.email === currentUserEmail) || null;
}

const OrderPanel: React.FC<OrderPanelProps> = ({
  items,
  onPlaceOrder,
  selectedPayment,
  setSelectedPayment,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  const currentUser = isMounted ? getCurrentUser() : null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const paymentIcons = {
    Cash: "🔒",
    "Debit Card": "💳",
    "E-Wallet": "🏪",
  };

  return (
    <aside
      className={`w-80 h-screen max-h-screen bg-[var(--color-black)] text-white border-l border-[var(--color-card-border)]
        flex flex-col overflow-hidden ${className}`}
    >
      {/* Header */}
      <header className="px-3 py-3 flex justify-between items-center] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-base font-bold"
            style={{ background: PALETTE_COLORS[0], color: 'var(--color-black)' }}>
            {isMounted && currentUser?.name ? currentUser.name[0] : ""}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Table 5</h2>
            <p className="text-sm text-[var(--color-gray)]">{currentUser?.name || 'User'}</p>
          </div>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'transparent' }}
          aria-label="More options"
        >
          <MoreVertical className="w-6 h-6 text-white dark:text-white text-black" />
        </button>
      </header>
      <hr className="border-[var(--color-card-border)] mx-4" />

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-2 mt-3 mb-2 min-h-0">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-[var(--color-dark)] px-4 py-3 rounded-xl"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="bg-[var(--color-gray)] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium shrink-0">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-[var(--color-gray)]">x{item.quantity}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary & Payment */}
      <div className="bg-[var(--color-black)] backdrop-blur-sm p-3 rounded-t-3xl shrink-0">
        {/* Summary */}
        <div className="mb-4">
          <div className="space-y-2 text-sm text-[var(--color-gray)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax 10%</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <hr className="my-3 border-[var(--color-card-border)]" />
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h3 className="text-sm text-[var(--color-gray)] mb-3">Payment Method</h3>
          <div className="grid grid-cols-3 gap-2">
            {(["Cash", "Debit Card", "E-Wallet"] as const).map((method) => (
              <button
                key={method}
                className={`
                  py-3 rounded-xl text-xs font-medium
                  flex flex-col items-center justify-center gap-1
                  border transition-all duration-200 
                  ${
                    selectedPayment === method
                      ? "bg-[var(--color-white)] text-[var(--color-black)] border-[var(--color-white)]"
                      : "bg-w text-[var(--color-gray)] border border-[var(--color-gray)]"
                  }
                `}
                onClick={() => setSelectedPayment(method)}
              >
                {method === "Cash" && <FaMoneyBillWave className="mb-1" style={{ color: 'var(--color-foreground)' }} />}
                {method === "Debit Card" && <FaCcVisa className="mb-1" style={{ color: 'var(--color-foreground)' }} />}
                {method === "E-Wallet" && <FaWallet className="mb-1" style={{ color: 'var(--color-foreground)' }} />}
                <span className="leading-tight" style={{ color: 'var(--color-foreground)' }}>
                  {method === "Debit Card" ? "Debit" : method}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={onPlaceOrder}
          className="w-full py-3 rounded-xl text-black text-sm font-bold transition-colors bg-[var(--color-white)] hover:bg-[var(--color-dark)]"
        >
          Place Order
        </button>
      </div>
    </aside>
  );
};

export default OrderPanel;
