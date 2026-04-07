import { useRef } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import aboutPhoto from "@/assets/about-photo.png";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeUp,
  fadeRight,
  StaggerContainer,
  staggerChild,
  SPRING,
  ParallaxElement,
  TextReveal,
} from "./MotionSystemV3";

const credentials = [
  "Certificado Google Ads & Meta Blueprint",
  "Milhares já gerenciados em campanhas",
  "Especialista em negócios locais e regionais",
  "Relatórios semanais com linguagem simples",
];

const extraBullets = [
  "Otimização semanal contínua — seu custo por cliente cai mês a mês",
  "Multi-plataforma: Google, Meta, TikTok — onde seu cliente estiver",
  "Parceria, não contrato — você fica porque quer, não porque é obrigado",
];

const AboutSectionV3 = () => {
  return (
    <StaggerContainer staggerDelay={0.12} className="py-20 bg-secondary/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo with parallax */}
          <ParallaxElement speed={0.4}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-2xl scale-95" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border shadow-card-glow">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
                <img
                  src={aboutPhoto}
                  alt="Gabriel Di Tullio"
                  className="w-full h-full object-cover object-top"
                />
                <motion.div
                  variants={fadeUp}
                  className="absolute bottom-0 left-0 right-0 z-20 p-6"
                >
                  <p className="text-xl font-bold font-heading">Gabriel Di Tullio</p>
                  <p className="text-primary font-body font-medium text-sm">
                    Gestor de Tráfego · Negócios Locais
                  </p>
                </motion.div>
              </div>
            </div>
          </ParallaxElement>

          {/* Text content */}
          <motion.div variants={fadeRight} className="space-y-6">
            <p className="text-primary font-body text-sm uppercase tracking-widest font-semibold">
              Quem vai cuidar do seu tráfego
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading">
              Não sou mais um "cara do marketing".{" "}
              <span className="text-gradient">Sou seu parceiro de crescimento.</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Com anos de experiência e mais de 120 negócios locais atendidos,
              minha missão é simples: transformar o tráfego pago no canal mais
              lucrativo da sua empresa.
            </p>

            <StaggerContainer staggerDelay={0.08} className="space-y-3 font-body">
              {credentials.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerChild}
                  className="flex items-start gap-3 list-none"
                >
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </StaggerContainer>

            <StaggerContainer
              staggerDelay={0.1}
              className="space-y-3 font-body pt-2 border-t border-border/30"
            >
              {extraBullets.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerChild}
                  className="flex items-start gap-3 list-none"
                >
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </StaggerContainer>

            <motion.div variants={fadeUp}>
              <motion.a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cta-gradient text-primary-foreground font-heading font-bold text-lg shadow-cta"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 30px hsla(86, 100%, 50%, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.snappy}
              >
                FALAR COM GABRIEL
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </StaggerContainer>
  );
};

export default AboutSectionV3;
