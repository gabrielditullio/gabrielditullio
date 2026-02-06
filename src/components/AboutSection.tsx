import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getWhatsAppLink } from "@/lib/whatsapp";

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="w-full aspect-square max-w-md mx-auto rounded-2xl bg-card border border-border flex items-center justify-center shadow-card-glow">
              <div className="text-center p-8">
                <div className="w-32 h-32 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
                <p className="text-xl font-bold font-heading">[NOME_DO_GESTOR]</p>
                <p className="text-primary font-body font-medium">Gestor de Tráfego</p>
              </div>
            </div>
          </div>

          <div className="fade-up space-y-6">
            <p className="text-primary font-body text-sm uppercase tracking-widest font-semibold">
              Quem vai cuidar do seu tráfego
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              Não sou mais um "cara do marketing".{" "}
              <span className="text-gradient">Sou seu parceiro de crescimento.</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Com [X_ANOS] de experiência e mais de [X_NEGOCIOS] negócios locais atendidos, 
              minha missão é simples: transformar o tráfego pago no canal mais lucrativo da sua empresa.
            </p>
            <ul className="space-y-3 font-body">
              {[
                "Certificado Google Ads & Meta Blueprint",
                "+R$[X_VALOR] já gerenciados em campanhas",
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
              FALAR COM [NOME_DO_GESTOR]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
