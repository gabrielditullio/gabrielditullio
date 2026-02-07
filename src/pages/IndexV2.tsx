import HeroSectionV2 from "@/components/v2/HeroSectionV2";
import PlatformMarqueeV2 from "@/components/v2/PlatformMarqueeV2";
import WhyTrafficSection from "@/components/v2/WhyTrafficSection";
import SocialProofV2 from "@/components/v2/SocialProofV2";
import BenefitsSectionV2 from "@/components/v2/BenefitsSectionV2";
import ProcessSectionV2 from "@/components/v2/ProcessSectionV2";
import SpecialtiesSectionV2 from "@/components/v2/SpecialtiesSectionV2";
import TestimonialsSectionV2 from "@/components/v2/TestimonialsSectionV2";
import AboutSectionV2 from "@/components/v2/AboutSectionV2";
import FaqSectionV2 from "@/components/v2/FaqSectionV2";
import CtaSectionV2 from "@/components/v2/CtaSectionV2";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyBar from "@/components/v2/StickyBar";
import ProactiveChatBubble from "@/components/v2/ProactiveChatBubble";

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSectionV2 />
      <PlatformMarqueeV2 />

      {/* "Why it works" section - sticky so Process slides over it */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <WhyTrafficSection />
        </div>
        <div className="relative z-10 mt-[-1px]">
          <SocialProofV2 />
        </div>
      </div>

      {/* Benefits slides over SocialProof with shadow */}
      <BenefitsSectionV2 />

      <ProcessSectionV2 />
      <SpecialtiesSectionV2 />
      <TestimonialsSectionV2 />
      <AboutSectionV2 />
      <FaqSectionV2 />
      <CtaSectionV2 />

      <WhatsAppFloat />
      <StickyBar />
      <ProactiveChatBubble />

      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground font-body">
            © 2026 Gabriel Di Tullio · Gestão de Tráfego para Negócios Locais
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexV2;
