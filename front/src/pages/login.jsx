import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import Input from "../components/input";
import { jwtDecode } from "jwt-decode";
import PasswordInput from "../components/passwordInput"; 
import { toast } from "react-toastify"; 
import logo from "../assets/img/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

useEffect(() => {

  window.handleGoogleSignIn = async (response) => {
    console.log('JWT reçu:', response.credential)
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      })
      const data = await res.json();
      if (res.ok) {

        localStorage.setItem('token', data.accessToken)
        toast.success('Connexion via Google réussie')
        navigate('/welcome')
      } else {
        toast.error(data.message || "Erreur lors de la connexion via Google")
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion à Google")
      console.error(error)
    }
  }

  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: "652919734138-ag9pp5spr99hh1itlf5m9t3co0e97l2f.apps.googleusercontent.com",
      callback: window.handleGoogleSignIn
    })
    window.google.accounts.id.renderButton(
      document.getElementById('g_id_signin'),
      { theme: "filled_white", size: "full", text: "signin_with", shape: "pill" }
    )
  }
}, [navigate]) 


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
      const response = await fetch(`${apiUrl}/auth/login`, {
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
        navigate("/welcome");
      } else {
        toast.error(data.message || "Email ou mot de passe incorrect."); 
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur de connexion au serveur."); 
    }
  };


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FFF6EB] from-[0%] via-[#FFF6EB] via-[35.2%] to-[#FCE4B7] to-[100%] pt-10 bg-fixed px-4">
      <h1 className="text-2xl font-semibold mb-6 text-start mr-auto">Se connecter</h1>
      <img src={logo} alt="" className="w-[129px]"/>
  
      <form className="container w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="" className="text-bleu-clair font-primary-cta text-xs font-bold">Email</label>
        <Input
          type="email"
          placeholder="xxx@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-yellow rounded-full"
        />

        <label htmlFor="" className="text-bleu-clair font-primary-cta text-xs font-bold">Mot de passe</label>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showHint={false}
        />

        <div className="submit-btn flex flex-col justify-center">
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-bleu-clair text-xs text-bold"
            >
              ← Retour
            </button>
            <button
            onClick={() => navigate("/mot-de-passe-oublie")}
            className="mt-2 bg-none text-xs text-bleu-clair py-8" 
            >
            Mot de passe oublié ?
            </button>
            
          </div>
           
          <Btn type="submit" className="w-full px-4 py-[15px] text-orange-text rounded-full text-xs transition text-bold" variant="secondary">
            Se connecter
          </Btn>
          <button className="text-bleu-clair py-8 font-light">Pas de compte ? <Link to="/register" className="font-bold">Inscris-toi !</Link></button>
          {/*<p className="text-bleu-clair text-center pb-8">ou</p>
          <div className="flex flex-col items-center w-full"> 
          <div id="g_id_onload"
            data-client_id="652919734138-ag9pp5spr99hh1itlf5m9t3co0e97l2f.apps.googleusercontent.com"
            data-context="signup"
            data-ux_mode="popup"
            data-callback="handleGoogleSignIn"
            data-auto_select="false"
            data-itp_support="true"
            >
          </div>

          <div id="g_id_signin" data-type="pill">Sign up with Google</div>

      </div>*/}
        </div>
      </form>
    </div>
  );
}

export default Login;