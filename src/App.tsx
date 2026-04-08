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
          <Route path="/diagnostico-os-carecas-da-pizza" element={<DiagnosticoCarecasV2 />} />
          <Route path="/diagnostico-os-carecas-da-pizza/v1" element={<DiagnosticoCarecas />} />
          <Route path="/diagnostico-carecas" element={<DiagnosticoCarecasV3 />} />
          <Route path="/fallen_major_playbook" element={<FallenMajorPlaybook />} />
          <Route path="/reisdantas" element={<ReisDantas />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
