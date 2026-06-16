import api from '../client';

export const propertyEndpoints = {
  getAll: (params) => api.get('/api/properties', { params }),
  getById: (id) => api.get(`/api/properties/${id}`),
  create: (data) => api.post('/api/properties', data),
  update: (id, data) => api.put(`/api/properties/${id}`, data),
  delete: (id) => api.delete(`/api/properties/${id}`),
  getMyProperties: () => api.get('/api/properties/my/properties'),
  getStats: () => api.get('/api/properties/my/stats'),
};