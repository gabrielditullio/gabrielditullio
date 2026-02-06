import HeroSection from "@/components/HeroSection";
import PlatformMarquee from "@/components/PlatformMarquee";
import SocialProof from "@/components/SocialProof";
import BenefitsSection from "@/components/BenefitsSection";
import ProcessSection from "@/components/ProcessSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <PlatformMarquee />
      <SocialProof />
      <BenefitsSection />
      <ProcessSection />
      <SpecialtiesSection />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
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
