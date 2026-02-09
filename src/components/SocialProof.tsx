import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "./motion/MotionWrapper";

const logos = [
  "Cantina Dona Carmem",
  "Studio Corpo & Move",
  "Clínica Viver Bem Saúde",
  "Espaço Eliane Hair",
  "Auto Center São Rafael",
  "Pet House Pituba",
];

const SocialProof = () => {
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
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { metric: "+500%", label: "ROI médio dos clientes", icon: "📈" },
            { metric: "R$15", label: "Custo médio por lead", icon: "💰" },
            { metric: "30 dias", label: "Para ver resultados", icon: "⏱️" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card-glow"
            >
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <p className="text-3xl font-extrabold font-heading text-gradient">{item.metric}</p>
              <p className="text-muted-foreground font-body mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialProof;
