import logo from "../../../assets/img/logo.png";

function CardExpert() {
    return(
        <div className="flex flex-col items-center justify-between bg-orange rounded-xl shadow-md px-3 w-[164px] shrink-0 pb-3">
            <img src={logo} alt="" className="w-40"/>
            <h4 className="text-bleu-clair font-title-primary w-2/3 mb-4 self-start">Le ventre de maman</h4>
            <div className="flex justify-between w-full items-center">
                <h5 className="bg-primary-bg px-3 font-bold pb-0.75 flex self-center text-bleu-clair rounded-full">maman</h5>
                <p className="text-bleu-clair">01:20m</p>
            </div>
            
        </div>
    )
}
export default CardExpert;