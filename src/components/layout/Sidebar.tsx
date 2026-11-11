import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Search,
  Sparkles,
  ShieldCheck,
  Receipt,
  BarChart3,
  FileCheck2,
  Sliders,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Coins,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { pendingApprovalsCount } = useApp();

  const navGroups = [
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
        { label: 'My Tasks', to: '/tasks', icon: CheckSquare },
        { label: 'Discover Resources', to: '/resources', icon: Search },
        { label: 'AI Recommendations', to: '/recommendations', icon: Sparkles },
        {
          label: 'Approval Center',
          to: '/approvals',
          icon: ShieldCheck,
          badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        },
      ],
    },
    {
      group: 'FINANCE',
      items: [
        { label: 'Transactions', to: '/transactions', icon: Receipt },
        { label: 'Spending Analytics', to: '/analytics', icon: BarChart3 },
        { label: 'Decision Receipts', to: '/receipts', icon: FileCheck2 },
      ],
    },
    {
      group: 'PREFERENCES',
      items: [
        { label: 'Spending Policies', to: '/spendguard', icon: Sliders },
        { label: 'Settings', to: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#E6EAE5] flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-[#E6EAE5] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#244B3A] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Coins className="w-4 h-4 text-[#C8DAC7]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#202923] flex items-center gap-1.5">
                AgentSpend
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EAF1E9] text-[#244B3A]">
                  AI
                </span>
              </span>
              <span className="text-[10px] text-[#78827B]">Research &bull; Approve &bull; Pay</span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider uppercase text-[#78827B]/80">
                {group.group}
              </div>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-[#EAF1E9] text-[#244B3A] font-semibold shadow-2xs'
                            : 'text-[#78827B] hover:bg-[#F7F8F6] hover:text-[#202923]'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                            item.badgeColor || 'bg-[#244B3A] text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* SpendGuard Live Banner */}
          <div className="mx-1 p-3 rounded-xl bg-[#F7F8F6] border border-[#E6EAE5]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#244B3A]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#27845B]" />
              <span>SpendGuard Active</span>
            </div>
            <p className="text-[11px] text-[#78827B] mt-1 leading-snug">
              Autonomous limit: <span className="font-semibold text-[#202923]">$4.50/item</span>. Human signature required.
            </p>
          </div>
        </div>

        {/* Bottom Sidebar: Help & User Profile */}
        <div className="p-4 border-t border-[#E6EAE5] space-y-3 bg-white">
          <Link
            to="/spendguard"
            className="flex items-center justify-between text-xs text-[#78827B] hover:text-[#202923] px-2 py-1.5 rounded-lg hover:bg-[#F7F8F6] transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Security & Policies</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          </Link>

          <div className="flex items-center gap-3 pt-2 border-t border-[#F0F3EF] px-1">
            <div className="w-8 h-8 rounded-full bg-[#244B3A] text-white text-xs font-bold flex items-center justify-center">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#202923] truncate">Alex Rivera</div>
              <div className="text-[10px] text-[#78827B] truncate">Procurement Admin</div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#27845B]" title="Active" />
          </div>
        </div>
      </aside>
    </>
  );
};
