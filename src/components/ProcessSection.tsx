import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./motion/MotionWrapper";

const steps = [
  {
    num: "01",
    title: "Diagnóstico Inicial",
    description: "Analisamos seu negócio, público-alvo, concorrência e objetivos. Entendemos onde você está e onde quer chegar.",
  },
  {
    num: "02",
    title: "Estratégia Personalizada",
    description: "Criamos um plano de campanhas sob medida para o seu nicho e região. Cada negócio é único e tratamos assim.",
  },
  {
    num: "03",
    title: "Campanhas no Ar",
    description: "Em até 48h suas campanhas estão rodando. Anúncios otimizados para atrair clientes que realmente querem comprar.",
  },
  {
    num: "04",
    title: "Otimização Contínua",
    description: "Relatórios semanais, ajustes constantes e escala. Seu custo por cliente diminui mês a mês.",
  },
];

const ProcessSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20 bg-secondary/30"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Do zero a{" "}
            <span className="text-gradient">resultados reais</span>{" "}
            em 4 passos
          </h2>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
            >
              <span className="text-5xl font-extrabold font-heading text-primary/20 block mb-2">
                {s.num}
              </span>
              <h3 className="text-lg font-bold font-heading mb-2">{s.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {s.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-primary/30 text-2xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProcessSection;
