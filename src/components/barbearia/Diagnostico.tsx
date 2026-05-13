import React from 'react';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

const symptoms = [
  {
    number: "01",
    text: <><strong>Você ainda corta</strong> mais de 15 horas por semana e considera 'trabalho de gestão' um luxo.</>
  },
  {
    number: "02",
    text: <><strong>Sua barbearia para quando você para</strong> — férias = faturamento despencando.</>
  },
  {
    number: "03",
    text: <><strong>Você não sabe quanto sobra</strong> no fim do mês até o contador mandar o resultado.</>
  },
  {
    number: "04",
    text: <><strong>Sua equipe troca</strong> mais do que você gostaria de admitir.</>
  },
  {
    number: "05",
    text: <><strong>Sua esposa pergunta</strong> 'por que estamos no mesmo lugar?' e você não tem boa resposta.</>
  }
];

const Diagnostico = () => {
  const titleWords = "Esse texto não foi escrito pra todo mundo:".split(' ');

  return (
    <section id="diagnostico" className="bg-toledo-creme py-24 md:py-32 px-6 md:px-24 flex flex-col items-center relative overflow-hidden">
      {/* Decorative Plus Pattern */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <defs>
          <pattern id="plus" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 20 12 L 20 28 M 12 20 L 28 20" stroke="rgba(201,117,64,0.08)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plus)" />
      </svg>

      <div className="max-w-[1100px] mx-auto flex flex-col gap-16 items-center relative z-10">
        {/* Header Container */}
        <div className="max-w-[900px] flex flex-col gap-6 items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body-toledo text-[14px] font-medium uppercase tracking-wider text-toledo-cobre text-center"
          >
            Diagnóstico
          </motion.span>

          <div className="flex flex-wrap gap-x-2 justify-center">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: 5, opacity: 0.001 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
                className="inline-block font-display-toledo font-medium text-[28px] md:text-[44px] leading-tight tracking-[-0.03em] text-toledo-carbono text-center"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Symptom Cards Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={index}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className={`w-full p-6 bg-white border border-[#0E0B09]/[0.08] rounded-2xl backdrop-blur-sm flex items-start gap-4 ${
                index === 4 ? "lg:col-span-2" : ""
              }`}
            >
              <XCircle className="w-6 h-6 text-toledo-vermelho-brasa flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="font-body-toledo text-[14px] font-semibold text-toledo-cobre">
                  {symptom.number}
                </span>
                <p className="font-body-toledo text-[16px] text-toledo-carbono">
                  {symptom.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Block */}
        <motion.div 
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="max-w-2xl text-center pt-8"
        >
          <p className="font-body-toledo text-lg leading-relaxed text-toledo-carbono">
            Se você se reconheceu em <strong>pelo menos 3 desses 5 sintomas</strong>, esse workshop foi pensado pra você. Os 2 dias são exatamente sobre desmontar essa armadilha.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Diagnostico;