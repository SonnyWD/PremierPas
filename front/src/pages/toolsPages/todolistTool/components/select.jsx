import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectWithIcon = ({
  options = [],
  selected,
  onChange,
  activeTab,
  onClickWhenPersonalized,
  className = ""
}) => {
  const navigate = useNavigate();
  const [localSelected, setLocalSelected] = useState("");

  useEffect(() => {
    if (selected) {
      setLocalSelected(selected);
    } else if (Array.isArray(options) && options.length > 0) {
      setLocalSelected(options[0].title);
    }
  }, [selected, options]);

  const handleClick = (e) => {
    // rediriger ou appeler un callback selon le contexte
    if (activeTab === "personnalise") {
      e.preventDefault();
      navigate("/todos/mes-listes");
    } else if (onClickWhenPersonalized) {
      e.preventDefault();
      onClickWhenPersonalized();
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalSelected(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className={`relative inline-flex items-center ml-auto ${className}`}>
      <select
        value={localSelected}
        onClick={handleClick}
        onChange={handleChange}
        className="appearance-none bg-orange-ombre text-orange-text font-bold font-primary-cta text-xs rounded-full border-none py-[10px] pl-[10px] pr-8 shadow-[calc(-4px)_1px_5px_-2px_#E7AD7A] outline-none cursor-pointer"
      >
        {Array.isArray(options) &&
          options.map((suggested, id) => (
            <option key={id} value={suggested.title}>
              {suggested.title}
            </option>
          ))}
      </select>
      <IoIosArrowDown className="absolute right-2 pointer-events-none text-orange-text" />
    </div>
  );
};

export default SelectWithIcon;
