import { useState } from "react"
import { deleteTodo } from "../../../../services/todoService"

export function useDeleteTodo(setTodos){
    const [deletingTodo, setDeletingTodo] = useState(false);

    const handleDeleteTodo = async (id) => {
        setDeletingTodo(true);
        try {
             await deleteTodo(id);
            setTodos(prevTodos => {
                const updatedTodos = prevTodos.filter(todo => todo.id !== id)
                return updatedTodos;
            });

    }
    catch(error) {
        throw error;
    }
    finally {
        setDeletingTodo(false);
    }
}
    return { handleDeleteTodo, deletingTodo}
}