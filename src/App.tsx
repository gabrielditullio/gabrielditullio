import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import IndexV3 from "./pages/IndexV3";
import FallenMajorPlaybook from "./pages/FallenMajorPlaybook";
import Nova from "./pages/Nova";
import TioFiisVSL from "./pages/TioFiisVSL";
import TioFiisVSL2 from "./pages/TioFiisVSL2";
import TioFiisFunis from "./pages/TioFiisFunis";
import TioFiisApresentacao from "./pages/TioFiisApresentacao";
import MvpEducation from "./pages/MvpEducation";
import BioconversionPitchDeckV1 from "./pages/BioconversionPitchDeckV1";
import BioconversionPitchDeckV2 from "./pages/BioconversionPitchDeckV2";
import BioconversionPitchDeckV3 from "./pages/BioconversionPitchDeckV3";
import PropostaComercialBioconversionAcademy from "./pages/PropostaComercialBioconversionAcademy";
import MentoriaMvpLaunchPago from "./pages/MentoriaMvpLaunchPago";
import MentoriaMvpLaunchPagoV2 from "./pages/MentoriaMvpLaunchPagoV2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          <Route path="/fallen_major_playbook" element={<FallenMajorPlaybook />} />
          <Route path="/nova" element={<Nova />} />
          <Route path="/tiofiis_vsl" element={<TioFiisVSL />} />
          <Route path="/tiofiis_vsl2" element={<TioFiisVSL2 />} />
          <Route path="/tiofiis_funis" element={<TioFiisFunis />} />
          <Route path="/tiofiis_apresentacao" element={<TioFiisApresentacao />} />
          <Route path="/mvp_education" element={<MvpEducation />} />
          <Route path="/Bioconversionv1" element={<BioconversionPitchDeckV1 />} />
          <Route path="/Bioconversionv2" element={<BioconversionPitchDeckV2 />} />
          <Route path="/Bioconversionv3" element={<BioconversionPitchDeckV3 />} />
          <Route path="/Bioconversionv4" element={<PropostaComercialBioconversionAcademy />} />
          <Route path="/mentoriamvp_launch_pago" element={<MentoriaMvpLaunchPago />} />
          <Route path="/mentoriamvp_launch_pago_v2" element={<MentoriaMvpLaunchPagoV2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
