import BabyCard from "../../../components/babyCard";
import grossesse from "../../../assets/img/grossesse.svg"
import Bell from "../../../components/bell";
import ProgressBar from "../../../components/progressBar";
import { useNavigate } from "react-router-dom";

function BabyFeed() {
    const navigate = useNavigate();

    const feedArray = [
        {
            img: grossesse,
            text: "Alaitement",
            link: "/tools/baby/feed/nursing"
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
        }
    ]
    return(
        <div>
            <div className="bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed p-5">
            <div className="flex justify-between items-center pt-5 pb-4">
             <h2 className="gap-4 px-5 !text-[24px] text-orange">Alimentation</h2>
             <Bell/>
            </div>
            <ProgressBar/>
             <p className="text-bleu-clair text-xs">Pour réussir cette journée il faut choisir <span className="font-bold">min. 1 onglet d’alimentation</span> pour etre à jour </p>
            <div className="pb-20 grid grid-cols-2 sm:grid-cols-2 gap-4 pt-4">
                {feedArray.map((tool, index) => 
                    <BabyCard  
                    key={index} 
                    img={tool.img} 
                    text={tool.text} 
                    showProgress={false}
                    className="bg-yellow rounded-[13px] p-2.5 flex flex-col items-center w-full justify-between text-xs gap-2.5 font-bold"
                    onClick={() => {
                        navigate(tool.link);
                    }} />
                )}
            </div>
        </div>
        </div>
    )
}
export default BabyFeed;