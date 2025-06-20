import axios from "axios";

const API_URL = "http://localhost:3000";
const getToken = () => localStorage.getItem("token");

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos/suggested`, {
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
    const response = await axios.get(`${API_URL}/todos/user`, {
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
    
    const response = await axios.post(`${API_URL}/todos/custom`, todoData, {
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
    const response = await axios.delete(`${API_URL}/todos/${id}`, {
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