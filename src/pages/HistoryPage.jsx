import { Inbox } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import "../styles/HistoryPage.css";

export default function HistoryPage({ transactions }) {
  const treated = transactions.filter((t) => t.status === "confirmed" || t.status === "blocked");

  return (
    <div>
      <div className="page-header">
        <h1>Historique</h1>
        <p className="page-subtitle">Transactions déjà traitées par un responsable.</p>
      </div>

      {treated.length === 0 ? (
        <div className="empty-state card">
          <Inbox size={32} color="var(--color-text-muted)" />
          <p>Aucune transaction traitée pour le moment.</p>
        </div>
      ) : (
        <div className="card table-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Horodatage</th>
                  <th>Montant</th>
                  <th>Probabilité de fraude</th>
                  <th>Décision finale</th>
                </tr>
              </thead>
              <tbody>
                {treated.map((t) => (
                  <tr key={t.id}>
                    <td className="cell-id">{t.id}</td>
                    <td>{new Date(t.timestamp).toLocaleString("fr-FR")}</td>
                    <td className="cell-amount">{t.amount.toLocaleString("fr-FR")} €</td>
                    <td>{(t.fraudProbability * 100).toFixed(1)}%</td>
                    <td><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}