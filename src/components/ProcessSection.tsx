import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Diagnóstico Inicial",
    description:
      "Analisamos seu negócio, público-alvo, concorrência e objetivos. Entendemos onde você está e onde quer chegar.",
  },
  {
    num: "02",
    title: "Estratégia Personalizada",
    description:
      "Criamos um plano de campanhas sob medida para o seu nicho e região. Cada negócio é único e tratamos assim.",
  },
  {
    num: "03",
    title: "Campanhas no Ar",
    description:
      "Em até 48h suas campanhas estão rodando. Anúncios otimizados para atrair clientes que realmente querem comprar.",
  },
  {
    num: "04",
    title: "Otimização Contínua",
    description:
      "Relatórios semanais, ajustes constantes e escala. Seu custo por cliente diminui mês a mês.",
  },
];

const ProcessSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-secondary/30">
      <div className="container">
        <div className="fade-up text-center mb-14 max-w-2xl mx-auto">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Do zero a{" "}
            <span className="text-gradient">resultados reais</span>{" "}
            em 4 passos
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="fade-up relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-5xl font-extrabold font-heading text-primary/20 block mb-2">
                {s.num}
              </span>
              <h3 className="text-lg font-bold font-heading mb-2">{s.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {s.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-primary/30 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
