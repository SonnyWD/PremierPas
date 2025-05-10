import axios from "axios";

const API_URL = "http://localhost:3000";
const getToken = () => localStorage.getItem("token");

export const fetchTools = async () => {
  const response = await axios.get(`${API_URL}/tools`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const fetchFavoriteTools = async () => {
  const response = await axios.get(`${API_URL}/users/me/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const addFavoriteTool = async (toolId) => {
  await axios.post(
    `${API_URL}/users/me/favorites`,
    { toolId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

export const removeFavoriteTool = async (toolId) => {
  await axios.delete(`${API_URL}/users/me/favorites/${toolId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
