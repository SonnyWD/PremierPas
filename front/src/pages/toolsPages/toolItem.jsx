import { Link } from "react-router-dom";
import Section from "../../components/section";
import ToolsList from "../../components/toolsList";
import SaveIcon from "../../components/saveIcon";

function ToolItem({ tool, toggleFavorite, favoriteIds }) {
  const isFavorite = favoriteIds.includes(tool.id);
  const locked = tool.locked;

  return (
    <Link
      to={locked ? "#" : `/${tool.path}`}
      className={locked ? "pointer-events-none opacity-50" : ""}
    >
      <Section>
        <ToolsList
          tools={[tool]}
          className="flex flex-col p-2"
          showSaveIcon={!locked}
          toggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
          renderSaveIcon={() =>
            !locked && (
              <SaveIcon
                key={tool.id}
                className="mr-4"
                onClick={() => toggleFavorite(tool.id)} 
                isSaved={isFavorite}
              />
            )
          }
        />
      </Section>
    </Link>
  );
}

export default ToolItem;
