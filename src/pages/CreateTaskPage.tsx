import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { taskService } from '../services/taskService';
import { ResourceCategory } from '../types';
import {
  Sparkles,
  ShieldCheck,
  DollarSign,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'Research five AI startups and compare their funding, growth, and market opportunities.',
  'Analyze grid storage battery chemistry patents and commercial cost curves through 2030.',
  'Benchmark top 5 vector database engines on indexing latency, memory footprint, and query throughput.',
  'Aggregate B2B SaaS net revenue retention (NRR) and churn benchmarks across fintech verticals.',
];

const ALL_CATEGORIES: ResourceCategory[] = [
  'Datasets',
  'APIs',
  'Research reports',
  'Industry insights',
  'Technical documentation',
];

export const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentTask, showToast } = useApp();

  const [prompt, setPrompt] = useState(
    'Research five AI startups and compare their funding, growth, and market opportunities.'
  );
  const [budget, setBudget] = useState<number>(10.0);
  const [currency, setCurrency] = useState('USD');
  const [maxIndividualPurchase, setMaxIndividualPurchase] = useState<number>(4.5);
  const [dailyCap, setDailyCap] = useState<number>(25.0);
  const [allowedCategories, setAllowedCategories] = useState<ResourceCategory[]>([
    'Datasets',
    'APIs',
    'Research reports',
    'Industry insights',
  ]);
  const [blockedProviderInput, setBlockedProviderInput] = useState('UntrustedScraperBot');
  const [requireApproval, setRequireApproval] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleCategoryToggle = (category: ResourceCategory) => {
    setAllowedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setValidationError('Please provide a task description for AgentSpend.');
      return;
    }
    if (budget <= 0) {
      setValidationError('Budget must be greater than $0.00.');
      return;
    }
    if (maxIndividualPurchase > budget) {
      setValidationError('Max individual purchase cannot exceed total task budget.');
      return;
    }
    if (allowedCategories.length === 0) {
      setValidationError('Select at least one allowed resource category.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    try {
      const blockedProviders = blockedProviderInput
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      const newTask = await taskService.createTask({
        prompt: prompt.trim(),
        budget,
        currency,
        maxIndividualPurchase,
        dailyCap,
        allowedCategories,
        blockedProviders,
        requireApproval,
      });

      setCurrentTask(newTask);

      showToast({
        type: 'success',
        title: 'Task Created & Submitted',
        message: 'AgentSpend is now executing AI resource discovery and budget matching.',
      });

      // Navigate to interactive research workspace
      navigate(`/research?taskId=${newTask.id}`);
    } catch (err: any) {
      console.error('Failed to create task:', err);
      setValidationError(err.message || 'Failed to submit task. Please check parameters.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF1E9] text-[#244B3A] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#78977D]" />
          <span>Autonomous Procurement Initiation</span>
        </div>
        <h1 className="text-2xl font-black text-[#202923] tracking-tight">
          What would you like AgentSpend to accomplish?
        </h1>
        <p className="text-xs sm:text-sm text-[#78827B] mt-1">
          Describe your task in natural language. The agent will formulate a procurement plan,
          evaluate digital resources, optimize your budget, and seek your approval before any
          payment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Prompt Input Box */}
        <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs p-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#78827B] mb-2">
            Task Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="e.g. Research five AI startups and compare their funding, growth, and market opportunities."
            className="w-full text-sm p-4 bg-[#F7F8F6] border border-[#E6EAE5] rounded-2xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-2 focus:ring-[#78977D] focus:border-transparent transition-all leading-relaxed"
          />

          {/* Suggested Prompts */}
          <div className="mt-4">
            <span className="text-[11px] font-semibold text-[#78827B]">Suggested Prompts:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="text-left text-xs px-3 py-1.5 bg-[#F7F8F6] hover:bg-[#EAF1E9] text-[#202923] hover:text-[#244B3A] rounded-xl border border-[#E6EAE5] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Financial & Policy Constraints */}
        <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F3EF]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#244B3A]" />
              <h3 className="text-sm font-bold text-[#202923]">SpendGuard Policy Configuration</h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Safety Bounds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Budget */}
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1.5">
                Total Task Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="500"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono font-bold bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
                />
              </div>
              <span className="text-[10px] text-[#78827B] mt-1 block">Maximum agent spending ceiling</span>
            </div>

            {/* Max Individual Purchase */}
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1.5">
                Max Single Purchase
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max={budget}
                  value={maxIndividualPurchase}
                  onChange={(e) => setMaxIndividualPurchase(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono font-bold bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
                />
              </div>
              <span className="text-[10px] text-[#78827B] mt-1 block">Caps single dataset or API license</span>
            </div>

            {/* Currency selector */}
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1.5">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
              >
                <option value="USD">USD ($) - United States Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
              <span className="text-[10px] text-[#78827B] mt-1 block">PayPal settlement currency</span>
            </div>
          </div>

          {/* Allowed Categories */}
          <div>
            <label className="block text-xs font-bold text-[#202923] mb-2">
              Allowed Resource Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => {
                const isSelected = allowedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#244B3A] text-white border-[#244B3A]'
                        : 'bg-[#F7F8F6] text-[#78827B] border-[#E6EAE5] hover:bg-stone-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blocked Providers */}
          <div>
            <label className="block text-xs font-bold text-[#202923] mb-1.5">
              Blocked Providers / Blacklist
            </label>
            <input
              type="text"
              value={blockedProviderInput}
              onChange={(e) => setBlockedProviderInput(e.target.value)}
              placeholder="Comma separated vendor names to block (e.g. UntrustedScraperBot)"
              className="w-full text-xs p-2.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
            />
          </div>

          {/* Mandatory Human Approval Toggle */}
          <div className="p-4 rounded-2xl bg-[#EAF1E9]/60 border border-[#C8DAC7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-[#244B3A] flex items-center justify-center border border-[#C8DAC7]">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#202923]">Mandatory Human Approval</h4>
                <p className="text-[11px] text-[#78827B] mt-0.5">
                  Require explicit user sign-off in Approval Center prior to any PayPal charge.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#244B3A]"></div>
            </label>
          </div>
        </div>

        {/* Validation Error banner if present */}
        {validationError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Formulating Procurement Plan...</span>
              </>
            ) : (
              <>
                <span>Analyze My Task</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
