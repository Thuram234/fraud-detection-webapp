import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock, ShieldCheck } from "lucide-react";
import "../styles/LoginPage.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Connexion simulée : aucune vérification réelle, n'importe quelle saisie fonctionne
    onLogin();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <ShieldCheck size={28} color="var(--color-primary)" />
          <h2>Connexion — Espace responsable</h2>
          <p className="login-note">(Accès simulé, à des fins de démonstration uniquement)</p>
        </div>

        <label className="input-group">
          <User size={16} />
          <input
            type="text"
            placeholder="Identifiant"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="input-group">
          <Lock size={16} />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary login-submit">
          <LogIn size={18} /> Se connecter
        </button>
      </form>
    </div>
  );
}