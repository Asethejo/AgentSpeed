import React from 'react';
import { Link } from 'react-router-dom';
import { Transaction } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Receipt, ExternalLink, ChevronRight } from 'lucide-react';

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

export const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#E6EAE5] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#202923]">Recent Transactions</h2>
          <p className="text-xs text-[#78827B] mt-0.5">Audited PayPal charges and cryptographic receipts</p>
        </div>
        <Link
          to="/transactions"
          className="text-xs font-semibold text-[#244B3A] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F3EF] bg-[#F7F8F6]/50 text-[11px] font-semibold text-[#78827B] uppercase tracking-wider">
              <th className="py-3 px-5">Resource & Provider</th>
              <th className="py-3 px-4">PayPal Ref</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F3EF] text-xs">
            {transactions.slice(0, 4).map((txn) => {
              const formattedDate = new Date(txn.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <tr key={txn.id} className="hover:bg-[#F7F8F6] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-[#202923] line-clamp-1">{txn.resourceName}</div>
                    <div className="text-[11px] text-[#78827B] mt-0.5">{txn.provider}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#78827B]">
                    {txn.paypalRef}
                  </td>
                  <td className="py-3.5 px-4 text-[#78827B] whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#202923]">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={txn.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <Link
                      to="/receipts"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#244B3A] hover:underline"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
