import axios from "axios";

const API_URL = "http://localhost:3000";
const getToken = () => localStorage.getItem("token");

export const fetchPregnancy = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("Token d'authentification manquant");
    }
    try {
        const response = await axios.get(`${API_URL}/pregnancy/active`, {
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