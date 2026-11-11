import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { DollarSign, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

const CATEGORY_SPEND_DATA = [
  { name: 'Datasets', value: 7.5, color: '#244B3A' },
  { name: 'APIs', value: 8.0, color: '#78977D' },
  { name: 'Research reports', value: 4.5, color: '#6487B8' },
  { name: 'Industry insights', value: 2.5, color: '#D69A38' },
  { name: 'Technical documentation', value: 1.5, color: '#8E9A8E' },
];

const BUDGET_VS_ACTUAL_DATA = [
  { task: 'AI Startups', budget: 10.0, actual: 7.0, surplus: 3.0 },
  { task: 'Clean Energy', budget: 15.0, actual: 4.5, surplus: 10.5 },
  { task: 'Vector DBs', budget: 12.0, actual: 8.5, surplus: 3.5 },
  { task: 'SaaS Churn', budget: 8.0, actual: 5.0, surplus: 3.0 },
  { task: 'Agent Bench', budget: 10.0, actual: 4.5, surplus: 5.5 },
];

const SPEND_VELOCITY_DATA = [
  { date: 'Nov 4', amount: 3.5 },
  { date: 'Nov 5', amount: 7.0 },
  { date: 'Nov 6', amount: 2.0 },
  { date: 'Nov 7', amount: 4.5 },
  { date: 'Nov 8', amount: 6.0 },
  { date: 'Nov 9', amount: 1.5 },
  { date: 'Nov 10', amount: 0.0 },
];

export const AnalyticsPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Spending Analytics
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Live Metrics
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Fintech cost intelligence, category distribution, and SpendGuard budget efficiency.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#F7F8F6] p-1 rounded-xl border border-[#E6EAE5]">
          <button
            onClick={() => setTimeFilter('7d')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              timeFilter === '7d' ? 'bg-white text-[#244B3A] shadow-xs' : 'text-[#78827B]'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeFilter('30d')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              timeFilter === '30d' ? 'bg-white text-[#244B3A] shadow-xs' : 'text-[#78827B]'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Spending"
          value="$24.00"
          subtitle="Net settled via PayPal"
          icon={DollarSign}
          trend="+14% this month"
          trendType="positive"
        />

        <StatCard
          title="Average Purchase"
          value="$3.42"
          subtitle="Across 7 digital assets"
          icon={BarChart3}
          trend="Well below $4.50 cap"
          trendType="positive"
        />

        <StatCard
          title="Budget Utilization"
          value="43.6%"
          subtitle="High capital efficiency"
          icon={TrendingUp}
          trend="56.4% surplus saved"
          trendType="positive"
        />

        <StatCard
          title="SpendGuard Deflections"
          value="4 Blocked"
          subtitle="Out-of-policy items stopped"
          icon={ShieldCheck}
          trend="100% Policy Protection"
          trendType="positive"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Budget vs Actual Spend by Task */}
        <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#202923]">Budget vs. Actual Spend</h2>
            <p className="text-xs text-[#78827B] mt-0.5">
              Comparison of allocated task ceiling vs actual settled charges
            </p>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BUDGET_VS_ACTUAL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3EF" />
                <XAxis dataKey="task" tick={{ fill: '#78827B', fontSize: 11 }} axisLine={{ stroke: '#E6EAE5' }} />
                <YAxis tick={{ fill: '#78827B', fontSize: 11 }} axisLine={{ stroke: '#E6EAE5' }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, '']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E6EAE5', fontSize: '11px' }}
                />
                <Bar dataKey="budget" name="Allocated Budget" fill="#EAF1E9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Spend" fill="#244B3A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0F3EF] flex items-center justify-between text-xs text-[#78827B]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#EAF1E9] border border-[#C8DAC7]" />
              <span>Budget Ceiling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-[#244B3A]" />
              <span>Settled Spend</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#202923]">Spending by Resource Category</h2>
            <p className="text-xs text-[#78827B] mt-0.5">
              Distribution of capital across digital asset classes
            </p>
          </div>

          <div className="h-64 w-full mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_SPEND_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_SPEND_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Spend']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E6EAE5', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0F3EF] flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#78827B]">
            {CATEGORY_SPEND_DATA.map((cat, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.name} (${cat.value.toFixed(2)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
