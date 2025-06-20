import Btn from "../../../components/btn";

function CardTeam({name, role, image}) {
    return(
        <div className="flex items-center justify-between bg-primary-bg rounded-[20px] px-2.5 py-3 min-w-[250px]">
            <img src={image} alt="" className="w-12 h-12 object-cover rounded-full"/>
            <div className="flex flex-col text-bleu-clair">
                <p className="font-title-primary">{name}</p>
                <p>{role}</p>
            </div>
            <Btn className="rounded-full h-10 !px-1 !py-1">Voir +</Btn>
        </div>
    )
}
export default CardTeam;