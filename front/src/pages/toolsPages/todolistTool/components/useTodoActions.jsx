import { useState } from 'react';
import { useDeleteTodo } from '../useDeleteTodo';

function useTodoActions(todos, setTodos) {
  const [isDeleting, setIsDeleting] = useState(false); 
  const [selectedTodoIds, setSelectedTodoIds] = useState([]); 

  const { handleDeleteTodo, deletingTodo } = useDeleteTodo(setTodos);

  const toggleEditingMode = () => {
    setIsDeleting(prev => !prev);
    setSelectedTodoIds([]); 
  };

  const handleToggleTodoSelection = (id) => {
    setSelectedTodoIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(prevId => prevId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleConfirmDelete = async () => {
    if (deletingTodo) return; 

    try {
      if (selectedTodoIds.length === 0) {

        const allTodoIds = todos.map(todo => todo.id);
        const deletePromises = allTodoIds.map(id => handleDeleteTodo(id));
        await Promise.all(deletePromises);

      } else {

        const deletePromises = selectedTodoIds.map(id => handleDeleteTodo(id));
        await Promise.all(deletePromises);
      }

      toggleEditingMode();
    } catch (error) {
      console.error("Erreur lors de la suppression groupée:", error);
    }
  };

  return {
    isDeleting,
    selectedTodoIds,
    deletingTodo,
    toggleEditingMode,
    handleToggleTodoSelection,
    handleConfirmDelete,
  };
}

export default useTodoActions;