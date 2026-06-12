import { useEffect } from "react";

export default function MvpLaunch() {
  useEffect(() => {
    document.title = "Dashboard — Lançamento Pago · MVP Education";
  }, []);
  return (
    <iframe
      src="/mvp_launch/index.html"
      title="Dashboard MVP Launch"
      style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", border: 0 }}
    />
  );
}