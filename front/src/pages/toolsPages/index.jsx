import { useTools } from "./useTool";
import FavoriteToolsSection from "./FavoriteToolsSection";
import AllToolsSection from "./allToolsSection";
import Bell from "../../components/bell";
import SearchBar from "../../components/searchBar";
import SaveIcon from "../../components/saveIcon";

function Tools() {
  const {
    toolsToDisplay,
    favoriteIds,
    showFavorites,
    toggleFavorite,
    toggleShowFavorites,
    loading,
    error,
  } = useTools();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="bg-orange-50 pb-15">
      <div className="flex justify-between items-center pt-3">
        <h1 className="font-black gap-4 ml-4">Outils</h1>
        <SaveIcon
          className="mr-4"
          isSaved={true}
          onClick={toggleShowFavorites}
          disabled={favoriteIds.length === 0}
        />
      </div>

      <div className="flex justify-between">
        <SearchBar />
        <Bell className="mr-4" />
      </div>

      {showFavorites ? (
        <FavoriteToolsSection
          tools={toolsToDisplay}
          toggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />
      ) : (
        <AllToolsSection
          tools={toolsToDisplay}
          toggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />
      )}
    </div>
  );

}

export default Tools;
