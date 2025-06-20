import mood from "../../../assets/img/mood.jpg";
import Btn from "../../../components/btn";

function Mood() {
    return(
        <div className="bg-orange-50 h-screen">
            <h1 className="font-black gap-4 pl-5 pt-6 pb-4 font-light text-xl">Mood</h1>
            <div className="flex flex-col items-center justify-center text-center gap-6 p-4">
                <img src={mood} alt="" className="w-56 h-56 object-cover rounded-full" />
                <p className="text-sm italic text-gray-500 max-w-md">
                    Les premiers mois avec un bébé sont souvent un véritable tourbillon d’émotions pour les jeunes parents. 
                    Entre émerveillement, fatigue intense et doutes, l’humeur peut varier d’un jour à l’autre. 
                    Il est normal de se sentir parfois dépassé, mais aussi profondément comblé. 
                    Prendre conscience de ces fluctuations permet de mieux les accueillir. 
                    Avec du soutien, de l’écoute et un peu de temps pour soi, l’équilibre émotionnel revient peu à peu.
                </p>
                <Btn className="w-[90%] max-w-xs mx-auto flex justify-center items-center px-4 py-2 rounded bg-blue-100 hover:bg-blue-200 text-sm font-medium">
                    Commencer
                </Btn>
            </div>


        </div>
    )
}
export default Mood;