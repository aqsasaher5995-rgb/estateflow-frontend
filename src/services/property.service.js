import api from './api';

export const propertyService = {
  getAllProperties: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/properties${params ? `?${params}` : ''}`);
    return response.data;
  },

  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  getMyProperties: async () => {
    const response = await api.get('/properties/my/properties');
    return response.data;
  },

  getPropertyStats: async () => {
    const response = await api.get('/properties/my/stats');
    return response.data;
  },
};