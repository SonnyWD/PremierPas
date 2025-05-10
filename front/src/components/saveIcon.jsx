import { FaRegHeart, FaHeart } from "react-icons/fa";

function SaveIcon({ onClick, isSaved = false, className = "" }) {
  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      {isSaved ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-400" />
      )}
    </div>
  );
}

export default SaveIcon;
