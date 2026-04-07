import { getWhatsAppLink } from "@/lib/whatsapp";
import heroPhoto from "@/assets/hero-photo.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  cinematic,
  scaleUp,
  fadeRight,
  TextReveal,
  SPRING,
  DURATION,
  STAGGER,
} from "./MotionSystemV3";

const badges = [
  { icon: "⚡", text: "Resultados em 30 dias" },
  { icon: "💰", text: "Retorno médio de 5x sobre o investido" },
  { icon: "📍", text: "Foco total no seu bairro e região" },
];

const HeroSectionV3 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-hero overflow-hidden"
    >
      {/* Gradient mesh blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "hsl(var(--primary))",
            top: "10%",
            left: "-10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{
            background: "hsl(var(--accent))",
            bottom: "10%",
            right: "-5%",
            animation: "float 6s ease-in-out infinite reverse",
          }}
        />
      </motion.div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div style={{ opacity }} className="container relative z-10 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.3,
                },
              },
            }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-primary font-body">
                🚀 Especialista em Negócios Locais
              </span>
            </motion.div>

            {/* Headline with word-by-word reveal */}
            <motion.div variants={cinematic}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight">
                <TextReveal
                  text="Seu negócio está"
                  className="text-foreground"
                />
                {" "}
                <TextReveal
                  text="invisível"
                  delay={0.4}
                  className="text-gradient"
                />
                {" "}
                <TextReveal
                  text="para quem deveria ser seu cliente?"
                  delay={0.5}
                  className="text-foreground"
                />
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-body"
            >
              Seus concorrentes já estão atraindo os clientes que deveriam ser
              seus. Descubra como lotar sua agenda com tráfego pago estratégico.
            </motion.p>

            {/* CTA button */}
            <motion.div variants={scaleUp}>
              <motion.a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-lg shadow-cta whitespace-nowrap"
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  rest: { scale: 1 },
                  hover: {
                    scale: 1.05,
                    boxShadow: "0 8px 30px hsla(86, 100%, 50%, 0.5)",
                  },
                  tap: { scale: 0.97 },
                }}
                transition={SPRING.snappy}
              >
                AGENDAR CONSULTORIA
              </motion.a>
            </motion.div>

            {/* Badge chips */}
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: STAGGER.dramatic,
                    delayChildren: 0.4,
                  },
                },
              }}
              className="flex flex-wrap gap-4"
            >
              {badges.map((b) => (
                <motion.span
                  key={b.text}
                  variants={fadeUp}
                  className="text-sm text-muted-foreground font-body flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 backdrop-blur-sm"
                >
                  {b.icon} {b.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeRight}
            transition={{
              duration: DURATION.cinematic,
              ...SPRING.gentle,
              delay: 0.5,
            }}
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
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ ...SPRING.gentle, delay: 1.0 }}
                className="absolute -left-8 bottom-16 z-20 bg-card/90 backdrop-blur-md rounded-xl p-4 shadow-card-glow border border-border"
              >
                <p className="text-3xl font-extrabold font-heading text-gradient">
                  +347%
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Aumento médio em faturamento
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ ...SPRING.gentle, delay: 1.2 }}
                className="absolute -right-4 top-16 z-20 bg-card/90 backdrop-blur-md rounded-xl p-4 shadow-card-glow border border-border"
              >
                <p className="text-2xl font-bold font-heading text-foreground">
                  +120
                </p>
                <p className="text-xs text-muted-foreground font-body">
                  Negócios atendidos
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSectionV3;
