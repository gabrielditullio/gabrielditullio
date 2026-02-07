import { motion } from "framer-motion";
import { fadeUp } from "../motion/MotionWrapper";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="hidden lg:block w-64 mx-auto"
  >
    <div className="bg-card border border-border rounded-[2rem] p-2 shadow-card-glow">
      <div className="bg-background rounded-[1.5rem] overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 text-[10px] text-muted-foreground">
          <span>9:41</span>
          <div className="flex gap-1">
            <span>📶</span><span>🔋</span>
          </div>
        </div>
        {/* Notification */}
        <div className="px-3 py-2 space-y-2">
          <div className="bg-card/80 border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground font-body">Google Maps</p>
            <p className="text-xs font-body font-medium text-foreground mt-1">
              📍 Seu negócio recebeu <span className="text-primary font-bold">12 novas visualizações</span> hoje
            </p>
          </div>
          <div className="bg-card/80 border border-border rounded-xl p-3">
            <p className="text-[10px] text-muted-foreground font-body">WhatsApp Business</p>
            <p className="text-xs font-body text-foreground mt-1">
              "Olá, gostaria de agendar..."
            </p>
            <p className="text-xs font-body text-foreground">
              "Vi o anúncio, qual o preço?"
            </p>
            <p className="text-xs font-body text-foreground">
              "Vocês atendem sábado?"
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CounterBlock = ({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) => {
  const { ref, value } = useAnimatedCounter(end, 1500, delay);
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center md:text-left"
    >
      <p className="text-5xl font-bold font-heading text-primary">
        {value}{suffix}
      </p>
      <p className="text-sm text-muted-foreground font-body mt-2">{label}</p>
    </motion.div>
  );
};

const WhyTrafficSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
      className="py-20"
    >
      <div className="container">
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-extrabold font-heading mb-14 text-center md:text-left max-w-3xl"
        >
          Por que negócios locais que investem em tráfego pago{" "}
          <span className="text-gradient">crescem mais rápido?</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="grid sm:grid-cols-3 gap-8">
            <CounterBlock end={73} suffix="%" label="dos consumidores pesquisam no Google antes de ir a um negócio local" delay={0} />
            <CounterBlock end={5} suffix="x" label="mais barato que panfleto por cliente conquistado" delay={200} />
            <CounterBlock end={48} suffix="h" label="para seus primeiros leads começarem a chegar" delay={400} />
          </div>
          <PhoneMockup />
        </div>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mt-12 text-left md:mx-auto"
        >
          Enquanto seu concorrente espera o boca a boca funcionar, você aparece na tela do celular de quem já está procurando exatamente o que você vende.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default WhyTrafficSection;
