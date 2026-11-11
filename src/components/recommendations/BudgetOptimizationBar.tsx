import React from 'react';
import { Recommendation } from '../../types';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface BudgetOptimizationBarProps {
  totalBudget: number;
  recommendations: Recommendation[];
}

export const BudgetOptimizationBar: React.FC<BudgetOptimizationBarProps> = ({
  totalBudget,
  recommendations,
}) => {
  const selected = recommendations.filter((r) => r.isSelected);
  const totalRecommended = selected.reduce((sum, r) => sum + r.price, 0);
  const remaining = Math.max(0, totalBudget - totalRecommended);
  const isOverBudget = totalRecommended > totalBudget;
  const utilizationPct = Math.min(100, (totalRecommended / totalBudget) * 100);

  const colors = [
    'bg-[#244B3A]', // Forest green
    'bg-[#78977D]', // Sage green
    'bg-[#6487B8]', // Soft blue
    'bg-[#D69A38]', // Warning amber
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F3EF]">
        <div>
          <h3 className="text-sm font-bold text-[#202923]">Budget Allocation & Optimization</h3>
          <p className="text-xs text-[#78827B]">
            Automated budget constraint matching powered by SpendGuard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#78827B]">Total Budget:</span>
          <span className="font-mono text-sm font-bold text-[#202923]">
            ${totalBudget.toFixed(2)} USD
          </span>
        </div>
      </div>

      {/* Visual Multi-Segment Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#202923]">Allocation Breakdown</span>
          <span className="font-mono font-medium text-[#78827B]">
            {utilizationPct.toFixed(0)}% Utilized
          </span>
        </div>

        <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-[#E6EAE5]">
          {selected.map((rec, i) => {
            const widthPct = (rec.price / totalBudget) * 100;
            return (
              <div
                key={rec.id}
                className={`${colors[i % colors.length]} h-full rounded-sm transition-all duration-300 first:rounded-l-full`}
                style={{ width: `${widthPct}%` }}
                title={`${rec.resource.name}: $${rec.price.toFixed(2)}`}
              />
            );
          })}
          {remaining > 0 && (
            <div
              className="bg-[#EAF1E9] h-full rounded-r-full transition-all duration-300"
              style={{ width: `${(remaining / totalBudget) * 100}%` }}
              title={`Remaining Buffer: $${remaining.toFixed(2)}`}
            />
          )}
        </div>
      </div>

      {/* Itemized breakdown cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F0F3EF]">
        <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
          <div className="text-[10px] uppercase font-semibold text-[#78827B]">Recommended Spend</div>
          <div className="font-mono text-lg font-bold text-[#244B3A] mt-0.5">
            ${totalRecommended.toFixed(2)}
          </div>
          <div className="text-[10px] text-[#78827B] mt-0.5">{selected.length} items selected</div>
        </div>

        <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
          <div className="text-[10px] uppercase font-semibold text-[#78827B]">Remaining Buffer</div>
          <div className="font-mono text-lg font-bold text-[#27845B] mt-0.5">
            ${remaining.toFixed(2)}
          </div>
          <div className="text-[10px] text-[#78827B] mt-0.5">Preserved in reserve</div>
        </div>

        <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5] flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-semibold text-[#78827B]">SpendGuard Status</div>
            <div
              className={`text-xs font-bold mt-1 flex items-center gap-1 ${
                isOverBudget ? 'text-[#D65B5B]' : 'text-[#244B3A]'
              }`}
            >
              {isOverBudget ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Exceeds Budget</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#27845B]" />
                  <span>Policy Cleared</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
