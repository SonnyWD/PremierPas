import SaveIcon from "./saveIcon";
import Btn from "./btn"

function SuggestionSection({keywords, showSaveIcon = true}){
  if (!Array.isArray(keywords)) {
    console.error("La prop 'keywords' doit être un tableau.");
    return null; 
  }
  
    return(
        <div className="flex items-center justify-between pr-4 pl-4 pb-4 mb-2">
          {keywords.length > 0 ? (keywords.map(({ text, icon: Icon }, index) => {
            return(
            <Btn key={index} className="flex flex-col font-light text-xs items-center gap-1 text-blue-400 bg-pink-100 w-2xs pt-3 pb-3 m-1 rounded-lg">
              {Icon && <Icon className="text-xl" />}
              {text}
            </Btn>)
          })
        ) : (
          <p>Aucun mot-clé disponible.</p>
        )}
        {showSaveIcon && <SaveIcon />}
      </div>
    );
}
export default SuggestionSection;