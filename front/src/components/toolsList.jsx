import SaveIcon from "./saveIcon";
import React from "react";

function ToolsList({
  tools,
  className,
  showSaveIcon = true,
  reverseOrder = false,
  deleteDescription = false,
  toggleFavorite,
  favoriteIds = [],
}) {
  if (!Array.isArray(tools)) {
    console.error("'tools' doit être un tableau.");
    return null;
  }

  return (
    <div className={className}>
      {tools.map(({ id, icon, title, description }, index) => (
        <div
          key={id || index}
          className="bg-white shadow-md rounded-xl p-4 mb-4 flex items-center justify-between"
        >
          {icon ? (
            <div className="w-12 h-12 bg-pink-100 flex items-center justify-center rounded-md mr-4">
              {React.createElement(icon, { className: "text-pink-500 text-2xl" })}
            </div>
          ) : (
            <div className="w-12 h-12 bg-pink-100 flex items-center justify-center rounded-md mr-4">
              <span className="text-pink-500 text-2xl">?</span>
            </div>
          )}

          <div className="flex-1 pr-2">
            {deleteDescription ? (
              <h3 className="font-bold mb-2">{title}</h3>
            ) : reverseOrder ? (
              <>
                <p>{description}</p>
                <h3 className="font-bold mb-2">{title}</h3>
              </>
            ) : (
              <>
                <h3 className="font-bold mb-2">{title}</h3>
                <p>{description}</p>
              </>
            )}
          </div>

          {showSaveIcon && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                toggleFavorite?.(id);
              }}
              className="appearance-none bg-transparent border-none outline-none p-0 m-0 text-xl">
              <SaveIcon isSaved={favoriteIds.includes(id)} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ToolsList;
