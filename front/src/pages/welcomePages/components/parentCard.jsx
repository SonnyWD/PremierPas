import grossesse from "../../../assets/img/grossesse.svg"
import { usePregnancy } from "../../../hooks/usePregnancy";
import { getTimeUntilDueDate } from "../utils/pregnancyUtils";

function ParentCard() {

  const { pregnancy, loading, error } = usePregnancy();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!pregnancy) return <div>Aucune grossesse active.</div>;

  const { months, weeks, days } = getTimeUntilDueDate(pregnancy.startDate, pregnancy.dueDate);

    return (
        <div className="text-bleu-clair bg-orange flex flex-col rounded-2xl p-4 gap-5">
            <div className="bg-orange2 text-center rounded-2xl py-2.5 w-[299px] m-auto h-[62px]">
                <h3>Mon terme</h3>
                <p>Dans <span>{months} mois, {weeks} semaines et {days} jours.</span> </p>
            </div>
            <div className="grid grid-cols-3 rounded-2xl p-4 gap-x-2 gap-y-3 text-bleu-clair">
                <div className="border-r border-orange2 h-[84px]">
                    <h3 className="text-sm">Mon humeur</h3>
                    <p>4/5</p>
                </div>
                <div className="border-r border-orange2 h-[84]">
                    <h3 className="text-sm">Mes alertes lues</h3>
                    <p>2/3</p>
                </div>
                <div>
                    <h3 className="text-sm">Mes symptômes</h3>
                    <p>Nausé</p>
                </div>
                <div className="border-r border-orange2 h-[84px]">
                    <h3 className="text-sm">Ma croissance</h3>
                    <p>Taille :<span>1m</span></p>
                    <p>Poids :<span>89kg</span></p>
                </div>
                <div>
                    <h3 className="text-sm">Mes rappels programmés</h3>
                    <p>6</p>
                </div>
                <div>
                    <img src={grossesse} alt="" className="w-20"/>
                </div>                        
            
            </div>
        </div>
    )
    
}
export default ParentCard;