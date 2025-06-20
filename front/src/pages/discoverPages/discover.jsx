import SearchBar from "../../components/searchBar";
import SaveIcon from "../../components/saveIcon";
import SuggestionSection from "../../components/suggestionSection";
import Bell from "../../components/bell";
import GuideCard from "./components/guideCard";

function Discover(){
    const keywordsTool = ['Tout', 'Lire', 'Écouter', 'Regarder', 'Questions'];
    const themes = ['Parent', 'Alimentation', 'Bien-être', 'Maman', 'Papa', 'Travail']
    return (
        <div className="bg-primary-bg pb-30 p-5 font-primary-text 
                        bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed">
            <div className="flex items-center justify-between mt-5 mb-4">
               <div>
                <h1 className="font-title-primary ml-1">Découvrir</h1>
               </div>
               <div className="flex">
                <SaveIcon/>
                <Bell/>
               </div>
                
            </div>
            <SearchBar placeholder="Un podcast, alimentation"/>
            <SuggestionSection keywords={keywordsTool} variant="secondary" btnClassName=" override-shadow"/>
            <section className="mt-10.5">
                <h2 className="font-title-primary mb-4 ml-1">Vos guides</h2>
                <GuideCard/>
            </section>
            <section>
                <h2 className="font-title-primary mb-4 ml-1">Par Thèmes</h2>
                <div className="bg-orange-ombre grid grid-cols-3 w-full gap-4 justify-center p-2.5 rounded-[15px]">
                    {themes.map((theme, index) => 
                        <span key={index} className="bg-primary-bg text-bleu-clair rounded-full text-center w-full">{theme}</span>
                    )}

                </div>
            </section>
            
        </div>
        
    )
}
export default Discover;