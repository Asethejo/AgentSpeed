import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const norm = status.toLowerCase().replace(/[\s-]/g, '_');

  let label = status.replace(/_/g, ' ');
  let colorClasses = 'bg-stone-100 text-stone-700 border-stone-200';
  let Icon = Clock;

  switch (norm) {
    case 'passed':
    case 'active':
    case 'activated':
    case 'completed':
    case 'paid':
    case 'approved':
      label = norm === 'passed' ? 'Policy Passed' : norm === 'activated' ? 'Active & Unlocked' : norm === 'paid' ? 'Paid via PayPal' : norm.charAt(0).toUpperCase() + norm.slice(1);
      colorClasses = 'bg-[#EAF1E9] text-[#244B3A] border-[#C8DAC7]';
      Icon = CheckCircle2;
      break;

    case 'requires_approval':
    case 'pending_approval':
    case 'needs_approval':
    case 'approving':
      label = norm === 'requires_approval' ? 'Requires Approval' : 'Pending Approval';
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-200';
      Icon = AlertTriangle;
      break;

    case 'blocked':
    case 'failed':
    case 'rejected':
    case 'payment_failed':
      label = norm === 'blocked' ? 'Policy Blocked' : norm.charAt(0).toUpperCase() + norm.slice(1);
      colorClasses = 'bg-rose-50 text-rose-800 border-rose-200';
      Icon = XCircle;
      break;

    case 'analyzing':
    case 'processing':
    case 'executing':
    case 'payment_processing':
      label = norm === 'analyzing' ? 'AI Researching' : norm.charAt(0).toUpperCase() + norm.slice(1);
      colorClasses = 'bg-sky-50 text-sky-800 border-sky-200';
      Icon = Sparkles;
      break;

    case 'recommended':
    case 'ai_plan':
      label = 'AI Recommended';
      colorClasses = 'bg-[#EAF1E9] text-[#244B3A] border-[#78977D]/30';
      Icon = ShieldCheck;
      break;

    case 'alternative':
      label = 'Alternative';
      colorClasses = 'bg-stone-100 text-stone-600 border-stone-200';
      Icon = Clock;
      break;

    case 'excluded':
      label = 'Excluded';
      colorClasses = 'bg-stone-100 text-stone-500 border-stone-200 line-through';
      Icon = XCircle;
      break;

    default:
      label = status;
      colorClasses = 'bg-stone-100 text-stone-700 border-stone-200';
      Icon = Clock;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-all ${sizeClasses} ${colorClasses}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span className="capitalize">{label}</span>
    </span>
  );
};
