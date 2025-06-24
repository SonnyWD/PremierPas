import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

const cleanUrl = (url) => `${apiUrl}${url}`.replace(/([^:]\/)\/+/g, "$1");

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

export const fetchBabyData = async () => {
  try {
    const response = await axios.get(cleanUrl("/baby/me"), {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des datas du bébé",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createBaby = async (payload) => {
  const response = await axios.post(
    cleanUrl("/baby"),
    payload,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const createBabyMeasure = async (payload) => {
  const response = await axios.post(
    cleanUrl("/baby-measures"),
    payload,
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const upsertBaby = async (payload) => {
  try {
    const response = await axios.post(
      cleanUrl("/baby"),
      payload,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (err) {
    if (
      err.response?.status === 400 &&
      err.response.data?.message?.includes("déjà associé")
    ) {
      return await fetchBabyData();
    }
    throw err;
  }
};
