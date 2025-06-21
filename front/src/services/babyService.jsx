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