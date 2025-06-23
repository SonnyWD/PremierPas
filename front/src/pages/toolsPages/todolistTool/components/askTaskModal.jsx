import { MdOutlineClose } from "react-icons/md";
import Btn from "../../../../components/btn";
import { useState } from "react";

function AddTaskModal({ onClose, onAdd }) {
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [description, setDescription] = useState("");

  const handleConfirm = () => {
    if (!description.trim()) return;

    onAdd({
      date,
      heure,
      description,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-bleu-clair/40 backdrop-blur-sm z-50 flex items-center justify-center p-5">
      <div className="bg-yellow-40 rounded-2xl shadow-lg w-full max-w-md p-[15px] relative">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-bleu-clair">Ajouter une tâche</h2>
          <Btn
            onClick={onClose}
            className="w-[38px] h-[42px] flex items-center justify-center text-orange border-2 border-orange bg-primary-bg rounded-full shadow-none"
          >
            <MdOutlineClose size={26} />
          </Btn>
        </div>

        <div className="flex flex-col gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[20%] text-center">
              Date
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date de fin"
              className="w-[80%] bg-primary-bg rounded-[15px] px-2.5 py-[15px] text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-4 w-[20%] text-center">
              Horaire
            </div>
            <input
              type="text"
              value={heure}
              onChange={(e) => setHeure(e.target.value)}
              placeholder="Heure de fin"
              className="w-[80%] bg-primary-bg rounded-[15px] px-2.5 py-4 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-bleu-turquoise text-bleu-clair rounded-[15px] px-2.5 py-[15px] w-[20%] text-center self-start">
              Tâche
            </div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décris la tâche..."
              className="w-[80%] bg-primary-bg rounded-[15px] px-2.5 py-[15px] h-[79px] text-sm"
            />
          </div>

          <div className="ml-auto">
            <Btn
              onClick={handleConfirm}
              className="text-bleu-clair px-2.5 py-[15px] w-[79px] rounded-full text-sm font-semibold"
              variant="secondary"
            >
              OK
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
