import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { DashboardSummary, Transaction, ActivityTimelineItem } from '../types';

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<DashboardSummary>('/dashboard/summary');
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.getDashboardSummary();
  },

  async getTransactions(): Promise<Transaction[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<Transaction[]>('/dashboard/transactions');
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.getTransactions();
  },

  async getTimeline(): Promise<ActivityTimelineItem[]> {
    return mockStorage.getTimeline();
  },
};
