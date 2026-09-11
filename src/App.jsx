import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import demoTransactions from "./data/demo_transactions.json";
import { predictTransaction } from "./api";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import AppLayout from "./components/layout/AppLayout";

const initialTransactions = demoTransactions.map((t) => ({
  ...t,
  status: "pending",
  fraudProbability: null,
  riskLevel: null,
}));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [transactions, setTransactions] = useState(initialTransactions);

  const analyzeTransaction = async (id) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: "analyzing" } : t)));
    const transaction = transactions.find((t) => t.id === id);

    try {
      const result = await predictTransaction(transaction.modelInput);
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, status: "needs_review", fraudProbability: result.fraud_probability, riskLevel: result.risk_level }
            : t
        )
      );
    } catch (err) {
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: "error" } : t)));
      console.error("Errors : ",err)
    }
  };

  const resolveTransaction = (id, finalStatus) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status: finalStatus } : t)));
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

      <Route
        element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" replace />}
      >
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              transactions={transactions}
              onAnalyze={analyzeTransaction}
              onResolve={resolveTransaction}
            />
          }
        />
        <Route path="/history" element={<div>History Page</div>} />
      </Route>
    </Routes>
  );
}