import { useState, useEffect } from "react";
import { MdOutlineClose, MdOutlineEdit } from "react-icons/md";
import Btn from "../../../components/btn";
import { useUser } from "../../../context/userContext";
import { usePregnancy } from "../../../hooks/usePregnancy";
import { createPregnancy, updatePregnancy, fetchPregnancy } from "../../../services/pregnancyService";
import { upsertBaby, createBabyMeasure } from "../../../services/babyService";

function ModifyPregnancyModal({ onClose }) {

  const { user } = useUser();
  const { pregnancy, refresh }  = usePregnancy();

  const [dueDate, setDueDate] = useState("");
  const [firstName, setfirstName] = useState("");
  const [sizeCm, setSizeCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pregnancy) {
      setDueDate(pregnancy.dueDate?.substring(0, 10) || "");
      setfirstName(pregnancy.firstName  || "");
      setSizeCm(pregnancy.sizeCm || "");
      setGender(pregnancy.gender   || "");
      setWeightKg(pregnancy.weightKg || "");
    }
  }, [pregnancy]);

  const handleSave = async () => {
  setLoading(true);
  setMessage("");

  try {
    const payloadPregnancy = {
      startDate: pregnancy?.startDate || new Date().toISOString(),
      dueDate,
      status: pregnancy?.status || "en cours",
    };

    let pregnancyId;

    if (pregnancy?.id) {
      await updatePregnancy(pregnancy.id, payloadPregnancy);
      pregnancyId = pregnancy.id;
    } else {
      const newPreg = await createPregnancy(payloadPregnancy);
      pregnancyId = newPreg.id;
    }

    const birthDate = dueDate ? new Date(dueDate).toISOString() : undefined;

    const babyPayload = {
        pregnancyId,
        firstName,
        gender,
        ...(birthDate && { birthDate }),
    };

    const baby = await upsertBaby(babyPayload);

    const measurePayload = {
      babyId: Number(baby.id),
      sizeCm: Number(sizeCm),
      weightKg: Number(weightKg)
    };

    await createBabyMeasure(measurePayload);
    await refresh();

    setMessage("Enregistré !");
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 700);

  } catch (err) {
    console.error("Erreur complète :", err);
    setMessage("Erreur de sauvegarde.");
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-bleu-clair2/1 backdrop-blur-sm z-50 flex items-center justify-center p-5 font-primary-cta">
      <div className="bg-yellow-40 rounded-2xl shadow-lg w-full max-w-md p-6 relative">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-bleu-clair">Modifier ma grossesse</h2>
          <Btn onClick={onClose}
               className="w-[38px] h-[42px] flex items-center justify-center text-orange border-2 border-orange bg-primary-bg rounded-full">
            <MdOutlineClose size={26}/>
          </Btn>
        </div>

        <div className="bg-orange rounded-full px-4 py-[15px] flex justify-between mb-4 text-xs">
          <span className="text-bleu-clair font-bold">
            {user?.firstName || "Moi"}
          </span>
          <span className="text-bleu-clair">
            {user?.age ? `${user.age} ans` : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-xs">
          <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[35%] text-center font-bold">
            Date du terme
          </div>
          <div className="relative w-[60%]">
            <input type="date"
                   value={dueDate}
                   onChange={(e) => setDueDate(e.target.value)}
                   className="bg-primary-bg rounded-[15px] px-3 py-[15px] text-sm w-full pr-8"/>
            <MdOutlineEdit className="absolute right-2 top-1/2 -translate-y-1/2 text-bleu-clair"/>
          </div>
        </div>

        <div className="bg-orange rounded-[15px] px-4 py-3 mb-4">
          <h2 className="text-center text-bleu-clair font-bold mb-3">
            1er enfant
          </h2>

          <div className="flex justify-between">
            <div className="flex items-center justify-between mb-3">
                <span className="text-bleu-clair font-bold">
                {firstName || "N/A"}
                </span>
            </div>

            <select value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="bg-primary-bg rounded-[15px] px-3 py-[15px] text-sm font-bold text-center">
                <option value="">Sexe</option>
                <option value="F">Fille</option>
                <option value="M">Garçon</option>
            </select>
            </div>
          </div>
          
        <div className="flex items-center gap-2 mb-4 text-xs">
          <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[35%] text-center font-bold">
            Prénom
          </div>
          <input type="text"
                 value={firstName}
                 onChange={(e) => setfirstName(e.target.value)}
                 placeholder="Liam"
                 className="bg-primary-bg rounded-[15px] px-3 py-[15px] text-xs w-[60%] text-orange-text"/>
        </div>

        <div className="flex items-center gap-2 mb-6 text-xs">
          <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[35%] text-center font-bold">
            Taille fœtus
          </div>
          <input type="text"
                 value={sizeCm}
                 onChange={(e) => setSizeCm(e.target.value)}
                 placeholder="15 cm"
                 className="bg-primary-bg  text-orange-text rounded-[15px] px-3 py-[15px] text-sm w-[60%]"/>
        </div>

        <div className="flex items-center gap-2 mb-6 text-xs">
          <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[35%] text-center font-bold">
            Poids du fœtus
          </div>
          <input type="text"
                 value={weightKg}
                 onChange={(e) => setWeightKg(e.target.value)}
                 placeholder="3g"
                 className="bg-primary-bg  text-orange-text rounded-[15px] px-3 py-[15px] text-sm w-[60%]"/>
        </div>

        {message && <p className="text-center text-sm text-orange mb-4">{message}</p>}

        <Btn onClick={handleSave}
             disabled={loading}
             variant="secondary"
             className="w-full py-[15px] rounded-full">
          {loading ? "Enregistrement…" : "OK"}
        </Btn>
      </div>
    </div>
  );
}

export default ModifyPregnancyModal;
