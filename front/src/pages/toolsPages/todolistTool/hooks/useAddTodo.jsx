import { useState } from "react";
import { addTodos } from "../../../services/todoService";

export function useAddTodo(setTodos) {
  const [addingTodo, setAddingTodo] = useState(false);

  const handleAddNewTodo = async ( newTaskText, categorie) => {
    setAddingTodo(true);
    try {
          const newTodo = await addTodos(newTaskText, categorie);
          if (setTodos) {
        setTodos(prevTodos => {
          const updatedTodos = [...prevTodos, newTodo];
          return updatedTodos;
        });
      }
          return newTodo;
         } 
         catch (err) {
          throw err; 
        } 
        finally {
           setAddingTodo(false);
        }
  };
  return { handleAddNewTodo, addingTodo };
  
}