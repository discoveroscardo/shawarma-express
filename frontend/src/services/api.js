// frontend/src/services/api.js (Corregido)
import axios from 'axios';

const API_BASE = process.env.BACKEND_URL || 'https://shawarma-express.onrender.com/api';

export const getOrders = async () => {
  const response = await axios.get(`${API_BASE}/orders`);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axios.put(`${API_BASE}/orders/${orderId}`, { status });
  return response.data;
};