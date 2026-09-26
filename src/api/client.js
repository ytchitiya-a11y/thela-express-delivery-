import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const syncDeliveryPartner = (payload) => api.post('/auth/delivery/sync', payload);
export const getAssignedOrders = () => api.get('/delivery/orders');
export const acceptOrder = (orderId) => api.post(`/delivery/orders/${orderId}/accept`);
export const rejectOrder = (orderId) => api.post(`/delivery/orders/${orderId}/reject`);
export const markPickedUp = (orderId) => api.post(`/delivery/orders/${orderId}/picked-up`);
export const markDelivered = (orderId) => api.post(`/delivery/orders/${orderId}/delivered`);
export const updateLocation = (lat, lng) => api.post('/delivery/location', { lat, lng });
export const toggleAvailability = (status) => api.post('/delivery/availability', { status });

export default api;
