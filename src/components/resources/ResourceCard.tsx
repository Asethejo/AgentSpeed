import React from 'react';
import { Resource } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Sparkles, Shield, Clock, ArrowUpRight, Database, Code, FileText, TrendingUp, BookOpen } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  onViewDetails: (resource: Resource) => void;
  onSelectToggle?: (resource: Resource) => void;
  isSelected?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onViewDetails,
  onSelectToggle,
  isSelected = false,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Datasets':
        return Database;
      case 'APIs':
        return Code;
      case 'Research reports':
        return FileText;
      case 'Industry insights':
        return TrendingUp;
      case 'Technical documentation':
        return BookOpen;
      default:
        return Database;
    }
  };

  const Icon = getCategoryIcon(resource.category);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-[#244B3A] ring-1 ring-[#244B3A]'
          : 'border-[#E6EAE5] hover:border-[#78977D]/60'
      }`}
    >
      <div>
        {/* Header: Category & Price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#244B3A] bg-[#EAF1E9] px-2.5 py-1 rounded-xl">
            <Icon className="w-3.5 h-3.5" />
            <span>{resource.category}</span>
          </div>
          <div className="text-right">
            <span className="font-mono text-base font-bold text-[#202923]">
              ${resource.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-[#78827B] ml-1">USD</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-3.5">
          <h3 className="text-sm font-bold text-[#202923] hover:text-[#244B3A] transition-colors line-clamp-1">
            {resource.name}
          </h3>
          <p className="text-xs text-[#78827B] mt-1.5 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Provider & Freshness */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#78827B] pt-2.5 border-t border-[#F0F3EF]">
          <span className="truncate font-medium text-stone-700">{resource.provider}</span>
          <div className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3 text-[#78977D]" />
            <span>{resource.freshness}</span>
          </div>
        </div>

        {/* Metrics: Quality Score & Suitability */}
        <div className="mt-3 grid grid-cols-2 gap-2 bg-[#F7F8F6] p-2.5 rounded-xl border border-[#E6EAE5]">
          <div>
            <div className="text-[10px] font-medium text-[#78827B] uppercase">Quality Score</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#27845B] h-full rounded-full"
                  style={{ width: `${resource.qualityScore}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#202923]">
                {resource.qualityScore}%
              </span>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-medium text-[#78827B] uppercase">Suitability</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex-1 bg-stone-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#78977D] h-full rounded-full"
                  style={{ width: `${resource.suitabilityScore || 80}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#202923]">
                {resource.suitabilityScore || 80}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-3 border-t border-[#F0F3EF] flex items-center justify-between gap-2">
        {resource.recommendationStatus ? (
          <StatusBadge status={resource.recommendationStatus} size="sm" />
        ) : (
          <span className="text-[11px] text-[#78827B]">Verified Asset</span>
        )}

        <div className="flex items-center gap-2">
          {onSelectToggle && (
            <button
              onClick={() => onSelectToggle(resource)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors border ${
                isSelected
                  ? 'bg-[#244B3A] text-white border-[#244B3A]'
                  : 'bg-white text-[#202923] border-[#E6EAE5] hover:bg-[#F7F8F6]'
              }`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          )}

          <button
            onClick={() => onViewDetails(resource)}
            className="text-xs font-semibold text-[#244B3A] hover:text-[#1C3A2D] flex items-center gap-1 p-1 hover:underline"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
