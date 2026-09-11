import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Cpu, LineChart } from "lucide-react";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-content">
        <div className="landing-icon">
          <ShieldCheck size={40} color="var(--color-primary)" />
        </div>
        <h1>FraudGuard</h1>
        <p className="landing-subtitle">
          Simulation d'un système de détection de fraude bancaire assisté par Machine Learning.
        </p>
        <p className="landing-description">
          Cette application illustre comment un établissement bancaire pourrait intégrer un modèle
          de Machine Learning (Random Forest) dans son processus de contrôle des transactions —
          l'IA propose une analyse de risque, un responsable valide la décision finale.
        </p>

        <div className="landing-features">
          <div className="feature">
            <Cpu size={20} color="var(--color-primary)" />
            <span>Analyse en temps réel via un modèle entraîné sur des données réelles</span>
          </div>
          <div className="feature">
            <LineChart size={20} color="var(--color-primary)" />
            <span>Suivi et historique des décisions prises</span>
          </div>
        </div>

        <button className="btn btn-primary landing-cta" onClick={() => navigate("/login")}>
          Accéder à la simulation <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}