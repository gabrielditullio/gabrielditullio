import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  fadeUp,
  scaleUp,
  StaggerContainer,
  staggerChild,
  SPRING,
} from "./MotionSystemV3";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

const useCounter = (end: number, duration: number = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(easeOutQuart(progress) * end));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration]);

  return { ref, value };
};

const logos = [
  "Cantina Dona Carmem",
  "Studio Corpo & Move",
  "Clínica Viver Bem Saúde",
  "Espaço Eliane Hair",
  "Auto Center São Rafael",
  "Pet House Pituba",
];

const AnimatedMetric = ({
  end,
  prefix,
  suffix,
  label,
  icon,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: string;
}) => {
  const { ref, value } = useCounter(end);
  return (
    <motion.div
      ref={ref}
      variants={staggerChild}
      whileHover={{ y: -6, transition: { ...SPRING.standard } }}
      className="text-center p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border shadow-card-glow"
    >
      <span className="text-3xl mb-2 block">{icon}</span>
      <p className="text-3xl font-extrabold font-heading text-gradient">
        {prefix}{value}{suffix}
      </p>
      <p className="text-muted-foreground font-body mt-1">{label}</p>
    </motion.div>
  );
};

const SocialProofV3 = () => {
  return (
    <StaggerContainer
      staggerDelay={0.08}
      className="pt-20 pb-16 bg-background shadow-[0_-20px_60px_rgba(0,0,0,0.3)] relative z-10"
    >
      <div className="container">
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className="text-muted-foreground font-body text-sm uppercase tracking-widest mb-2">
            Confiança de quem já colheu resultados
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            +120 negócios locais já transformaram seus resultados
          </h2>
        </motion.div>

        <StaggerContainer staggerDelay={0.06} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {logos.map((name) => (
            <motion.div
              key={name}
              variants={scaleUp}
              whileHover={{
                borderColor: "hsla(86, 100%, 50%, 0.3)",
                transition: { duration: 0.2 },
              }}
              className="flex items-center justify-center p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border transition-colors duration-300"
            >
              <span className="text-sm font-medium text-muted-foreground font-body text-center">
                {name}
              </span>
            </motion.div>
          ))}
        </StaggerContainer>

        <StaggerContainer staggerDelay={0.15} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedMetric end={500} prefix="+" suffix="%" label="ROI médio dos clientes" icon="📈" />
          <AnimatedMetric end={15} prefix="R$" suffix="" label="Custo médio por lead" icon="💰" />
          <AnimatedMetric end={30} prefix="" suffix=" dias" label="Para ver resultados" icon="⏱️" />
        </StaggerContainer>
      </div>
    </StaggerContainer>
  );
};

export default SocialProofV3;
