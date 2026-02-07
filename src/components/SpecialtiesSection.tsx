import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "./motion/MotionWrapper";

const niches = [
  { emoji: "⚖️", name: "Escritórios de Advocacia", result: "+75 consultas/mês" },
  { emoji: "💈", name: "Barbearias", result: "+120 agendamentos/mês" },
  { emoji: "🎂", name: "Confeitarias", result: "+200% em encomendas" },
  { emoji: "🍕", name: "Pizzarias", result: "+150 pedidos/mês" },
];

const SpecialtiesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 bg-secondary/20"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
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
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {niches.map((n) => (
            <motion.div
              key={n.name}
              variants={scaleIn}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, transition: { duration: 0.25 } }}
              className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/40 transition-all duration-300 group"
            >
              <span className="text-5xl block mb-3">{n.emoji}</span>
              <h3 className="font-bold font-heading text-lg mb-1">{n.name}</h3>
              <p className="text-primary font-bold font-heading text-sm">{n.result}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SpecialtiesSection;
