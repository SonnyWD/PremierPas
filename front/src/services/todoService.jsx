import axios from "axios";

const API_URL = "http://localhost:3000";
const getToken = () => localStorage.getItem("token");

export const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/todo-list`, {
        headers: {
      Authorization: `Bearer ${getToken()}`
    }
    });
    return response.data;
}