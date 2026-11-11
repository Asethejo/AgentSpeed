import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const SPENDING_DATA = [
  { day: 'Mon', spent: 3.5, budgetCap: 15.0, task: 'Dataset Indexing' },
  { day: 'Tue', spent: 7.0, budgetCap: 15.0, task: 'AI Startup Research' },
  { day: 'Wed', spent: 2.0, budgetCap: 15.0, task: 'Patent Search' },
  { day: 'Thu', spent: 4.5, budgetCap: 15.0, task: 'Biotech Pipeline' },
  { day: 'Fri', spent: 6.0, budgetCap: 15.0, task: 'VC Multiples API' },
  { day: 'Sat', spent: 1.5, budgetCap: 15.0, task: 'Docs Ingestion' },
  { day: 'Sun', spent: 0.0, budgetCap: 15.0, task: 'Rest Day' },
];

export const SpendingOverviewChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl border border-[#E6EAE5] shadow-md text-xs">
          <div className="font-bold text-[#202923]">{label}</div>
          <div className="text-[#244B3A] font-semibold mt-1">
            Spent: ${payload[0].value.toFixed(2)} USD
          </div>
          <div className="text-[11px] text-[#78827B] mt-0.5">
            Primary: {payload[0].payload.task}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm p-5 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F3EF]">
        <div>
          <h2 className="text-sm font-bold text-[#202923]">Spending Overview</h2>
          <p className="text-xs text-[#78827B]">Audited PayPal procurement volume vs. SpendGuard cap</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE5] self-start sm:self-auto">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              timeRange === '7d'
                ? 'bg-white text-[#244B3A] shadow-xs'
                : 'text-[#78827B] hover:text-[#202923]'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
              timeRange === '30d'
                ? 'bg-white text-[#244B3A] shadow-xs'
                : 'text-[#78827B] hover:text-[#202923]'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SPENDING_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#78977D" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#78977D" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3EF" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: '#E6EAE5' }}
              tick={{ fill: '#78827B', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#E6EAE5' }}
              tick={{ fill: '#78827B', fontSize: 11 }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={10.0}
              stroke="#D69A38"
              strokeDasharray="4 4"
              label={{
                value: 'Task Cap $10',
                fill: '#D69A38',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#244B3A"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#spendGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F0F3EF] flex items-center justify-between text-xs text-[#78827B]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#244B3A]" />
          <span>Actual Spent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-0.5 bg-[#D69A38]" />
          <span>SpendGuard Baseline Limit</span>
        </div>
        <div className="font-semibold text-[#202923]">
          Total: <span className="text-[#244B3A]">$24.50</span>
        </div>
      </div>
    </div>
  );
};
