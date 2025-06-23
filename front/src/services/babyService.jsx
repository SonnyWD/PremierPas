import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchBabyData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/baby/me`.replace(/([^:]\/)\/+/g, '$1'), {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch(error) {
        console.log("Erreur lors de la récupération des datas du bébé", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const createBaby = async (payload) => {
  const response = await axios.post(
    `${apiUrl}/baby`,
    payload,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};

export const createBabyMeasure = async (payload) => {
  const response = await axios.post(
    `${apiUrl}/baby-measures`,
    payload,
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};

export const upsertBaby = async (payload) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`
    };
console.log("Payload envoyé à /baby :", payload); 
    const res = await axios.post(`${apiUrl}/baby`, payload, { headers });
    return res.data;
  } catch (err) {
    if (
      err.response?.status === 400 &&
      err.response.data?.message?.includes('déjà associé')
    ) {
      const baby = await fetchBabyData();  
      return baby;
    }
    throw err;
  }
};
