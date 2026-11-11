import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { Transaction } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  Search,
  Filter,
  Download,
  Receipt,
  ExternalLink,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await dashboardService.getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to load transactions:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.paypalRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taskName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Transaction History
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Audited Ledger
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Complete cryptographic audit trail of all PayPal charges, capture references, and activations.
          </p>
        </div>

        <div className="text-xs text-[#78827B] font-medium bg-[#F7F8F6] px-3.5 py-2 rounded-xl border border-[#E6EAE5]">
          <span>{transactions.length} verified transactions</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78827B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by resource, vendor, or PayPal capture ref..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#78827B]" />
          <span className="text-xs text-[#78827B]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F8F6] text-[10px] font-semibold text-[#78827B] uppercase border-b border-[#E6EAE5]">
                <th className="py-3 px-5">Transaction & Resource</th>
                <th className="py-3 px-4">Associated Task</th>
                <th className="py-3 px-4">PayPal Ref</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Settlement</th>
                <th className="py-3 px-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3EF]">
              {filtered.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-[#F7F8F6] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#202923] group-hover:text-[#244B3A] transition-colors">
                      {txn.resourceName}
                    </div>
                    <div className="text-[10px] text-[#78827B] mt-0.5">{txn.provider}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#78827B] max-w-[200px] truncate">
                    {txn.taskName}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#78827B] whitespace-nowrap">
                    {txn.paypalRef}
                  </td>
                  <td className="py-3.5 px-4 text-[#78827B] whitespace-nowrap">
                    {new Date(txn.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#202923] whitespace-nowrap">
                    ${txn.amount.toFixed(2)} {txn.currency}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={txn.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button className="text-xs font-semibold text-[#244B3A] hover:underline flex items-center gap-1 ml-auto">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl max-w-md w-full border border-[#E6EAE5] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3EF]">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#244B3A]" />
                <h3 className="text-sm font-bold text-[#202923]">Transaction Details</h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 text-[#78827B] hover:text-[#202923] rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
                <div className="text-[10px] uppercase font-semibold text-[#78827B]">Resource</div>
                <div className="font-bold text-[#202923] mt-0.5">{selectedTxn.resourceName}</div>
                <div className="text-[11px] text-[#78827B]">{selectedTxn.provider}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white border border-[#E6EAE5]">
                  <span className="text-[10px] uppercase font-semibold text-[#78827B]">Amount</span>
                  <div className="font-mono text-base font-bold text-[#244B3A] mt-0.5">
                    ${selectedTxn.amount.toFixed(2)} USD
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E6EAE5]">
                  <span className="text-[10px] uppercase font-semibold text-[#78827B]">Status</span>
                  <div className="mt-1">
                    <StatusBadge status={selectedTxn.status} size="sm" />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E6EAE5] space-y-1 font-mono text-[11px]">
                <div>
                  <span className="text-[#78827B]">Transaction ID: </span>
                  <span className="text-stone-800">{selectedTxn.id}</span>
                </div>
                <div>
                  <span className="text-[#78827B]">PayPal Capture: </span>
                  <span className="text-stone-800">{selectedTxn.paypalRef}</span>
                </div>
                <div>
                  <span className="text-[#78827B]">Activation: </span>
                  <span className="text-[#27845B] font-bold">ACTIVE & UNLOCKED</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Link
                to="/receipts"
                onClick={() => setSelectedTxn(null)}
                className="px-4 py-2 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors"
              >
                Open Full Decision Receipt
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
