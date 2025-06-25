import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Btn from "../components/btn";

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FFF6EB] from-[0%] via-[#FFF6EB] via-[35.2%] to-[#FCE4B7] to-[100%] pt-10 bg-fixed px-4">
      <img src={logo} alt="" className="w-2xl"/>
      <div className="button-container flex flex-col w-[90%] items-center h-[20%]">
        <Link to="/login" className="w-full max-w-sm">
        <Btn className="w-[100%] px-4 py-4 mb-5 rounded-xl text-orange-text text-sm font-medium" variant="secondary">Se connecter</Btn>
        </Link>
        <Link to="/register" className="w-full max-w-sm">
        <Btn className="w-[100%] px-4 py-4 rounded-xl text-orange-text text-sm font-medium" variant="secondary">S'inscrire</Btn>
        </Link>
      </div>
    </div>
  );
}

export default Home;
