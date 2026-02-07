import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "../motion/MotionWrapper";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const logos = [
  "Restaurante Sabor & Arte",
  "Academia FitMax",
  "Clínica Bem Estar",
  "Salão Beleza Pura",
  "Auto Center Premium",
  "Pet Shop Amigo Fiel",
];

const AnimatedMetric = ({ end, prefix, suffix, label, icon, delay }: {
  end: number; prefix?: string; suffix?: string; label: string; icon: string; delay: number;
}) => {
  const { ref, value } = useAnimatedCounter(end, end > 100 ? 2000 : 1500, delay);
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="text-center p-6 rounded-2xl bg-card border border-border shadow-card-glow"
    >
      <span className="text-3xl mb-2 block">{icon}</span>
      <p className="text-3xl font-extrabold font-heading text-gradient">
        {prefix}{value}{suffix}
      </p>
      <p className="text-muted-foreground font-body mt-1">{label}</p>
    </motion.div>
  );
};

const SocialProofV2 = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-16 bg-secondary/30"
    >
      <div className="container">
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-10">
          <p className="text-muted-foreground font-body text-sm uppercase tracking-widest mb-2">
            Confiança de quem já colheu resultados
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            +120 negócios locais já transformaram seus resultados
          </h2>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {logos.map((name) => (
            <motion.div
              key={name}
              variants={scaleIn}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <span className="text-sm font-medium text-muted-foreground font-body text-center">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <AnimatedMetric end={500} prefix="+" suffix="%" label="ROI médio dos clientes" icon="📈" delay={0} />
          <AnimatedMetric end={15} prefix="R$" suffix="" label="Custo médio por lead" icon="💰" delay={200} />
          <AnimatedMetric end={30} prefix="" suffix=" dias" label="Para ver resultados" icon="⏱️" delay={400} />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialProofV2;
