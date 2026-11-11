import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { Purchase } from '../types';

export const paymentService = {
  async createPayPalOrder(purchaseId: string): Promise<{ orderId: string; amount: number; currency: string }> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<{ orderId: string; amount: number; currency: string }>(
          '/paypal/create-order',
          { purchaseId }
        );
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.createPayPalOrder(purchaseId);
  },

  async capturePayPalOrder(orderId: string, purchaseId: string): Promise<{
    success: boolean;
    captureId: string;
    purchase: Purchase;
  }> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.post<{
          success: boolean;
          captureId: string;
          purchase: Purchase;
        }>('/paypal/capture-order', { orderId, purchaseId });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }
    return mockStorage.capturePayPalOrder(orderId, purchaseId);
  },
};
