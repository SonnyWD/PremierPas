import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-blue-300 text-white rounded hover:bg-red-600"
    >
      Se déconnecter
    </button>
  );
}

export default LogoutButton;
