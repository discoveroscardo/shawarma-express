import axios from 'axios';

const API_BASE = 'https://tenfe.onrender.com/api/menu'; // usa tu backend desplegado

export const getAllDishes = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Error fetching dishes:', err);
    throw err;
  }
};
