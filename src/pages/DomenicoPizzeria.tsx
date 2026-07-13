import { useEffect } from "react";

export default function DomenicoPizzeria() {
  useEffect(() => {
    document.title = "GDT — Diagnóstico Digital · Domenico Pizzeria";
  }, []);
  return (
    <iframe
      src="/domenico_pizzeria/index.html"
      title="Domenico Pizzeria"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}