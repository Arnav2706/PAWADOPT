// src/lib/api.ts
// API configuration and utility functions for PawAdopt frontend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://pawadopt-backend.onrender.com';

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
    
    // Handle empty responses
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return null;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
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
// ADOPTION API
// ============================
export const adoptionAPI = {
  create: async (adoptionData: {
    petId: string;
    userName: string;
    userEmail: string;
    message: string;
    status?: string;
  }) => {
    return apiCall('/api/adoption/request', {
      method: 'POST',
      body: JSON.stringify({
        ...adoptionData,
        status: adoptionData.status || 'Pending',
      }),
    });
  },

  getAll: async () => {
    return apiCall('/api/adoption', { method: 'GET' });
  },

  updateStatus: async (id: string, status: 'Approved' | 'Rejected' | 'Pending') => {
    return apiCall(`/api/adoption/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};


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

// ============================
// PRODUCTS API
// ============================
export const productsAPI = {
  getAll: async () => apiCall('/api/products', { method: 'GET' }),
  
  getById: async (id: string) => apiCall(`/api/products/${id}`, { method: 'GET' }),
  
  create: async (data: any) => apiCall('/api/products', { 
    method: 'POST', 
    body: JSON.stringify(data) 
  }),
  
  update: async (id: string, data: any) => apiCall(`/api/products/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(data) 
  }),
  
  delete: async (id: string) => apiCall(`/api/products/${id}`, { 
    method: 'DELETE' 
  }),
};

// ============================
/

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

