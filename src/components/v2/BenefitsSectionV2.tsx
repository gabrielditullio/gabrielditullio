import { motion } from "framer-motion";
import { fadeUp } from "../motion/MotionWrapper";

const benefits = [
  {
    icon: "🎯",
    title: "Clientes Qualificados",
    description: "Atraia pessoas que realmente querem comprar de você, não apenas curiosos. Tráfego segmentado para o seu negócio local.",
  },
  {
    icon: "📊",
    title: "Resultados Mensuráveis",
    description: "Cada real investido é rastreado. Relatórios claros mostrando quantos clientes e quanto faturamento cada campanha gerou.",
  },
  {
    icon: "⚡",
    title: "Velocidade de Resultado",
    description: "Sem esperar meses. Suas primeiras campanhas rodam em 48h e os leads começam a chegar na primeira semana.",
  },
];

const BenefitsSectionV2 = () => {
  return (
    <section className="py-20 relative z-10 bg-background shadow-2xl">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
            >
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="text-xl font-bold font-heading mb-2">{b.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSectionV2;
