import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { Task, Recommendation } from '../types';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<Task[]>('/tasks');
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.getTasks();
  },

  async getTask(taskId: string): Promise<Task> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<Task>(`/tasks/${taskId}`);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    const task = mockStorage.getTask(taskId);
    if (!task) throw new Error(`Task ${taskId} not found`);
    return task;
  },

  async createTask(payload: {
    prompt: string;
    budget: number;
    currency?: string;
    maxIndividualPurchase?: number;
    dailyCap?: number;
    allowedCategories?: string[];
    blockedProviders?: string[];
    requireApproval?: boolean;
  }): Promise<Task> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<Task>('/tasks', payload);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: payload.prompt.length > 70 ? payload.prompt.substring(0, 67) + '...' : payload.prompt,
      prompt: payload.prompt,
      budget: payload.budget,
      currency: payload.currency || 'USD',
      maxIndividualPurchase: payload.maxIndividualPurchase || 4.50,
      dailyCap: payload.dailyCap || 25.00,
      allowedCategories: (payload.allowedCategories as any) || ['Datasets', 'APIs', 'Research reports', 'Industry insights'],
      blockedProviders: payload.blockedProviders || [],
      requireApproval: payload.requireApproval ?? true,
      status: 'analyzing',
      createdAt: new Date().toISOString(),
      spentAmount: 0.00,
      resourcesEvaluated: 8,
      resourcesRecommended: 2,
    };

    return mockStorage.addTask(newTask);
  },

  async analyzeTask(taskId: string): Promise<{ status: string; stepsCompleted: number }> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<{ status: string; stepsCompleted: number }>(`/tasks/${taskId}/analyze`);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }

    mockStorage.updateTask(taskId, { status: 'recommended' });
    return { status: 'completed', stepsCompleted: 7 };
  },

  async getRecommendations(taskId: string): Promise<Recommendation[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<Recommendation[]>(`/tasks/${taskId}/recommendations`);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }

    const task = mockStorage.getTask(taskId);
    if (!task) throw new Error('Task not found');
    return mockStorage.getRecommendationsForTask(task);
  },
};
