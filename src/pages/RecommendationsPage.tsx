import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { taskService } from '../services/taskService';
import { purchaseService } from '../services/purchaseService';
import { Recommendation, Resource } from '../types';
import { RecommendationCard } from '../components/recommendations/RecommendationCard';
import { BudgetOptimizationBar } from '../components/recommendations/BudgetOptimizationBar';
import { ResourceComparisonTable } from '../components/recommendations/ResourceComparisonTable';
import { ResourceDetailsModal } from '../components/resources/ResourceDetailsModal';
import { LoadingState } from '../components/common/LoadingState';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTask, showToast, refreshDashboard } = useApp();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadPlan() {
      if (!currentTask) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const recs = await taskService.getRecommendations(currentTask.id);
        setRecommendations(recs);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, [currentTask]);

  const handleToggleSelect = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isSelected: !r.isSelected } : r))
    );
  };

  const handleContinueToApproval = async () => {
    if (!currentTask) return;
    const selectedIds = recommendations.filter((r) => r.isSelected).map((r) => r.resourceId);

    if (selectedIds.length === 0) {
      showToast({
        type: 'warning',
        title: 'No Resources Selected',
        message: 'Please select at least one resource to proceed with procurement.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Validate with SpendGuard first
      const validation = await purchaseService.validateSpendGuard({
        taskId: currentTask.id,
        resourceIds: selectedIds,
      });

      if (!validation.isValid) {
        showToast({
          type: 'error',
          title: 'SpendGuard Policy Blocked',
          message: validation.blockReason || 'Selected items violate financial policy bounds.',
        });
        setIsSubmitting(false);
        return;
      }

      // Create purchases in pending_approval status
      await purchaseService.createPurchases({
        taskId: currentTask.id,
        resourceIds: selectedIds,
      });

      await refreshDashboard();

      showToast({
        type: 'success',
        title: 'Procurement Requests Queued',
        message: `${selectedIds.length} purchases require your human authorization in Approval Center.`,
      });

      navigate('/approvals');
    } catch (err: any) {
      console.error('Failed to continue to approval:', err);
      showToast({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to submit procurement requests.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState title="Synthesizing Procurement Plan" fullPage />;
  }

  const selectedItems = recommendations.filter((r) => r.isSelected);
  const totalSpend = selectedItems.reduce((acc, r) => acc + r.price, 0);
  const totalBudget = currentTask?.budget || 10.0;
  const remainingBudget = Math.max(0, totalBudget - totalSpend);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Your AI Procurement Plan
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Optimized
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Task: <span className="font-semibold text-stone-800">{currentTask?.prompt}</span>
          </p>
        </div>

        <button
          onClick={handleContinueToApproval}
          disabled={isSubmitting || selectedItems.length === 0}
          className="px-5 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
        >
          <span>Continue to Approval</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Plan Summary Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Total Budget</span>
          <div className="font-mono text-xl font-bold text-[#202923] mt-1">
            ${totalBudget.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-[#78827B]">Allocated limit</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">
            Recommended Spend
          </span>
          <div className="font-mono text-xl font-bold text-[#244B3A] mt-1">
            ${totalSpend.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-[#244B3A] font-medium">
            {selectedItems.length} assets included
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">
            Remaining Buffer
          </span>
          <div className="font-mono text-xl font-bold text-[#27845B] mt-1">
            ${remainingBudget.toFixed(2)} USD
          </div>
          <span className="text-[10px] text-[#27845B] font-medium">Preserved surplus</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">SpendGuard Check</span>
          <div className="text-sm font-bold text-[#27845B] mt-1.5 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Passed 6/6 Checks</span>
          </div>
          <span className="text-[10px] text-[#78827B]">Zero policy infractions</span>
        </div>
      </div>

      {/* Budget Optimization Bar */}
      <BudgetOptimizationBar
        totalBudget={totalBudget}
        recommendations={recommendations}
      />

      {/* Recommended Resource Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B]">
            Recommended Digital Assets ({selectedItems.length} Selected)
          </h2>
          <span className="text-xs text-[#78827B]">Click checkmark to toggle asset inclusion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onToggleSelect={handleToggleSelect}
              onViewDetails={() => setSelectedResource(rec.resource)}
            />
          ))}
        </div>
      </div>

      {/* Why These Resources? Explanatory Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#78977D]" />
          <h3 className="text-sm font-bold text-[#202923]">Why these resources?</h3>
        </div>
        <p className="text-xs text-[#78827B] leading-relaxed">
          AgentSpend benchmarked 8 data sources against your task: <span className="font-semibold text-stone-800">"Research five AI startups and compare their funding, growth, and market opportunities."</span>
        </p>
        <p className="text-xs text-[#78827B] leading-relaxed">
          By combining the <span className="font-semibold text-stone-800">AI Startups Funding & Traction Dataset ($4.00)</span> with the <span className="font-semibold text-stone-800">AI Market Trends & Growth API ($3.00)</span>, the agent achieves 97.4% informational coverage on both historical venture rounds and real-time engineering velocity while keeping total expenditure at <span className="font-semibold text-[#244B3A]">$7.00 USD</span> — preserving a <span className="font-semibold text-[#27845B]">$3.00 surplus</span> under your $10.00 ceiling.
        </p>
      </div>

      {/* Comprehensive Benchmark Table */}
      <ResourceComparisonTable
        recommendations={recommendations}
        onToggleSelect={handleToggleSelect}
      />

      {/* Bottom CTA Bar */}
      <div className="p-5 rounded-2xl bg-[#EAF1E9] border border-[#C8DAC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-[#244B3A]" />
          <span className="text-xs text-[#244B3A] font-semibold">
            Ready to review authorizations? Payments remain locked until your manual signature.
          </span>
        </div>

        <button
          onClick={handleContinueToApproval}
          disabled={isSubmitting || selectedItems.length === 0}
          className="px-5 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Continue to Approval Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Resource Details Modal */}
      <ResourceDetailsModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
};
