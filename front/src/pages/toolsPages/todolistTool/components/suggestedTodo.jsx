function SuggestedTodoList({ todos, onActivate }) {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-sm text-gray-600">Aucune tâche suggérée à afficher pour cette catégorie.</p>;
  }

  return (
    <div className="list-none ml-1 text-sm space-y-2">
      {todos.map((tache, index) => ( 
        <label
          key={index} 
          className="grid grid-cols-[25%_45%_25%] gap-4 items-center pt-2.5 cursor-default"
        >
          <div className="flex justify-start">
            <span className="text-bleu-clair bg-yellow p-2.5 rounded-[15px]">18H</span>
          </div>

          <div className="flex justify-center">
            <span className="text-xs text-bleu-clair">
              {tache.description} 
            </span>
          </div>

          <div className="flex justify-center">
            <div
              onClick={() => onActivate(index)}
              className={`h-7 w-7 border-2 rounded-sm flex items-center justify-center cursor-pointer 
                ${tache.done ? "bg-transparent text-orange" : "bg-transparent border-orange"}`}
            >
              {tache.done && (
                <span className="text-lg font-bold leading-none">✕</span>
              )}
            </div>

          </div>
        </label>
      ))}
    </div>
  );
}

export default SuggestedTodoList;