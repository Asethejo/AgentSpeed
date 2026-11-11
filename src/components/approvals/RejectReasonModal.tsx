import React, { useState } from 'react';
import { Purchase } from '../../types';
import { X, AlertTriangle } from 'lucide-react';

interface RejectReasonModalProps {
  purchase: Purchase | null;
  onClose: () => void;
  onConfirmReject: (purchaseId: string, reason: string) => void;
  isProcessing?: boolean;
}

export const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  purchase,
  onClose,
  onConfirmReject,
  isProcessing = false,
}) => {
  const [reason, setReason] = useState('');

  if (!purchase) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReject(purchase.id, reason.trim() || 'Declined by human reviewer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-md w-full border border-[#E6EAE5] shadow-xl p-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#78827B] hover:text-[#202923] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-base font-bold text-[#202923] mt-3">Reject Purchase Request?</h3>
        <p className="text-xs text-[#78827B] mt-1 leading-relaxed">
          You are rejecting procurement of{' '}
          <span className="font-semibold text-[#202923]">{purchase.resourceName}</span> ($
          {purchase.amount.toFixed(2)} USD). The agent will explore alternative assets.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-xs font-semibold text-[#202923] mb-1">
            Rejection Reason (Optional):
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="e.g. Too expensive for current sprint, prefer open-source alternative, or out of scope."
            className="w-full text-xs p-3 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          />

          <div className="mt-5 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 border border-[#E6EAE5] text-[#202923] text-xs font-semibold rounded-xl hover:bg-[#F7F8F6] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Confirm Rejection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
