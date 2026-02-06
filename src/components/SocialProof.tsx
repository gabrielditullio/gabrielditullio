import { useScrollReveal } from "@/hooks/useScrollReveal";

const logos = [
  "Restaurante Sabor & Arte",
  "Academia FitMax",
  "Clínica Bem Estar",
  "Salão Beleza Pura",
  "Auto Center Premium",
  "Pet Shop Amigo Fiel",
];

const SocialProof = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-16 bg-secondary/30">
      <div className="container">
        <div className="fade-up text-center mb-10">
          <p className="text-muted-foreground font-body text-sm uppercase tracking-widest mb-2">
            Confiança de quem já colheu resultados
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            +120 negócios locais já transformaram seus resultados
          </h2>
        </div>

        <div className="fade-up grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <span className="text-sm font-medium text-muted-foreground font-body text-center">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="fade-up mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { metric: "+500%", label: "ROI médio dos clientes", icon: "📈" },
            { metric: "R$15", label: "Custo médio por lead", icon: "💰" },
            { metric: "30 dias", label: "Para ver resultados", icon: "⏱️" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card-glow"
            >
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <p className="text-3xl font-extrabold font-heading text-gradient">{item.metric}</p>
              <p className="text-muted-foreground font-body mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
