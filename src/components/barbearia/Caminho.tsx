import React from 'react';
import { motion } from 'framer-motion';

const Caminho = () => {
  const quoteText = [
    { text: "Toda", highlight: false },
    { text: "barbearia", highlight: false },
    { text: "tem", highlight: false },
    { text: "um", highlight: false },
    { text: "teto", highlight: true },
    { text: "invisível", highlight: true },
    { text: "em", highlight: true },
    { text: "R$30", highlight: true },
    { text: "mil", highlight: true },
    { text: "por", highlight: false },
    { text: "mês.", highlight: false },
    { text: "E", highlight: false },
    { text: "não", highlight: false },
    { text: "é", highlight: false },
    { text: "por", highlight: false },
    { text: "falta", highlight: false },
    { text: "de", highlight: false },
    { text: "clientes.", highlight: false },
    { text: "É", highlight: false },
    { text: "por", highlight: false },
    { text: "excesso", highlight: false },
    { text: "de", highlight: false },
    { text: "você", highlight: false },
    { text: "dentro", highlight: false },
    { text: "da", highlight: false },
    { text: "operação.", highlight: false }
  ];

  return (
    <section id="caminho" className="bg-toledo-creme py-24 md:py-32 px-6 md:px-24 flex flex-col items-center">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-12 items-center">
        {/* Kicker */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body-toledo text-[14px] font-medium uppercase tracking-wider text-toledo-cobre text-center"
        >
          O Caminho
        </motion.span>

        {/* Quote H1 with Word-by-word reveal */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 md:gap-y-2 justify-center">
          {quoteText.map((word, index) => (
            <div key={index} className="overflow-hidden py-1">
              <motion.span
                initial={{ y: 70, opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`inline-block font-display-toledo font-medium text-[32px] md:text-[67px] leading-[1.2] md:leading-[70px] tracking-[-1px] md:tracking-[-2.1px] text-center ${
                  word.highlight ? "text-toledo-cobre" : "text-toledo-carbono"
                }`}
              >
                {word.text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Paragraph Blocks */}
        <div className="max-w-3xl w-full flex flex-col gap-6 pt-12 md:pt-16">
          <motion.p 
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="font-body-toledo text-lg leading-relaxed text-toledo-carbono"
          >
            A barbearia que rende R$30 mil é a barbearia que <strong>depende de você na cadeira</strong>. Você dorme 6 horas, corre a semana inteira, e quando para — o faturamento para junto.
          </motion.p>

          <motion.p 
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="font-body-toledo text-lg leading-relaxed text-toledo-carbono"
          >
            Esse workshop é sobre cruzar essa linha invisível. <strong>Construir a operação que continua rodando</strong> quando você não está. Não é sobre virar empresário-distante. É sobre virar dono de verdade.
          </motion.p>

          <motion.p 
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="font-display-toledo italic text-xl text-toledo-cobre text-center md:text-right"
          >
            — Guilherme Toledo
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Caminho;