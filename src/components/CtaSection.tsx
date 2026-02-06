import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getWhatsAppLink } from "@/lib/whatsapp";

const CtaSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="container relative z-10">
        <div className="fade-up max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading leading-tight">
            Pronto para{" "}
            <span className="text-gradient">lotar sua agenda</span>{" "}
            de clientes?
          </h2>
          <p className="text-xl text-muted-foreground font-body max-w-xl mx-auto">
            Sem enrolação, sem compromisso. Em 15 minutos descubra quanto seu negócio pode faturar com tráfego pago estratégico.
          </p>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-xl shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            📱 AGENDAR MINHA ANÁLISE GRATUITA
          </a>

          <p className="text-sm text-muted-foreground font-body">
            ⚡ Resposta em até 2 horas · 🔒 Seus dados estão seguros · ✅ 100% gratuito
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
