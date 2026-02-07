import { useRef } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { fadeUp, scaleIn } from "../motion/MotionWrapper";

const CtaSectionV2 = () => {
  const ctaRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={ctaRef}
      id="cta-final"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/5" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Urgency text */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-sm text-primary font-medium font-body animate-urgency-pulse"
          >
            ⚡ Vagas limitadas para análise personalizada este mês
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-extrabold font-heading leading-tight"
          >
            Pronto para{" "}
            <span className="text-gradient">lotar sua agenda</span>{" "}
            de clientes?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-muted-foreground font-body max-w-xl mx-auto"
          >
            Sem enrolação, sem compromisso. Em 15 minutos descubra quanto seu negócio pode faturar com tráfego pago estratégico.
          </motion.p>

          <motion.div
            variants={scaleIn}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-xl shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300 animate-cta-glow-pulse"
            >
              📱 AGENDAR MINHA ANÁLISE GRATUITA
            </a>
          </motion.div>

          {/* Staggered badges */}
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              "⚡ Resposta em até 2 horas",
              "🔒 Seus dados estão seguros",
              "✅ 100% gratuito",
            ].map((badge) => (
              <motion.span
                key={badge}
                variants={fadeUp}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm text-muted-foreground font-body"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CtaSectionV2;
