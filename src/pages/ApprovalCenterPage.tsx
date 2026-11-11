import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { purchaseService } from '../services/purchaseService';
import { resourceService } from '../services/resourceService';
import { Purchase, Resource } from '../types';
import { ApprovalCard } from '../components/approvals/ApprovalCard';
import { RejectReasonModal } from '../components/approvals/RejectReasonModal';
import { PayPalCheckoutModal } from '../components/payments/PayPalCheckoutModal';
import { ResourceDetailsModal } from '../components/resources/ResourceDetailsModal';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';

export const ApprovalCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const { refreshDashboard, showToast } = useApp();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Modals state
  const [rejectingPurchase, setRejectingPurchase] = useState<Purchase | null>(null);
  const [checkoutPurchase, setCheckoutPurchase] = useState<Purchase | null>(null);
  const [inspectResource, setInspectResource] = useState<Resource | null>(null);

  const loadPurchases = async () => {
    try {
      setLoading(true);
      const list = await purchaseService.getPurchases();
      setPurchases(list);
      await refreshDashboard();
    } catch (err) {
      console.error('Failed to load purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const handleApprove = async (purchase: Purchase) => {
    try {
      setProcessingId(purchase.id);
      const approved = await purchaseService.approvePurchase(purchase.id);
      showToast({
        type: 'success',
        title: 'Purchase Approved',
        message: `Authorized ${purchase.resourceName} ($${purchase.amount.toFixed(2)}). Opening PayPal checkout.`,
      });
      await loadPurchases();
      // Directly trigger PayPal checkout for the newly approved purchase
      setCheckoutPurchase(approved);
    } catch (err: any) {
      console.error('Approval failed:', err);
      showToast({
        type: 'error',
        title: 'Approval Failed',
        message: err.message || 'Unable to record approval.',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmReject = async (purchaseId: string, reason: string) => {
    try {
      setProcessingId(purchaseId);
      await purchaseService.rejectPurchase(purchaseId, reason);
      showToast({
        type: 'info',
        title: 'Purchase Declined',
        message: 'The purchase was rejected and remaining budget restored.',
      });
      setRejectingPurchase(null);
      await loadPurchases();
    } catch (err: any) {
      console.error('Rejection failed:', err);
      showToast({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to reject purchase.',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleViewDetails = async (purchase: Purchase) => {
    try {
      const res = await resourceService.getResource(purchase.resourceId);
      setInspectResource(res);
    } catch (err) {
      console.error('Failed to get resource details:', err);
    }
  };

  const pendingList = purchases.filter((p) => p.status === 'pending_approval');
  const approvedList = purchases.filter((p) => p.status === 'approved');
  const activatedList = purchases.filter((p) => p.status === 'activated');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Your Approval is Required
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {pendingList.length} Pending
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Review AI recommended assets. No PayPal charge occurs until you grant explicit authorization.
          </p>
        </div>

        {approvedList.length > 0 && (
          <button
            onClick={() => setCheckoutPurchase(approvedList[0])}
            className="px-4 py-2 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Approved ({approvedList.length})</span>
          </button>
        )}
      </div>

      {loading ? (
        <LoadingState title="Loading Approvals" />
      ) : pendingList.length === 0 && approvedList.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          title="All Caught Up!"
          description="There are currently no purchases waiting for human authorization. All approved assets have either been settled or no new tasks are pending."
          actionText="Create New Task"
          onAction={() => navigate('/tasks/new')}
        />
      ) : (
        <div className="space-y-6">
          {/* Approved Ready for Checkout Section */}
          {approvedList.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#EAF1E9] border border-[#C8DAC7] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#27845B]" />
                  <h3 className="text-xs font-bold text-[#244B3A]">
                    Approved & Ready for PayPal Settlement ({approvedList.length})
                  </h3>
                </div>
                <span className="text-xs text-[#244B3A]">Human signature verified</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {approvedList.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-white border border-[#E6EAE5] flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#202923]">{p.resourceName}</div>
                      <div className="text-[11px] text-[#78827B] mt-0.5">
                        {p.provider} &bull; <span className="font-bold text-[#244B3A]">${p.amount.toFixed(2)} USD</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCheckoutPurchase(p)}
                      className="px-3.5 py-1.5 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Pay with PayPal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Approval Cards */}
          {pendingList.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] mb-3">
                Pending Your Signature ({pendingList.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingList.map((purchase) => (
                  <ApprovalCard
                    key={purchase.id}
                    purchase={purchase}
                    onApprove={handleApprove}
                    onReject={(p) => setRejectingPurchase(p)}
                    onViewDetails={handleViewDetails}
                    isProcessing={processingId === purchase.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejection Modal */}
      <RejectReasonModal
        purchase={rejectingPurchase}
        onClose={() => setRejectingPurchase(null)}
        onConfirmReject={handleConfirmReject}
        isProcessing={!!processingId}
      />

      {/* PayPal Checkout Modal */}
      <PayPalCheckoutModal
        purchase={checkoutPurchase}
        onClose={() => {
          setCheckoutPurchase(null);
          loadPurchases();
        }}
        onPaymentSuccess={(updated) => {
          showToast({
            type: 'success',
            title: 'Payment Confirmed',
            message: `Resource unlocked. Routing to activation vault.`,
          });
          setCheckoutPurchase(null);
          navigate('/activation');
        }}
      />

      {/* Resource Details Modal */}
      <ResourceDetailsModal
        resource={inspectResource}
        onClose={() => setInspectResource(null)}
      />
    </div>
  );
};
