import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import Input from "../components/input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          mot_de_passe: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.accessToken);
        navigate("/bienvenue");
      } else {
        alert(data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-orange-50 px-4">
      <h1 className="text-2xl font-semibold mb-6">Se connecter</h1>

      <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>

        <Input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Btn type="submit" className="w-full px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded font-medium text-base transition">
          Se connecter
        </Btn>

      </form>
      <div>

      <Btn
        onClick={() => navigate("/")}
        className="px-4 py-2 text-gray-700"
      >
        ← Retour
      </Btn>

      <Btn
        onClick={() => navigate("/mot-de-passe-oublie")}
        className="mt-2 text-sm hover:underline"
      >
        Mot de passe oublié ?
      </Btn>
      
      </div>
    </div>
  );
}

export default Login;
