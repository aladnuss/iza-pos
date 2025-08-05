'use client';

import React from 'react';
import { DollarSign, FileText, Users, ShoppingCart, ChevronDown } from 'lucide-react';
import CardDashboard from '../components/dashboard/card';
import BestSellerCard from '../components/dashboard/bestsellercard';
import SalesOverviewChart from '../components/dashboard/salesoverviewchart';
import PaymentChart from '../components/dashboard/paymentchart';
import ScoreDashboard from '../components/dashboard/scoredashboard';
import HeaderContent from '../components/general/HeaderContent';

export default function Dashboard() {
 
  return (
    <main className="flex-1 pl-8 pr-4 pb-2 box-border">

        <HeaderContent />


      {/* Card Baris 1*/}
      <div className="grid gap-4 grid-cols-4">
        <div className="relative">
          <CardDashboard
            icon={<DollarSign color='var(--color-white)'/>}
            title="Total Earning"
            value="Rp 100.000"
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
          icon={<Users color='var(--color-white)'/>}
          title="Total Orders"
          value="46 Order"
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
          icon={<ShoppingCart color='var(--color-white)'/>}
          title="On Progress"
          value="23 Items"
        >
          <img
            src="/1.png"
            alt="On Progress"
            className="absolute left-20 top-23 w-65 h-65 opacity-10 pointer-events-none select-none z-0"
          />
        </CardDashboard>
        <CardDashboard
          icon={<FileText color='var(--color-white)'/>}
          title="Avarage Order Sales"
          value="Rp 85.600"
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
      <div className="grid grid-cols-2 gap-4 mt-4">
        <BestSellerCard />
        <ScoreDashboard />
      </div>

      {/* Card Baris 3*/}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-2"><SalesOverviewChart /></div>
        <div className="col-span-1"><PaymentChart /></div>
      </div>
    </main>
  );
}