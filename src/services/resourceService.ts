import { apiClient, isBackendConnected } from './api';
import { mockStorage } from './store';
import { Resource } from '../types';

export const resourceService = {
  async getResources(params?: { category?: string; search?: string; sort?: string }): Promise<Resource[]> {
    if (isBackendConnected()) {
      try {
        const res = await apiClient.get<Resource[]>('/resources', { params });
        return res.data;
      } catch (e) {
        console.warn('API error, falling back to mockStorage:', e);
      }
    }

    let list = mockStorage.getResources();
    if (params?.category && params.category !== 'All') {
      list = list.filter((r) => r.category === params.category);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.provider.toLowerCase().includes(q)
      );
    }
    if (params?.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (params?.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (params?.sort === 'quality') {
      list.sort((a, b) => b.qualityScore - a.qualityScore);
    } else if (params?.sort === 'suitability') {
      list.sort((a, b) => (b.suitabilityScore || 0) - (a.suitabilityScore || 0));
    }
    return list;
  },

  async getResource(resourceId: string): Promise<Resource> {
    const res = mockStorage.getResource(resourceId);
    if (!res) throw new Error(`Resource ${resourceId} not found`);
    return res;
  },
};
