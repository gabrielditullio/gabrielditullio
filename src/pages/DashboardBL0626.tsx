import { Routes, Route } from "react-router-dom";
import ControlTower from "@/dashboard-bl0626/pages/ControlTower";
import Home from "@/dashboard-bl0626/pages/Home";
import Diagnostic from "@/dashboard-bl0626/pages/Diagnostic";
import WWarRoom from "@/dashboard-bl0626/pages/WWarRoom";
import DashNotFound from "@/dashboard-bl0626/pages/NotFound";

/**
 * Dashboard MVP Lançamento — hosted under /dashboard_BL0626.
 * Wrapped in `.dark` so Tailwind dark tokens apply only here without
 * affecting the rest of the site.
 */
export default function DashboardBL0626() {
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <Routes>
        <Route index element={<ControlTower />} />
        <Route path="control-tower" element={<ControlTower />} />
        <Route path="home" element={<Home />} />
        <Route path="war-room-original" element={<Home />} />
        <Route path="diagnostic" element={<Diagnostic />} />
        <Route path="w-war-room" element={<WWarRoom />} />
        <Route path="*" element={<DashNotFound />} />
      </Routes>
    </div>
  );
}