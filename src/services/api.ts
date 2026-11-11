import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Helper to determine if remote backend is actively responding
let isRemoteAvailable = false;

// Attempt an initial lightweight ping if base URL provided
if (API_BASE_URL) {
  apiClient.get('/health')
    .then(() => { isRemoteAvailable = true; })
    .catch(() => { isRemoteAvailable = false; });
}

export function isBackendConnected(): boolean {
  return isRemoteAvailable;
}
