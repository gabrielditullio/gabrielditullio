import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getWhatsAppLink } from "@/lib/whatsapp";
import aboutPhoto from "@/assets/about-photo.png";

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo area */}
          <div className="fade-up">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl scale-95" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border shadow-card-glow">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <img
                  src={aboutPhoto}
                  alt="Gabriel Di Tullio"
                  className="w-full h-full object-cover object-top"
                />
                {/* Name overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <p className="text-xl font-bold font-heading">Gabriel Di Tullio</p>
                  <p className="text-primary font-body font-medium text-sm">
                    Gestor de Tráfego · Negócios Locais
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="fade-up space-y-6">
            <p className="text-primary font-body text-sm uppercase tracking-widest font-semibold">
              Quem vai cuidar do seu tráfego
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              Não sou mais um "cara do marketing".{" "}
              <span className="text-gradient">Sou seu parceiro de crescimento.</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Com anos de experiência e mais de 120 negócios locais atendidos, 
              minha missão é simples: transformar o tráfego pago no canal mais lucrativo da sua empresa.
            </p>
            <ul className="space-y-3 font-body">
              {[
                "Certificado Google Ads & Meta Blueprint",
                "Milhares já gerenciados em campanhas",
                "Especialista em negócios locais e regionais",
                "Relatórios semanais com linguagem simples",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-lg shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300"
            >
              FALAR COM GABRIEL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
