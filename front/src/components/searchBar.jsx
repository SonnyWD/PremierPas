import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBar({ placeholder, variant = "orange", className = "", onChange }) {
  const variantBg = 
      variant === "gray"
      ? "bg-gray2"
      : variant === "yellow"
      ? "bg-yellow"
      : "bg-orange";


  return (
    <div className="relative w-full max-w-md items-center">
      <input
        type="text"
        placeholder={placeholder}
        className={`rounded-full w-full p-2.5 placeholder-bleu-clair ${variantBg} ${className}`}
        onChange={onChange}
      />
      <HiMagnifyingGlass className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
}

export default SearchBar;
