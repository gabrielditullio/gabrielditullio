import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Crosshair, BarChart3, Rabbit } from "lucide-react";
import {
  fadeUp,
  fadeLeft,
  StaggerContainer,
  staggerChild,
  SPRING,
} from "./MotionSystemV3";

/** Filled container icon — consistent Style 2 */
const IconBox = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div
    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
    style={{ background: "hsla(86, 100%, 50%, 0.12)" }}
  >
    <Icon size={22} strokeWidth={1.75} className="text-primary" />
  </div>
);

const benefits = [
  {
    icon: Crosshair,
    title: "Clientes Qualificados",
    description:
      "Atraia pessoas que realmente querem comprar de você, não apenas curiosos. Tráfego segmentado para o seu negócio local.",
  },
  {
    icon: BarChart3,
    title: "Resultados Mensuráveis",
    description:
      "Cada real investido é rastreado. Relatórios claros mostrando quantos clientes e quanto faturamento cada campanha gerou.",
  },
  {
    icon: Rabbit,
    title: "Velocidade de Resultado",
    description:
      "Sem esperar meses. Suas primeiras campanhas rodam em 48h e os leads começam a chegar na primeira semana.",
  },
];

/** 3D tilt card with glassmorphism */
const BenefitCard = ({ b }: { b: typeof benefits[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / centerY * -5);
    setRotateY((x - centerX) / centerX * 5);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={staggerChild}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group p-7 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
    >
      <IconBox icon={b.icon} />
      <h3 className="text-xl font-bold font-heading mb-2">{b.title}</h3>
      <p className="text-muted-foreground font-body leading-relaxed">
        {b.description}
      </p>
    </motion.div>
  );
};

const BenefitsSectionV3 = () => {
  return (
    <section className="py-20 relative z-10 bg-background shadow-2xl">
      <div className="container">
        {/* fadeLeft for rhythm — previous section used fadeRight */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
          className="mb-14 max-w-2xl"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Por que funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4 text-left">
            Tudo que seu negócio precisa para{" "}
            <span className="text-gradient">vender mais</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg text-left">
            Uma estratégia completa de aquisição de clientes para negócios locais
          </p>
        </motion.div>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <BenefitCard key={b.title} b={b} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BenefitsSectionV3;
