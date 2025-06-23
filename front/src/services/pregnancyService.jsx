import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchPregnancy = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("Token d'authentification manquant");
    }
    try {
        const response = await axios.get(`${apiUrl}/pregnancy/active`.replace(/([^:]\/)\/+/g, '$1'), {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch(error) {
        console.log(
            "Erreur lors de la récupération de la grossesse", 
            error.response ? error.response.data : error.message);
        throw error;
    }
}

export const createPregnancy = async (payload) => {
  const response = await axios.post(
    `${apiUrl}/pregnancy`.replace(/([^:]\/)\/+/g, "$1"),
    payload,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};

export const updatePregnancy = async (pregnancyId, payload) => {
  const response = await axios.patch(
    `${apiUrl}/pregnancy/${pregnancyId}`.replace(/([^:]\/)\/+/g, "$1"),
    payload,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};