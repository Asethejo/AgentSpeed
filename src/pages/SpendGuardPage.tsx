import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { purchaseService } from '../services/purchaseService';
import { SpendGuardValidation } from '../types';
import { SpendGuardAuditPanel } from '../components/spendguard/SpendGuardAuditPanel';
import { LoadingState } from '../components/common/LoadingState';
import { ShieldCheck, Sliders, Shield, AlertTriangle, RefreshCw } from 'lucide-react';

export const SpendGuardPage: React.FC = () => {
  const { currentTask, settings } = useApp();
  const [validation, setValidation] = useState<SpendGuardValidation | null>(null);
  const [loading, setLoading] = useState(true);

  const runAudit = async () => {
    try {
      setLoading(true);
      const res = await purchaseService.validateSpendGuard({
        taskId: currentTask ? currentTask.id : 'task-ai-startups-01',
        resourceIds: ['res-startups-dataset', 'res-market-trends-api'],
      });
      setValidation(res);
    } catch (err) {
      console.error('Failed to run SpendGuard audit:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, [currentTask]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              SpendGuard — Your Financial Safety Layer
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Active Firewall
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Real-time policy validation and programmatic spending limits intercepting every AI purchase.
          </p>
        </div>

        <button
          onClick={runAudit}
          className="px-4 py-2 bg-[#F7F8F6] hover:bg-[#EAF1E9] text-[#244B3A] text-xs font-semibold rounded-xl border border-[#E6EAE5] transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-run Audit</span>
        </button>
      </div>

      {loading || !validation ? (
        <LoadingState title="Running SpendGuard Policy Engine" />
      ) : (
        <SpendGuardAuditPanel validation={validation} />
      )}
    </div>
  );
};
