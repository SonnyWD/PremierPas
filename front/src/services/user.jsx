import axios from 'axios';

export const fetchUserById = async (id) => {
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur par ID :", error.response?.data || error.message);
    throw error;
  }
};

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