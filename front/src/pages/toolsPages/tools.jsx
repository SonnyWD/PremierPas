import { Link, Links } from "react-router-dom";
import SearchBar from "../../components/searchBar";
import Section from "../../components/section";
import ToolsList from "../../components/toolsList";
import SuggestionSection from "../../components/suggestionSection";
import { CgMenuGridO } from "react-icons/cg";
import { MdOutlineHeadphones } from "react-icons/md";
import { RxReader } from "react-icons/rx";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Bell from "../../components/bell";
import { useState, useEffect } from "react";
import { BsListCheck, BsCalendarHeart } from 'react-icons/bs'; 
import { TbBabyBottle } from 'react-icons/tb'; 
import { GiNightSleep } from 'react-icons/gi'; 
import SaveIcon from "../../components/saveIcon";
import { fetchTools, fetchFavoriteTools, addFavoriteTool, removeFavoriteTool } from "../../services/toolService";

const iconMapping = {
  BsListCheck: BsListCheck,
  BsCalendarHeart: BsCalendarHeart,
  TbBabyBottle: TbBabyBottle,
  GiNightSleep: GiNightSleep,
};

function Tools() {
  const keywords = [
    { text: "Tout", icon: CgMenuGridO },
    { text: "Lire", icon: RxReader },
    { text: "Écouter", icon: MdOutlineHeadphones },
    { text: "Regarder", icon: MdOutlineVideoLibrary },
  ];

  const [tools, setTools] = useState([]);
  const [favoriteTitles, setFavoriteTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchTools()
      .then((data) => {
        const toolsWithIcons = data.map((tool) => ({
          ...tool,
          icon: iconMapping[tool.iconName] || null,
        }));
        setTools(toolsWithIcons);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de chargement des outils");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchFavoriteTools()
      .then((res) => {
        const favorites = res.map((tool) => tool.title);
        setFavoriteTitles(favorites);
      })
      .catch((err) => console.error("Erreur récupération favoris", err));
  }, []);  

  useEffect(() => {
    localStorage.setItem("favoriteTools", JSON.stringify(favoriteTitles));
  }, [favoriteTitles]);

  const toggleFavorite = async (title) => {
    const tool = tools.find((t) => t.title === title);
    if (!tool) return;
  
    const isFavorite = favoriteTitles.includes(title);
  
    try {
      if (isFavorite) {
        await removeFavoriteTool(tool.id);
        setFavoriteTitles((prev) => prev.filter((t) => t !== title));
      } else {
        await addFavoriteTool(tool.id);
        setFavoriteTitles((prev) => [...prev, title]);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris", err);
    }
  };
  
  const handleFavoritesOnClick = () => {
    setShowFavorites((prev) => !prev);
  }

  const toolsToDisplay = showFavorites ? favoriteTitles : tools;

  const favoriteTools = tools.filter((tool) =>
    favoriteTitles.includes(tool.title)
  );

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-orange-50 pb-15">
      <div className="flex justify-between items-center pt-3">
        <h1 className="font-black gap-4 ml-4">Outils</h1>
        <SaveIcon
          className="mr-4"
          isSaved={true}
          onClick={handleFavoritesOnClick}
          disabled={favoriteTitles.length === 0}
        />
      </div>

      <div className="flex justify-between">
        <SearchBar />
        <Bell className="mr-4" />
      </div>

      {showFavorites ? (
        <Section className="bg-pink-100">
          <h2 className="font-bold gap-4 pt-2 ml-4">Outils Favoris</h2>
          {favoriteTools.length > 0 ? (
            <ToolsList
              tools={favoriteTools}
              className="flex flex-col p-2"
              showSaveIcon={true}
              toggleFavorite={toggleFavorite}
              favoriteTitles={favoriteTitles}
              renderSaveIcon={(tool) => (
                <SaveIcon
                  key={tool.id}
                  className="mr-4"
                  onClick={() => toggleFavorite(tool.title)}
                />
              )}
            />
          ) : (
            <p className="ml-4 text-black">Aucun outil en favoris pour le moment.</p>
          )}
        </Section>
      ) : (
        <>
          <SuggestionSection keywords={keywords} showSaveIcon={false} />
          {tools.map((tool) => {
            <Link to={`/${tool.path}`} key={tool.id}>
            <Section>
              <h2 className="font-bold gap-4 ml-4">Outils</h2>
              <ToolsList
                tools={toolsToDisplay}
                className="flex flex-col p-2"
                showSaveIcon={true}
                toggleFavorite={toggleFavorite}
                favoriteTitles={favoriteTitles}
              />
            </Section>
          </Link>
          })}
          
        </>
      )}
    </div>
  );
}

export default Tools;
