import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  fullPage?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'AgentSpend is processing...',
  subtitle = 'Querying knowledge engines and evaluating spend limits',
  fullPage = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF1E9] flex items-center justify-center text-[#244B3A] animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
          <Loader2 className="w-4 h-4 text-[#78977D] animate-spin" />
        </div>
      </div>
      <h3 className="text-sm font-semibold text-[#202923]">{title}</h3>
      <p className="text-xs text-[#78827B] mt-1 max-w-xs">{subtitle}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};
