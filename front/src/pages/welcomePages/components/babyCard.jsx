import { useEffect, useState } from "react";
import { fetchBabyData } from "../../../services/babyService";
import baby from "../../../assets/img/baby.svg"

function BabyCard() {

    const [babyData, setBabyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBabyDatas = async () => {
            try {
                const baby = await fetchBabyData();
                setBabyData(baby);
                setLoading(false);
            } catch(error) {
                setError("Erreur lors du chargement des données du bébé.");
                setLoading(false)
            }
        };
        fetchBabyDatas();
    }, [])

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!babyData) return <div>Aucun bébé trouvé.</div>;

    const sortedMeasures = babyData.measures && Array.isArray(babyData.measures)
        ? [...babyData.measures].sort((a, b) => new Date(a.dateMesure).getTime() - new Date(b.dateMesure).getTime()) : [];

    const latestMeasure = sortedMeasures.length > 0 ? sortedMeasures[sortedMeasures.length - 1] : null;

    const displayWeight = latestMeasure && latestMeasure.weightKg !== undefined ? `${latestMeasure.weightKg}kg` : 'N/A';
    
    const displaySize = latestMeasure && latestMeasure.sizeCm !== undefined ? `${latestMeasure.sizeCm}cm` : 'N/A';

    return (
        <div className="flex justify-evenly bg-bleu-clair rounded-2xl pt-[15px] px-[10px] pb-[10px] gap-4 text-white">
                  <div className="border-r border-orange flex flex-col justify-between pr-2">
                    <h3 className="font-title-h3">Prénom</h3>
                    <p  className="text-orange2">{babyData.firstName || 'N/A'}</p>
                  </div>
                  <div className="border-r border-orange flex flex-col justify-between pr-2">
                    <h3 className="font-title-h3">Poids</h3>
                    <p  className="text-orange2">{displayWeight || 'N/A'}</p>
                  </div>
                  <div className=" flex flex-col justify-between">
                    <h3 className="font-title-h3">Taille</h3>
                    <p  className="text-orange2">{displaySize || 'N/A'}</p>
                  </div>
                  <div>
                    <img src={baby} alt="" className="w-[56px]"/>
                  </div>

              </div>
    )
}
export default BabyCard;