import Section from "../../components/section";
import ToolsList from "../../components/toolsList";
import SaveIcon from "../../components/saveIcon";

function FavoriteToolsSection({ tools, toggleFavorite, favoriteIds }) {

  return (
    <Section className="bg-pink-100">
      <h2 className="font-bold gap-4 pt-2 ml-4">Outils Favoris</h2>
      {tools.length > 0 ? (
        <ToolsList
          tools={tools}
          className="flex flex-col p-2"
          showSaveIcon={true}
          toggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
          renderSaveIcon={(tool) => (
            <SaveIcon
              key={tool.id}
              className="mr-4"
              onClick={() => toggleFavorite(tool.id)}
              isSaved={favoriteIds.includes(tool.id)}
            />
          )}
        />
      ) : (
        <p className="ml-4 text-black">Aucun outil en favoris pour le moment.</p>
      )}
    </Section>
  );
}

export default FavoriteToolsSection;
