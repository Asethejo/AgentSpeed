import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  Receipt,
  Search,
  Sliders,
  DollarSign,
  TrendingUp,
  FileCheck2,
  ChevronRight,
  Database,
  Code,
  Coins,
  Download,
} from 'lucide-react';
import { downloadAgentSpendZip } from '../utils/downloadZip';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F8F6] text-[#202923] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#E6EAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#244B3A] text-white flex items-center justify-center shadow-xs">
              <Coins className="w-4 h-4 text-[#C8DAC7]" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#202923]">
              AgentSpend
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#78827B]">
            <a href="#how-it-works" className="hover:text-[#202923] transition-colors">
              How It Works
            </a>
            <a href="#spendguard" className="hover:text-[#202923] transition-colors">
              SpendGuard Safety
            </a>
            <a href="#paypal-security" className="hover:text-[#202923] transition-colors">
              PayPal Checkout
            </a>
            <a href="#decision-receipts" className="hover:text-[#202923] transition-colors">
              Decision Receipts
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-xs font-semibold text-[#202923] hover:text-[#244B3A] px-3 py-1.5 transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <button
              onClick={() => downloadAgentSpendZip()}
              className="px-3.5 py-2 bg-[#EAF1E9] text-[#244B3A] border border-[#C8DAC7] text-xs font-bold rounded-xl hover:bg-[#DCE7DA] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1E9] border border-[#C8DAC7] text-[#244B3A] text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#78977D]" />
          <span>Autonomous AI Procurement Agent</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#27845B]" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-[#202923] tracking-tight max-w-4xl leading-[1.12]">
          Let AI find what you need. <br />
          <span className="text-[#244B3A]">You decide what gets paid.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#78827B] max-w-2xl leading-relaxed">
          An intelligent procurement agent that discovers resources, optimizes spending, and
          completes tasks — with your approval at every purchase.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            to="/tasks/new"
            className="w-full sm:w-auto px-6 py-3 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start with AgentSpend</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F7F8F6] text-[#202923] text-sm font-semibold rounded-2xl border border-[#E6EAE5] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore how it works</span>
          </a>
        </div>

        {/* Hero Product Preview Mockup */}
        <div className="mt-14 w-full max-w-5xl rounded-3xl border border-[#E6EAE5] bg-white shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden">
          {/* Mock Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F0F3EF]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-mono text-[#78827B]">
                agentspend.ai/tasks/task-ai-startups-01
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#27845B]" />
                <span>SpendGuard Armed</span>
              </span>
            </div>
          </div>

          {/* Grid Preview of the 5 Pillars */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: AI Task Discovery */}
            <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
                  1. AI Research & Discovery
                </span>
                <span className="text-[10px] font-bold text-[#27845B] bg-white px-2 py-0.5 rounded border border-[#E6EAE5]">
                  8 Evaluated
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#202923]">
                "Research five AI startups and compare funding & growth"
              </h4>
              <div className="mt-3 space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-[#E6EAE5]">
                  <div className="flex justify-between font-bold text-[#202923]">
                    <span>AI Startups Funding Dataset</span>
                    <span className="text-[#244B3A] font-mono">$4.00</span>
                  </div>
                  <div className="text-[10px] text-[#27845B] mt-0.5">Quality: 96% &bull; Suitability: 98%</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#E6EAE5]">
                  <div className="flex justify-between font-bold text-[#202923]">
                    <span>Market Trends & Growth API</span>
                    <span className="text-[#244B3A] font-mono">$3.00</span>
                  </div>
                  <div className="text-[10px] text-[#27845B] mt-0.5">Quality: 94% &bull; Real-time Feed</div>
                </div>
              </div>
            </div>

            {/* Column 2: Budget Optimization & SpendGuard */}
            <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
                  2. Budget & SpendGuard
                </span>
                <span className="text-[10px] font-bold text-[#244B3A] bg-[#EAF1E9] px-2 py-0.5 rounded">
                  Policy Cleared
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E6EAE5] space-y-2 text-xs">
                <div className="flex justify-between text-[#78827B]">
                  <span>Total Task Budget:</span>
                  <span className="font-mono font-bold text-[#202923]">$10.00</span>
                </div>
                <div className="flex justify-between text-[#78827B]">
                  <span>Optimized Spend:</span>
                  <span className="font-mono font-bold text-[#244B3A]">$7.00</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden flex">
                  <div className="bg-[#244B3A] h-full" style={{ width: '40%' }} />
                  <div className="bg-[#78977D] h-full" style={{ width: '30%' }} />
                  <div className="bg-[#EAF1E9] h-full" style={{ width: '30%' }} />
                </div>
                <div className="flex justify-between text-[#27845B] font-bold text-[11px] pt-1">
                  <span>Preserved Surplus:</span>
                  <span className="font-mono">$3.00 USD</span>
                </div>
              </div>
              <div className="mt-3 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-[#244B3A] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#27845B]" />
                <span>6 Policy Safety Checks Passed</span>
              </div>
            </div>

            {/* Column 3: Human Approval & PayPal */}
            <div className="bg-[#F7F8F6] p-4 rounded-2xl border border-[#E6EAE5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#78827B]">
                    3. Approval & PayPal Pay
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Human Signed
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E6EAE5] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#202923]">Alex Rivera (You)</span>
                    <span className="text-[10px] font-mono text-[#27845B]">Signed 14:23</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FFC439]/20 border border-[#FFC439]/40 flex items-center justify-between">
                    <span className="font-extrabold italic text-[#003087] text-xs">PayPal</span>
                    <span className="font-mono font-bold text-[#003087]">$7.00 Settled</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-[#244B3A] text-white text-xs flex items-center justify-between">
                <span className="font-semibold text-[11px]">Decision Receipt #8824</span>
                <span className="text-[10px] text-[#C8DAC7] font-mono">SEALED &bull; OK</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Workflow Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-[#E6EAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#78977D]">
              The 5-Stage Procurement Loop
            </h2>
            <h3 className="text-3xl font-black text-[#202923] mt-2">
              Research. Recommend. Request Approval. Pay. Deliver.
            </h3>
            <p className="text-xs sm:text-sm text-[#78827B] mt-3">
              AgentSpend replaces blind subscription spending with autonomous task-based
              procurement governed by absolute human financial authority.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Research',
                desc: 'Agent decomposes your task, queries catalog indices, and benchmarks data quality and freshness.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Recommend',
                desc: 'Generates mathematical procurement plan fitting budget with zero hallucinated or unverified assets.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'SpendGuard',
                desc: 'Verifies 6 automated financial policies: single-item caps, daily ceilings, and vendor whitelists.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'Approve & Pay',
                desc: 'Human signs off in one click. PayPal processes sandbox checkout with cryptographic capture.',
                icon: CreditCard,
              },
              {
                step: '05',
                title: 'Deliver & Receipt',
                desc: 'Resources mount immediately. Final report delivered with immutable, non-repudiable Decision Receipt.',
                icon: FileCheck2,
              },
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#F7F8F6] border border-[#E6EAE5] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#78977D]">{st.step}</span>
                      <div className="w-8 h-8 rounded-xl bg-white text-[#244B3A] flex items-center justify-center border border-[#E6EAE5]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#202923]">{st.title}</h4>
                    <p className="text-xs text-[#78827B] mt-2 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SpendGuard Feature Highlight */}
      <section id="spendguard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E9] text-[#244B3A] text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#27845B]" />
              <span>SpendGuard &trade; Financial Safety Layer</span>
            </div>
            <h3 className="text-3xl font-black text-[#202923] tracking-tight">
              Zero Unchecked Agent Spend. Total Financial Certainty.
            </h3>
            <p className="text-xs sm:text-sm text-[#78827B] mt-4 leading-relaxed">
              Traditional autonomous agents can run up hundreds of dollars in unseen API fees.
              SpendGuard acts as an embedded fintech firewall that intercepts every proposed purchase,
              tests it against strict policy bounds, and requires explicit user authorization before
              any payment gateway is invoked.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Hard budget ceilings — Agent cannot exceed task allocation',
                'Single-item purchase ceiling to eliminate outlier spikes',
                'Vendor whitelist and blacklisted provider filtration',
                'Cryptographically enforced human approval signature requirement',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#202923] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#27845B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/spendguard"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#244B3A] text-white text-xs font-bold rounded-xl hover:bg-[#1C3A2D] transition-colors shadow-2xs"
              >
                <span>View Live Policy Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3EF]">
              <span className="text-xs font-bold text-[#202923]">Active SpendGuard Rules</span>
              <span className="text-[11px] font-bold text-[#27845B] bg-[#EAF1E9] px-2 py-0.5 rounded-full">
                6 Rules Verified
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#202923]">Within Task Budget ($10.00)</div>
                  <div className="text-[11px] text-[#78827B]">Committed $7.00 &bull; $3.00 Buffer</div>
                </div>
                <span className="text-[10px] font-bold text-[#244B3A] bg-[#EAF1E9] px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#202923]">Single Purchase Limit ($4.50)</div>
                  <div className="text-[11px] text-[#78827B]">Max item: $4.00 Dataset</div>
                </div>
                <span className="text-[10px] font-bold text-[#244B3A] bg-[#EAF1E9] px-2 py-0.5 rounded">
                  PASS
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#202923]">Human Approval Required</div>
                  <div className="text-[11px] text-[#78827B]">Payment locked until signature</div>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  REQUIRED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Receipt Highlight */}
      <section id="decision-receipts" className="py-20 bg-white border-t border-[#E6EAE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#78977D]">
            Auditability & Governance
          </h2>
          <h3 className="text-3xl font-black text-[#202923] mt-2">
            Every Cent Backed by an Immutable Decision Receipt
          </h3>
          <p className="text-xs sm:text-sm text-[#78827B] mt-3 max-w-xl mx-auto">
            Unlike black-box agents, AgentSpend records why an asset was chosen, which alternatives
            were rejected, the exact policy check logs, user approval timestamps, and PayPal capture
            references.
          </p>

          <div className="mt-8">
            <Link
              to="/receipts"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#244B3A] text-white text-xs font-bold rounded-xl hover:bg-[#1C3A2D] transition-colors shadow-sm"
            >
              <FileCheck2 className="w-4 h-4 text-[#C8DAC7]" />
              <span>Inspect Sample Decision Receipt</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#244B3A] text-white text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to upgrade from unmonitored agents to intelligent fintech procurement?
          </h2>
          <p className="text-xs sm:text-sm text-[#C8DAC7] mt-3 leading-relaxed">
            Create your first procurement task in seconds. Set your budget, review AI
            recommendations, and pay only for verified resources via PayPal.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/tasks/new"
              className="px-6 py-3 bg-white text-[#244B3A] hover:bg-[#F7F8F6] text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Get Started with AgentSpend</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-[#E6EAE5] text-xs text-[#78827B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#202923]">AgentSpend</span>
            <span>&bull; Autonomous AI Procurement Agent</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/spendguard" className="hover:text-[#202923]">
              SpendGuard
            </Link>
            <Link to="/resources" className="hover:text-[#202923]">
              Resource Catalog
            </Link>
            <Link to="/settings" className="hover:text-[#202923]">
              Policies
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
