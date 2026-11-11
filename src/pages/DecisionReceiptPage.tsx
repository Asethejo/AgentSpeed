import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { receiptService } from '../services/receiptService';
import { DecisionReceipt } from '../types';
import { DecisionReceiptView } from '../components/receipts/DecisionReceiptView';
import { LoadingState } from '../components/common/LoadingState';
import { FileCheck2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DecisionReceiptPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const receiptId = searchParams.get('id') || 'rcpt-ai-startups-8824';

  const [receipt, setReceipt] = useState<DecisionReceipt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await receiptService.getReceipt(receiptId);
        setReceipt(data);
      } catch (err) {
        console.error('Failed to load receipt:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [receiptId]);

  if (loading) {
    return <LoadingState title="Loading Decision Receipt" fullPage />;
  }

  if (!receipt) {
    return (
      <div className="text-center py-12">
        <h2 className="text-base font-bold text-[#202923]">Decision Receipt Not Found</h2>
        <p className="text-xs text-[#78827B] mt-1">Receipt ID #{receiptId} does not exist in local vault.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#244B3A] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Link
          to="/results"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78827B] hover:text-[#202923] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Task Results</span>
        </Link>
      </div>

      <DecisionReceiptView receipt={receipt} />
    </div>
  );
};
