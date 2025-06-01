import { useState } from "react";
import Btn from "../../../components/btn";
import Input from "../../../components/input"; 
import TodoItem from "./components/todoItem";
import AddTodoForm from "./components/addTodoForm";
import { useTodos } from "./useTodos";
import useTodoActions from "./components/useTodoActions";


const suggestedTodosData = [
  { id: 'sugg-1', title: 'Faire les courses', categorie: 'Maison', locked: false },
  { id: 'sugg-2', title: 'Nettoyer la salle de bain', categorie: 'Maison', locked: false },
  { id: 'sugg-3', title: 'Préparer le dîner', categorie: 'Maison', locked: false },
  { id: 'sugg-4', title: 'Sortir les poubelles', categorie: 'Maison', locked: false },
  { id: 'sugg-5', title: 'Arroser les plantes', categorie: 'Maison', locked: false },
  { id: 'sugg-6', title: 'Ranger le salon', categorie: 'Maison', locked: false },
  { id: 'sugg-7', title: 'Laver le linge', categorie: 'Maison', locked: false },
  { id: 'sugg-8', title: 'Organiser les placards', categorie: 'Maison', locked: true }
];

function TodosList() {
  const { todos, loading, error, setTodos } = useTodos();
  const [activeTab, setActiveTab] = useState('suggere');

  const {
    isDeleting,
    selectedTodoIds,
    deletingTodo,
    toggleEditingMode,
    handleToggleTodoSelection,
    handleConfirmDelete,
  } = useTodoActions(todos, setTodos);

  if (loading) {
    return <p className="text-center py-8 text-gray-700">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">{error}</p>;
  }

  const displayedTodos = activeTab === 'suggere' ? suggestedTodosData : todos;

  return (
    <div className="bg-white min-h-screen sm:p-6 md:p-8 flex flex-col pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-3 mb-6">
        <h1 className="font-black text-2xl sm:text-3xl text-gray-800 mb-4 sm:mb-0">Mes Tâches</h1>
        <Btn
          type="button"
          className="ml-4 px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition duration-200"
          onClick={toggleEditingMode}
        >
          {isDeleting ? "Terminer" : "Modifier"}
        </Btn>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('suggere')}
          className={`px-6 py-2 rounded-l-lg border ${activeTab === 'suggere' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50' } font-semibold transition duration-200`}
        >
          Conseillé
        </button>
        <button
          onClick={() => setActiveTab('personnalise')}
          className={`px-6 py-2 rounded-r-lg border ${activeTab === 'personnalise' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50' } font-semibold transition duration-200`}
        >
          Mes Tâches
        </button>
      </div>

      {activeTab === 'personnalise' && (
        <div className="flex-grow bg-white">
          <AddTodoForm
            setTodos={setTodos} 
          />

          <ul key="personnalise-tab-content" className="space-y-3 mt-4">
            {todos.length > 0 && (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isEditing={isDeleting} 
                  isSelected={selectedTodoIds.includes(todo.id)} 
                  onToggleSelection={handleToggleTodoSelection} 
                />
              ))
            )}
          </ul>

          {isDeleting && todos.length > 0 && (
            <div className="flex justify-center mt-6">
              <Btn
                type="button"
                className={`px-6 py-2 rounded-lg font-semibold shadow-md transition duration-300 ease-in-out
                  ${selectedTodoIds.length > 0 ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
                onClick={handleConfirmDelete}
                disabled={deletingTodo}
              >
                {deletingTodo ? "Suppression..." : (selectedTodoIds.length > 0 ? `Supprimer les (${selectedTodoIds.length}) tâches` : "Tout Supprimer")}
              </Btn>
            </div>
          )}
        </div>
      )}

      {activeTab === 'suggere' && (
        <ul key="suggere-tab-content" className="space-y-3">
          {displayedTodos.length > 0 && (
            displayedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={false} 
                isSelected={false} 
                onToggleSelection={() => {}} 
              />
            ))
          )}
        </ul>
      )}

    </div>
  );
}

export default TodosList;