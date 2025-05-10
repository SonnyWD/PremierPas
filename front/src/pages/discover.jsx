import SearchBar from "../components/searchBar";
import SaveIcon from "../components/saveIcon";
import SuggestionSection from "../components/suggestionSection";
import Section from "../components/section";
import ToolsList from "../components/toolsList";
import test from "../assets/img/test.jpg"
import Btn from "../components/btn";

function Discover(){
    const keywordsTool = ['Tout', 'Lire', 'Écouter', 'Questions'];
    return (
        <div>
            <div className="flex justify-center items-center">
                <SearchBar/>
                <SaveIcon className="appearance-none bg-transparent border-none outline-none p-0 mt-5 mr-5 text-xl"/>
            </div>
            <SuggestionSection keywords={keywordsTool} showSaveIcon={false}/>
            <div>
                <h2 className="font-bold">Guide</h2>
                <Section className="flex justify-between items-start gap-4 mb-10">
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false} className=""/>
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false}/>
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false}/>
                </Section>
            </div>
            <div>
                <h2 className="font-bold">Théme</h2>
                <Section className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-10 place-items-center">
                <ToolsList img={test} title="Naissance" showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Accouchement" showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Parentalité" showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Biberons" showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                </Section>
            </div>
            <div>
                <h2 className="font-bold">Trismestre</h2>
                <Section className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-10 place-items-center">
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                <ToolsList img={test} title="Les premiers mois" description="loremLorem ipsum dolor sit amet, consectetur adipiscing elit." showSaveIcon={false} reverseOrder ={false} deleteDescription={true}/>
                </Section>
            </div>
            <Btn className="w-[90%] mx-auto flex justify-center items-center px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-sm font-medium">Voir plus</Btn>
        </div>
        
    )
}
export default Discover;