// src/lib/api.ts
// API configuration and utility functions for PawAdopt frontend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pawadopt-backend-1.onrender.com';

// Generic API call function
export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if exists
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================
// ============================
// ORDERS API
// ============================
export const ordersAPI = {
  create: async (orderData: any) => {
    return apiCall('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiCall('/api/orders', { method: 'GET' });
  },
};

// AUTH API
// ============================
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string; role?: string }) => {
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: { email: string; password: string }) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  },
};

// ============================
// PAYMENT API
// ============================
export const paymentAPI = {
  createOrder: async (orderData: { amount: number }) => {
    return apiCall('/api/payment/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },
};

// ============================
// USERS API
// ============================
export const usersAPI = {
  getAll: async () => {
    return apiCall('/api/users', { method: 'GET' });
  },

  getById: async (id: string) => {
    return apiCall(`/api/users/${id}`, { method: 'GET' });
  },
};

// ============================
// PETS API
// ============================
export const petsAPI = {
  getAll: async () => {
    return apiCall('/api/pets', { method: 'GET' });
  },

  getById: async (id: string) => {
    return apiCall(`/api/pets/${id}`, { method: 'GET' });
  },

  create: async (petData: any) => {
    return apiCall('/api/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  },

  update: async (id: string, petData: any) => {
    return apiCall(`/api/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
  },

  delete: async (id: string) => {
    return apiCall(`/api/pets/${id}`, { method: 'DELETE' });
  },
};

// ============================
// PRODUCTS API
// ============================
export const productsAPI = {
  getAll: async () => apiCall('/api/products', { method: 'GET' }),
  getById: async (id: string) => apiCall(`/api/products/${id}`, { method: 'GET' }),
  create: async (data: any) => apiCall('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: string, data: any) => apiCall(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: string) => apiCall(`/api/products/${id}`, { method: 'DELETE' }),
};

// ============================
// ADMIN API
// ============================
export const adminAPI = {
  getStats: async () => apiCall('/api/admin/stats', { method: 'GET' }),
  getUsers: async () => apiCall('/api/admin/users', { method: 'GET' }),
};
