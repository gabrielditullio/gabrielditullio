import { useRef } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { Timer, Lock, BadgeCheck, Smartphone } from "lucide-react";
import {
  fadeUp,
  scaleUp,
  fadeLeft,
  StaggerContainer,
  staggerChild,
  SPRING,
} from "./MotionSystemV3";

const CtaSectionV3 = () => {
  return (
    <StaggerContainer staggerDelay={0.15} className="py-24 relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-primary/5" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
      />
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]"
      />

      <div id="cta-final" className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* fadeLeft for rhythm variation */}
          <motion.div variants={fadeLeft} className="flex items-center justify-center gap-2 text-sm text-primary font-medium font-body animate-urgency-pulse">
            <Timer size={14} strokeWidth={2} className="text-primary" />
            Vagas limitadas para análise personalizada este mês
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold font-heading leading-tight"
          >
            Pronto para{" "}
            <span className="text-gradient">lotar sua agenda</span> de
            clientes?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-xl text-muted-foreground font-body max-w-xl mx-auto"
          >
            Sem enrolação, sem compromisso. Em 15 minutos descubra quanto seu
            negócio pode faturar com tráfego pago estratégico.
          </motion.p>

          <motion.div variants={scaleUp}>
            <motion.a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-xl shadow-cta animate-cta-glow-pulse"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 40px hsla(86, 100%, 50%, 0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING.snappy}
            >
              <Smartphone size={22} strokeWidth={2} />
              AGENDAR MINHA ANÁLISE GRATUITA
            </motion.a>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: Timer, text: "Resposta em até 2 horas" },
              { icon: Lock, text: "Seus dados estão seguros" },
              { icon: BadgeCheck, text: "100% gratuito" },
            ].map((badge) => (
              <motion.span
                key={badge.text}
                variants={staggerChild}
                className="flex items-center gap-2 text-sm text-muted-foreground font-body"
              >
                <badge.icon size={14} strokeWidth={1.75} className="text-primary/70" />
                {badge.text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </StaggerContainer>
  );
};

export default CtaSectionV3;
