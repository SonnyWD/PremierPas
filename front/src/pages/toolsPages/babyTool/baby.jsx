import BabyCard from "../../../components/babyCard";
import grossesse from "../../../assets/img/grossesse.svg"
import Bell from "../../../components/bell";
import ProgressBar from "../../../components/progressBar";
import { useNavigate } from "react-router-dom";

function Baby() {
    const navigate = useNavigate();

    const babyTools = [
        {
            img: grossesse,
            text: "Alimentation",
            link: "/tools/baby/feed"
        },
        {
            img: grossesse,
            text: "Reveil, Sieste et Dodo",
            link: "tools/baby/sleep"
        },
        {
            img: grossesse,
            text: "Croissance",
            link: "tools/baby/growth"
        },
        {
            img: grossesse,
            text: "Santé",
            link: "tools/baby/health"
        },
        {
            img: grossesse,
            text: "Suivi des 1er moments",
            link: "tools/baby/moments"
        },
    ]

    return(
        <div className="bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed p-5">
            <div className="flex justify-between items-center pt-5 pb-4">
             <h2 className="gap-4 px-5 !text-[24px]">Tout pour bébé</h2>
             <Bell/>
            </div>
            <ProgressBar/>
             <p className="text-bleu-clair text-xs">Complétez tous les onglets quotidiennement afin d'être à jour.</p>
            <div className="pb-20 grid grid-cols-2 gap-4 pt-4">
                {babyTools.map((tool, index) => 
                    <BabyCard  
                    key={index} 
                    img={tool.img} 
                    text={tool.text} 
                    showProgress={true}
                    className="bg-orange2 rounded-[13px] p-2.5 flex flex-col items-center w-full justify-between text-xs gap-2.5"
                    onClick={() => {
                        navigate(tool.link);
                    }} />
                )}
            </div>
        </div>
       
    )
}
export default Baby;