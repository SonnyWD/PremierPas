import { useEffect, useState } from "react";
import { fetchTodos } from "../../../services/todoService" 
import { useUser } from "../../../context/userContext";  
import { premiumContents } from "./constants"; 

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userLoading } = useUser();

  useEffect(() => {
    if (userLoading) {
      return;
    }

    const fetchAllTodos = async () => {
      try {
        const allTodos = await fetchTodos();

        const todosWithLockStatus = allTodos.map(todo => ({
          ...todo,
          locked: premiumContents.includes(todo.title) && !(user?.isPremium === true),
        }));

        setTodos(todosWithLockStatus);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des tâches.');
        setLoading(false);
      }
    };

    fetchAllTodos();

  }, [user, userLoading]);

  return { todos, loading, error, setTodos }; 
}