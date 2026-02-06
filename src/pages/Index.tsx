import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import BenefitsSection from "@/components/BenefitsSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import AboutSection from "@/components/AboutSection";
import CtaSection from "@/components/CtaSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SocialProof />
      <BenefitsSection />
      <SpecialtiesSection />
      <AboutSection />
      <CtaSection />
      <WhatsAppFloat />

      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground font-body">
            © 2026 [NOME_DO_GESTOR] · Gestão de Tráfego para Negócios Locais
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
