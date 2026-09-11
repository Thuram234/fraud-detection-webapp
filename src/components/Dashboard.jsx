import { Layers, CheckCircle2, ShieldAlert, Clock, TrendingUp } from "lucide-react";
import "../styles/Dashboard.css";

export default function Dashboard({ transactions }) {
  const total = transactions.length;
  const confirmed = transactions.filter((t) => t.status === "confirmed").length;
  const blocked = transactions.filter((t) => t.status === "blocked").length;
  const pending = transactions.filter((t) => t.status === "pending" || t.status === "needs_review").length;
  const highRiskDetected = transactions.filter((t) => t.riskLevel === "high").length;

  const stats = [
    { label: "Total", value: total, icon: Layers, tone: "neutral" },
    { label: "Confirmées", value: confirmed, icon: CheckCircle2, tone: "success" },
    { label: "Bloquées", value: blocked, icon: ShieldAlert, tone: "danger" },
    { label: "En attente", value: pending, icon: Clock, tone: "warning" },
    { label: "Fraudes détectées", value: highRiskDetected, icon: TrendingUp, tone: "danger" },
  ];

  return (
    <div className="stats-grid">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div className="stat-card card" key={label}>
          <div className={`stat-icon stat-icon-${tone}`}>
            <Icon size={20} />
          </div>
          <div>
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}