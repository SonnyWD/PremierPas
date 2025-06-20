import { useEffect, useState } from "react";
import { fetchTodos, fetchTodosPersonalized } from "../../../../services/todoService";
import { useUser } from "../../../../context/userContext";  
import { premiumContents } from "../constants"; 

export function useTodos() {
  const [suggestedTodos, setSuggestedTodos] = useState([]);
  const [personalizedTodos, setPersonalizedTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, userLoading } = useUser();

  useEffect(() => {
    if (userLoading) return;

    const fetchAll = async () => {
      try {
        const [suggested, personalized] = await Promise.all([
          fetchTodos(),
          fetchTodosPersonalized()
        ]);

        const suggestedWithLock = suggested.map(todo => ({
          ...todo,
          locked: premiumContents.includes(todo.title) && !(user?.isPremium === true),
        }));

        setSuggestedTodos(suggestedWithLock);
        setPersonalizedTodos(personalized);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des tâches.");
        setLoading(false);
      }
    };

    fetchAll();
  }, [user, userLoading]);

  return {
    suggestedTodos,
    personalizedTodos,
    loading,
    error,
    setSuggestedTodos,
    setPersonalizedTodos
  };
}
