import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Repeat, Clock } from "lucide-react";
import {
  fadeUp,
  fadeRight,
  SPRING,
  DURATION,
  StaggerContainer,
  staggerChild,
} from "./MotionSystemV3";

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

const useCounter = (end: number, duration: number = 1500) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
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

/** Filled container icon — Style 2 from skill */
const IconBox = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div
    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
    style={{ background: "hsla(86, 100%, 50%, 0.1)" }}
  >
    <Icon size={20} strokeWidth={1.75} className="text-primary" />
  </div>
);

const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotateY: -10 }}
    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
    viewport={{ once: true }}
    transition={{ duration: DURATION.slow, ...SPRING.gentle, delay: 0.4 }}
    className="hidden lg:block w-64 mx-auto"
    style={{ perspective: "1000px" }}
  >
    <div className="bg-card border border-border rounded-[2rem] p-2 shadow-card-glow">
      <div className="bg-background rounded-[1.5rem] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-1.5 text-[10px] text-muted-foreground">
          <span>9:41</span>
          <div className="flex gap-1 text-[10px]">
            <span>●●●</span>
          </div>
        </div>
        <div className="px-3 py-2 space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, ...SPRING.standard }}
            className="bg-card/80 border border-border rounded-xl p-3"
          >
            <p className="text-[10px] text-muted-foreground font-body">Google Maps</p>
            <p className="text-xs font-body font-medium text-foreground mt-1">
              Seu negócio recebeu <span className="text-primary font-bold">12 novas visualizações</span> hoje
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, ...SPRING.standard }}
            className="bg-card/80 border border-border rounded-xl p-3"
          >
            <p className="text-[10px] text-muted-foreground font-body">WhatsApp Business</p>
            <p className="text-xs font-body text-foreground mt-1">"Olá, gostaria de agendar..."</p>
            <p className="text-xs font-body text-foreground">"Vi o anúncio, qual o preço?"</p>
            <p className="text-xs font-body text-foreground">"Vocês atendem sábado?"</p>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

const counters = [
  { end: 73, suffix: "%", label: "dos consumidores pesquisam no Google antes de ir a um negócio local", icon: Search },
  { end: 5, suffix: "x", label: "mais barato que panfleto por cliente conquistado", icon: Repeat },
  { end: 48, suffix: "h", label: "para seus primeiros leads começarem a chegar", icon: Clock },
];

const CounterBlock = ({ end, suffix, label, icon }: { end: number; suffix: string; label: string; icon: React.ElementType }) => {
  const { ref, value } = useCounter(end);
  return (
    <motion.div
      ref={ref}
      variants={staggerChild}
      className="text-center md:text-left"
    >
      <IconBox icon={icon} />
      <p className="text-5xl font-bold font-heading text-primary">
        {value}{suffix}
      </p>
      <p className="text-sm text-muted-foreground font-body mt-2">{label}</p>
    </motion.div>
  );
};

const WhyTrafficSectionV3 = () => {
  return (
    <StaggerContainer staggerDelay={0.15} className="py-20 pb-32">
      <div className="container">
        <motion.h2
          variants={fadeRight}
          className="text-3xl md:text-4xl font-extrabold font-heading mb-14 text-center md:text-left max-w-3xl"
        >
          Por que negócios locais que investem em tráfego pago{" "}
          <span className="text-gradient">crescem mais rápido?</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <StaggerContainer staggerDelay={0.2} className="grid sm:grid-cols-3 gap-8">
            {counters.map((c) => (
              <CounterBlock key={c.label} {...c} />
            ))}
          </StaggerContainer>
          <PhoneMockup />
        </div>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mt-12 text-left md:mx-auto"
        >
          Enquanto seu concorrente espera o boca a boca funcionar, você aparece na tela do celular de quem já está procurando exatamente o que você vende.
        </motion.p>
      </div>
    </StaggerContainer>
  );
};

export default WhyTrafficSectionV3;
