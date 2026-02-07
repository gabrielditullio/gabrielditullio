import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./motion/MotionWrapper";

const testimonials = [
  {
    name: "[NOME_CLIENTE_1]",
    niche: "[NICHO_1]",
    quote: "Meu negócio explodiu desde que contratei. Agora já estou preocupado se minha equipe vai dar conta, chegam novos contatos todos os dias.",
    result: "+230% faturamento",
  },
  {
    name: "[NOME_CLIENTE_2]",
    niche: "[NICHO_2]",
    quote: "Pessoa extremamente comprometida com o meu negócio, entra de cabeça e entrega relatórios detalhados. Me sinto completamente no controle.",
    result: "4x mais clientes",
  },
  {
    name: "[NOME_CLIENTE_3]",
    niche: "[NICHO_3]",
    quote: "O faturamento do meu negócio dobrou no primeiro mês. Finalmente encontrei alguém que entende de negócio local de verdade.",
    result: "2x faturamento",
  },
];

const TestimonialsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
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

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow flex flex-col"
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
