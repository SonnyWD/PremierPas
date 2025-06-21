import axios from 'axios';

export const addPoints = async (token) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.post(`${apiUrl}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};