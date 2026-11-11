import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { DecisionReceipt } from '../types';

export const receiptService = {
  async getReceipt(receiptId: string): Promise<DecisionReceipt> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<DecisionReceipt>(`/purchases/${receiptId}/receipt`);
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }

    const receipt = mockStorage.getReceipt(receiptId);
    if (receipt) return receipt;

    // Check if it's a task ID or if we can generate one
    return mockStorage.generateReceiptForTask(receiptId);
  },

  async generateTaskReceipt(taskId: string): Promise<DecisionReceipt> {
    return mockStorage.generateReceiptForTask(taskId);
  },
};
