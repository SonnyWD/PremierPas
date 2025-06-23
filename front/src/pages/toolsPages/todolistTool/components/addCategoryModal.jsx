import { useState } from "react";
import Btn from "../../../../components/btn";
import { MdOutlineClose } from "react-icons/md";

function AddCategoryModal({ onClose, personalizedTodos, setPersonalizedTodos }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setMessage("Le titre ne peut pas être vide.");
      return;
    }

    if (personalizedTodos.some((t) => t.title === trimmed)) {
      setMessage("Cette catégorie existe déjà.");
      return;
    }

    setPersonalizedTodos((prev) => [...prev, { title: trimmed, taches: [] }]);
    setTitle("");
    setMessage("Catégorie ajoutée !");
    setTimeout(onClose, 800);
  };

  return (
    <div className="fixed inset-0 bg-bleu-clair/40 backdrop-blur-sm z-50 flex items-center justify-center p-5">
      <div className="bg-yellow-40 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-bleu-clair">Ajouter une catégorie</h2>
          <Btn
            onClick={onClose}
            className="w-[38px] h-[42px] flex items-center justify-center text-orange border-2 border-orange bg-primary-bg rounded-full shadow-none"
          >
            <MdOutlineClose size={26} />
          </Btn>
        </div>

        <input
          type="text"
          placeholder="Nom de la nouvelle catégorie"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-30 mb-4 px-4 py-2 rounded-[15px] text-sm bg-primary-bg"
        />

        {message && (
          <div className="text-sm mb-4 text-center text-orange-text font-semibold">{message}</div>
        )}

        <div className="w-full">
          <Btn onClick={handleAdd} variant="secondary" className="text-bleu-clair ml-auto flex items-center justify-center px-2.5 py-[15px] w-[79px] rounded-full text-sm font-semibold">
            OK
          </Btn>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
