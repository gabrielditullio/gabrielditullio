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
import DidierSodreRosa from "./pages/DidierSodreRosa";
import PropostaWitzWealth from "./pages/PropostaWitzWealth";
import Orbyka from "./pages/Orbyka";
import MvpLaunch from "./pages/MvpLaunch";
import DomenicoPizzeria from "./pages/DomenicoPizzeria";
import MerceariaBresser from "./pages/MerceariaBresser";
import GdtDiagnostico from "./pages/GdtDiagnostico";
import GdtTortarelli from "./pages/GdtTortarelli";
import HerbemMaia from "./pages/HerbemMaia";
import Myrian from "./pages/Myrian";
import LorenaFontoura from "./pages/LorenaFontoura";
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
          <Route path="/pp_didiersodre&rosa" element={<DidierSodreRosa />} />
          <Route path="/ppst_witz" element={<PropostaWitzWealth />} />
          <Route path="/0rb1k4" element={<Orbyka />} />
          <Route path="/report-BL0626" element={<MvpLaunch />} />
          <Route path="/domenico_pizzeria" element={<DomenicoPizzeria />} />
          <Route path="/mercearia_bresser" element={<MerceariaBresser />} />
          <Route path="/gdt_diagnostico" element={<GdtDiagnostico />} />
          <Route path="/gdt_tortarelli" element={<GdtTortarelli />} />
          <Route path="/herbem-maia" element={<HerbemMaia />} />
          <Route path="/myrian" element={<Myrian />} />
          <Route path="/lorena-fontoura" element={<LorenaFontoura />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;