import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { taskService } from '../services/taskService';
import { Task } from '../types';
import {
  Sparkles,
  Search,
  Database,
  BarChart2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ArrowRight,
  BrainCircuit,
  Filter,
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  title: string;
  explanation: string;
  icon: any;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: 'Understanding Task Semantics',
    explanation: 'Decomposing natural language prompt into required factual domains and metrics.',
    icon: BrainCircuit,
  },
  {
    id: 2,
    title: 'Identifying Required Digital Resources',
    explanation: 'Determining exact asset archetypes (cap table dataset, real-time momentum API).',
    icon: Database,
  },
  {
    id: 3,
    title: 'Searching Global Resource Catalog',
    explanation: 'Querying 500+ verified provider endpoints across datasets, feeds, and reports.',
    icon: Search,
  },
  {
    id: 4,
    title: 'Evaluating Resource Quality & Freshness',
    explanation: 'Scoring data completeness, schema validity, and update frequency.',
    icon: BarChart2,
  },
  {
    id: 5,
    title: 'Comparing Prices & Unit Economics',
    explanation: 'Auditing single-item costs against historical benchmarks and peer pricing.',
    icon: DollarSign,
  },
  {
    id: 6,
    title: 'Optimizing Budget Allocation',
    explanation: 'Maximizing informational gain while guaranteeing surplus reserve within budget ceiling.',
    icon: Filter,
  },
  {
    id: 7,
    title: 'SpendGuard Policy Verification',
    explanation: 'Simulating 6 financial firewall checks: single-item cap, vendor whitelist, duplicate protection.',
    icon: ShieldCheck,
  },
];

export const ResearchWorkspacePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentTask, selectTaskById } = useApp();

  const taskId = searchParams.get('taskId') || currentTask?.id;
  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskData, setTaskData] = useState<Task | null>(currentTask);

  useEffect(() => {
    if (taskId && (!taskData || taskData.id !== taskId)) {
      selectTaskById(taskId).then((t) => {
        if (t) setTaskData(t);
      });
    }
  }, [taskId, taskData, selectTaskById]);

  useEffect(() => {
    // Step progression animation
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= 7) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsCompleted(true);
        if (taskId) {
          taskService.analyzeTask(taskId);
        }
      }
    }, 900);

    return () => clearInterval(interval);
  }, [taskId]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E6EAE5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#244B3A] animate-pulse" />
            <h1 className="text-xl font-black text-[#202923] tracking-tight">
              AgentSpend is analyzing your task.
            </h1>
          </div>
          <p className="text-xs text-[#78827B] mt-1">
            Autonomous multi-stage resource discovery and SpendGuard validation in progress.
          </p>
        </div>

        {taskData && (
          <div className="text-left sm:text-right bg-[#F7F8F6] sm:bg-transparent p-3 sm:p-0 rounded-2xl">
            <span className="text-[10px] uppercase font-semibold text-[#78827B]">Task Budget</span>
            <div className="font-mono text-base font-bold text-[#202923]">
              ${taskData.budget.toFixed(2)} USD
            </div>
          </div>
        )}
      </div>

      {/* Objective Card */}
      {taskData && (
        <div className="p-4 rounded-2xl bg-[#EAF1E9]/50 border border-[#C8DAC7] text-xs">
          <span className="font-bold uppercase tracking-wider text-[#244B3A]">Objective:</span>
          <p className="text-[#202923] font-medium mt-0.5">{taskData.prompt}</p>
        </div>
      )}

      {/* Vertical Workflow Stepper */}
      <div className="bg-white rounded-3xl border border-[#E6EAE5] shadow-xs p-6 sm:p-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#78827B] mb-6">
          7-Stage Autonomous AI Workflow
        </h2>

        <div className="space-y-4 relative before:content-[''] before:absolute before:top-4 before:bottom-4 before:left-[19px] before:w-0.5 before:bg-[#E6EAE5]">
          {WORKFLOW_STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = isCompleted || step.id < activeStep;
            const isCurrent = !isCompleted && step.id === activeStep;
            const isUpcoming = !isCompleted && step.id > activeStep;

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Step Icon Badge */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                    isDone
                      ? 'bg-[#244B3A] text-white border-[#244B3A]'
                      : isCurrent
                      ? 'bg-[#EAF1E9] text-[#244B3A] border-[#78977D] ring-2 ring-[#78977D]/20 animate-pulse'
                      : 'bg-[#F7F8F6] text-stone-400 border-[#E6EAE5]'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-[#C8DAC7]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-[#244B3A] animate-spin" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Details */}
                <div
                  className={`flex-1 p-4 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#F7F8F6] border-[#C8DAC7] shadow-xs'
                      : isDone
                      ? 'bg-white border-[#E6EAE5]'
                      : 'bg-stone-50/50 border-[#E6EAE5] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#202923] flex items-center gap-2">
                      <span>
                        {step.id}. {step.title}
                      </span>
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-[#EAF1E9] text-[#244B3A]'
                          : isCurrent
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {isDone ? 'Completed' : isCurrent ? 'Analyzing...' : 'Queued'}
                    </span>
                  </div>
                  <p className="text-xs text-[#78827B] mt-1 leading-relaxed">
                    {step.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Action CTA */}
        {isCompleted && (
          <div className="mt-8 p-5 rounded-2xl bg-[#EAF1E9] border border-[#C8DAC7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div>
              <h4 className="text-xs font-bold text-[#244B3A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#78977D]" />
                <span>AI Procurement Plan Ready</span>
              </h4>
              <p className="text-xs text-[#202923] mt-0.5">
                Evaluated 8 candidate resources. 2 optimal assets selected ($7.00 total) within
                $10.00 budget ceiling.
              </p>
            </div>

            <button
              onClick={() => navigate('/recommendations')}
              className="px-5 py-2.5 bg-[#244B3A] hover:bg-[#1C3A2D] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Review AI Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
