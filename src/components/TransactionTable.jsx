import { useState } from "react";
import { Search, Loader2, ScanLine } from "lucide-react";
import DecisionModal from "./DecisionModal";
import StatusBadge from "./StatusBadge";
import "../styles/TransactionTable.css";

export default function TransactionTable({ transactions, onAnalyze, onResolve }) {
  const [activeModal, setActiveModal] = useState(null);
  const activeTransaction = transactions.find((t) => t.id === activeModal);

  return (
    <div className="card table-card">
      <h3 className="table-title">Transactions à analyser</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Horodatage</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="cell-id">{t.id}</td>
                <td>{new Date(t.timestamp).toLocaleString("fr-FR")}</td>
                <td className="cell-amount">{t.amount.toLocaleString("fr-FR")} €</td>
                <td><StatusBadge status={t.status} /></td>
                <td>
                  {t.status === "pending" && (
                    <button className="btn btn-primary btn-sm" onClick={() => onAnalyze(t.id)}>
                      <ScanLine size={15} /> Analyser
                    </button>
                  )}
                  {t.status === "analyzing" && (
                    <span className="analyzing-label">
                      <Loader2 size={15} className="spin" /> Analyse...
                    </span>
                  )}
                  {t.status === "needs_review" && (
                    <button className="btn btn-outline btn-sm" onClick={() => setActiveModal(t.id)}>
                      <Search size={15} /> Voir le résultat
                    </button>
                  )}
                  {(t.status === "confirmed" || t.status === "blocked") && (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeTransaction && (
        <DecisionModal
          transaction={activeTransaction}
          onClose={() => setActiveModal(null)}
          onResolve={(finalStatus) => {
            onResolve(activeTransaction.id, finalStatus);
            setActiveModal(null);
          }}
        />
      )}
    </div>
  );
}