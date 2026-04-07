import { motion } from "framer-motion";
import { fadeUp, Reveal, SPRING } from "./MotionSystemV3";
import marcosPhoto from "@/assets/testimonial-marcos.jpg";
import julianaPhoto from "@/assets/testimonial-juliana.webp";
import felipePhoto from "@/assets/testimonial-felipe.jpg";

const testimonials = [
  {
    name: "Marcos Oliveira",
    niche: "Barbearia Dom Barba",
    photo: marcosPhoto,
    quote:
      "A gente sempre dependeu de indicação. Depois que começou o tráfego, a agenda lotou em 3 semanas. Tive que contratar mais um barbeiro.",
    result: "+180% de agendamentos",
  },
  {
    name: "Juliana Reis",
    niche: "Ju Confeitaria",
    photo: julianaPhoto,
    quote:
      "Eu postava no Instagram e ficava esperando. Agora o WhatsApp não para. Toda semana tenho encomenda nova de gente que nunca me seguiu.",
    result: "3x mais encomendas",
  },
  {
    name: "Dr. Felipe Matos",
    niche: "Matos & Associados Advocacia",
    photo: felipePhoto,
    quote:
      "Em 45 dias já tinha recuperado o investimento. O Gabriel entende como funciona escritório, não fica empurrando estratégia que não faz sentido pra gente.",
    result: "ROI positivo no 1º mês",
  },
];

const TestimonialsSectionV3 = () => {
  return (
    <section className="py-20">
      <div className="container">
        <Reveal direction="up" className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Veja o que nossos clientes{" "}
            <span className="text-gradient">falam de nós</span>
          </h2>
        </Reveal>

        {/* Stacking sticky cards */}
        <div className="relative" style={{ minHeight: `${testimonials.length * 40 + 60}vh` }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="sticky mb-8"
              style={{ top: `${80 + i * 16}px`, zIndex: 10 + i }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1, ...SPRING.gentle }}
                whileHover={{
                  boxShadow: `0 ${8 + i * 4}px ${30 + i * 10}px hsla(86, 100%, 50%, 0.1)`,
                  transition: SPRING.standard,
                }}
                className="max-w-2xl mx-auto p-8 rounded-2xl bg-card/90 backdrop-blur-md border border-border transition-shadow duration-300"
                style={{
                  boxShadow: `0 ${4 + i * 4}px ${20 + i * 10}px hsla(0, 0%, 0%, ${0.2 + i * 0.1})`,
                }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <motion.img
                    src={t.photo}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-border"
                    whileHover={{ scale: 1.1, transition: SPRING.snappy }}
                  />
                  <div>
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-body">{t.niche}</p>
                  </div>
                </div>
                <p className="text-muted-foreground font-body leading-relaxed italic mb-5">
                  "{t.quote}"
                </p>
                <motion.span
                  className="inline-block text-xs font-heading font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                  whileHover={{ scale: 1.05, transition: SPRING.snappy }}
                >
                  {t.result}
                </motion.span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionV3;
