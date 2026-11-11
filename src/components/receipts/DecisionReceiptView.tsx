import React, { useState } from 'react';
import { DecisionReceipt } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  FileText,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  CreditCard,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DecisionReceiptViewProps {
  receipt: DecisionReceipt;
}

export const DecisionReceiptView: React.FC<DecisionReceiptViewProps> = ({ receipt }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(receipt.receiptId);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Receipt ID Copied',
      message: receipt.receiptId,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-lg max-w-4xl mx-auto overflow-hidden print:shadow-none print:border-none">
      {/* Top Receipt Bar */}
      <div className="bg-[#244B3A] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8DAC7]">
              Official AI Procurement Decision Receipt
            </span>
            <span className="text-xs bg-[#78977D]/40 text-white px-2 py-0.5 rounded-full border border-white/20">
              Sealed
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
            AgentSpend Receipt #{receipt.receiptId}
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Cryptographically verified audit trail of autonomous AI procurement
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopyId}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 border border-white/15"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#C8DAC7]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy ID'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 bg-[#C8DAC7] hover:bg-white text-[#244B3A] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Main Receipt Body */}
      <div className="p-6 sm:p-8 space-y-8 text-xs text-[#202923]">
        {/* Section 1: Task Details */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#244B3A]" />
              <span>1. Task Specification</span>
            </h2>
            <span className="font-mono text-[11px] text-[#78827B]">
              Created: {new Date(receipt.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5]">
            <div className="md:col-span-2">
              <span className="text-[10px] uppercase font-semibold text-[#78827B]">Task Objective</span>
              <p className="text-xs font-bold text-[#202923] mt-0.5">{receipt.taskTitle}</p>
              <p className="text-[11px] text-[#78827B] mt-1">{receipt.taskDescription}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t md:border-t-0 md:border-l border-[#E6EAE5] pt-2 md:pt-0 md:pl-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#78827B]">Total Budget</span>
                <div className="font-mono text-sm font-bold text-[#202923] mt-0.5">
                  ${receipt.budget.toFixed(2)}
                </div>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#78827B]">Actual Spent</span>
                <div className="font-mono text-sm font-bold text-[#244B3A] mt-0.5">
                  ${receipt.spentAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: AI Procurement Decisions */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#78977D]" />
              <span>2. AI Autonomous Decisions & Benchmarking</span>
            </h2>
            <span className="text-[11px] text-[#78827B]">
              Evaluated {receipt.evaluatedCount} | Selected {receipt.selectedCount} | Rejected {receipt.rejectedCount}
            </span>
          </div>

          <div className="border border-[#E6EAE5] rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7F8F6] text-[10px] font-semibold text-[#78827B] uppercase border-b border-[#E6EAE5]">
                  <th className="py-2.5 px-4">Candidate Asset</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Quality</th>
                  <th className="py-2.5 px-3">Decision</th>
                  <th className="py-2.5 px-4">Decision Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3EF]">
                {receipt.evaluatedResources.map((res, i) => (
                  <tr key={i} className={res.selected ? 'bg-[#EAF1E9]/40 font-medium' : ''}>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#202923]">{res.name}</div>
                      <div className="text-[10px] text-[#78827B]">{res.provider}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#202923]">${res.price.toFixed(2)}</td>
                    <td className="py-3 px-3 font-mono text-[#27845B]">{res.quality}/100</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          res.selected
                            ? 'bg-[#EAF1E9] text-[#244B3A]'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {res.selected ? 'Purchased' : 'Excluded'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#78827B] text-[11px] leading-relaxed">
                      {res.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: SpendGuard Financial Safety Checks */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#27845B]" />
              <span>3. SpendGuard Financial Policies</span>
            </h2>
            <span className="text-[11px] font-bold text-[#27845B] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Checks Cleared</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {receipt.spendGuardResults.map((sg, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-[#E6EAE5] bg-[#F7F8F6] flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#27845B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#202923]">{sg.rule}</h4>
                  <p className="text-[11px] text-[#78827B] mt-0.5">{sg.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Human Approvals */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#244B3A]" />
              <span>4. Human Approval Signatures</span>
            </h2>
            <span className="text-[11px] text-[#78827B]">Human-In-The-Loop Verification</span>
          </div>

          <div className="space-y-2">
            {receipt.humanApprovals.map((appr, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-[#E6EAE5] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-xs text-[#202923]">{appr.resourceName}</div>
                  <div className="text-[11px] text-[#78827B] mt-0.5">{appr.note}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
                    Authorized
                  </span>
                  <div className="text-[10px] text-[#78827B] mt-1 font-mono">
                    {new Date(appr.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: PayPal Payment & Settlement */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#003087]" />
              <span>5. PayPal Settlement & Cryptographic Hash</span>
            </h2>
            <span className="text-[11px] font-mono text-[#003087] font-semibold">
              Status: {receipt.paymentRecord.status}
            </span>
          </div>

          <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5] space-y-2 font-mono text-[11px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-[#78827B]">PayPal Order ID: </span>
                <span className="font-bold text-[#202923]">{receipt.paymentRecord.paypalOrderId}</span>
              </div>
              <div>
                <span className="text-[#78827B]">Capture ID: </span>
                <span className="font-bold text-[#202923]">{receipt.paymentRecord.paypalCaptureId}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#E6EAE5] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className="text-[#78827B]">Verification Hash: </span>
                <span className="text-[#244B3A] font-semibold break-all">
                  {receipt.paymentRecord.verificationHash}
                </span>
              </div>
              <div className="font-bold text-[#202923] shrink-0">
                Amount Paid: ${receipt.paymentRecord.amount.toFixed(2)} {receipt.paymentRecord.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Resource Activations */}
        <div>
          <div className="flex items-center justify-between border-b border-[#F0F3EF] pb-2 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#27845B]" />
              <span>6. Resource Activations & Delivery</span>
            </h2>
            <span className="text-[11px] text-[#78827B]">Automated Agent Ingestion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {receipt.resourceActivations.map((act, i) => (
              <div key={i} className="p-3 rounded-xl border border-[#C8DAC7] bg-[#EAF1E9]/40">
                <div className="font-bold text-xs text-[#244B3A]">{act.resourceName}</div>
                <div className="text-[11px] text-[#78827B] mt-0.5">Method: {act.accessMethod}</div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="font-mono text-[#27845B] font-bold">{act.status}</span>
                  <span className="text-[#78827B] font-mono">
                    {new Date(act.activatedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Task Outcome */}
        <div className="p-4 rounded-2xl bg-[#244B3A]/5 border border-[#244B3A]/20">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#244B3A]">Final Task Delivery Status</h3>
            <span className="text-xs font-bold text-[#27845B] bg-[#EAF1E9] px-2.5 py-0.5 rounded-full">
              {receipt.taskOutcome.status}
            </span>
          </div>
          <p className="text-xs text-[#202923] mt-2 leading-relaxed">
            {receipt.taskOutcome.reportSummary}
          </p>
        </div>
      </div>

      {/* Footer Audit Seal */}
      <div className="bg-[#F7F8F6] p-6 border-t border-[#E6EAE5] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#78827B] gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#244B3A] text-white flex items-center justify-center text-[10px] font-bold">
            AS
          </div>
          <span>Sealed by AgentSpend Procurement Engine &bull; Non-Repudiable Receipt</span>
        </div>
        <div className="font-mono text-[11px]">Audit Timestamp: {receipt.completedAt}</div>
      </div>
    </div>
  );
};
