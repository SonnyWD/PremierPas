import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

function FavoriteIcon({ onClick, className = "", isSaved = false}) {

  const variantClasses = {
    primary: "text-secondary-bg h-9 w-9 p-2",
    secondary: "text-secondary-bg h-9 w-9 p-2"
  };

  const appliedClass = isSaved ? variantClasses.secondary : variantClasses.primary;
  const IconComponent = isSaved ? FaBookmark : FaRegBookmark;

  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      <IconComponent className={`${appliedClass} ${className}`} />
    </div>
  );
}

export default FavoriteIcon;
