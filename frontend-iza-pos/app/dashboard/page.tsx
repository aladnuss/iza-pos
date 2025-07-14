'use client';

import React, { useState } from 'react';
import { DollarSign, FileText, Users, ShoppingCart, ChevronDown } from 'lucide-react';
import SearchBar from '../components/searchbar';
import CardDashboard from '../components/dashboard/card';
import BestSellerCard from '../components/dashboard/bestsellercard';
import SalesOverviewChart from '../components/dashboard/salesoverviewchart';
import PaymentChart from '../components/dashboard/paymentchart';
import ScoreDashboard from '../components/dashboard/scoredashboard';

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState('');
  // Sample data for the chart
 
  return (
    <main className="flex-1 p-3 box-border">
      <div className="mt-3 mb-4">
        <SearchBar 
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Cari menu..."
        />
      </div>

      {/* Card Baris 1*/}
      <div className="grid gap-3 grid-cols-4">
        <div className="relative">
          <CardDashboard
            icon={<DollarSign color='black'/>}
            title="Total Earning"
            value="Rp 100.000"
            bgColorClass="bg-[#292C2D]"
            percentage={12.5}
            isIncrease={true}
          >
            <img
              src="/3.png"
              alt="Coffee"
              className="absolute left-30 top-30 w-45 h-45 opacity-40 pointer-events-none select-none z-0"
            />
          </CardDashboard>
        </div>
        <CardDashboard
          icon={<Users color='black'/>}
          title="Total Orders"
          value="46 Order"
          bgColorClass="bg-[#292C2D]"
          percentage={10}
          isIncrease={false}
        >
          <img
            src="/2.png"
            alt="Orders"
            className="absolute left-28 top-25 w-50 h-50 opacity-40 pointer-events-none select-none z-0"
          />
        </CardDashboard>
        <CardDashboard
          icon={<ShoppingCart color='black'/>}
          title="On Progress"
          value="23 Items"
          bgColorClass="bg-[#292C2D]"
          valueClassName="mb-6"
        >
          <img
            src="/1.png"
            alt="On Progress"
            className="absolute left-20 top-23 w-65 h-65 opacity-10 pointer-events-none select-none z-0"
          />
        </CardDashboard>
        <CardDashboard
          icon={<FileText color='black'/>}
          title="Avarage Order Sales"
          value="Rp 85.600"
          bgColorClass="bg-[#292C2D]"
          percentage={2}
          isIncrease={true}
        >
          <img
            src="/4.png"
            alt="Avarage Order Sales"
            className="absolute left-35 top-34 w-50 h-32 opacity-12 pointer-events-none select-none z-0"
          />
        </CardDashboard>
      </div>

      {/* Card Baris 2*/}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <BestSellerCard />
        <ScoreDashboard />
      </div>

      {/* Card Baris 3*/}
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="col-span-2"><SalesOverviewChart /></div>
        <div className="col-span-1"><PaymentChart /></div>
      </div>
    </main>
  );
}