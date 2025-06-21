import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchBabyData = async (babyId) => {
    if (!babyId) { 
        throw new Error("L'ID du bébé est nécessaire pour récupérer les données.");
    }
    try {
        const response = await axios.get(`${apiUrl}/baby/${babyId}`.replace(/([^:]\/)\/+/g, '$1'), {
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