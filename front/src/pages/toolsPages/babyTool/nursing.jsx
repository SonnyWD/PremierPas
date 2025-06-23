import Bell from "../../../components/bell";
import Input from "../../../components/input";
import ProgressBar from "../../../components/progressBar";

function Nursing() {
    return(

            <div className="bg-gradient-to-b from-[#FFF6EB] from-[24.52%] via-[#F7DFC7] via-[84.13%] to-[#EFC7A2] to-[100%] bg-fixed p-5">
                <div className="flex justify-between items-center pt-5 pb-4">
                    <h2 className="gap-4 px-5 !text-[24px] text-orange">Alaitement</h2>
                    <Bell/>
                </div>
                <ProgressBar/>
                <p className="text-bleu-clair text-xs">Pour réussir cette journée il faut choisir <span className="font-bold">min. 1 onglet d’alimentation</span> pour etre à jour </p>
                <div>
                    <div>
                        <p>Début</p>
                        <Input type="time" onChange={(e) => setTimeout(e.target.value)}/>
                    </div>
                    <div>
                        <p>Fin</p>
                        <Input />
                    </div>
                </div>
            </div>

    )
}
export default Nursing;