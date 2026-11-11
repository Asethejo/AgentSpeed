import React from 'react';
import { SpendGuardValidation } from '../../types';
import { PolicyCheckCard } from './PolicyCheckCard';
import { ShieldCheck, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface SpendGuardAuditPanelProps {
  validation: SpendGuardValidation;
}

export const SpendGuardAuditPanel: React.FC<SpendGuardAuditPanelProps> = ({ validation }) => {
  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Total Budget</span>
          <div className="font-mono text-lg font-bold text-[#202923] mt-1">
            ${validation.totalBudget.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#78827B]">Task Ceiling</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Committed</span>
          <div className="font-mono text-lg font-bold text-[#244B3A] mt-1">
            ${validation.currentCommitted.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#78827B]">Previous Charges</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Requested</span>
          <div className="font-mono text-lg font-bold text-[#244B3A] mt-1">
            ${validation.requestedAmount.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#78827B]">Pending Approval</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Remaining Buffer</span>
          <div className="font-mono text-lg font-bold text-[#27845B] mt-1">
            ${validation.remainingBudget.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#27845B] font-medium">Safe Surplus</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-semibold text-[#78827B]">Max Single Item</span>
          <div className="font-mono text-lg font-bold text-[#202923] mt-1">
            ${validation.maxPurchaseLimit.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#78827B]">Policy Limit</span>
        </div>
      </div>

      {/* Backend Audit Status Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          validation.isValid
            ? 'bg-[#EAF1E9] border-[#C8DAC7] text-[#244B3A]'
            : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {validation.isValid ? (
            <ShieldCheck className="w-5 h-5 text-[#27845B]" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-[#D65B5B]" />
          )}
          <div>
            <h4 className="text-xs font-bold">
              {validation.isValid ? 'SpendGuard Safety Verification Passed' : 'SpendGuard Policy Block'}
            </h4>
            <p className="text-[11px] opacity-90 mt-0.5">{validation.auditSummary}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-white/80 border border-current shadow-2xs">
          <Lock className="w-3.5 h-3.5" />
          <span>Real-time Verified</span>
        </div>
      </div>

      {/* Policy list */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#78827B]">
          Audited Safety Policies ({validation.policies.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {validation.policies.map((policy) => (
            <PolicyCheckCard key={policy.id} policy={policy} />
          ))}
        </div>
      </div>
    </div>
  );
};
