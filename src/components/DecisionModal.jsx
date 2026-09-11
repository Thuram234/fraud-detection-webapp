import { X, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import "../styles/DecisionModal.css";

const riskConfig = {
  low: {
    icon: CheckCircle2,
    tone: "success",
    title: "Transaction jugée légitime",
    description: "Le modèle estime cette transaction conforme, avec une forte confiance.",
  },
  medium: {
    icon: AlertTriangle,
    tone: "warning",
    title: "Profil ambigu détecté",
    description: "Le modèle ne peut pas trancher avec certitude — un examen manuel est recommandé.",
  },
  high: {
    icon: ShieldAlert,
    tone: "danger",
    title: "Risque de fraude élevé",
    description: "Le modèle détecte un comportement fortement associé à des cas de fraude confirmés.",
  },
};

export default function DecisionModal({ transaction, onClose, onResolve }) {
  const { riskLevel, fraudProbability, id, amount } = transaction;
  const { icon: Icon, tone, title, description } = riskConfig[riskLevel];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>

        <div className={`modal-icon modal-icon-${tone}`}>
          <Icon size={26} />
        </div>

        <h2>{title}</h2>
        <p className="modal-transaction-ref">{id} — {amount.toLocaleString("fr-FR")} €</p>
        <p className="modal-description">{description}</p>

        <div className="modal-probability">
          <span>Probabilité de fraude estimée</span>
          <strong>{(fraudProbability * 100).toFixed(1)}%</strong>
        </div>

        <div className="modal-actions">
          {riskLevel === "low" && (
            <>
              <button className="btn btn-primary" onClick={() => onResolve("confirmed")}>Valider directement</button>
              <button className="btn btn-outline" onClick={() => onResolve("needs_review")}>Vérifier quand même</button>
            </>
          )}
          {riskLevel === "medium" && (
            <>
              <button className="btn btn-primary" onClick={() => onResolve("confirmed")}>Approuver</button>
              <button className="btn btn-danger" onClick={() => onResolve("blocked")}>Rejeter</button>
            </>
          )}
          {riskLevel === "high" && (
            <>
              <button className="btn btn-danger" onClick={() => onResolve("blocked")}>Bloquer immédiatement</button>
              <button className="btn btn-outline" onClick={() => onResolve("needs_review")}>Examiner avant de trancher</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}