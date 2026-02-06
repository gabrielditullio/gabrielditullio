import { useScrollReveal } from "@/hooks/useScrollReveal";

const niches = [
  { emoji: "⚖️", name: "Escritórios de Advocacia", result: "+75 consultas/mês" },
  { emoji: "💈", name: "Barbearias", result: "+120 agendamentos/mês" },
  { emoji: "🎂", name: "Confeitarias", result: "+200% em encomendas" },
  { emoji: "🍕", name: "Pizzarias", result: "+150 pedidos/mês" },
];

const SpecialtiesSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20 bg-secondary/20">
      <div className="container">
        <div className="fade-up text-center mb-14 max-w-2xl mx-auto">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Especialidades
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Experiência real no{" "}
            <span className="text-gradient">seu segmento</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Cada nicho tem sua estratégia. Sabemos exatamente o que funciona para cada tipo de negócio.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {niches.map((n, i) => (
            <div
              key={n.name}
              className="fade-up p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/40 transition-all duration-300 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-5xl block mb-3">{n.emoji}</span>
              <h3 className="font-bold font-heading text-lg mb-1">{n.name}</h3>
              <p className="text-primary font-bold font-heading text-sm">{n.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
