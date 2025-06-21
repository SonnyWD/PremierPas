import Section from "../../components/section";
import ToolCard from "./toolCard";

function ToolsSection({ tools, toggleFavorite, favoriteIds}) {
  return (
    <Section className={`mt-10.5 bg-primary-bg px-2.5 py-[15px] rounded-[15px]`}>
      {tools.length > 0 ? (
        <div className="flex flex-col p-2 gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              toggleFavorite={toggleFavorite}
              favoriteIds={favoriteIds}
              isLink={true}
            />
          ))}
        </div>
      ) : (
        <p className="ml-4 text-black">Aucun outil disponible.</p>
      )}
    </Section>
  );
}

export default ToolsSection;
