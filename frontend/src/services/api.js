// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getAllDishes = async () => {
  const response = await API.get('/dishes');
  return response.data;
};

export const getOrders = async () => {
  const response = await API.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await API.patch(`/orders/${orderId}/status`, { status });
  return response.data;
};