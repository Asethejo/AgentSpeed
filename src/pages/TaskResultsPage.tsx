import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  FileCheck2,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
  Database,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Printer,
} from 'lucide-react';

export const TaskResultsPage: React.FC = () => {
  const { currentTask, showToast } = useApp();
  const navigate = useNavigate();

  const report = currentTask?.report;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#27845B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#27845B]">
              Autonomous Task Completed
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#202923] tracking-tight mt-1">
            Your Task is Complete
          </h1>
          <p className="text-xs text-[#78827B] mt-1">
            Completed: {report?.completedAt ? new Date(report.completedAt).toLocaleString() : 'Just now'} &bull; Verified via SpendGuard
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-[#F7F8F6] hover:bg-[#EAF1E9] text-[#244B3A] text-xs font-semibold rounded-xl border border-[#E6EAE5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <Link
            to={`/receipts?id=${report?.decisionReceiptId || 'rcpt-ai-startups-8824'}`}
            className="px-4 py-2 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#C8DAC7]" />
            <span>View Decision Receipt</span>
          </Link>
        </div>
      </div>

      {/* Original Objective & Resources Used Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-5 rounded-2xl border border-[#E6EAE5]">
          <span className="text-[10px] uppercase font-bold text-[#78827B]">Task Objective</span>
          <p className="text-xs font-bold text-[#202923] mt-1 leading-relaxed">
            {currentTask?.prompt || 'Research five AI startups and compare their funding, growth, and market opportunities.'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6EAE5]">
          <span className="text-[10px] uppercase font-bold text-[#78827B]">Procured Resources</span>
          <div className="mt-1 space-y-1">
            {(report?.resourcesUsed || [
              { name: 'AI Startups Funding & Traction Dataset 2024', price: 4.0 },
              { name: 'AI Market Trends & Growth API Access Key', price: 3.0 },
            ]).map((r, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-[#202923] truncate max-w-[170px] font-medium">{r.name}</span>
                <span className="font-mono text-[#244B3A] font-bold">${r.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#78977D]" />
          <span>Executive Intelligence Summary</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#202923] leading-relaxed">
          {report?.executiveSummary ||
            'AgentSpend unlocked verified venture telemetry and real-time developer momentum signals to benchmark five breakthrough AI ventures. NeuraFlow AI and Synthetix Labs demonstrate the highest revenue growth multiples (>300% YoY), while CognitiveScale maintains the strongest enterprise balance sheet ($28M Series B).'}
        </p>
      </div>

      {/* Key Findings Cards */}
      {report?.keyFindings && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] mb-3">
            Core Benchmark Takeaways
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.keyFindings.map((kf, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-[#E6EAE5] shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase text-[#78977D]">{kf.badge}</span>
                  {kf.metric && (
                    <span className="font-mono text-xs font-extrabold text-[#244B3A] bg-[#EAF1E9] px-2 py-0.5 rounded">
                      {kf.metric}
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-[#202923]">{kf.title}</h3>
                <p className="text-xs text-[#78827B] mt-1 leading-relaxed">{kf.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Startups Comparison Matrix (For startup prompt) */}
      {report?.startupsComparison && (
        <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#E6EAE5]">
            <h2 className="text-sm font-bold text-[#202923] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#244B3A]" />
              <span>Comparative Benchmark Matrix (5 AI Startups)</span>
            </h2>
            <p className="text-xs text-[#78827B] mt-0.5">
              Derived from verified VenturePulse cap tables and AlphaInsight growth API telemetry
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F7F8F6] text-[10px] font-semibold text-[#78827B] uppercase border-b border-[#E6EAE5]">
                  <th className="py-3 px-5">Startup Entity</th>
                  <th className="py-3 px-3">Stage</th>
                  <th className="py-3 px-3">Funding</th>
                  <th className="py-3 px-3">Valuation</th>
                  <th className="py-3 px-3">Growth Velocity</th>
                  <th className="py-3 px-5">Market Opportunity & Moat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3EF]">
                {report.startupsComparison.map((st, i) => (
                  <tr key={i} className="hover:bg-[#F7F8F6] transition-colors">
                    <td className="py-3.5 px-5 font-bold text-[#202923]">
                      <div>{st.name}</div>
                      <div className="text-[10px] text-[#78827B] font-normal">Est. {st.founded}</div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A] font-semibold text-[10px]">
                        {st.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-[#202923] whitespace-nowrap">
                      {st.funding}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-[#244B3A] whitespace-nowrap">
                      {st.valuation}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#27845B]">{st.growthScore}/100</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-[#78827B] text-[11px] leading-relaxed">
                      {st.marketOpportunity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Strategic Analysis Sections */}
      {report?.analysisSections && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B]">
            Strategic Market Analysis
          </h2>
          {report.analysisSections.map((sec, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#202923]">{sec.title}</h3>
              <p className="text-xs text-[#78827B] leading-relaxed">{sec.content}</p>
              {sec.dataPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {sec.dataPoints.map((dp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
                      <span className="text-[10px] text-[#78827B] uppercase font-semibold">
                        {dp.label}
                      </span>
                      <div className="font-mono text-sm font-bold text-[#244B3A] mt-0.5">
                        {dp.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strategic Recommendations & Conclusion */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#78827B]">
          Agent Strategic Recommendations
        </h3>
        <ul className="space-y-2">
          {(report?.recommendations || []).map((rec, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#202923]">
              <CheckCircle2 className="w-4 h-4 text-[#27845B] shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>

        {report?.conclusion && (
          <div className="mt-4 pt-4 border-t border-[#F0F3EF]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
              Conclusion
            </span>
            <p className="text-xs text-[#78827B] mt-1 leading-relaxed">{report.conclusion}</p>
          </div>
        )}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-5 rounded-2xl bg-[#EAF1E9] border border-[#C8DAC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#27845B]" />
          <span className="text-xs font-semibold text-[#244B3A]">
            Audit complete &bull; All data purchases validated on blockchain/hash receipt
          </span>
        </div>

        <Link
          to={`/receipts?id=${report?.decisionReceiptId || 'rcpt-ai-startups-8824'}`}
          className="px-5 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0"
        >
          <span>Open Decision Receipt</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
