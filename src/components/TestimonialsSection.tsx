import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./motion/MotionWrapper";
import marcosPhoto from "@/assets/testimonial-marcos.jpg";
import julianaPhoto from "@/assets/testimonial-juliana.webp";
import felipePhoto from "@/assets/testimonial-felipe.jpg";

const testimonials = [
  {
    name: "Marcos Oliveira",
    niche: "Barbearia Dom Barba",
    photo: marcosPhoto,
    quote: "A gente sempre dependeu de indicação. Depois que começou o tráfego, a agenda lotou em 3 semanas. Tive que contratar mais um barbeiro.",
    result: "+180% de agendamentos",
  },
  {
    name: "Juliana Reis",
    niche: "Ju Confeitaria",
    photo: julianaPhoto,
    quote: "Eu postava no Instagram e ficava esperando. Agora o WhatsApp não para. Toda semana tenho encomenda nova de gente que nunca me seguiu.",
    result: "3x mais encomendas",
  },
  {
    name: "Dr. Felipe Matos",
    niche: "Matos & Associados Advocacia",
    photo: felipePhoto,
    quote: "Em 45 dias já tinha recuperado o investimento. O Gabriel entende como funciona escritório, não fica empurrando estratégia que não faz sentido pra gente.",
    result: "ROI positivo no 1º mês",
  },
];

const TestimonialsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="py-20"
    >
      <div className="container">
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Veja o que nossos clientes{" "}
            <span className="text-gradient">falam de nós</span>
          </h2>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-card-glow flex flex-col"
            >
              <div className="mb-4">
                <span className="text-primary text-3xl font-heading">"</span>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed flex-1 italic">
                {t.quote}
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-heading font-bold text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground font-body">{t.niche}</p>
                    </div>
                  </div>
                  <span className="text-xs font-heading font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {t.result}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
