import BabyCard from "../../components/babyCard";
import { GiNightSleep } from "react-icons/gi";
import { GiBabyBottle } from "react-icons/gi";
import { AiOutlinePicture } from "react-icons/ai";
import { ImSleepy } from "react-icons/im";

function Baby() {
    return(
        <div className="bg-orange-50">
             <h1 className="font-black gap-4 pl-5 pt-6 pb-4 font-light text-xl">Bébé</h1>
            <div className="bg-orange-50 pb-20 grid grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                <BabyCard icon={<ImSleepy />} progress={75}>
                Réveil
                </BabyCard>
                <BabyCard icon={<GiNightSleep />} progress={75}>
                Sieste et dodo
                </BabyCard>
                <BabyCard icon={<GiBabyBottle />} progress={75}>
                Biberons/tétés
                </BabyCard>
                <BabyCard icon={<AiOutlinePicture  />} progress={75}>
                Suivi des 1er moments
                </BabyCard>
                <BabyCard icon={<ImSleepy />} progress={75}>
                Réveil
                </BabyCard>
                <BabyCard icon={<GiNightSleep />} progress={75}>
                Sieste et dodo
                </BabyCard>
                <BabyCard icon={<GiBabyBottle />} progress={75}>
                Biberons/tétés
                </BabyCard>
                <BabyCard icon={<AiOutlinePicture  />} progress={75}>
                Suivi des 1er moments
                </BabyCard>
            </div>
        </div>
       
    )
}
export default Baby;