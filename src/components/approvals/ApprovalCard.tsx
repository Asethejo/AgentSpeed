import React from 'react';
import { Purchase } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ShieldCheck, Check, X, ArrowUpRight, Lock, Clock } from 'lucide-react';

interface ApprovalCardProps {
  purchase: Purchase;
  onApprove: (purchase: Purchase) => void;
  onReject: (purchase: Purchase) => void;
  onViewDetails?: (purchase: Purchase) => void;
  isProcessing?: boolean;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  purchase,
  onApprove,
  onReject,
  onViewDetails,
  isProcessing = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm p-5 flex flex-col justify-between hover:border-[#78977D]/60 transition-all duration-200">
      <div>
        {/* Header: Provider & Price */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              {purchase.provider}
            </span>
            <span className="text-xs text-[#78827B] truncate max-w-[180px]">
              Task: {purchase.taskTitle}
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-base font-bold text-[#202923]">
              ${purchase.amount.toFixed(2)}
            </span>
            <span className="text-[10px] text-[#78827B] ml-1">{purchase.currency}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-[#202923] mt-3 leading-snug">
          {purchase.resourceName}
        </h3>

        {/* Recommendation Reason */}
        <div className="mt-3 p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
            AI Justification:
          </span>
          <p className="text-xs text-[#202923] mt-0.5 leading-relaxed">
            {purchase.recommendationReason}
          </p>
        </div>

        {/* Policy status & Remaining Budget */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-2.5 border-t border-[#F0F3EF]">
          <div>
            <span className="text-[10px] text-[#78827B] uppercase font-semibold">SpendGuard Policy</span>
            <div className="mt-0.5">
              <StatusBadge status={purchase.spendGuardStatus} size="sm" />
            </div>
          </div>

          <div>
            <span className="text-[10px] text-[#78827B] uppercase font-semibold">Remaining Surplus</span>
            <div className="font-mono font-bold text-[#27845B] mt-0.5">
              ${purchase.remainingBudgetAfter.toFixed(2)} USD
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-[#F0F3EF] flex items-center justify-between gap-2">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(purchase)}
            className="text-xs font-semibold text-[#78827B] hover:text-[#202923] flex items-center gap-1"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onReject(purchase)}
            disabled={isProcessing}
            className="px-3 py-1.5 border border-stone-200 text-stone-700 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          <button
            onClick={() => onApprove(purchase)}
            disabled={isProcessing}
            className="px-4 py-1.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs disabled:opacity-50 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Approve Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
};
