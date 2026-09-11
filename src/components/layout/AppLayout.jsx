import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, History, ShieldCheck } from "lucide-react";
import "../../styles/AppLayout.css";

export default function AppLayout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-layout">
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-brand">
          <ShieldCheck size={22} color="var(--color-primary)" />
          <span>FraudGuard</span>
        </div>
        <nav className="navbar-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <History size={18} /> Historique
          </NavLink>
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}