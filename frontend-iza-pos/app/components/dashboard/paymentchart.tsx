"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import CustomSelect from '../general/costumselect';

const data = [
  { name: "Cash", value: 15 },
  { name: "Credit/Debit", value: 30 },
  { name: "QRIS", value: 55 },
];

const COLORS = [
  "var(--color-palette-2)",
  "var(--color-palette-3)",
  "var(--color-palette-6)"
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="var(--color-white)" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={16} fontWeight={700}>
      {data[index].value}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-gray)] text-[var(--color-white)] px-3 py-2 rounded shadow text-xs">
        <div className="font-bold">{payload[0].name}</div>
        <div>{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export default function PaymentChart() {
  // Opsi contoh untuk CustomSelect
  const selectOptions = [
    { label: "All", value: "all" },
    { label: "Cash", value: "cash" },
    { label: "Credit/Debit", value: "credit" },
    { label: "QRIS", value: "qris" },
  ];
  const [selected, setSelected] = React.useState("all");

  return (
    <div className="bg-[var(--color-black)] rounded-3xl shadow-lg p-6 border border-1 w-full h-[350px]" style={{ borderColor: 'var(--color-card-border)' }}>
      <div className="flex justify-between items-center mb-5">
        <div className="font-semibold">Payment</div>
        <CustomSelect options={selectOptions} value={selected} onChange={setSelected} />
      </div>
      <hr className="border-[var(--color-dark)] mt-2 w-72 mx-auto" />
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            innerRadius={50}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: COLORS[0] }}></span>
          <span className="text-[var(--color-gray)]">Cash</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: COLORS[1] }}></span>
          <span className="text-[var(--color-gray)]">Credit/Debit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: COLORS[2] }}></span>
          <span className="text-[var(--color-gray)]">QRIS</span>
        </div>
      </div>
    </div>
  );
} 