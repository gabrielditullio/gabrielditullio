import { motion } from "framer-motion";
import { fadeUp } from "../motion/MotionWrapper";

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
    hasMockup: true,
  },
  {
    num: "04",
    title: "Otimização Contínua",
    description: "Relatórios semanais, ajustes constantes e escala. Seu custo por cliente diminui mês a mês.",
  },
];

const MiniDashboard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="mt-4 bg-background/50 border border-border rounded-lg p-3"
  >
    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-body mb-2">
      <span>Alcance</span><span>Leads</span><span>Cliques</span>
    </div>
    <svg viewBox="0 0 200 60" className="w-full h-12">
      <motion.path
        d="M 0 55 Q 30 50, 50 40 T 100 25 T 150 15 T 200 5"
        fill="none"
        stroke="hsl(86, 100%, 50%)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
      />
    </svg>
  </motion.div>
);

const ProcessSectionV2 = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      className="py-20 bg-secondary/30 relative z-20"
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

        {/* Desktop: horizontal with dotted timeline */}
        <div className="hidden lg:block relative">
          {/* Dotted timeline line */}
          <div className="absolute top-12 left-[10%] right-[10%] border-t-2 border-dashed border-border/30 z-0" />
          <div className="grid lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -20, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
              >
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.1, type: "spring", stiffness: 300, damping: 15 }}
                  className="text-5xl font-extrabold font-heading text-primary/20 block mb-2"
                >
                  {s.num}
                </motion.span>
                <h3 className="text-lg font-bold font-heading mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {s.description}
                </p>
                {s.hasMockup && <MiniDashboard />}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          {/* Vertical dotted line */}
          <div className="absolute left-3 top-0 bottom-0 border-l-2 border-dashed border-border/30" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-6 rounded-2xl bg-card border border-border"
              >
                {/* Dot on timeline */}
                <div className="absolute -left-[25px] top-8 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                <motion.span
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.1, type: "spring", stiffness: 300, damping: 15 }}
                  className="text-4xl font-extrabold font-heading text-primary/20 block mb-2"
                >
                  {s.num}
                </motion.span>
                <h3 className="text-lg font-bold font-heading mb-2">{s.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {s.description}
                </p>
                {s.hasMockup && <MiniDashboard />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessSectionV2;
