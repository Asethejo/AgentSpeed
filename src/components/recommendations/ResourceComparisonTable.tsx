import React from 'react';
import { Recommendation } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Check, X } from 'lucide-react';

interface ResourceComparisonTableProps {
  recommendations: Recommendation[];
  onToggleSelect: (id: string) => void;
}

export const ResourceComparisonTable: React.FC<ResourceComparisonTableProps> = ({
  recommendations,
  onToggleSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#E6EAE5]">
        <h3 className="text-sm font-bold text-[#202923]">Resource Evaluation Matrix</h3>
        <p className="text-xs text-[#78827B] mt-0.5">
          Comparative benchmark across evaluated data and API candidates
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F3EF] bg-[#F7F8F6]/60 text-[11px] font-semibold text-[#78827B] uppercase tracking-wider">
              <th className="py-3 px-5">Resource Candidate</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Relevance</th>
              <th className="py-3 px-4">Quality</th>
              <th className="py-3 px-4">Freshness</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Plan Status</th>
              <th className="py-3 px-5 text-right">Include</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F3EF] text-xs">
            {recommendations.map((rec) => (
              <tr
                key={rec.id}
                className={`hover:bg-[#F7F8F6] transition-colors ${
                  rec.isSelected ? 'bg-[#EAF1E9]/30' : ''
                }`}
              >
                <td className="py-3.5 px-5">
                  <div className="font-bold text-[#202923]">{rec.resource.name}</div>
                  <div className="text-[11px] text-[#78827B]">{rec.resource.provider}</div>
                </td>
                <td className="py-3.5 px-4 text-[#78827B] whitespace-nowrap">
                  {rec.resource.category}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-mono font-bold text-[#244B3A]">{rec.suitabilityScore}%</span>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="font-mono font-bold text-[#27845B]">{rec.qualityScore}%</span>
                </td>
                <td className="py-3.5 px-4 text-[#78827B] whitespace-nowrap">
                  {rec.freshness}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#202923] whitespace-nowrap">
                  ${rec.price.toFixed(2)}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge
                    status={
                      rec.isSelected
                        ? 'recommended'
                        : rec.price > 4.5
                        ? 'excluded'
                        : 'alternative'
                    }
                    size="sm"
                  />
                </td>
                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                  <button
                    onClick={() => onToggleSelect(rec.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                      rec.isSelected
                        ? 'bg-[#244B3A] text-white border-[#244B3A]'
                        : 'bg-white text-[#202923] border-[#E6EAE5] hover:bg-[#F7F8F6]'
                    }`}
                  >
                    {rec.isSelected ? 'Included' : 'Add'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
