import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Funciona para o meu tipo de negócio?",
    a: "Sim! Já atendemos restaurantes, clínicas, academias, salões, lojas de roupas, pet shops e dezenas de outros negócios locais. A estratégia é personalizada para cada nicho.",
  },
  {
    q: "Qual o valor mínimo de investimento em anúncios?",
    a: "Recomendamos a partir de R$ [VALOR_MINIMO]/mês em anúncios para ter resultados consistentes, mas isso varia conforme seu nicho e região. Na análise gratuita definimos juntos o investimento ideal.",
  },
  {
    q: "Em quanto tempo vejo resultados?",
    a: "Os primeiros leads costumam chegar na primeira semana. Resultados consistentes e previsíveis a partir do segundo mês, quando já temos dados para otimizar.",
  },
  {
    q: "Tem contrato de fidelidade?",
    a: "Não! Trabalhamos sem fidelidade forçada. Você fica porque quer, não porque é obrigado. Nossos resultados falam por si.",
  },
  {
    q: "Como acompanho os resultados?",
    a: "Você recebe relatórios semanais com linguagem simples, sem jargões técnicos. Mostramos quantos clientes vieram, quanto custou cada um e quanto você faturou.",
  },
  {
    q: "Vocês cuidam dos criativos (imagens e vídeos)?",
    a: "Sim! Orientamos e enviamos ideias de anúncios. Também podemos produzir os criativos ou trabalhar com materiais que você já tem.",
  },
];

const FaqSection = () => {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="py-20">
      <div className="container max-w-3xl">
        <div className="fade-up text-center mb-14">
          <p className="text-primary font-body text-sm uppercase tracking-widest mb-3 font-semibold">
            Perguntas frequentes
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-4">
            Tire suas <span className="text-gradient">dúvidas</span>
          </h2>
        </div>

        <div className="fade-up">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/40 data-[state=open]:shadow-card-glow transition-all"
              >
                <AccordionTrigger className="font-heading font-bold text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
