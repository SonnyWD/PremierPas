import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";

const SelectWithIcon = ({ options, selected, onChange }) => {
  const [localSelected, setLocalSelected] = useState(selected || options[0]?.title || "");

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleChange = (e) => {
    setLocalSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="relative inline-flex items-center ml-auto">
      <select
        value={localSelected}
        onChange={handleChange}
        className="appearance-none bg-orange-ombre text-orange-text font-bold font-primary-cta text-xs rounded-full border-none py-[10px] pl-[10px] pr-8 shadow-[calc(-4px)_1px_5px_-2px_#E7AD7A] outline-none"
      >
        {options.map((suggested, id) => (
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
