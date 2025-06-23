import { useEffect, useState } from "react";
import { fetchTodosPersonalized } from "../../../../services/todoService";
import { useUser } from "../../../../context/userContext";  
import { useSuggestedTodos } from "./useSuggestedTodo";

export function useTodos(activeTab) {
  const {
    suggestedTodos,
    loadingSuggested,
    errorSuggested,
    selectedTitle: selectedSuggestedTitle,
    setSelectedTitle: setSelectedSuggestedTitle,
    activateSuggestedTodo
  } = useSuggestedTodos(activeTab);

  const [personalizedTodos, setPersonalizedTodos] = useState([]);
  const [loadingPersonalized, setLoadingPersonalized] = useState(false);
  const [errorPersonalized, setErrorPersonalized] = useState(null);

  const { user, userLoading } = useUser();

  useEffect(() => {
    if (userLoading || activeTab !== "personnalise") return;

    setLoadingPersonalized(true);

    const fetchPersonalized = async () => {
      try {
        const personalized = await fetchTodosPersonalized();
        setPersonalizedTodos(personalized);
        setLoadingPersonalized(false);
      } catch (err) {
        setErrorPersonalized("Erreur lors du chargement des tâches personnalisées.");
        setLoadingPersonalized(false);
      }
    };

    fetchPersonalized();
  }, [user, userLoading, activeTab]);

  const togglePersonalizedTodoComplete = (taskId, done) => {
    console.log("TOGGLE", taskId, done);
    setPersonalizedTodos((prev) =>
      prev.map((group) => ({
        ...group,
        taches: group.taches.map((t) =>
          t.id === taskId ? { ...t, done } : t
        ),
      }))
    );
  };

  const loading =
    userLoading ||
    (activeTab === "suggere" ? loadingSuggested : loadingPersonalized);

  const error =
    activeTab === "suggere" ? errorSuggested : errorPersonalized;

  return {
    suggestedTodos,
    selectedSuggestedTitle,
    setSelectedSuggestedTitle,
    activateSuggestedTodo,
    personalizedTodos,
    setPersonalizedTodos,
    togglePersonalizedTodoComplete,
    loading,
    error,
  };
}
