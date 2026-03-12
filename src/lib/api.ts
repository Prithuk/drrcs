import { EmergencyRequest, DashboardStats } from '../types';
import { mockRequests } from './mockData';

// Mock API functions that will be replaced with actual API calls to Java Spring Boot backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const REQUESTS_STORAGE_KEY = 'drrcs_requests_store';

// Simulate network delay
const simulateDelay = () => delay(300);

const getStoredRequests = (): EmergencyRequest[] => {
  try {
    const stored = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as EmergencyRequest[];
    }
  } catch {
    // Fall back to seeded data
  }

  const seeded = [...mockRequests];
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(seeded));
  } catch {
    // Ignore storage write failures and continue in-memory
  }
  return seeded;
};

const saveStoredRequests = (requests: EmergencyRequest[]): void => {
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  } catch {
    // Ignore storage write failures in mock mode
  }
};

export const api = {
  // Authentication
  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    await simulateDelay();
    // Mock JWT token - replace with actual API call
    if (username && password) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          username,
          name: 'Admin User',
          role: 'admin'
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
    await simulateDelay();
    // Replace with actual API call
    localStorage.removeItem('auth_token');
  },

  // Emergency Requests
  async getRequests(): Promise<EmergencyRequest[]> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests`, { headers: { Authorization: `Bearer ${token}` } })
    return [...getStoredRequests()];
  },

  async getRequestById(id: string): Promise<EmergencyRequest | null> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    const requests = getStoredRequests();
    return requests.find(req => req.id === id) || null;
  },

  async createRequest(request: Omit<EmergencyRequest, 'id' | 'timestamp'>): Promise<EmergencyRequest> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests`, { method: 'POST', body: JSON.stringify(request) })
    const requests = getStoredRequests();
    const newRequest: EmergencyRequest = {
      ...request,
      id: `REQ-2026-${String(requests.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString()
    };
    requests.push(newRequest);
    saveStoredRequests(requests);
    return newRequest;
  },

  async updateRequest(id: string, updates: Partial<EmergencyRequest>): Promise<EmergencyRequest> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests/${id}`, { method: 'PUT', body: JSON.stringify(updates) })
    const requests = getStoredRequests();
    const index = requests.findIndex(req => req.id === id);
    if (index !== -1) {
      requests[index] = {
        ...requests[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveStoredRequests(requests);
      return requests[index];
    }
    throw new Error('Request not found');
  },

  async updateRequestStatus(id: string, status: string, notes?: string): Promise<EmergencyRequest> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }) })
    return this.updateRequest(id, { 
      status: status as any, 
      notes,
      ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {})
    });
  },

  async assignResources(id: string, resources: string[], assignedTo?: string): Promise<EmergencyRequest> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/requests/${id}/assign`, { method: 'PATCH', body: JSON.stringify({ resources, assignedTo }) })
    return this.updateRequest(id, {
      assignedResources: resources,
      assignedTo,
      status: 'assigned'
    });
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    await simulateDelay();
    // Replace with: fetch(`${API_BASE_URL}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } })
    const requests = getStoredRequests();
    const pending = requests.filter(r => r.status === 'pending').length;
    const inProgress = requests.filter(r => r.status === 'in-progress').length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const critical = requests.filter(r => r.priority === 'critical').length;

    return {
      totalRequests: requests.length,
      pendingRequests: pending,
      inProgressRequests: inProgress,
      completedRequests: completed,
      criticalRequests: critical,
      averageResponseTime: '24 min'
    };
  }
};
