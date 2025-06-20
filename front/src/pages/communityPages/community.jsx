import SearchBar from "../../components/searchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoChatbubbleEllipses } from "react-icons/io5";
import SuggestionSection from "../../components/suggestionSection";
import grossesse from "../../assets/img/grossesse.svg"

function Community() {
    const keywordsTool = ['Aliments interdits', 'Poussette', 'Courses', 'Contractions'];

    return (
        <div className="bg-gradient-to-b from-[#FFF6EB] from-[0%] via-[#FFF6EB] via-[35.2%] to-[#FCE4B7] to-[100%] pt-10 bg-fixed">
            <div className="grid grid-cols-[20%_60%_20%] items-center max-w-[800px] mx-auto">
                <RxHamburgerMenu className="justify-self-center" />
                <SearchBar placeholder="Diabète, enfant, test de..." variant="gray"/>
                <IoChatbubbleEllipses className="justify-self-center text-bleu-turquoise" />
            </div>
            <div className="p-5 py-0">
                <SuggestionSection keywords={keywordsTool} variant="primary" btnClassName="override-shadow2"/>
                <div className="bg-yellow-40 px-2.5 py-[15px] mt-8.5 rounded-[15px] text-center flex flex-col items-center justify-between min-h-[450px]">
                     <h2 className="font-title-primary mb-4 ml-1">Bientôt disponible</h2>
                     <p><span>Restez connecté </span><span>Soutenus par d’autres maman</span> <span>Partagez vos expériences </span></p>
                      <img src={grossesse} alt="" className="w-50 m-auto"/>
                </div>
            </div>
             
        </div>
    )
}
export default Community;