import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CreditCard, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations-toledo';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-[120px] md:pt-[168px] pb-24 px-4 lg:px-24 overflow-hidden flex flex-col items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=80" 
          alt="Dark barbershop atmosphere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(14,11,9,0.5)]" />
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center text-center gap-8 max-w-3xl"
      >
        <motion.h1 
          variants={fadeInUp}
          className="font-display-toledo text-[36px] md:text-[56px] font-medium leading-[1.1] tracking-[-1.5px] text-toledo-creme"
        >
          Dois dias construindo o plano para sua barbearia faturar <span className="text-toledo-cobre">R$60 mil</span> <em className="italic">sem você atrás da cadeira.</em>
        </motion.h1>

        <motion.p 
          variants={fadeInUp}
          className="font-body-toledo text-base md:text-lg leading-relaxed text-toledo-creme/80 max-w-[640px]"
        >
          Guilherme Toledo (R$18 mil para R$70 mil/mês com a Toledos Barbershop) vai conduzir presencialmente, ao longo de 2 dias, a construção do seu plano de saída da cadeira.
        </motion.p>

        <motion.div 
          variants={fadeInUp}
          className="w-full max-w-[480px] flex flex-col gap-4"
        >
          <Button 
            asChild
            className="w-full h-14 bg-toledo-cobre hover:bg-toledo-cobre-claro rounded-xl px-6 py-4 font-body-toledo text-base font-normal text-toledo-carbono flex items-center justify-center gap-4 transition-colors"
          >
            <a href="#preco">
              Quero garantir minha vaga
              <ArrowRight className="w-6 h-6" />
            </a>
          </Button>

          <div className="flex gap-3 flex-wrap justify-center">
            <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[14px] py-2 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
              <ShieldCheck className="w-4 h-4" />
              7 dias de reembolso
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[14px] py-2 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
              <CreditCard className="w-4 h-4" />
              12x sem juros pra você
            </motion.div>
            <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[14px] py-2 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
              <Zap className="w-4 h-4" />
              Acesso imediato ao Caderno
            </motion.div>
          </div>
        </motion.div>

        <div className="hidden lg:flex mt-16 gap-3 flex-wrap justify-center">
          <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[18px] py-3 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
            <TrendingUp className="w-4 h-4" />
            Plano construído nos 2 dias
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[18px] py-3 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
            <TrendingUp className="w-4 h-4" />
            Esposa convidada de graça
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2 rounded-full px-[18px] py-3 border border-[rgba(245,237,223,0.15)] bg-[rgba(245,237,223,0.02)] font-body-toledo text-[14px] text-toledo-creme">
            <TrendingUp className="w-4 h-4" />
            Imersão em Aulas inclusa
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;