import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { purchaseService } from '../services/purchaseService';
import { Purchase } from '../types';
import { PayPalCheckoutModal } from '../components/payments/PayPalCheckoutModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { CreditCard, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useApp();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [activeModalPurchase, setActiveModalPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    async function load() {
      const all = await purchaseService.getPurchases();
      const approved = all.filter((p) => p.status === 'approved');
      setPurchases(approved);
      const targetId = searchParams.get('purchaseId');
      if (targetId) {
        const found = approved.find((p) => p.id === targetId);
        if (found) setActiveModalPurchase(found);
      }
    }
    load();
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">Review Your Purchase</h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              PayPal Sandbox
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Human-approved digital resources ready for cryptographic PayPal payment capture.
          </p>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E6EAE5] p-12 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#27845B] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#202923]">No Approved Purchases Pending Payment</h3>
          <p className="text-xs text-[#78827B] mt-1">
            Check the Approval Center to authorize proposed procurement items first.
          </p>
          <button
            onClick={() => navigate('/approvals')}
            className="mt-4 px-4 py-2 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors"
          >
            Go to Approval Center
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="bg-white p-5 rounded-2xl border border-[#E6EAE5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EAF1E9] text-[#244B3A]">
                    {p.provider}
                  </span>
                  <StatusBadge status="approved" size="sm" />
                </div>
                <h3 className="text-sm font-bold text-[#202923] mt-1.5">{p.resourceName}</h3>
                <p className="text-xs text-[#78827B] mt-0.5">Task: {p.taskTitle}</p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <div className="font-mono text-lg font-bold text-[#202923]">
                    ${p.amount.toFixed(2)} USD
                  </div>
                  <span className="text-[10px] text-[#27845B]">SpendGuard Verified</span>
                </div>

                <button
                  onClick={() => setActiveModalPurchase(p)}
                  className="px-4 py-2 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <PayPalCheckoutModal
        purchase={activeModalPurchase}
        onClose={() => setActiveModalPurchase(null)}
        onPaymentSuccess={() => {
          setActiveModalPurchase(null);
          navigate('/activation');
        }}
      />
    </div>
  );
};
