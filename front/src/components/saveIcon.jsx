import { FaBookmark } from "react-icons/fa";

function SaveIcon({ onClick, className = "" }) {
  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      <FaBookmark className="text-orange border-2 border-orange h-9 w-9 rounded-full p-2"/>
    </div>
  );
}

export default SaveIcon;
