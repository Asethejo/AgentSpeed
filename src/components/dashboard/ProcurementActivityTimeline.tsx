import React from 'react';
import { ActivityTimelineItem } from '../../types';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  UserCheck,
  CreditCard,
  Unlock,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface ProcurementActivityTimelineProps {
  timeline: ActivityTimelineItem[];
}

export const ProcurementActivityTimeline: React.FC<ProcurementActivityTimelineProps> = ({ timeline }) => {
  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'task_submitted':
        return FileText;
      case 'ai_recommendations':
        return Sparkles;
      case 'spendguard_validation':
        return ShieldCheck;
      case 'human_approval':
        return UserCheck;
      case 'payment_completed':
        return CreditCard;
      case 'resource_activated':
        return Unlock;
      case 'task_completed':
        return CheckCircle2;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm p-5">
      <div className="pb-4 border-b border-[#F0F3EF] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#202923]">Procurement Activity</h2>
          <p className="text-xs text-[#78827B]">Real-time autonomous audit log</p>
        </div>
        <span className="text-[11px] font-semibold text-[#244B3A] bg-[#EAF1E9] px-2.5 py-1 rounded-full border border-[#C8DAC7]">
          Live Stream
        </span>
      </div>

      <div className="relative mt-5 pl-4 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-[23px] before:w-0.5 before:bg-[#E6EAE5] space-y-5">
        {timeline.map((item, idx) => {
          const Icon = getStageIcon(item.stage);
          const isLatest = idx === 0;

          return (
            <div key={item.id} className="relative flex items-start gap-3.5 group">
              <div
                className={`relative z-10 w-7 h-7 rounded-xl flex items-center justify-center border shadow-2xs transition-transform group-hover:scale-105 ${
                  isLatest
                    ? 'bg-[#244B3A] text-white border-[#244B3A]'
                    : 'bg-[#F7F8F6] text-[#78827B] border-[#E6EAE5]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div className="flex-1 min-w-0 bg-[#F7F8F6]/60 rounded-xl p-3 border border-[#F0F3EF]">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-bold text-[#202923] truncate">
                    {item.title}
                  </div>
                  <span className="font-mono text-[10px] text-[#78827B] shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-[#78827B] mt-1 leading-relaxed">
                  {item.description}
                </p>
                {item.badge && (
                  <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E6EAE5] text-[#244B3A]">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
