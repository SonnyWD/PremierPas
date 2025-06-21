import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchTools = async () => {
  const response = await axios.get(`${apiUrl}/tools`.replace(/([^:]\/)\/+/g, '$1'), {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const fetchFavoriteTools = async () => {
  const response = await axios.get(`${apiUrl}/users/me/favorites`.replace(/([^:]\/)\/+/g, '$1'), {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};

export const addFavoriteTool = async (toolId) => {
  await axios.post(
    `${apiUrl}/users/me/favorites`.replace(/([^:]\/)\/+/g, '$1'),
    { toolId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};

export const removeFavoriteTool = async (toolId) => {
  await axios.delete(`${apiUrl}/users/me/favorites/${toolId}`.replace(/([^:]\/)\/+/g, '$1'), {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};
