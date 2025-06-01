import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import Input from "../components/input";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../components/passwordInput"; 
import { toast } from "react-toastify"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

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
        let userPayload = jwtDecode(data.accessToken);

        if (typeof userPayload.isPremium === 'undefined') {
          userPayload = { ...userPayload, isPremium: false };
        }
        localStorage.setItem('userPayload', JSON.stringify(userPayload));

        toast.success("Connexion réussie !"); 
        navigate("/bienvenue");
      } else {
        toast.error(data.message || "Email ou mot de passe incorrect."); 
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion au serveur."); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-orange-50 px-4">
      <h1 className="text-2xl font-semibold mb-6">Se connecter</h1>

  
      <form className="container w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          showHint={false}
        />

        <div className="submit-btn flex justify-center">
          <Btn type="submit" className="w-full px-4 py-2 bg-blue-300 hover:bg-blue-400 text-white rounded font-medium text-base transition">
            Se connecter
          </Btn>
        </div>
      </form>

      <div className="flex flex-col items-center mt-4"> 
        <Btn
          onClick={() => navigate("/")}
          className="px-4 py-2 text-gray-700"
        >
          ← Retour
        </Btn>

        <Btn
          onClick={() => navigate("/mot-de-passe-oublie")}
          className="mt-2 text-sm text-blue-600 hover:underline" 
        >
          Mot de passe oublié ?
        </Btn>
      </div>
    </div>
  );
}

export default Login;