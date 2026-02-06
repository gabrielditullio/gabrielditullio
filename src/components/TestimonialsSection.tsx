import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "[NOME_CLIENTE_1]",
    niche: "[NICHO_1]",
    quote:
      "Meu negócio explodiu desde que contratei. Agora já estou preocupado se minha equipe vai dar conta, chegam novos contatos todos os dias.",
    result: "+230% faturamento",
  },
  {
    name: "[NOME_CLIENTE_2]",
    niche: "[NICHO_2]",
    quote:
      "Pessoa extremamente comprometida com o meu negócio, entra de cabeça e entrega relatórios detalhados. Me sinto completamente no controle.",
    result: "4x mais clientes",
  },
  {
    name: "[NOME_CLIENTE_3]",
    niche: "[NICHO_3]",
    quote:
      "O faturamento do meu negócio dobrou no primeiro mês. Finalmente encontrei alguém que entende de negócio local de verdade.",
    result: "2x faturamento",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20">
      <div className="container">
        <div className="fade-up text-center mb-14 max-w-2xl mx-auto">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Veja o que nossos clientes{" "}
            <span className="text-gradient">falam de nós</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="fade-up p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4">
                <span className="text-primary text-3xl font-heading">"</span>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed flex-1 italic">
                {t.quote}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-body">{t.niche}</p>
                  </div>
                  <span className="text-xs font-heading font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {t.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
