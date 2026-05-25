import { useEffect } from "react";

export default function DashboardBL0626V2() {
  useEffect(() => {
    document.title = "Dashboard Método W — Fase de Captação";
  }, []);
  return (
    <iframe
      src="/dashboard_BL0626_v2.html"
      title="Dashboard BL0626 v2"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}