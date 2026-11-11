import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Plus,
  Shield,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { downloadAgentSpendZip } from '../../utils/downloadZip';

interface TopbarProps {
  onToggleSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentTask, pendingApprovalsCount, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = (pathname: string) => {
    if (pathname === '/dashboard') return 'Dashboard Overview';
    if (pathname === '/tasks') return 'My Procurement Tasks';
    if (pathname === '/tasks/new') return 'Create New Task';
    if (pathname.startsWith('/research')) return 'AI Research Workspace';
    if (pathname === '/resources') return 'Discover Digital Resources';
    if (pathname === '/recommendations') return 'AI Procurement Plan';
    if (pathname === '/spendguard') return 'SpendGuard Financial Safety';
    if (pathname === '/approvals') return 'Human Approval Center';
    if (pathname === '/checkout') return 'PayPal Secure Checkout';
    if (pathname === '/activation') return 'Resource Activation & Vault';
    if (pathname === '/results') return 'AI Task Intelligence Report';
    if (pathname.startsWith('/receipts')) return 'Decision Receipt';
    if (pathname === '/transactions') return 'Transaction History';
    if (pathname === '/analytics') return 'Spending & Budget Analytics';
    if (pathname === '/settings') return 'Preferences & Policies';
    return 'AgentSpend';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resources?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-[#E6EAE5] px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left section: Hamburger & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-[#78827B] hover:text-[#202923] hover:bg-[#F7F8F6] transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold text-[#78827B] hidden sm:inline">Workspace</span>
          <span className="text-xs text-stone-300 hidden sm:inline">/</span>
          <h1 className="text-sm font-bold text-[#202923] truncate">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78827B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources, startup benchmarks, or receipt IDs..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-1 focus:ring-[#78977D] focus:border-[#78977D] transition-all"
          />
        </form>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center gap-2.5">
        {/* Download Codebase ZIP button */}
        <button
          onClick={async () => {
            showToast({
              type: 'info',
              title: 'Preparing Download',
              message: 'Downloading agentspend.zip...',
            });
            await downloadAgentSpendZip();
            showToast({
              type: 'success',
              title: 'ZIP Downloaded',
              message: 'agentspend.zip downloaded to your browser!',
            });
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EAF1E9] text-[#244B3A] border border-[#C8DAC7] text-xs font-bold rounded-xl hover:bg-[#DCE7DA] transition-colors shadow-2xs cursor-pointer"
          title="Download complete codebase as ZIP"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export ZIP</span>
        </button>

        {/* Quick Launch New Task button */}
        <Link
          to="/tasks/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#244B3A] text-white text-xs font-semibold rounded-xl hover:bg-[#1C3A2D] transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Task</span>
        </Link>

        {/* Notifications Icon with pending count badge */}
        <Link
          to="/approvals"
          className="relative p-2 rounded-xl text-[#78827B] hover:text-[#202923] hover:bg-[#F7F8F6] transition-colors"
          title={`${pendingApprovalsCount} pending approvals`}
        >
          <Bell className="w-4 h-4" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          )}
        </Link>

        {/* SpendGuard safety badge button */}
        <Link
          to="/spendguard"
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#244B3A] bg-[#EAF1E9] border border-[#C8DAC7] rounded-xl hover:bg-[#DCE7DA] transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>SpendGuard OK</span>
        </Link>

        {/* User avatar indicator */}
        <div className="pl-1 border-l border-[#E6EAE5]">
          <Link
            to="/settings"
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F7F8F6] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#244B3A] text-white text-xs font-bold flex items-center justify-center">
              AR
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
