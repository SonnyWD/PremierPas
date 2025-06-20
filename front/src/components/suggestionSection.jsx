import Btn from "./btn"

function SuggestionSection({keywords, btnClassName = "", variant = "secondary", onKeywordClick }){
  if (!Array.isArray(keywords)) {
    console.error("La prop 'keywords' doit être un tableau.");
    return null; 
  }

    return(
      <div className="overflow-x-auto  hide-scrollbar">
        <div className="flex items-center gap-4 flex-nowrap my-4 px-2 w-max">
          {keywords.map((text, index) => {
            return(
            <Btn key={index} variant={variant} className={`rounded-[15px] ${btnClassName}`} onClick={() => onKeywordClick(text)} >
              {text}
            </Btn>)}
          )}
        </div>
      </div>
    );
}
export default SuggestionSection;