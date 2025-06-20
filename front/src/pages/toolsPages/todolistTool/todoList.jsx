import { useState, useEffect } from "react";
import Bell from "../../../components/bell";
import SelectWithIcon from "./components/select";
import { useTodos } from "./hooks/useTodos";
import CustomTodoList from "./components/customTodo";
import SuggestedTodoList from "./components/suggestedTodo";
import Btn from "../../../components/btn"

function TodosList() {
  const [activeTab, setActiveTab] = useState("suggere");
  const [selectedSuggestedTitle, setSelectedSuggestedTitle] = useState('');
  const [selectedPersonalizedTitle, setSelectedPersonalizedTitle] = useState('');

  const {
    suggestedTodos,
    personalizedTodos,
    loading,
    error,
    activateSuggestedTodo, 
    togglePersonalizedTodoComplete, 
  } = useTodos();

  const currentSelectedTitle = activeTab === "suggere" ? selectedSuggestedTitle : selectedPersonalizedTitle;
  const setCurrentSelectedTitle = activeTab === "suggere" ? setSelectedSuggestedTitle : setSelectedPersonalizedTitle;

  useEffect(() => {
    if (!loading && !error) {
      const currentTodosList = activeTab === "suggere" ? suggestedTodos : personalizedTodos;

      if (currentTodosList.length > 0 && (!currentSelectedTitle || !currentTodosList.some(todo => todo.title === currentSelectedTitle))) {
        setCurrentSelectedTitle(currentTodosList[0].title); 
      } else if (currentTodosList.length === 0) {
        setCurrentSelectedTitle(''); 
      }
    }
  }, [activeTab, suggestedTodos, personalizedTodos, loading, error, currentSelectedTitle, setCurrentSelectedTitle]);

  if (loading) return <p className="text-center py-8 text-gray-700">Chargement...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  const optionsForSelect = (activeTab === "suggere" ? suggestedTodos : personalizedTodos)
  .map(item => ({ title: item.title }));

  let tasksToDisplay = [];
  if (activeTab === "suggere") {

    const selectedSuggestedGroup = suggestedTodos.find(group => group.title === currentSelectedTitle);

    tasksToDisplay = selectedSuggestedGroup ? selectedSuggestedGroup.taches : [];
  } else {
    tasksToDisplay = personalizedTodos.filter(todo => todo.title === currentSelectedTitle);
  }

  return (
    <div className="bg-gradient-to-b from-[#FFF6EB] via-[#F7DFC7] to-[#EFC7A2] bg-fixed min-h-screen sm:p-6 md:p-8 flex flex-col pt-10 px-5">
      <div className="flex justify-between items-center pt-3 mb-6">
        <h1 className="font-black text-2xl text-bleu-clair">To Do List - À faire</h1>
        <Bell />
      </div>

      <SelectWithIcon
        options={optionsForSelect}
        selected={currentSelectedTitle}
        onChange={setCurrentSelectedTitle} 
      />

      <div className="flex justify-center mb-8 pb-2.5 mt-4">
        <button
          onClick={() => setActiveTab("suggere")} 
          className={`w-full p-2.5 rounded-full ${activeTab === "suggere" ? "bg-primary-bg text-bleu-clair font-bold shadow" : "bg-orange2 text-bleu-clair font-normal"} text-xs transition duration-200`}
        >
          Conseillé<span className={`${activeTab === "suggere" ? "border-bleu-clair" : "border-orange-text"} p-1 border-dashed border-2 ml-1 rounded-full`}>33%</span>
        </button>
        <button
          onClick={() => setActiveTab("personnalise")} 
          className={`w-full p-2.5 rounded-full ${activeTab === "personnalise" ? "bg-primary-bg text-bleu-clair font-bold shadow" : "bg-orange2 text-bleu-clair font-normal"} text-xs transition duration-200`}
        >
          Mes Tâches<span className={`${activeTab === "personnalise" ? "border-bleu-clair" : "border-orange-text"} p-1 border-dashed border-2 ml-1 rounded-full`}>33%</span>
        </button>
      </div>

      <div className="grid grid-cols-[25%_45%_25%] gap-2 items-center text-xs pt-2.5">
        <p className={`${activeTab === "suggere" ? "bg-yellow" : "bg-bleu-turquoise"} rounded-full p-2.5 text-center`}>Horaires</p>
        <p className={`${activeTab === "suggere" ? "bg-yellow-40" : "bg-bleu-clair2"} rounded-full p-2.5 text-center`}>Mes tâches</p>
        <p className={`${activeTab === "suggere" ? "border-orange " : "border-bleu-clair"} border-2 rounded-full p-2.5 text-center`}>À cocher</p>
      </div>

      <div className="bg-primary-bg mt-4 p-2.5 rounded-[15px] shadow">
        {activeTab === "suggere" && (
          <SuggestedTodoList
            todos={tasksToDisplay} 
            onActivate={activateSuggestedTodo}
          />
        )}
        {activeTab === "personnalise" && (
          <CustomTodoList
            todos={tasksToDisplay} 
            onToggleComplete={togglePersonalizedTodoComplete} 
          />
          
        )}
      </div>
    </div>
  );
}

export default TodosList;