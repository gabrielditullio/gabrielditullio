import HeroSectionV3 from "@/components/v3/HeroSectionV3";
import PlatformMarqueeV3 from "@/components/v3/PlatformMarqueeV3";
import WhyTrafficSectionV3 from "@/components/v3/WhyTrafficSectionV3";
import SocialProofV3 from "@/components/v3/SocialProofV3";
import BenefitsSectionV3 from "@/components/v3/BenefitsSectionV3";
import ProcessSectionV3 from "@/components/v3/ProcessSectionV3";
import SpecialtiesSectionV3 from "@/components/v3/SpecialtiesSectionV3";
import TestimonialsSectionV3 from "@/components/v3/TestimonialsSectionV3";
import AboutSectionV3 from "@/components/v3/AboutSectionV3";
import FaqSectionV3 from "@/components/v3/FaqSectionV3";
import CtaSectionV3 from "@/components/v3/CtaSectionV3";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import StickyBar from "@/components/v2/StickyBar";
import ProactiveChatBubble from "@/components/v2/ProactiveChatBubble";
import { ScrollProgress, GrainOverlay } from "@/components/v3/MotionSystemV3";

const IndexV3 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <GrainOverlay />

      <HeroSectionV3 />
      <PlatformMarqueeV3 />

      {/* "Why it works" section - sticky so next slides over it */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <WhyTrafficSectionV3 />
        </div>
        <div className="relative z-10 mt-[-1px]">
          <SocialProofV3 />
        </div>
      </div>

      <BenefitsSectionV3 />
      <ProcessSectionV3 />
      <SpecialtiesSectionV3 />
      <TestimonialsSectionV3 />
      <AboutSectionV3 />
      <FaqSectionV3 />
      <CtaSectionV3 />

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

export default IndexV3;
