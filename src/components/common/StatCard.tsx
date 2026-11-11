import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'neutral' | 'negative';
  badge?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive',
  badge,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-[#E6EAE5] shadow-sm transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-[#78977D]/60' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-[#EAF1E9] flex items-center justify-center text-[#244B3A]">
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-[#78827B]">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-[#78827B]">{title}</span>
        <div className="text-2xl font-bold text-[#202923] mt-1 tracking-tight">{value}</div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-[#F0F3EF]">
        {subtitle && <span className="text-[#78827B] truncate max-w-[170px]">{subtitle}</span>}
        {trend && (
          <div
            className={`flex items-center gap-1 font-medium ${
              trendType === 'positive'
                ? 'text-[#27845B]'
                : trendType === 'negative'
                ? 'text-[#D65B5B]'
                : 'text-[#78827B]'
            }`}
          >
            {trendType === 'positive' && <TrendingUp className="w-3.5 h-3.5" />}
            {trendType === 'negative' && <TrendingDown className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};
