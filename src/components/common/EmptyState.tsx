import React from 'react';
import { LucideIcon, Compass } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Compass,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] p-10 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#EAF1E9] text-[#244B3A] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-[#202923]">{title}</h3>
      <p className="text-xs text-[#78827B] mt-1.5 max-w-xs leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-4 py-2 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
