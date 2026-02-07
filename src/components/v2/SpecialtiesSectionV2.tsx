import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../motion/MotionWrapper";
import { useIsMobile } from "@/hooks/use-mobile";

const niches = [
  { emoji: "⚖️", name: "Escritórios de Advocacia", result: "+75 consultas/mês" },
  { emoji: "💈", name: "Barbearias", result: "+120 agendamentos/mês" },
  { emoji: "🎂", name: "Confeitarias", result: "+200% em encomendas" },
  { emoji: "🍕", name: "Pizzarias", result: "+150 pedidos/mês" },
];

const NicheCard = ({ n, isMobile }: { n: typeof niches[0]; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const showResult = isMobile || hovered;

  return (
    <motion.div
      variants={scaleIn}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-6 rounded-2xl bg-card border border-border text-center transition-all duration-200 cursor-pointer"
      style={{
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? "0 0 30px hsla(86, 100%, 50%, 0.15)" : "none",
        borderColor: hovered ? "hsla(86, 100%, 50%, 0.4)" : undefined,
      }}
    >
      <span className="text-5xl block mb-3">{n.emoji}</span>
      <h3 className="font-bold font-heading text-lg mb-1">{n.name}</h3>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: showResult ? "40px" : "0px",
          opacity: showResult ? 1 : 0,
        }}
      >
        <p className="text-primary font-bold font-heading text-sm pt-1">{n.result}</p>
      </div>
    </motion.div>
  );
};

const SpecialtiesSectionV2 = () => {
  const isMobile = useIsMobile();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className="py-20 bg-secondary/20"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Especialidades
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4 text-center md:text-left">
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
            <NicheCard key={n.name} n={n} isMobile={isMobile} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SpecialtiesSectionV2;
