import ToolItem from "./toolItem";
import SuggestionSection from "../../components/suggestionSection";
import { CgMenuGridO } from "react-icons/cg";
import { RxReader } from "react-icons/rx";
import { MdOutlineHeadphones, MdOutlineVideoLibrary } from "react-icons/md";

function AllToolsSection({ tools, toggleFavorite, favoriteIds }) {
  return (
    <>
      <SuggestionSection
        keywords={[
          { text: "Tout", icon: CgMenuGridO },
          { text: "Lire", icon: RxReader },
          { text: "Écouter", icon: MdOutlineHeadphones },
          { text: "Regarder", icon: MdOutlineVideoLibrary },
        ]}
        showSaveIcon={false}
      />
      <h2 className="font-bold gap-4 ml-4">Outils</h2>
      {tools.map((tool) => (
        <ToolItem
          key={tool.id}
          tool={tool}
          toggleFavorite={toggleFavorite}
          favoriteIds={favoriteIds}
        />
      ))}
    </>
  );
}

export default AllToolsSection;
