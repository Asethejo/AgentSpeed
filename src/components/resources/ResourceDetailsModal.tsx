import React from 'react';
import { Resource } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Database,
  ShieldCheck,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

interface ResourceDetailsModalProps {
  resource: Resource | null;
  onClose: () => void;
  onSelect?: (resource: Resource) => void;
  isSelected?: boolean;
}

export const ResourceDetailsModal: React.FC<ResourceDetailsModalProps> = ({
  resource,
  onClose,
  onSelect,
  isSelected = false,
}) => {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E6EAE5] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E6EAE5] flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
                {resource.category}
              </span>
              <span className="text-xs text-[#78827B]">&bull; {resource.provider}</span>
            </div>
            <h2 className="text-lg font-bold text-[#202923] leading-snug">{resource.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78827B] hover:text-[#202923] rounded-xl hover:bg-[#F7F8F6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs text-[#202923]">
          {/* Price & Score highlights banner */}
          <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-semibold text-[#78827B]">Procurement Price</div>
              <div className="font-mono text-2xl font-bold text-[#202923] mt-0.5">
                ${resource.price.toFixed(2)} <span className="text-xs font-normal text-[#78827B]">USD</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-[10px] uppercase font-semibold text-[#78827B]">Quality Score</div>
                <div className="text-base font-bold text-[#27845B] mt-0.5">{resource.qualityScore}/100</div>
              </div>
              <div className="pl-4 border-l border-[#E6EAE5]">
                <div className="text-[10px] uppercase font-semibold text-[#78827B]">Freshness</div>
                <div className="text-base font-bold text-[#202923] mt-0.5">{resource.freshness}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78827B] mb-1.5">Overview</h4>
            <p className="text-xs text-[#78827B] leading-relaxed">{resource.description}</p>
          </div>

          {/* Why it is useful for the task */}
          {resource.whyUseful && (
            <div className="p-4 rounded-xl bg-[#EAF1E9]/70 border border-[#C8DAC7]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#244B3A]">
                <Sparkles className="w-4 h-4 text-[#78977D]" />
                <span>Why AgentSpend Recommends This</span>
              </div>
              <p className="text-xs text-[#202923] mt-1 leading-relaxed">{resource.whyUseful}</p>
            </div>
          )}

          {/* Benefits & Limitations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-[#E6EAE5] bg-white">
              <h4 className="font-bold text-xs text-[#27845B] flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Benefits</span>
              </h4>
              <ul className="space-y-1.5">
                {resource.benefits.map((b, i) => (
                  <li key={i} className="text-[11px] text-[#78827B] flex items-start gap-1.5">
                    <span className="text-[#27845B] font-bold">&bull;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-[#E6EAE5] bg-white">
              <h4 className="font-bold text-xs text-[#D69A38] flex items-center gap-1.5 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>Limitations</span>
              </h4>
              <ul className="space-y-1.5">
                {resource.limitations.map((l, i) => (
                  <li key={i} className="text-[11px] text-[#78827B] flex items-start gap-1.5">
                    <span className="text-[#D69A38] font-bold">&bull;</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Provenance */}
          <div className="p-4 rounded-2xl border border-[#E6EAE5] bg-[#F7F8F6]">
            <h4 className="font-bold text-xs text-[#202923] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#244B3A]" />
              <span>Data Provenance & Audit Trail</span>
            </h4>
            <p className="text-[11px] text-[#78827B] leading-relaxed">{resource.provenance}</p>
          </div>

          {/* Sample Data Preview if present */}
          {resource.sampleDataPreview && (
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#78827B] mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#244B3A]" />
                <span>Sample Data Ingestion Schema (Preview)</span>
              </h4>
              <div className="bg-[#202923] text-stone-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto whitespace-pre leading-relaxed border border-stone-800">
                {resource.sampleDataPreview}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#E6EAE5] flex items-center justify-between gap-3 bg-[#F7F8F6] rounded-b-3xl">
          <div className="text-[11px] text-[#78827B]">
            Sandbox mode &bull; Demo catalog data verified
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#E6EAE5] text-[#202923] text-xs font-semibold rounded-xl hover:bg-white transition-colors"
            >
              Close
            </button>
            {onSelect && (
              <button
                onClick={() => {
                  onSelect(resource);
                  onClose();
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors shadow-2xs ${
                  isSelected
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    : 'bg-[#244B3A] text-white hover:bg-[#1C3A2D]'
                }`}
              >
                {isSelected ? 'Remove from Plan' : 'Add to Procurement Plan'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
