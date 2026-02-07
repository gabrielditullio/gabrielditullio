import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./motion/MotionWrapper";

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
  {
    icon: "🔄",
    title: "Otimização Contínua",
    description: "Análise semanal das campanhas com ajustes para melhorar performance. Seu custo por cliente diminui mês a mês.",
  },
  {
    icon: "📱",
    title: "Multi-Plataforma",
    description: "Google Ads, Meta Ads (Instagram + Facebook), e TikTok Ads. Seu negócio aparece onde seu cliente está.",
  },
  {
    icon: "🤝",
    title: "Parceria, Não Contrato",
    description: "Sem fidelidade forçada. Você fica porque quer, não porque é obrigado. Resultados falam por si.",
  },
];

const BenefitsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="py-20"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Por que funciona
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Tudo que seu negócio precisa para{" "}
            <span className="text-gradient">vender mais</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Uma estratégia completa de aquisição de clientes para negócios locais
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow"
            >
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="text-xl font-bold font-heading mb-2">{b.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;
