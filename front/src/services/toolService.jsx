import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchTools = async () => {
  const response = await axios.get(`${apiUrl}/tools`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const fetchFavoriteTools = async () => {
  const response = await axios.get(`${apiUrl}/users/me/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const addFavoriteTool = async (toolId) => {
  await axios.post(
    `${apiUrl}/users/me/favorites`,
    { toolId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

export const removeFavoriteTool = async (toolId) => {
  await axios.delete(`${apiUrl}/users/me/favorites/${toolId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
