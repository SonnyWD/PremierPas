import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur Premier Pas !</h1>
      <div className="button-container">
        <Link to="/login">
          <button>Se connecter</button>
        </Link>
        <Link to="/register">
          <button>S'inscrire</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
