import { useState, useMemo } from 'react';
import { useTools } from "./useTool";
import ToolsSection from "./toolsSection";
import Bell from "../../components/bell";
import SearchBar from "../../components/searchBar";
import SaveIcon from "../../components/saveIcon";
import SuggestionSection from "../../components/suggestionSection";
import { IoMdClose } from "react-icons/io";

function Tools() {
  const {
    tools: allTools,
    favoriteIds,
    showFavorites,
    toggleFavorite,
    toggleShowFavorites,
    loading,
    error,
  } = useTools();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState('Tout');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedKeywords('Tout');
  };

  const handleSuggestionOnClick = (keywords) => {
    setSelectedKeywords(keywords)
    setSearchTerm('');
  };

  const filteredTools = useMemo(() => {
    if (!allTools) return []; 

    let currentTools = allTools;
    // 1. Filtre par mot dans la barre de recherche
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentTools = allTools.filter(tool =>
        tool.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        (tool.description && tool.description.toLowerCase().includes(lowerCaseSearchTerm)) || 
        (tool.keywords && tool.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm))) 
      );
    }
    // 2. Filtrer par SUGGESTION KEYWORD (si actif et PAS "Tout")
    else if (selectedKeywords !== 'Tout') {
      const lowerCaseKeyword = selectedKeywords.toLowerCase();
      currentTools = currentTools.filter(tool =>
        Array.isArray(tool.keywords) && tool.keywords.some(keyword =>
          keyword && keyword.toLowerCase().includes(lowerCaseKeyword)
        )
      );
    }

    if (showFavorites) {
      return currentTools.filter(tool => favoriteIds.includes(tool.id));
    }

    return currentTools;
  }, [allTools, searchTerm, showFavorites, favoriteIds, selectedKeywords]); 

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-primary-bg pb-30 p-5 font-primary-text 
                    bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed">
      <div className="flex items-center justify-between mt-5 mb-4">
        <h1 className="font-title-primary ml-1">{showFavorites ? 
          <>
            <span className="text-orange font-bold">Mes Favoris</span>
          </>: "Mes outils"}
        </h1>

        {
          !showFavorites ? 
          <div className="flex">
          <SaveIcon
            className="mr-4"
            isSaved={true}
            onClick={toggleShowFavorites}
            disabled={favoriteIds.length === 0}
          />
          <Bell />
        </div>
          : 
          <IoMdClose onClick={toggleShowFavorites}
            className="text-3xl border-2 border-orange text-orange  shadow-none rounded-full"/>
        }
        
      </div>
      {
        !showFavorites ?
        <div>
          <SearchBar
            placeholder="Quizz, bébé, article..."
            variant="yellow"
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <SuggestionSection 
          keywords={['Tout', 'Pour bébé', 'Suivi', 'Me détendre', 'Moi']} 
          variant="third" 
          onKeywordClick={handleSuggestionOnClick} 
          selectedKeyword={selectedKeywords} 
          btnClassName="focus:bg-yellow-hover"
          />
          <h2 className="font-bold gap-4 ml-4 -mb-8 mt-10.5">Mes outils <span className="text-orange">FREE</span></h2>
        </div>
        :
        <div className="-mb-4"></div>
      }


      <ToolsSection
        tools={filteredTools} 
        toggleFavorite={toggleFavorite}
        favoriteIds={favoriteIds}
      />
    </div>
  );
}

export default Tools;
