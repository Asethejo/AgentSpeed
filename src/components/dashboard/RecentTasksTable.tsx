import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Task } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ChevronRight, ArrowUpRight, Plus, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RecentTasksTableProps {
  tasks: Task[];
}

export const RecentTasksTable: React.FC<RecentTasksTableProps> = ({ tasks }) => {
  const navigate = useNavigate();
  const { setCurrentTask } = useApp();

  const handleTaskClick = (task: Task) => {
    setCurrentTask(task);
    if (task.status === 'completed') {
      navigate('/results');
    } else if (task.status === 'analyzing') {
      navigate('/research');
    } else if (task.status === 'approving') {
      navigate('/approvals');
    } else {
      navigate('/recommendations');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAE5] shadow-sm overflow-hidden">
      <div className="p-5 border-b border-[#E6EAE5] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[#202923]">Recent Tasks</h2>
          <p className="text-xs text-[#78827B] mt-0.5">Autonomous resource procurement jobs</p>
        </div>
        <Link
          to="/tasks/new"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#244B3A] hover:text-[#1C3A2D] bg-[#EAF1E9] px-3 py-1.5 rounded-xl transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F3EF] bg-[#F7F8F6]/50 text-[11px] font-semibold text-[#78827B] uppercase tracking-wider">
              <th className="py-3 px-5">Task Objective</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Budget</th>
              <th className="py-3 px-4">Spent</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F3EF] text-xs">
            {tasks.slice(0, 5).map((task) => {
              const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              });

              return (
                <tr
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className="hover:bg-[#F7F8F6] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-[#202923] group-hover:text-[#244B3A] transition-colors line-clamp-1">
                      {task.title}
                    </div>
                    <div className="text-[11px] text-[#78827B] mt-0.5 line-clamp-1">
                      {task.prompt}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#78827B] whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-[#202923]">
                    ${task.budget.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#244B3A]">
                    ${(task.spentAmount || 0).toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={task.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#244B3A] group-hover:underline">
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-[#F0F3EF] bg-[#F7F8F6]/30 flex justify-center">
        <Link
          to="/tasks"
          className="text-xs font-semibold text-[#78827B] hover:text-[#202923] flex items-center gap-1 transition-colors"
        >
          <span>View all {tasks.length} tasks</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
