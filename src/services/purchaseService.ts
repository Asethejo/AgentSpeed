import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { Purchase, SpendGuardValidation } from '../types';

export const purchaseService = {
  async validateSpendGuard(payload: {
    taskId: string;
    resourceIds: string[];
  }): Promise<SpendGuardValidation> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<SpendGuardValidation>('/spendguard/validate', payload);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.validateSpendGuard(payload);
  },

  async getPurchases(params?: { taskId?: string; status?: string }): Promise<Purchase[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<Purchase[]>('/purchases', { params });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    let list = mockStorage.getPurchases();
    if (params?.taskId) {
      list = list.filter((p) => p.taskId === params.taskId);
    }
    if (params?.status) {
      list = list.filter((p) => p.status === params.status);
    }
    return list;
  },

  async createPurchases(payload: { taskId: string; resourceIds: string[] }): Promise<Purchase[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<Purchase[]>('/purchases', payload);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.createPurchasesForTask(payload.taskId, payload.resourceIds);
  },

  async approvePurchase(purchaseId: string, note?: string): Promise<Purchase> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<Purchase>(`/purchases/${purchaseId}/approve`, { note });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    const approved = mockStorage.approvePurchase(purchaseId, note);
    if (!approved) throw new Error(`Purchase ${purchaseId} not found`);
    return approved;
  },

  async rejectPurchase(purchaseId: string, reason: string): Promise<Purchase> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<Purchase>(`/purchases/${purchaseId}/reject`, { reason });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    const rejected = mockStorage.rejectPurchase(purchaseId, reason);
    if (!rejected) throw new Error(`Purchase ${purchaseId} not found`);
    return rejected;
  },
};
