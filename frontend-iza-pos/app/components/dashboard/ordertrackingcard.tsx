import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import CustomSelect from '../general/costumselect';


Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

const FILTERS = [
  { label: 'Last 7 Days', value: '7' },
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last 90 Days', value: '90' },
];

const labels = [
  'Jun 03', 'Jun 06', 'Jun 09', 'Jun 12', 'Jun 15', 'Jun 16', 'Jun 21'
];
const dataValues = [48000, 9000, 52000, 25000, 48000, 32000, 41000, 39000, 47000, 54000, 32000, 25000];

const data = {
  labels,
  datasets: [
    {
      label: 'Order',
      data: dataValues,
      backgroundColor: labels.map((l, i) => i === 4 ? '#F1C8D0' : '#C9CAEF'), // Highlight bar ke-5
      borderRadius: 8,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
  ],
};

const options = {
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: any) => `$${context.parsed.y.toLocaleString()}`
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#888', font: { size: 12 } }
    },
    y: {
      grid: { color: '#676767' },
      ticks: {
        color: '#888',
        font: { size: 12 },
        callback: (value: number) => `${(value / 1000).toFixed(0)}k`
      }
    }
  }
};

const OrderTrackingCard: React.FC = () => {
  const [filter, setFilter] = useState('30');

  return (
    <div className="bg-[var(--color-black)] border border-[var(--color-dark)] rounded-2xl pt-3 pl-5 pr-5 shadow w-full w-full">
      <div className="flex justify-between items-center pb-4">
        <span className="font-bold text-lg">Order Tracking</span>
        <CustomSelect options={FILTERS} value={filter} onChange={setFilter} />
      </div>
      
      <hr className="border-[var(--color-dark)] w-117 pb-6" />
      <Bar data={data} options={options} height={220} />
    </div>
  );
};

export default OrderTrackingCard;