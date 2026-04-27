import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import IndexV3 from "./pages/IndexV3";
import DiagnosticoCarecas from "./pages/DiagnosticoCarecas";
import DiagnosticoCarecasV2 from "./pages/DiagnosticoCarecasV2";
import FallenMajorPlaybook from "./pages/FallenMajorPlaybook";
import DiagnosticoCarecasV3 from "./pages/DiagnosticoCarecasV3";
import ReisDantas from "./pages/ReisDantas";
import Nova from "./pages/Nova";
import DamasDaLampada from "./pages/DamasDaLampada";
import TioFiisVSL from "./pages/TioFiisVSL";
import TioFiisVSL2 from "./pages/TioFiisVSL2";
import TioFiisFunis from "./pages/TioFiisFunis";
import TioFiisApresentacao from "./pages/TioFiisApresentacao";
import MvpEducation from "./pages/MvpEducation";
import BioconversionPitchDeckV1 from "./pages/BioconversionPitchDeckV1";
import BioconversionPitchDeckV2 from "./pages/BioconversionPitchDeckV2";
import BioconversionPitchDeckV3 from "./pages/BioconversionPitchDeckV3";
import PropostaComercialBioconversionAcademy from "./pages/PropostaComercialBioconversionAcademy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const StaticRedirect = ({ to }: { to: string }) => {
  if (typeof window !== "undefined") {
    window.location.replace(to);
  }
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexV3 />} />
          <Route path="/v1" element={<Index />} />
          <Route path="/v2" element={<IndexV2 />} />
          <Route path="/diagnostico-os-carecas-da-pizza" element={<DiagnosticoCarecasV2 />} />
          <Route path="/diagnostico-os-carecas-da-pizza/v1" element={<DiagnosticoCarecas />} />
          <Route path="/diagnostico-carecas" element={<DiagnosticoCarecasV3 />} />
          <Route path="/fallen_major_playbook" element={<FallenMajorPlaybook />} />
          <Route path="/reisdantas" element={<ReisDantas />} />
          <Route path="/nova" element={<Nova />} />
          <Route path="/damas-da-lampada" element={<DamasDaLampada />} />
          <Route path="/tiofiis_vsl" element={<TioFiisVSL />} />
          <Route path="/tiofiis_vsl2" element={<TioFiisVSL2 />} />
          <Route path="/tiofiis_funis" element={<TioFiisFunis />} />
          <Route path="/tiofiis_apresentacao" element={<TioFiisApresentacao />} />
          <Route path="/mvp_education" element={<MvpEducation />} />
          <Route path="/Bioconversionv1" element={<BioconversionPitchDeckV1 />} />
          <Route path="/Bioconversionv2" element={<BioconversionPitchDeckV2 />} />
          <Route path="/Bioconversionv3" element={<BioconversionPitchDeckV3 />} />
          <Route path="/Bioconversionv4" element={<PropostaComercialBioconversionAcademy />} />
          <Route
            path="/mentoriamvp_launch_pago"
            element={<StaticRedirect to="/mentoriamvp_launch_pago/index.html" />}
          />
          <Route
            path="/mentoriamvp_launch_pagov2"
            element={<StaticRedirect to="/mentoriamvp_launch_pagov2/index.html" />}
          />
          <Route
            path="/mentoriamvp_launch_pago_extended"
            element={<StaticRedirect to="/mentoriamvp_launch_pago_extended/index.html" />}
          />
          <Route
            path="/mentoriamvp_launch_pagov2_extended"
            element={<StaticRedirect to="/mentoriamvp_launch_pagov2_extended/index.html" />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
