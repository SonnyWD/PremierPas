import { MdOutlineClose } from "react-icons/md";

function CustomTodoList({ todos, onToggleComplete }) {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-sm">Aucune tâche personnalisée à afficher pour ce titre.</p>;
  }

  return (
    <div className="list-none ml-1 text-sm space-y-2">
      {todos.map((todo) => (
        <label
          key={todo.id} 
          className="grid grid-cols-[25%_45%_25%] gap-4 items-center pt-2.5 cursor-default"
        >
          <div className="flex justify-start">
            <span className="text-bleu-clair bg-bleu-turquoise p-2.5 rounded-[15px]">
              {todo.heure || "??H"}
            </span>
          </div>

          <div className="flex justify-center">
            <span className="text-xs text-bleu-clair">
              {todo.description}
            </span>
          </div>

          <div className="flex justify-center">
            <div
              onClick={() => onToggleComplete && onToggleComplete(todo.id, !todo.completed)}
              className="flex items-center justify-center h-7 w-7 border-2 border-bleu-clair rounded-sm text-black cursor-pointer"
            >
              {todo.completed && (
                <MdOutlineClose className="text-lg" />
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}

export default CustomTodoList;