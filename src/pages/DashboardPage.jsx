import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";

export default function DashboardPage({ transactions, onAnalyze, onResolve }) {
  return (
    <div>
      <div className="page-header">
        <h1>Tableau de bord</h1>
        <p className="page-subtitle">Vue d'ensemble et contrôle des transactions à analyser.</p>
      </div>
      <Dashboard transactions={transactions} />
      <TransactionTable
        transactions={transactions}
        onAnalyze={onAnalyze}
        onResolve={onResolve}
      />
    </div>
  );
}