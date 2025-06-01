function TodoItem({ todo, isEditing, isSelected, onToggleSelection }) {
  return (
    <li
      key={todo.id}
      className="flex items-center justify-between p-3 border-b border-gray-200 text-gray-800 text-lg last:border-b-0">

      {isEditing ? (
        <input
          type="checkbox"
          checked={isSelected} 
          onChange={() => onToggleSelection(todo.id)} 
          className="form-checkbox h-5 w-5 text-blue-600 mr-3"
        />
      ) : null}

      <span className={`flex-grow ${todo.locked ? "opacity-60 text-gray-500 italic" : ""}`}>
        {todo.title}
      </span>

    </li>
  );
}

export default TodoItem;