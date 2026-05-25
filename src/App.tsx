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
import MvpEducation from "./pages/MvpEducation";
import MentoriaMvpLaunchPago from "./pages/MentoriaMvpLaunchPago";
import MentoriaMvpLaunchPagoV2 from "./pages/MentoriaMvpLaunchPagoV2";
import MentoriaMvpLaunchPagoV3 from "./pages/MentoriaMvpLaunchPagoV3";
import MentoriaMvpLaunchPagoV4 from "./pages/MentoriaMvpLaunchPagoV4";
import DidierSodreRosa from "./pages/DidierSodreRosa";
import PropostaWitzWealth from "./pages/PropostaWitzWealth";
import Orbyka from "./pages/Orbyka";
import WorkshopBarbearia from "./pages/WorkshopBarbearia";
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
          <Route path="/mvp_education" element={<MvpEducation />} />
          <Route path="/mentoriamvp_launch_pago" element={<MentoriaMvpLaunchPago />} />
          <Route path="/mentoriamvp_launch_pago_v2" element={<MentoriaMvpLaunchPagoV2 />} />
          <Route path="/mentoriamvp_launch_pago_v3" element={<MentoriaMvpLaunchPagoV3 />} />
          <Route path="/mentoriamvp_launch_pago_v4" element={<MentoriaMvpLaunchPagoV4 />} />
          <Route path="/pp_didiersodre&rosa" element={<DidierSodreRosa />} />
          <Route path="/ppst_witz" element={<PropostaWitzWealth />} />
          <Route path="/0rb1k4" element={<Orbyka />} />
          <Route path="/workshop-barbearia" element={<WorkshopBarbearia />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
