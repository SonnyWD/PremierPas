import { useState, useEffect } from "react";
import { fetchTools, fetchFavoriteTools, addFavoriteTool, removeFavoriteTool } from "../../services/toolService";
import { useUser } from "../../context/userContext";
import { BsListCheck, BsCalendarHeart } from "react-icons/bs";
import { TbMoodPuzzled } from "react-icons/tb";
import { LuBaby } from "react-icons/lu";
import { FaBell, FaPuzzlePiece } from "react-icons/fa";
import { IoIosMusicalNote } from "react-icons/io";

const premiumContents = ['swipe']; 

const iconMapping = {
  BsListCheck,
  BsCalendarHeart,
  LuBaby,
  TbMoodPuzzled,
  FaBell,
  FaPuzzlePiece,
  IoIosMusicalNote
}; 

export function useTools() {
  const [tools, setTools] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); 
  const isPremium = user?.isPremium;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const allTools = await fetchTools();

        const toolsWithIcons = allTools.map(tool => ({
          ...tool,
          icon: iconMapping[tool.iconName] || null,
          keywords: JSON.parse(tool.keywords),
          //locked: premiumContents.includes(tool.path) && !isPremium,
        }));
        console.log("Tools data:", allTools);
        setTools(toolsWithIcons);

        const favoriteTools = await fetchFavoriteTools();
        const favoriteIdsOnly = favoriteTools.map((tool) => tool.id);
        setFavoriteIds(favoriteIdsOnly);

        setLoading(false);
      } catch (err) {
        setError("Erreur de chargement");
        setLoading(false);
      }
    };

    fetchAll();
  }, [isPremium]);

  const toggleFavorite = async (toolId) => {
    const isFavorite = favoriteIds.includes(toolId);

    try {
      if (isFavorite) {
        await removeFavoriteTool(toolId);
        setFavoriteIds((prev) => prev.filter((id) => id !== toolId));
      } else {
        await addFavoriteTool(toolId);
        setFavoriteIds((prev) => [...prev, toolId]);
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour des favoris", err);
    }
  };

  const toolsToDisplay = showFavorites ? tools.filter((tool) => favoriteIds.includes(tool.id)) : tools;

  const toggleShowFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  return {
    tools,
    favoriteIds,
    toggleFavorite,
    showFavorites,
    toggleShowFavorites,
    loading,
    error,
  };
}
