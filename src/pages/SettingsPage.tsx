import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResourceCategory } from '../types';
import {
  Sliders,
  ShieldCheck,
  User,
  Bell,
  Save,
  Check,
  DollarSign,
  Lock,
} from 'lucide-react';

const CATEGORIES: ResourceCategory[] = [
  'Datasets',
  'APIs',
  'Research reports',
  'Industry insights',
  'Technical documentation',
];

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, showToast } = useApp();

  const [defaultBudget, setDefaultBudget] = useState(settings.defaultBudget);
  const [maxIndividualPurchase, setMaxIndividualPurchase] = useState(settings.maxIndividualPurchase);
  const [dailySpendingCap, setDailySpendingCap] = useState(settings.dailySpendingCap);
  const [mandatoryApproval, setMandatoryApproval] = useState(settings.mandatoryApproval);
  const [currency, setCurrency] = useState(settings.currency || 'USD');
  const [allowedCategories, setAllowedCategories] = useState<ResourceCategory[]>(settings.allowedCategories);
  const [blockedInput, setBlockedInput] = useState(settings.blockedProviders.join(', '));
  const [notifications, setNotifications] = useState(settings.notificationsEnabled);

  // User profile
  const [userName, setUserName] = useState('Alex Rivera');
  const [userEmail, setUserEmail] = useState('alex.rivera@enterprisecorp.com');

  const handleCategoryToggle = (cat: ResourceCategory) => {
    setAllowedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const blockedProviders = blockedInput
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    updateSettings({
      defaultBudget,
      maxIndividualPurchase,
      dailySpendingCap,
      mandatoryApproval,
      currency,
      allowedCategories,
      blockedProviders,
      notificationsEnabled: notifications,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              Settings & Spending Policies
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              SpendGuard Config
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Global financial limits, human approval thresholds, and provider blacklist rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Section */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0F3EF]">
            <User className="w-4 h-4 text-[#244B3A]" />
            <h2 className="text-sm font-bold text-[#202923]">Account Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1">Email Address</label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
              />
            </div>
          </div>
        </div>

        {/* Financial Policies Section */}
        <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#F0F3EF]">
            <ShieldCheck className="w-4 h-4 text-[#244B3A]" />
            <h2 className="text-sm font-bold text-[#202923]">SpendGuard Global Limits</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1">
                Default Task Budget
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-xs">
                  $
                </span>
                <input
                  type="number"
                  step="0.5"
                  value={defaultBudget}
                  onChange={(e) => setDefaultBudget(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1">
                Max Single Purchase Cap
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-xs">
                  $
                </span>
                <input
                  type="number"
                  step="0.5"
                  value={maxIndividualPurchase}
                  onChange={(e) => setMaxIndividualPurchase(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202923] mb-1">
                Daily Organization Cap
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-xs">
                  $
                </span>
                <input
                  type="number"
                  step="1.0"
                  value={dailySpendingCap}
                  onChange={(e) => setDailySpendingCap(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
                />
              </div>
            </div>
          </div>

          {/* Allowed Categories */}
          <div>
            <label className="block text-xs font-bold text-[#202923] mb-2">
              Globally Allowed Asset Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = allowedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#244B3A] text-white border-[#244B3A]'
                        : 'bg-[#F7F8F6] text-[#78827B] border-[#E6EAE5]'
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
            <label className="block text-xs font-bold text-[#202923] mb-1">
              Blocked Providers (Blacklist)
            </label>
            <input
              type="text"
              value={blockedInput}
              onChange={(e) => setBlockedInput(e.target.value)}
              className="w-full text-xs p-2.5 bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
            />
          </div>

          {/* Mandatory Human Approval */}
          <div className="p-4 rounded-2xl bg-[#EAF1E9]/50 border border-[#C8DAC7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#244B3A]" />
              <div>
                <h4 className="text-xs font-bold text-[#202923]">Mandatory Human-in-the-Loop</h4>
                <p className="text-[11px] text-[#78827B]">
                  Require human signature before any PayPal charge is executed.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mandatoryApproval}
                onChange={(e) => setMandatoryApproval(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#244B3A]"></div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
          >
            Save Spending Policies
          </button>
        </div>
      </form>
    </div>
  );
};
