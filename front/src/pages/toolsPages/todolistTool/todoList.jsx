import { useState, useEffect } from "react";
import Bell from "../../../components/bell";
import SelectWithIcon from "./components/select";
import { useTodos } from "./hooks/useTodos";
import CustomTodoList from "./components/customTodo";
import SuggestedTodoList from "./components/suggestedTodo";
import Btn from "../../../components/btn";
import AddTaskModal from "./components/askTaskModal";
import ManageTitleTodos from "./manageTitleTodos";
import AddCategoryModal from "./components/addCategoryModal";

function TodosList() {
  const [activeTab, setActiveTab] = useState("suggere");
  const [selectedPersonalizedTitle, setSelectedPersonalizedTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageListsModal, setShowManageListsModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const {
    suggestedTodos,
    personalizedTodos,
    setPersonalizedTodos,
    loading,
    error,
    activateSuggestedTodo,
    togglePersonalizedTodoComplete,
    selectedSuggestedTitle,
    setSelectedSuggestedTitle
  } = useTodos(activeTab);

  const currentSelectedTitle =
    activeTab === "suggere" ? selectedSuggestedTitle : selectedPersonalizedTitle;
  const setCurrentSelectedTitle =
    activeTab === "suggere" ? setSelectedSuggestedTitle : setSelectedPersonalizedTitle;

  useEffect(() => {
    if (!loading && !error) {
      const currentTodosList = activeTab === "suggere" ? suggestedTodos : personalizedTodos;

      if (
        currentTodosList.length > 0 &&
        (!currentSelectedTitle ||
          !currentTodosList.some((todo) => todo.title === currentSelectedTitle))
      ) {
        setCurrentSelectedTitle(currentTodosList[0].title);
      } else if (currentTodosList.length === 0) {
        setCurrentSelectedTitle('');
      }
    }
  }, [
    activeTab,
    suggestedTodos,
    personalizedTodos,
    loading,
    error,
    currentSelectedTitle,
    setCurrentSelectedTitle,
  ]);

  const handleConfirmAdd = ({ date, heure, description }) => {
    if (!currentSelectedTitle) return;

    const newTask = {
      id: Date.now(),
      description,
      heure: heure || "00H",
      date,
      done: false,
    };

    setPersonalizedTodos((prev) => {
      const groupIndex = prev.findIndex(t => t.title === currentSelectedTitle);

      if (groupIndex !== -1) {

        const updated = [...prev];
        updated[groupIndex] = {
          ...updated[groupIndex],
          taches: [...updated[groupIndex].taches, newTask],
        };
        return updated;
      } else {

        return [...prev, { title: currentSelectedTitle, taches: [newTask] }];
      }
    });

    setShowAddModal(false);
  };


  if (loading) return <p className="text-center py-8 text-gray-700">Chargement...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  const optionsForSelect = (activeTab === "suggere" ? suggestedTodos : personalizedTodos).map(
    (item) => ({ title: item.title })
  );

  const tasksToDisplay =
  activeTab === "suggere"
    ? suggestedTodos.find(group => group.title === currentSelectedTitle)?.taches || []
    : personalizedTodos.find(group => group.title === currentSelectedTitle)?.taches || [];
console.log("✅ personalizedTodos", personalizedTodos);


  return (
    <div className="bg-gradient-to-b from-[#FFF6EB] via-[#F7DFC7] to-[#EFC7A2] bg-fixed min-h-screen pb-24 flex flex-col pt-10 px-5">
      <div className="flex justify-between items-center pt-3 mb-6">
        <h1 className="font-black text-2xl text-bleu-clair">To Do List - À faire</h1>
        <Bell />
      </div>

      <SelectWithIcon
        options={optionsForSelect}
        selected={currentSelectedTitle}
        onChange={setCurrentSelectedTitle}
        onClickWhenPersonalized={
          activeTab === "personnalise" ? () => setShowManageListsModal(true) : undefined
        }
        className={activeTab === "personnalise" ? "pt-2 pb-4" : ""}
      />

      <div className="flex justify-center mb-8 pb-2.5 mt-4">
        <button
          onClick={() => setActiveTab("suggere")}
          className={`w-full p-2.5 rounded-full ${
            activeTab === "suggere"
              ? "bg-primary-bg text-bleu-clair font-bold shadow"
              : "bg-orange2 text-bleu-clair font-normal"
          } text-xs transition duration-200`}
        >
          Conseillé
          <span
            className={`${
              activeTab === "suggere" ? "border-bleu-clair" : "border-orange-text"
            } p-1 border-dashed border-2 ml-1 rounded-full`}
          >
            33%
          </span>
        </button>
        <button
          onClick={() => setActiveTab("personnalise")}
          className={`w-full p-2.5 rounded-full ${
            activeTab === "personnalise"
              ? "bg-primary-bg text-bleu-clair font-bold shadow"
              : "bg-orange2 text-bleu-clair font-normal"
          } text-xs transition duration-200`}
        >
          Mes Tâches
          <span
            className={`${
              activeTab === "personnalise" ? "border-bleu-clair" : "border-orange-text"
            } p-1 border-dashed border-2 ml-1 rounded-full`}
          >
            33%
          </span>
        </button>
      </div>

      <div className="grid grid-cols-[25%_45%_25%] gap-2 items-center text-xs pt-2.5">
        <p
          className={`${
            activeTab === "suggere" ? "bg-yellow" : "bg-bleu-turquoise"
          } rounded-full p-2.5 text-center`}
        >
          Horaires
        </p>
        <p
          className={`${
            activeTab === "suggere" ? "bg-yellow-40" : "bg-bleu-clair2"
          } rounded-full p-2.5 text-center`}
        >
          Mes tâches
        </p>
        <p
          className={`${
            activeTab === "suggere" ? "border-orange " : "border-bleu-clair"
          } border-2 rounded-full p-2.5 text-center`}
        >
          À cocher
        </p>
      </div>

      <div className="bg-primary-bg mt-4 mb-8 p-2.5 rounded-[15px] shadow">
        {activeTab === "suggere" && (
          <SuggestedTodoList todos={tasksToDisplay} onActivate={activateSuggestedTodo} />
        )}
        {activeTab === "personnalise" && (
          <CustomTodoList
            todos={tasksToDisplay}
            onToggleComplete={togglePersonalizedTodoComplete}
          />
        )}
      </div>

      {activeTab === "personnalise" && (
        <div className="flex flex-col gap-y-4 m-auto w-full">
          <Btn
            onClick={() => setShowAddModal(true)}
            variant="secondary"
            className="rounded-full w-full py-[15px] px-2.5"
          >
            Ajouter une tâche
          </Btn>
          <Btn
            variant="premiumBtn"
            className="rounded-full w-full py-[15px] px-2.5"
          >
            Partager la tâche
          </Btn>
        </div>
      )}

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleConfirmAdd}
        />
      )}

      {showManageListsModal && (
        <ManageTitleTodos
          onClose={() => setShowManageListsModal(false)}
          personalizedTodos={personalizedTodos}
          setPersonalizedTodos={setPersonalizedTodos}
          setSelectedPersonalizedTitle={setSelectedPersonalizedTitle}
          setShowAddCategoryModal={setShowAddCategoryModal}
        />
      )}
      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          personalizedTodos={personalizedTodos}
          setPersonalizedTodos={setPersonalizedTodos}
        />
      )}
    </div>
  );
}

export default TodosList;
