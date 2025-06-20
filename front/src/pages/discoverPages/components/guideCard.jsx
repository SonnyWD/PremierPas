import alexia from "../../../assets/img/alexia.jpg"
import leo from "../../../assets/img/leo.jpg"
import sarah from "../../../assets/img/sarah.jpg"

function GuideCard() {
    const guideArray = [
        {
            title: "Bien-être",
            text: "Une bonne alimentation c’ets le début d’une bonne reprise",
            img: alexia,
            bgColor: "bg-yellow-40",
            textColor: "title-black"
        },
        {
            title: "Les nuits",
            text: "Une bonne alimentation c’ets le début d’une bonne reprise",
            img: leo,
            bgColor: "bg-bleu-clair2",
            textColor: "text-bleu-clair"
        },
        {
            title: "Recette",
            text: "Une bonne alimentation c’ets le début d’une bonne reprise",
            img: sarah,
            bgColor: "bg-orange2",
            textColor: "title-orange"
        }
    ]
    return (
        <div>
           <div className=" flex overflow-x-auto hide-scrollbar gap-4 ">
                {guideArray.map((card, index) => 
                    <div key={index} className={`flex flex-col rounded-[20px] justify-between items-center gap-3 text-center ${card.bgColor} ${card.textColor} min-w-[126px] min-h-[195px] px-[10px] py-[15px]`}>
                        <h2 className={`${card.textColor}`}>{card.title}</h2>
                        <p className="text-xs mb-3 font-primary-cta">{card.text}</p>
                        <img src={card.img} alt=""className="h-17  w-full object-cover rounded-xl" />
                        </div>
                )}
            </div>     
                       
        </div>
    )
}
export default GuideCard;