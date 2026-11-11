import React, { useState } from 'react';
import { Purchase } from '../../types';
import { paymentService } from '../../services/paymentService';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Receipt,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface PayPalCheckoutModalProps {
  purchase: Purchase | null;
  onClose: () => void;
  onPaymentSuccess: (updatedPurchase: Purchase) => void;
}

type CheckoutState =
  | 'ready'
  | 'processing'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'cancelled';

export const PayPalCheckoutModal: React.FC<PayPalCheckoutModalProps> = ({
  purchase,
  onClose,
  onPaymentSuccess,
}) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('ready');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [captureId, setCaptureId] = useState<string | null>(null);
  const [completedPurchase, setCompletedPurchase] = useState<Purchase | null>(null);

  if (!purchase) return null;

  const handlePayPalCheckout = async () => {
    try {
      setCheckoutState('processing');
      setErrorMessage('');

      // Step 1: Call backend to create PayPal order
      const orderRes = await paymentService.createPayPalOrder(purchase.id);
      setOrderId(orderRes.orderId);

      // Simulate PayPal sandbox secure window processing
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setCheckoutState('verifying');

      // Step 2: Call backend to capture and cryptographically verify order
      const captureRes = await paymentService.capturePayPalOrder(orderRes.orderId, purchase.id);

      if (captureRes.success) {
        setCaptureId(captureRes.captureId);
        setCompletedPurchase(captureRes.purchase);
        setCheckoutState('success');

        // Confetti celebration
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#244B3A', '#78977D', '#EAF1E9', '#27845B'],
          });
        } catch (e) {
          // ignore
        }

        onPaymentSuccess(captureRes.purchase);
      } else {
        setCheckoutState('failed');
        setErrorMessage('Backend capture verification failed.');
      }
    } catch (err: any) {
      console.error('PayPal checkout error:', err);
      setCheckoutState('failed');
      setErrorMessage(err.message || 'Payment processing failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-lg w-full border border-[#E6EAE5] shadow-2xl p-6 flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#F0F3EF] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#003087] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              PP
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202923]">PayPal Secure Checkout</h3>
              <p className="text-[11px] text-[#78827B]">Fintech sandbox procurement engine</p>
            </div>
          </div>
          {checkoutState !== 'processing' && checkoutState !== 'verifying' && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#78827B] hover:text-[#202923] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content based on state */}
        {checkoutState === 'ready' && (
          <div className="py-4 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
                Resource Details
              </span>
              <h4 className="text-sm font-bold text-[#202923] mt-1">{purchase.resourceName}</h4>
              <p className="text-xs text-[#78827B] mt-0.5">
                Vendor: <span className="font-semibold text-stone-700">{purchase.provider}</span>
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#F7F8F6] border border-[#E6EAE5] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#78827B]">Total Charge</span>
                <div className="font-mono text-2xl font-bold text-[#202923] mt-0.5">
                  ${purchase.amount.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-[#78827B]">{purchase.currency}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-[#78827B]">Human Approval</span>
                <div className="mt-0.5">
                  <StatusBadge status="approved" size="sm" />
                </div>
              </div>
            </div>

            {/* Task & Budget remaining */}
            <div className="space-y-1.5 text-xs text-[#78827B] p-3 rounded-xl bg-white border border-[#E6EAE5]">
              <div className="flex justify-between">
                <span>Associated Task:</span>
                <span className="font-medium text-[#202923] truncate max-w-[200px]">
                  {purchase.taskTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Task Remaining Budget:</span>
                <span className="font-mono font-bold text-[#27845B]">
                  ${purchase.remainingBudgetAfter.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span>SpendGuard Compliance:</span>
                <span className="text-[#244B3A] font-semibold">100% Policy Pass</span>
              </div>
            </div>

            {/* Simulated PayPal Smart Button */}
            <div className="pt-2">
              <button
                onClick={handlePayPalCheckout}
                className="w-full py-3 px-4 bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span className="font-extrabold italic tracking-tight text-sm">PayPal</span>
                <span className="text-[#003087] font-semibold">Pay ${purchase.amount.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="text-[10px] text-center text-[#78827B] mt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-[#27845B]" />
                <span>Encrypted 256-bit PayPal Sandbox Transaction</span>
              </p>
            </div>
          </div>
        )}

        {(checkoutState === 'processing' || checkoutState === 'verifying') && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF1E9] flex items-center justify-center text-[#244B3A] mb-4">
              <Loader2 className="w-7 h-7 animate-spin text-[#244B3A]" />
            </div>
            <h4 className="text-sm font-bold text-[#202923]">
              {checkoutState === 'processing'
                ? 'Connecting to PayPal Sandbox...'
                : 'Verifying Settlement on Backend...'}
            </h4>
            <p className="text-xs text-[#78827B] mt-1 max-w-xs">
              {checkoutState === 'processing'
                ? 'Authorizing payment tokens and checking account authorization'
                : 'Capturing order and verifying cryptographic receipt signature'}
            </p>
          </div>
        )}

        {checkoutState === 'success' && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF1E9] text-[#27845B] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Payment Successfully Captured!</h4>
            <p className="text-xs text-[#78827B] mt-1 max-w-xs">
              ${purchase.amount.toFixed(2)} USD paid. Backend confirmed order capture and unlocked
              credentials.
            </p>

            {captureId && (
              <div className="mt-4 p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5] w-full text-left font-mono text-[11px] text-[#78827B]">
                <div>
                  <span className="font-semibold text-stone-700">Capture ID:</span> {captureId}
                </div>
                <div className="mt-0.5">
                  <span className="font-semibold text-stone-700">Order Ref:</span> {orderId}
                </div>
                <div className="mt-0.5 text-[#27845B] font-semibold">
                  Status: COMPLETED & VERIFIED
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3 w-full">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors shadow-2xs"
              >
                Continue to Resource Activation
              </button>
            </div>
          </div>
        )}

        {checkoutState === 'failed' && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#D65B5B] flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-[#202923]">Payment Authorization Failed</h4>
            <p className="text-xs text-[#78827B] mt-1 max-w-xs">
              {errorMessage || 'Unable to complete transaction. Please check policy rules.'}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setCheckoutState('ready')}
                className="px-4 py-2 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-[#E6EAE5] text-[#202923] text-xs font-semibold rounded-xl hover:bg-[#F7F8F6] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
