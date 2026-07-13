import { useEffect } from "react";

export default function GdtTortarelli() {
  useEffect(() => {
    document.title = "GDT — Diagnóstico Digital · Tortarelli";
  }, []);
  return (
    <iframe
      src="/gdt_tortarelli/index.html"
      title="GDT Tortarelli"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}