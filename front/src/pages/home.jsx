import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Btn from "../components/btn";

function Home() {
  return (
    <div className="home flex flex-col items-center justify-center h-screen bg-orange-50">
      <img src={logo} alt="" className="w-2xl"/>
      <div className="button-container flex flex-col w-[90%] items-center h-[20%]">
        <Link to="/login" className="w-full max-w-sm">
        <Btn className="w-[100%] px-4 py-4 mb-5 rounded-xl bg-blue-100 hover:bg-blue-200 text-sm font-medium">Se connecter</Btn>
        </Link>
        <Link to="/register" className="w-full max-w-sm">
        <Btn className="w-[100%] px-4 py-4 rounded-xl bg-blue-100 hover:bg-blue-200 text-sm font-medium">S'inscrire</Btn>
        </Link>
      </div>
    </div>
  );
}

export default Home;
