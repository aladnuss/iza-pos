import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CardDashboardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColorClass?: string;
  iconBgColor?: string;
  textColor?: string;
  percentage?: number;
  isIncrease?: boolean; // true: hijau, false: merah
  valueClassName?: string;
  children?: React.ReactNode;
}

const CardDashboard: React.FC<CardDashboardProps> = ({
  icon,
  title,
  value,
  bgColorClass = '',
  iconBgColor = '#fff',
  textColor = '#fff',
  percentage,
  isIncrease,
  valueClassName,
  children,
}) => {
  return (
    <div
      className={`p-9 min-h-[170px] rounded-3xl shadow-lg flex flex-col justify-between relative overflow-hidden border-1`}
      style={{ borderColor: 'var(--color-card-border)', background: 'var(--color-black)' }}
    >
      {children}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-4 rounded-full" style={{ background: 'var(--color-card-icon-bg)' }}>
          {icon}
        </div>
      </div>
      <div>
      <p className="text-sm mb-1" style={{ color: 'var(--color-card-foreground)' }}>{title}</p>

        <p className={`text-2xl font-bold ${valueClassName || ''}`} style={{ color: 'var(--color-card-foreground)' }}>{value}</p>
        {percentage !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {isIncrease ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-semibold font-medium ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDashboard; 