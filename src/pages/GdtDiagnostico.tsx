import { useEffect } from "react";

export default function GdtDiagnostico() {
  useEffect(() => {
    document.title = "GDT — Diagnóstico Digital";
  }, []);
  return (
    <iframe
      src="/gdt_diagnostico/index.html"
      title="GDT Diagnóstico"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}