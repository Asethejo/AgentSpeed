import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { purchaseService } from '../services/purchaseService';
import { receiptService } from '../services/receiptService';
import { Purchase } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  Unlock,
  CheckCircle2,
  Key,
  Download,
  ArrowRight,
  Database,
  ExternalLink,
  Receipt,
  Sparkles,
  Loader2,
} from 'lucide-react';

export const ActivationPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTask, showToast, refreshDashboard } = useApp();

  const [activatedPurchases, setActivatedPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExecutingTask, setIsExecutingTask] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const all = await purchaseService.getPurchases();
        const active = all.filter((p) => p.status === 'activated');
        setActivatedPurchases(active);
      } catch (err) {
        console.error('Failed to load activated resources:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleStartTaskExecution = async () => {
    if (!currentTask) return;
    try {
      setIsExecutingTask(true);
      showToast({
        type: 'info',
        title: 'Task Execution Started',
        message: 'Agent is ingesting verified datasets and compiling final comparative findings...',
      });

      // Simulate agent AI report generation
      await new Promise((resolve) => setTimeout(resolve, 1800));

      // Generate Decision Receipt and complete task
      await receiptService.generateTaskReceipt(currentTask.id);
      await refreshDashboard();

      showToast({
        type: 'success',
        title: 'Task Execution Complete',
        message: 'Comparative intelligence report generated and Decision Receipt sealed!',
      });

      navigate('/results');
    } catch (err: any) {
      console.error('Execution error:', err);
      showToast({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to complete execution.',
      });
    } finally {
      setIsExecutingTask(false);
    }
  };

  if (loading) {
    return <LoadingState title="Loading Activated Assets" fullPage />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Your resources are ready!
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Unlocked & Verified
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            PayPal captured and verified. Data credentials injected into autonomous runtime.
          </p>
        </div>

        <button
          onClick={handleStartTaskExecution}
          disabled={isExecutingTask || activatedPurchases.length === 0}
          className="px-5 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
        >
          {isExecutingTask ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Synthesizing Intelligence...</span>
            </>
          ) : (
            <>
              <span>Start Task Execution</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Activated Assets Cards */}
      <div className="space-y-4">
        {activatedPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white rounded-3xl border border-[#C8DAC7] shadow-sm p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F3EF]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
                    {purchase.provider}
                  </span>
                  <StatusBadge status="activated" size="sm" />
                </div>
                <h3 className="text-base font-bold text-[#202923]">{purchase.resourceName}</h3>
                <p className="text-xs text-[#78827B]">Task: {purchase.taskTitle}</p>
              </div>

              <div className="text-right">
                <span className="font-mono text-base font-bold text-[#202923]">
                  ${purchase.amount.toFixed(2)} USD
                </span>
                <div className="text-[10px] text-[#27845B] font-mono mt-0.5">
                  Ref: {purchase.paypalCaptureId || 'PP-CAPTURED'}
                </div>
              </div>
            </div>

            {/* Access Details Box */}
            <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-700 font-bold">
                <Key className="w-4 h-4 text-[#244B3A]" />
                <span>Granted Access Credentials & Endpoint</span>
              </div>

              {purchase.activationDetails?.accessUrl && (
                <div className="flex items-center justify-between font-mono text-[11px] bg-white p-2.5 rounded-xl border border-[#E6EAE5]">
                  <span className="truncate text-stone-700">{purchase.activationDetails.accessUrl}</span>
                  <span className="text-[10px] text-[#27845B] font-bold shrink-0 ml-2">MOUNTED</span>
                </div>
              )}

              {purchase.activationDetails?.apiKey && (
                <div className="flex items-center justify-between font-mono text-[11px] bg-white p-2.5 rounded-xl border border-[#E6EAE5]">
                  <span className="truncate text-stone-700">{purchase.activationDetails.apiKey}</span>
                  <span className="text-[10px] text-[#27845B] font-bold shrink-0 ml-2">BEARER READY</span>
                </div>
              )}

              <p className="text-[11px] text-[#78827B] mt-1">
                {purchase.activationDetails?.instructions || 'Asset active and ready for AI digestion.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
