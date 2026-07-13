import { useEffect } from "react";

export default function MerceariaBresser() {
  useEffect(() => {
    document.title = "GDT — Diagnóstico Digital · Mercearia Bresser";
  }, []);
  return (
    <iframe
      src="/mercearia_bresser/index.html"
      title="Mercearia Bresser"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}