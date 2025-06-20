import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Btn from "../components/btn";
import PasswordInput from "../components/passwordInput";
import { toast } from "react-toastify";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    if (!nom || !prenom || !email || !password || !confirmPassword) {
        toast.error("Veuillez remplir tous les champs.");
        return;
      }
      
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          mot_de_passe: password,  
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Inscription réussie !");
        navigate("/login");
      } else {
        toast.error(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FFF6EB] from-[0%] via-[#FFF6EB] via-[35.2%] to-[#FCE4B7] to-[100%] pt-10 bg-fixed px-4 px-4">
      <h1 className="text-2xl font-semibold mb-6 mr-auto">Inscription</h1>
      <form className="container w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>

        <Input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)} 
        className="bg-yellow rounded-full mb-2"
        />

        <Input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)} 
        className="bg-yellow rounded-full mb-2"
        />

        <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        className="bg-yellow rounded-full mb-2"
        />

        <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        />

        <Input
        type="password"
        placeholder="Confirmez le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
        className="bg-yellow rounded-full my-2"
        />

        <div className="submit-btn flex justify-center">
          <Btn type="submit" className="w-full px-4 py-[15px] text-orange-text rounded-full text-xs transition text-bold" variant="secondary">S'inscrire</Btn>
        </div>
      </form>
      <button
      onClick={() => navigate("/")}
      className="px-4 py-2 text-bleu-clair text-xs text-bold mr-auto mt-2"
    >
      ← Retour
      </button>
    </div>
  );
}

export default Register;
