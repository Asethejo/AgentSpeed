import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Task, DashboardSummary, SpendingPolicySettings } from '../types';
import { dashboardService } from '../services/dashboardService';
import { taskService } from '../services/taskService';
import { mockStorage } from '../services/store';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface AppContextValue {
  currentTask: Task | null;
  setCurrentTask: (task: Task | null) => void;
  selectTaskById: (taskId: string) => Promise<Task | null>;
  summary: DashboardSummary | null;
  settings: SpendingPolicySettings;
  updateSettings: (newSettings: Partial<SpendingPolicySettings>) => void;
  refreshDashboard: () => Promise<void>;
  pendingApprovalsCount: number;
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [settings, setSettingsState] = useState<SpendingPolicySettings>(mockStorage.getSettings());
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState<number>(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: Toast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    const duration = toast.duration ?? 4500;
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshDashboard = useCallback(async () => {
    try {
      const sum = await dashboardService.getSummary();
      setSummary(sum);
      setPendingApprovalsCount(sum.pendingApprovalsCount);
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
    }
  }, []);

  const selectTaskById = useCallback(async (taskId: string): Promise<Task | null> => {
    try {
      const task = await taskService.getTask(taskId);
      setCurrentTask(task);
      return task;
    } catch (err) {
      console.error('Failed to select task:', err);
      return null;
    }
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SpendingPolicySettings>) => {
    const updated = mockStorage.updateSettings(newSettings);
    setSettingsState(updated);
    showToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Spending policies updated successfully.',
    });
  }, [showToast]);

  useEffect(() => {
    refreshDashboard();
    // Default select latest task
    const tasks = mockStorage.getTasks();
    if (tasks.length > 0) {
      setCurrentTask(tasks[0]);
    }
  }, [refreshDashboard]);

  return (
    <AppContext.Provider
      value={{
        currentTask,
        setCurrentTask,
        selectTaskById,
        summary,
        settings,
        updateSettings,
        refreshDashboard,
        pendingApprovalsCount,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
