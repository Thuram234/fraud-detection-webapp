import { Clock, Loader2, Search, CheckCircle2, ShieldAlert, AlertTriangle } from "lucide-react";

const config = {
  pending:      { label: "En attente d'analyse", tone: "neutral", icon: Clock },
  analyzing:    { label: "Analyse en cours",       tone: "neutral", icon: Loader2 },
  needs_review: { label: "Décision requise",       tone: "warning", icon: Search },
  confirmed:    { label: "Confirmée",              tone: "success", icon: CheckCircle2 },
  blocked:      { label: "Bloquée",                tone: "danger",  icon: ShieldAlert },
  error:        { label: "Erreur",                 tone: "danger",  icon: AlertTriangle },
};

export default function StatusBadge({ status }) {
  const { label, tone, icon: Icon } = config[status] || config.pending;
  return (
    <span className={`badge badge-${tone}`}>
      <Icon size={14} /> {label}
    </span>
  );
}