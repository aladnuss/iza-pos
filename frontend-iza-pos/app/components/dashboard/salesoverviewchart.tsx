"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceDot,
} from "recharts";
import CustomSelect from '../general/costumselect';

// Dummy data asli
const rawData = [
  { month: "May", earning: 1000000, orders: 20, avgOrder: 100000 },
  { month: "Jun", earning: 1500000, orders: 10, avgOrder: 165000 },
  { month: "Jul", earning: 9000000, orders: 20, avgOrder: 112500 },
  { month: "Aug", earning: 1200000, orders: 20, avgOrder: 157000 },
  { month: "Sep", earning: 1000000, orders: 30, avgOrder: 178000 },
  { month: "Oct", earning: 2000000, orders: 10, avgOrder: 162000 },
  { month: "Nov", earning: 1000000, orders: 20, avgOrder: 171000 },
];

// Fungsi normalisasi min-max ke 0-100
function normalizeData(data, key) {
  const values = data.map(d => d[key]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return data.map(d => ({
    ...d,
    [key + 'Norm']: max === min ? 100 : ((d[key] - min) / (max - min)) * 100,
  }));
}

// Normalisasi semua metrik
let data = normalizeData(rawData, 'earning');
data = normalizeData(data, 'orders');
data = normalizeData(data, 'avgOrder');

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const original = payload[0].payload;
    return (
      <div className="bg-[var(--color-black)] text-[var(--color-white)] px-3 py-2  rounded shadow text-xs">
        <div>{label} 2023</div>
        <div className="flex gap-2 items-center"><span style={{ color: '#ff9100', fontWeight: 600 }}>Earning:</span><span className="font-bold">Rp{original.earning.toLocaleString("id-ID")}</span></div>
        <div className="flex gap-2 items-center"><span style={{ color: '#4f8cff', fontWeight: 600 }}>Orders:</span><span className="font-bold">{original.orders}</span></div>
        <div className="flex gap-2 items-center"><span style={{ color: '#00c49a', fontWeight: 600 }}>Avg Order Sales:</span><span className="font-bold">Rp{original.avgOrder.toLocaleString("id-ID")}</span></div>
      </div>
    );
  }
  return null;
};

export default function SalesOverviewChart() {
  // Example options for both selects
  const select1Options = [
    { label: "This Year", value: "year" },
    { label: "This Month", value: "month" },
    { label: "This Week", value: "week" },
  ];
  const select2Options = [
    { label: "Overview", value: "all" },
    { label: "Earning", value: "outlet1" },
    { label: "Orders", value: "outlet2" },
    { label: "Avarage Order", value: "outlet3" },
  ];
  const [select1, setSelect1] = React.useState("year");
  const [select2, setSelect2] = React.useState("all");

  return (
    <div className="bg-[var(--color-black)] rounded-3xl shadow-lg p-6 border border-1 w-full h-[350px]" style={{ borderColor: 'var(--color-card-border)' }}>
      <div className="flex justify-between items-center mb-5">
        <div className="font-semibold text-[var(--color-white)]">Sales Overview</div>
        <div className="flex gap-2">
          <CustomSelect options={select1Options} value={select1} onChange={setSelect1} />
          <CustomSelect options={select2Options} value={select2} onChange={setSelect2} />
        </div>
      </div>
      <hr className="border-[var(--color-dark)] mt-2 mb-3 w-160 mx-auto" />
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-chart-grid)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#bdbdbd", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#ff9100", strokeWidth: 1, strokeDasharray: "3 3" }} />
          <Line type="monotone" dataKey="earningNorm" name="Earning" stroke="#ff9100" strokeWidth={3} dot={{ r: 4, fill: "var(--color-palette-4)" }} activeDot={{ r: 6, fill: "var(--color-palette-4)" }} />
          <Line type="monotone" dataKey="ordersNorm" name="Orders" stroke="#00c49a" strokeWidth={3} dot={{ r: 4, fill: "var(--color-palette-5)" }} activeDot={{ r: 6, fill: "var(--color-palette-5)" }} />
          <Line type="monotone" dataKey="avgOrderNorm" name="Avg Order Sales" stroke="var(--color-palette-6)" strokeWidth={3} dot={{ r: 4, fill: "var(--color-palette-6)" }} activeDot={{ r: 6, fill: "var(--color-palette-6)" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 