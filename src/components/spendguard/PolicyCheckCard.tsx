import React from 'react';
import { PolicyCheck } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PolicyCheckCardProps {
  policy: PolicyCheck;
}

export const PolicyCheckCard: React.FC<PolicyCheckCardProps> = ({ policy }) => {
  const getIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-5 h-5 text-[#27845B]" />;
      case 'blocked':
        return <XCircle className="w-5 h-5 text-[#D65B5B]" />;
      case 'requires_approval':
        return <AlertTriangle className="w-5 h-5 text-[#D69A38]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#78977D]" />;
    }
  };

  const borderClass =
    policy.status === 'passed'
      ? 'border-[#C8DAC7] bg-white'
      : policy.status === 'blocked'
      ? 'border-rose-200 bg-rose-50/20'
      : 'border-amber-200 bg-amber-50/20';

  return (
    <div className={`p-4 rounded-2xl border shadow-2xs transition-all ${borderClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{getIcon(policy.status)}</div>
          <div>
            <h4 className="text-xs font-bold text-[#202923]">{policy.name}</h4>
            <p className="text-[11px] text-[#78827B] mt-0.5 leading-relaxed">
              {policy.description}
            </p>
          </div>
        </div>
        <StatusBadge status={policy.status} size="sm" />
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#F0F3EF] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-1">
        <div className="font-mono text-[#78827B]">
          <span className="font-semibold text-stone-700">Rule:</span> {policy.rule}
        </div>
        <div className="text-stone-600 font-medium">{policy.details}</div>
      </div>
    </div>
  );
};
