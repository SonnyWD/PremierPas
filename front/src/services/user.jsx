import axios from 'axios';

export const addPoints = async (token) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const url = `${apiUrl}`.replace(/([^:]\/)\/+/g, '$1');

  try {
    const response = await axios.post(`${url}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};