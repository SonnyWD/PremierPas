import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const getToken = () => localStorage.getItem("token");

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${apiUrl}/todos/suggested`, {
      headers: {
      Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch(error) {
    console.error("Erreur lors de la récupération des tâches", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const fetchTodosPersonalized = async () => {
  try {
    const response = await axios.get(`${apiUrl}/todos/user`, {
      headers: {
      Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch(error) {
    console.error("Erreur lors de la récupération des tâches", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const addTodos = async (title, categorie) => { 
  try {
    const todoData = { title, categorie }; 
    
    const response = await axios.post(`${apiUrl}/todos/custom`, todoData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const deleteTodo = async(id) => {
  try {
    const response = await axios.delete(`${apiUrl}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche", error.response ? error.response.data : error.message);
    throw error;
  }
}