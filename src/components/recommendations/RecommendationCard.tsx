import React from 'react';
import { Recommendation } from '../../types';
import { Sparkles, Check, Info, ShieldCheck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onToggleSelect: (id: string) => void;
  onViewDetails: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onToggleSelect,
  onViewDetails,
}) => {
  const { resource, suitabilityScore, qualityScore, freshness, whyRecommended, expectedContribution, isSelected } =
    recommendation;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 bg-white shadow-xs hover:shadow-md ${
        isSelected
          ? 'border-[#244B3A] ring-2 ring-[#244B3A]/20'
          : 'border-[#E6EAE5] hover:border-stone-300'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleSelect(recommendation.id)}
            className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border transition-colors ${
              isSelected
                ? 'bg-[#244B3A] border-[#244B3A] text-white'
                : 'border-stone-300 bg-white hover:border-[#78977D]'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
                {resource.category}
              </span>
              <span className="text-[11px] text-[#78827B]">{resource.provider}</span>
            </div>
            <h3 className="text-sm font-bold text-[#202923] mt-1">{resource.name}</h3>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="font-mono text-base font-bold text-[#202923]">
            ${resource.price.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#78827B]">USD</span>
        </div>
      </div>

      {/* Why AI Recommends */}
      <div className="mt-3.5 p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#244B3A]">
          <Sparkles className="w-3.5 h-3.5 text-[#78977D]" />
          <span>Why AgentSpend Recommends This:</span>
        </div>
        <p className="text-xs text-[#202923] mt-1 leading-relaxed">{whyRecommended}</p>
        <p className="text-[11px] text-[#78827B] mt-1.5 pt-1.5 border-t border-[#E6EAE5] leading-relaxed">
          <span className="font-semibold text-stone-700">Expected Contribution:</span> {expectedContribution}
        </p>
      </div>

      {/* Scores: Suitability, Quality & Freshness */}
      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#F0F3EF]">
        <div className="bg-[#F7F8F6] p-2 rounded-xl">
          <div className="text-[10px] uppercase font-semibold text-[#78827B]">Suitability</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#244B3A] h-full rounded-full"
                style={{ width: `${suitabilityScore}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-[#244B3A]">{suitabilityScore}%</span>
          </div>
        </div>

        <div className="bg-[#F7F8F6] p-2 rounded-xl">
          <div className="text-[10px] uppercase font-semibold text-[#78827B]">Quality</div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#27845B] h-full rounded-full"
                style={{ width: `${qualityScore}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-[#27845B]">{qualityScore}%</span>
          </div>
        </div>

        <div className="bg-[#F7F8F6] p-2 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#78827B]">Freshness</div>
            <div className="text-xs font-bold text-[#202923] mt-0.5">{freshness}</div>
          </div>
          <Clock className="w-4 h-4 text-[#78977D]" />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between pt-2">
        <button
          onClick={onViewDetails}
          className="text-xs font-semibold text-[#244B3A] hover:underline flex items-center gap-1"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Inspect Provenance & Limitations</span>
        </button>

        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
            isSelected
              ? 'bg-[#EAF1E9] text-[#244B3A]'
              : 'bg-stone-100 text-stone-500'
          }`}
        >
          {isSelected ? 'In Procurement Plan' : 'Not Selected'}
        </span>
      </div>
    </div>
  );
};
