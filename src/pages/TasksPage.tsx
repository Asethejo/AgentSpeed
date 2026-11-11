import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { taskService } from '../services/taskService';
import { Task } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { Plus, ArrowUpRight, Search, CheckSquare } from 'lucide-react';

export const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentTask } = useApp();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const list = await taskService.getTasks();
        setTasks(list);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleTaskClick = (task: Task) => {
    setCurrentTask(task);
    if (task.status === 'completed') {
      navigate('/results');
    } else if (task.status === 'analyzing') {
      navigate(`/research?taskId=${task.id}`);
    } else if (task.status === 'approving') {
      navigate('/approvals');
    } else {
      navigate('/recommendations');
    }
  };

  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              My Procurement Tasks
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF1E9] text-[#244B3A]">
              Autonomous Jobs
            </span>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Track and inspect your autonomous digital resource procurement tasks and results.
          </p>
        </div>

        <Link
          to="/tasks/new"
          className="px-4 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Procurement Task</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6EAE5] shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78827B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by objective, startup names, or prompt keywords..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F8F6] border border-[#E6EAE5] rounded-xl text-[#202923] placeholder-[#78827B] focus:outline-none focus:ring-1 focus:ring-[#78977D]"
          />
        </div>
      </div>

      {loading ? (
        <LoadingState title="Loading Tasks" />
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="bg-white p-5 rounded-2xl border border-[#E6EAE5] shadow-xs hover:border-[#78977D]/60 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.status} size="sm" />
                  <span className="text-[11px] text-[#78827B]">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#202923] hover:text-[#244B3A] transition-colors line-clamp-1">
                  {task.title}
                </h3>
                <p className="text-xs text-[#78827B] line-clamp-1">{task.prompt}</p>
              </div>

              <div className="flex items-center gap-6 shrink-0 self-end sm:self-auto">
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-[#202923]">
                    Spent: <span className="text-[#244B3A]">${(task.spentAmount || 0).toFixed(2)}</span> / ${task.budget.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-[#78827B]">
                    {task.resourcesEvaluated} evaluated &bull; {task.resourcesRecommended} chosen
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#244B3A]">
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
