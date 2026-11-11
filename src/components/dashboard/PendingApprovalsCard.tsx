import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Purchase } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PendingApprovalsCardProps {
  purchases: Purchase[];
}

export const PendingApprovalsCard: React.FC<PendingApprovalsCardProps> = ({ purchases }) => {
  const navigate = useNavigate();
  const pending = purchases.filter((p) => p.status === 'pending_approval');

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-[#F0F3EF]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#202923]">Pending Approvals</h3>
            <p className="text-[11px] text-[#78827B]">Human verification required before PayPal charge</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
          {pending.length} Waiting
        </span>
      </div>

      <div className="flex-1 py-3 divide-y divide-[#F0F3EF] space-y-3">
        {pending.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
            <CheckCircle2 className="w-8 h-8 text-[#27845B] mb-2" />
            <p className="text-xs font-semibold text-[#202923]">Zero Pending Approvals</p>
            <p className="text-[11px] text-[#78827B] mt-0.5">All procurement requests have been reviewed.</p>
          </div>
        ) : (
          pending.slice(0, 3).map((purchase) => (
            <div key={purchase.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#202923] truncate">
                  {purchase.resourceName}
                </div>
                <div className="text-[11px] text-[#78827B] truncate flex items-center gap-2 mt-0.5">
                  <span>{purchase.provider}</span>
                  <span>&bull;</span>
                  <span className="font-semibold text-[#244B3A]">${purchase.amount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/approvals')}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 bg-[#244B3A] text-white rounded-xl hover:bg-[#1C3A2D] transition-colors"
              >
                Review
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pt-3 border-t border-[#F0F3EF]">
        <Link
          to="/approvals"
          className="w-full py-2 bg-[#F7F8F6] hover:bg-[#EAF1E9] text-[#244B3A] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Open Approval Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
