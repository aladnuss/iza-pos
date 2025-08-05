"use client";

import React, { useState } from 'react';
import { Clock, User, CheckCircle, Utensils, AlertCircle, XCircle, Minimize } from 'lucide-react';

// Dummy data untuk contoh
const dummyOrders = [
  { 
    id: '044', 
    name: 'Robert Fox', 
    time: '7 Apr, 11:30 AM', 
    table: 'Table 03', 
    status: 'New',
    items: [
      { qty: 1, name: 'Cheese Burger', price: 12000 },
      { qty: 1, name: 'Lemonade', price: 4000 }
    ],
    total: 16000
  },
  { 
    id: '043', 
    name: 'Jenny Wilson', 
    time: '7 Apr, 11:25 AM', 
    table: 'Table 05', 
    status: 'Cooking',
    items: [
      { qty: 1, name: 'Cheese Burger', price: 12000 },
      { qty: 1, name: 'Salad with Sesame', price: 16000 }
    ],
    total: 16200
  },
  { 
    id: '042', 
    name: 'Cameron William', 
    time: '7 Apr, 11:10 AM', 
    table: 'Takeway', 
    status: 'Ready',
    items: [
      { qty: 1, name: 'Special Sandwich Grill', price: 14000 },
      { qty: 1, name: 'Sparkling Water', price: 4000 }
    ],
    total: 14000
  },
  { 
    id: '041', 
    name: 'Olivia Hart', 
    time: '7 Apr, 11:09 AM', 
    table: 'Table 06', 
    status: 'Cooking',
    items: [
      { qty: 2, name: 'Salad with Sesame', price: 16000 },
      { qty: 1, name: 'Noodles with Chicken', price: 12000 }
    ],
    total: 32000
  },
  { 
    id: '040', 
    name: 'Ethan Reyes', 
    time: '7 Apr, 11:04 AM', 
    table: 'Table 01', 
    status: 'Ready',
    items: [
      { qty: 1, name: 'Fried Rice', price: 10000 },
      { qty: 1, name: 'French Fries', price: 6000 }
    ],
    total: 21000
  },
  { 
    id: '039', 
    name: 'Mia Sullivan', 
    time: '7 Apr, 11:52 AM', 
    table: 'Takeway', 
    status: 'Completed',
    items: [
      { qty: 1, name: 'Seafood Fried Rice', price: 12000 },
      { qty: 1, name: 'Mineral Water', price: 2000 }
    ],
    total: 14000
  },
  { 
    id: '038', 
    name: 'Liam Parker', 
    time: '7 Apr, 10:50 AM', 
    table: 'Table 07', 
    status: 'Ready',
    items: [
      { qty: 1, name: 'Chicken Fried Rice', price: 10000 },
      { qty: 1, name: 'Lemonade', price: 4000 }
    ],
    total: 45000
  },
  { 
    id: '037', 
    name: 'Emily Johnson', 
    time: '7 Apr, 10:45 AM', 
    table: 'Table 04', 
    status: 'Completed',
    items: [
      { qty: 1, name: 'Noodles with Chicken', price: 13000 },
      { qty: 1, name: 'Sparkling Water', price: 4000 }
    ],
    total: 17000
  }
];

const statusConfig = {
  All: { icon: null, color: 'bg-green-500', bgColor: 'bg-green-500' },
  New: { icon: Clock, color: 'text-purple-500', bgColor: 'bg-purple-100' },
  Cooking: { icon: Utensils, color: 'text-orange-500', bgColor: 'bg-orange-100' },
  Ready: { icon: CheckCircle, color: 'text-blue-500', bgColor: 'bg-blue-100' },
  Completed: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100' },
  Cancelled: { icon: XCircle, color: 'text-red-500', bgColor: 'bg-red-100' }
};

interface OrderListProps {
  // No props needed anymore since minimize is handled in HeaderContent
}

const OrderList: React.FC<OrderListProps> = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleExpanded = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const getStatusCounts = () => {
    const counts = { All: 0, New: 0, Cooking: 0, Ready: 0, Completed: 0, Cancelled: 0 };
    dummyOrders.forEach(order => {
      counts.All++;
      if (counts[order.status as keyof typeof counts] !== undefined) {
        counts[order.status as keyof typeof counts]++;
      }
    });
    return counts;
  };

  const statusCounts = getStatusCounts();
  const filteredOrders = selectedStatus === 'All' 
    ? dummyOrders 
    : dummyOrders.filter(order => order.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;
    
    if (status === 'New') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">New Order</span>
        </div>
      );
    }
    
    if (status === 'Cooking') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600">
          <Utensils className="w-4 h-4" />
          <span className="text-sm font-medium">Cooking</span>
        </div>
      );
    }
    
    if (status === 'Ready') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Ready to serve</span>
        </div>
      );
    }
    
    if (status === 'Completed') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Completed</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-4 bg-[var(--color-background)] border border-[var(--color-card-border)] rounded-3xl min-h-screen">
      {/* Status Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {Object.keys(statusConfig).map(status => {
          const count = statusCounts[status as keyof typeof statusCounts];
          const isSelected = selectedStatus === status;
          
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                isSelected 
                  ? status === 'All' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-800 border-2 border-gray-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="font-medium">{status}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                isSelected && status === 'All' ? 'bg-white/20' : 'bg-gray-200 text-gray-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className=" bg-[var(--color-black)] rounded-3xl border border-[var(--color-card-border)] rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* Order Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{order.name}</h3>
                <p className="text-sm text-gray-500">#{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{order.time}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {order.table}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Order ({order.items.length})
                </span>
                <span className="text-lg font-bold text-green-600">
                  Rp {order.total.toLocaleString('id-ID')}
                </span>
              </div>
              
              <div className="space-y-1">
                {order.items.slice(0, expandedOrders.has(order.id) ? undefined : 2).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.qty}x {item.name}
                    </span>
                    <span className="text-gray-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {order.items.length > 2 && (
                <button
                  onClick={() => toggleExpanded(order.id)}
                  className="text-sm text-green-600 hover:text-green-700 mt-2 flex items-center gap-1"
                >
                  {expandedOrders.has(order.id) ? 'See less' : 'See more'}
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedOrders.has(order.id) ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              {getStatusBadge(order.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
