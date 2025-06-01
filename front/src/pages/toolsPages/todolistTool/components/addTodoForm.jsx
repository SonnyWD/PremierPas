import { useAddTodo } from "../useAddTodo";
import { categories } from "../constants"; 
import Input from "../../../../components/input";
import { useState } from "react";

function AddTodoForm({ setTodos}) {
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("Maison");

  const { handleAddNewTodo, addingTodo } = useAddTodo(setTodos);

  const handleSubmitTodo = async (e) => {
    e.preventDefault();

    if (!newTaskText.trim()) {
      return;
    }

    try {
      await handleAddNewTodo(newTaskText, selectedCategory);
      setNewTaskText('');
      setSelectedCategory('Maison');
    } catch (error) {
        throw error;
    }
  };

  return (
    <form onSubmit={handleSubmitTodo} className="bg-white p-4 pl-0 flex items-center gap-2">
      <Input
        placeholder="Ajouter une Tâche..."
        type="text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmitTodo(e);
          }
        }}
        className="border-gray-300 rounded-none"
      />

      <select
        name="category"
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white min-w-[100px]"
      >
        {categories.map((categoryItem) => (
          <option key={categoryItem} value={categoryItem}>
            {categoryItem}
          </option>
        ))}
      </select>
    </form>
  );
}

export default AddTodoForm;