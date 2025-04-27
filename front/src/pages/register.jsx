import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
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
          date_naissance: dateNaissance,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Inscription réussie !");
        navigate("/login");
      } else {
        alert(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div>
      <h1>S'inscrire</h1>
      <form className="container" onSubmit={handleSubmit}>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Nom" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input 
            type="text" 
            placeholder="Prénom" 
            value={prenom} 
            onChange={(e) => setPrenom(e.target.value)} 
          />
        </div>
        <div className="input-container">
         <input 
            type="date" 
            placeholder="Date de naissance" 
            value={dateNaissance} 
            onChange={(e) => setDateNaissance(e.target.value)} 
         />
        </div>

        <div className="input-container">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="input-container">
          <input 
            type="password" 
            placeholder="Confirmez le mot de passe" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <div className="submit-btn">
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
