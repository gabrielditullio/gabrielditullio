import { motion } from "framer-motion";
import { fadeUp } from "../motion/MotionWrapper";

const testimonials = [
  {
    name: "Carlos Mendes",
    niche: "Barbearia Premium",
    quote: "Meu negócio explodiu desde que contratei. Agora já estou preocupado se minha equipe vai dar conta, chegam novos contatos todos os dias.",
    result: "+230% faturamento",
  },
  {
    name: "Ana Paula Silva",
    niche: "Confeitaria Artesanal",
    quote: "Pessoa extremamente comprometida com o meu negócio, entra de cabeça e entrega relatórios detalhados. Me sinto completamente no controle.",
    result: "4x mais clientes",
  },
  {
    name: "Dr. Roberto Alves",
    niche: "Escritório de Advocacia",
    quote: "O faturamento do meu escritório dobrou no primeiro mês. Finalmente encontrei alguém que entende de negócio local de verdade.",
    result: "2x faturamento",
  },
];

const TestimonialsSectionV2 = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Veja o que nossos clientes{" "}
            <span className="text-gradient">falam de nós</span>
          </h2>
        </motion.div>

        {/* Stacking sticky cards */}
        <div className="relative" style={{ minHeight: `${testimonials.length * 40 + 60}vh` }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="sticky mb-8"
              style={{ top: `${80 + i * 16}px`, zIndex: 10 + i }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl mx-auto p-8 rounded-2xl bg-card border border-border transition-shadow duration-300"
                style={{
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 10}px hsla(0, 0%, 0%, ${0.2 + i * 0.1})`,
                }}
              >
                <div className="flex items-center gap-4 mb-5">
                  {/* Placeholder avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold font-heading text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-body">{t.niche}</p>
                  </div>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed italic mb-5">
                  "{t.quote}"
                </p>
                <span className="inline-block text-xs font-heading font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  {t.result}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionV2;
