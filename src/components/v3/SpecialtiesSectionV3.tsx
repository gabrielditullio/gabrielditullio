import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Scissors, Cake, UtensilsCrossed } from "lucide-react";
import {
  fadeUp,
  fadeRight,
  StaggerContainer,
  staggerChild,
  SPRING,
} from "./MotionSystemV3";
import { useIsMobile } from "@/hooks/use-mobile";

/** Filled container icon — consistent Style 2 */
const IconBox = ({ icon: Icon, size = 24 }: { icon: React.ElementType; size?: number }) => (
  <div
    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 mx-auto"
    style={{ background: "hsla(86, 100%, 50%, 0.12)" }}
  >
    <Icon size={size} strokeWidth={1.75} className="text-primary" />
  </div>
);

const niches = [
  { icon: Scale, name: "Escritórios de Advocacia", result: "+75 consultas/mês" },
  { icon: Scissors, name: "Barbearias", result: "+120 agendamentos/mês" },
  { icon: Cake, name: "Confeitarias", result: "+200% em encomendas" },
  { icon: UtensilsCrossed, name: "Pizzarias", result: "+150 pedidos/mês" },
];

const NicheCard = ({ n, isMobile }: { n: typeof niches[0]; isMobile: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const showResult = isMobile || hovered;

  return (
    <motion.div
      variants={staggerChild}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 30px hsla(86, 100%, 50%, 0.15)",
        borderColor: "hsla(86, 100%, 50%, 0.4)",
        transition: SPRING.standard,
      }}
      className="p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border text-center cursor-pointer"
    >
      <motion.div
        animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={SPRING.playful}
      >
        <IconBox icon={n.icon} size={26} />
      </motion.div>
      <h3 className="font-bold font-heading text-lg mb-1">{n.name}</h3>
      <motion.div
        initial={false}
        animate={{
          height: showResult ? "auto" : 0,
          opacity: showResult ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="text-primary font-bold font-heading text-sm pt-1">{n.result}</p>
      </motion.div>
    </motion.div>
  );
};

const SpecialtiesSectionV3 = () => {
  const isMobile = useIsMobile();

  return (
    <StaggerContainer staggerDelay={0.1} className="py-20 bg-secondary/20">
      <div className="container">
        {/* fadeRight for rhythm — previous section used fadeUp */}
        <motion.div
          variants={fadeRight}
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

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {niches.map((n) => (
            <NicheCard key={n.name} n={n} isMobile={isMobile} />
          ))}
        </StaggerContainer>
      </div>
    </StaggerContainer>
  );
};

export default SpecialtiesSectionV3;
