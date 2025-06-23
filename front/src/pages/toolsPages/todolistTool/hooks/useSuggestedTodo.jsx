import { useState, useEffect } from "react";
import { fetchTodos } from "../../../../services/todoService";

export function useSuggestedTodos(activeTab) {
  const [suggestedTodos, setSuggestedTodos] = useState([]);
  const [loadingSuggested, setLoadingSuggested] = useState(false);
  const [errorSuggested, setErrorSuggested] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    if (activeTab === "suggere") {
      setLoadingSuggested(true);
      setErrorSuggested(null);
      fetchTodos()
        .then(data => {
          setSuggestedTodos(data);
          setLoadingSuggested(false);
          setSelectedTitle(data[0]?.title || "");
        })
        .catch(() => {
          setErrorSuggested("Erreur lors de la récupération des tâches suggérées.");
          setLoadingSuggested(false);
          setSuggestedTodos([]);
          setSelectedTitle("");
        });
    }
  }, [activeTab]);

  const activateSuggestedTodo = (taskIndex) => {
    setSuggestedTodos((prevTodos) =>
      prevTodos.map((group) => {
        if (group.title === selectedTitle) {
          const updatedTaches = [...group.taches];
          updatedTaches[taskIndex] = {
            ...updatedTaches[taskIndex],
            done: !updatedTaches[taskIndex].done,
          };
          return { ...group, taches: updatedTaches };
        }
        return group;
      })
    );
  };

  return {
    suggestedTodos,
    loadingSuggested,
    errorSuggested,
    selectedTitle,
    setSelectedTitle,
    activateSuggestedTodo
  };
}
