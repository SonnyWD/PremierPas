import { useEffect, useState, useRef } from "react";
import { fetchPregnancy } from "../../../services/pregnancyService";

function PregnancyWeeks() {

  const [pregnancy, setPregnancy] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const activeWeekRef = useRef(null);

  let totalWeeks = 40; 
  let currentWeek = 0;
  

  if (pregnancy) {
    const startDate = new Date(pregnancy.startDate);
    const dueDate = pregnancy.dueDate ? new Date(pregnancy.dueDate) : null;

    if (dueDate) {
      totalWeeks = Math.ceil((dueDate - startDate) / (7 * 24 * 60 * 60 * 1000));
    }

    const now = new Date();
    const diffWeeks = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
    currentWeek = diffWeeks > 0 ? diffWeeks : 0;
  }

  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);
  
  useEffect(() => {
    const fetchPregnancyWeek = async () => {
      try {
        const activePregnancy = await fetchPregnancy();
        setPregnancy(activePregnancy);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors du chargement de la grossesse.");
        setLoading(false);
      }
    };
    fetchPregnancyWeek();
  }, [])

  useEffect(() => {
    if (activeWeekRef.current) {
      activeWeekRef.current.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, [pregnancy]);
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!pregnancy) return <div>Aucune grossesse active trouvée.</div>;

  return (
    <div className="flex items-center gap-4 overflow-x-auto p-4 rounded hide-scrollbar">
      {weeks.map((week) => {
        const daysSinceStart = week * 7;
        return (
          <div
          key={week}
          ref={week === currentWeek ? activeWeekRef : null}
          className="flex flex-col items-center cursor-pointer text-bleu-clair">
            <div className="h-4 w-full text-center text-xs mb-4 text-bleu-clair font-primary-cta font-bold">
              {week === currentWeek ? `${daysSinceStart} jours` : "\u00A0"}
            </div>
            <div
              className={`rounded-full ${
                week === currentWeek ? "bg-yellow w-[52px] h-[52px] shadow-glow-yellow"
                  : "bg-orange w-[36px] h-[36px]"
              } flex items-center justify-center`}
            >
              <span className={`text-sm ${week === currentWeek ? 'font-primary-cta font-bold' : ""}`}>{week}</span>
            </div>
          </div>
        );
        
      })}
    </div>
  );
}
export default PregnancyWeeks;