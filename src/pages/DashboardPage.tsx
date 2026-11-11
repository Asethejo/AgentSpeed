import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { RecentTasksTable } from '../components/dashboard/RecentTasksTable';
import { PendingApprovalsCard } from '../components/dashboard/PendingApprovalsCard';
import { RecentTransactionsTable } from '../components/dashboard/RecentTransactionsTable';
import { SpendingOverviewChart } from '../components/dashboard/SpendingOverviewChart';
import { ProcurementActivityTimeline } from '../components/dashboard/ProcurementActivityTimeline';
import { taskService } from '../services/taskService';
import { purchaseService } from '../services/purchaseService';
import { dashboardService } from '../services/dashboardService';
import { Task, Purchase, Transaction, ActivityTimelineItem } from '../types';
import {
  CheckSquare,
  DollarSign,
  ShieldCheck,
  Clock,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldAlert,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadAgentSpendZip } from '../utils/downloadZip';

export const DashboardPage: React.FC = () => {
  const { summary, refreshDashboard, pendingApprovalsCount } = useApp();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeline, setTimeline] = useState<ActivityTimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [taskList, purchaseList, txnList, timelineList] = await Promise.all([
          taskService.getTasks(),
          purchaseService.getPurchases(),
          dashboardService.getTransactions(),
          dashboardService.getTimeline(),
        ]);
        setTasks(taskList);
        setPurchases(purchaseList);
        setTransactions(txnList);
        setTimeline(timelineList);
        await refreshDashboard();
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [refreshDashboard]);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#202923] tracking-tight">
              Good morning, welcome to AgentSpend.
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Sandbox Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#78827B] mt-1">
            Your AI procurement activity at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/tasks/new"
            className="px-4 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Procurement Task</span>
          </Link>
        </div>
      </div>

      {/* ZIP Download Quick Banner */}
      <div className="bg-[#EAF1E9] border border-[#C8DAC7] p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#244B3A] text-white flex items-center justify-center shadow-xs shrink-0">
            <Download className="w-5 h-5 text-[#C8DAC7]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#202923]">Download AgentSpend Project ZIP (137 KB)</h3>
            <p className="text-[11px] text-[#78827B]">
              Full standalone source code package: 15 connected pages, SpendGuard policies, Recharts analytics & PayPal checkout.
            </p>
          </div>
        </div>

        <button
          onClick={() => downloadAgentSpendZip()}
          className="px-4 py-2 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#C8DAC7]" />
          <span>Download agentspend.zip</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={summary?.totalTasks || tasks.length}
          subtitle="Autonomous research jobs"
          icon={CheckSquare}
          trend={summary?.tasksTrend || 'Active'}
          trendType="positive"
        />

        <StatCard
          title="Total Spent"
          value={`$${(summary?.totalSpent || 7.0).toFixed(2)}`}
          subtitle="USD via PayPal Sandbox"
          icon={DollarSign}
          trend={summary?.spentTrend || 'SpendGuard OK'}
          trendType="positive"
        />

        <StatCard
          title="Available Budget"
          value={`$${(summary?.availableBudget || 18.0).toFixed(2)}`}
          subtitle="Remaining daily limit cap"
          icon={ShieldCheck}
          trend={summary?.budgetTrend || 'Surplus Buffer'}
          trendType="positive"
        />

        <StatCard
          title="Pending Approvals"
          value={pendingApprovalsCount}
          subtitle="Requires user signature"
          icon={Clock}
          trend={pendingApprovalsCount > 0 ? 'Action Needed' : 'All Clear'}
          trendType={pendingApprovalsCount > 0 ? 'negative' : 'positive'}
          badge={pendingApprovalsCount > 0 ? 'Attention' : undefined}
        />
      </div>

      {/* Main Grid: Spending Chart & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpendingOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <PendingApprovalsCard purchases={purchases} />
        </div>
      </div>

      {/* Secondary Grid: Recent Tasks & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentTasksTable tasks={tasks} />
          <RecentTransactionsTable transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <ProcurementActivityTimeline timeline={timeline} />
        </div>
      </div>
    </div>
  );
};
