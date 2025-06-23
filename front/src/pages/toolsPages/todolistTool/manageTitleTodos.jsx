import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Btn from "../../../components/btn";
import { FiArrowRight } from "react-icons/fi";

function ManageTitleTodos({ personalizedTodos, setPersonalizedTodos, setShowAddCategoryModal, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("listes");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = (titleToDelete) => {
    const confirmDelete = window.confirm(`Supprimer la catégorie "${titleToDelete}" ?`);
    if (confirmDelete) {
      setPersonalizedTodos(prev => prev.filter(p => p.title !== titleToDelete));
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#FFF6EB] via-[#F7DFC7] to-[#EFC7A2] bg-fixed min-h-screen z-40 pt-10 px-4 pb-32 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold title-orange2">Mes listes persos</h2>
        <Btn
          onClick={onClose}
          className="text-orange border-2 border-orange bg-primary-bg rounded-full w-[38px] h-[42px] shadow-none"
        >
          X
        </Btn>
      </div>

      <div className="flex justify-center mb-8 pb-2.5 mt-4">
        <button
          onClick={() => setActiveTab("listes")}
          className={`w-full px-2.5 py-[15px] rounded-full ${
            activeTab === "listes"
              ? "bg-primary-bg text-bleu-clair font-bold shadow"
              : "bg-bleu-turquoise text-bleu-clair font-normal"
          } text-xs transition duration-200`}
        >
          Mes listes
        </button>
        <button
          onClick={() => setActiveTab("modifier")}
          className={`w-full px-2.5 py-[15px] rounded-full ${
            activeTab === "modifier"
              ? "bg-primary-bg text-bleu-clair font-bold shadow"
              : "bg-bleu-turquoise text-bleu-clair font-normal"
          } text-xs transition duration-200`}
        >
          Modifier mes listes
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === "listes" && personalizedTodos.length > 0 && (
          <ul className="mb-6 space-y-4 bg-bleu-clair2 px-2.5 py-[15px] rounded-[15px]">
            {personalizedTodos.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedItem(item.title)}
                className={`flex justify-between items-center px-2.5 py-[15px] rounded-[15px] text-sm cursor-pointer transition
                  ${selectedItem === item.title
                    ? "bg-bleu-turquoise text-bleu-clair font-bold"
                    : "bg-bleu-clair2 text-bleu-clair font-normal"}`}
              >
                {item.title}
                {selectedItem !== item.title && (
                  <FiArrowRight className="text-bleu-clair text-lg" />
                )}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "modifier" && personalizedTodos.length > 0 && (
          <ul className="mb-6 space-y-4 bg-bleu-clair2 px-2.5 py-[15px] rounded-[15px]">
            {personalizedTodos.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-2.5 py-[15px] rounded-[15px] text-sm text-bleu-clair bg-bleu-turquoise"
              >
                {item.title}
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => handleDelete(item.title)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto space-y-4">
        {activeTab === "listes" && (
          <>
            <Btn
              onClick={() => setShowAddCategoryModal(true)}
              variant="secondary"
              className="w-full py-[15px] rounded-full"
            >
              Ajouter une catégorie
            </Btn>
            <Btn
              onClick={onClose}
              variant="premiumBtn"
              className="w-full py-[15px] rounded-full"
            >
              Enregistrer
            </Btn>
          </>
        )}

        {activeTab === "modifier" && (
          <Btn
            onClick={() => setShowAddCategoryModal(true)}
            variant="secondary"
            className="w-full py-3 rounded-full"
          >
            Ajouter une catégorie
          </Btn>
        )}
      </div>
    </div>
  );
}

export default ManageTitleTodos;
