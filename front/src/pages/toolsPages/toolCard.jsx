import { Link } from "react-router-dom";
import FavoriteIcon from "../../components/favoriteIcon"

function ToolCard({ tool, toggleFavorite, favoriteIds }) {
  const { id, icon: Icon, title, description, path } = tool;

  return (
    <Link to={path}>
      <div className="bg-yellow shadow-md rounded-xl py-[15px] px-2.5 gap-2.5 flex items-center justify-between">
        <div className="w-[46.08px] h-[50px] flex justify-end items-center rounded-[30px] bg-secondary-bg overflow-hidden pt-[19px] px-[8px] pr-[8.566px]">
          <Icon className="w-[29.514px] h-[60px] pt-2 text-white" />
        </div>
        <div className="flex-1 pr-2">
          <h2 className="font-bold mb-2">{title}</h2>
          <p>{description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFavorite?.(id);
          }}
          className="appearance-none bg-transparent border-none outline-none p-0 m-0 text-xl"
        >
          <FavoriteIcon isSaved={favoriteIds.includes(id)} />
        </button>
      </div>
    </Link>
  );
}

export default ToolCard;
