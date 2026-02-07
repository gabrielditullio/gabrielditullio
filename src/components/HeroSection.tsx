import { getWhatsAppLink } from "@/lib/whatsapp";
import heroPhoto from "@/assets/hero-photo.jpg";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, slideInRight } from "./motion/MotionWrapper";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="container relative z-10 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }}
            className="space-y-8"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10"
            >
              <span className="text-sm font-medium text-primary font-body">
                🚀 Especialista em Negócios Locais
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight text-hero-shadow"
            >
              Seu negócio está{" "}
              <span className="text-gradient">invisível</span>{" "}
              para quem deveria ser seu cliente?
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-body"
            >
              Enquanto você lê isso, seus concorrentes estão atraindo os clientes que deveriam estar comprando de você. Descubra como lotar sua agenda com clientes qualificados usando tráfego pago estratégico.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-lg shadow-cta hover:shadow-cta-hover hover:scale-105 transition-all duration-300 animate-pulse-glow whitespace-nowrap"
              >
                AGENDAR CONSULTORIA
              </a>
            </motion.div>
          </motion.div>

          {/* Photo area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="relative hidden md:flex justify-center items-end"
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-primary/10 blur-3xl absolute bottom-10" />
            <div className="relative z-10 w-full max-w-md">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border shadow-card-glow">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                <img
                  src={heroPhoto}
                  alt="Gabriel Di Tullio - Gestor de Tráfego"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating stats card */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-8 bottom-16 z-20 bg-card rounded-xl p-4 shadow-card-glow border border-border"
              >
                <p className="text-3xl font-extrabold font-heading text-gradient">+347%</p>
                <p className="text-xs text-muted-foreground font-body">Aumento médio em faturamento</p>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleIn}
                transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-4 top-16 z-20 bg-card rounded-xl p-4 shadow-card-glow border border-border"
              >
                <p className="text-2xl font-bold font-heading text-foreground">+120</p>
                <p className="text-xs text-muted-foreground font-body">Negócios atendidos</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
