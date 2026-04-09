import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { AlertTriangle, TrendingUp, Target, Layers, ArrowRight, ChevronDown, Zap, Globe, Users, BarChart3, ShoppingBag, MapPin, Youtube, Instagram, CheckCircle2, XCircle, Clock, DollarSign, Eye, MousePointerClick, Smartphone, Monitor, Search, Shield, Heart, Unlock, Brain, Repeat, UserCheck, Store, Mail, Phone, MessageSquare, Megaphone, CalendarCheck, Rocket } from "lucide-react";

const METRICS = [
  { label: "Alunas no ecossistema", value: 7600, suffix: "+", icon: Users },
  { label: "Inscritos no YouTube", value: 44200, suffix: "", icon: Youtube },
  { label: "Vídeos publicados", value: 204, suffix: "", icon: Eye },
  { label: "Países alcançados", value: 12, suffix: "+", icon: Globe },
];

const REAL_PAINS = [
  {
    surface: "\"Não conseguimos nos dividir entre o digital e o físico\"",
    deep: "A dor real não é falta de tempo — é que o digital hoje depende de vocês para funcionar. Enquanto o digital precisar da sua cabeça para rodar, a expansão física vai sempre competir com ele. O digital precisa virar uma máquina autônoma que roda, fatura e escala mesmo quando vocês estão focados nos shoppings.",
    icon: Brain,
  },
  {
    surface: "\"Preciso de alguém que assuma meu time de lançamento\"",
    deep: "O que está por trás disso: vocês não precisam apenas de um executor de lançamento. Precisam de alguém que pense o negócio digital com vocês, que entenda a esteira completa, que saiba quando lançar, quando fazer perpétuo, quando ativar a base, quando pausar. Alguém que trate o digital como se fosse sócio — não como funcionário esperando briefing.",
    icon: UserCheck,
  },
  {
    surface: "\"Que crie os demais funis de ponta a ponta\"",
    deep: "A esteira já existe e é sofisticada. O gap não é criar produtos — é construir os caminhos automatizados que levam a pessoa certa para o produto certo no momento certo. Workshop → Escola → Mentoria → Piercing Lab. Cada transição entre degraus precisa de um funil próprio, uma equipe comercial ativando, e métricas claras.",
    icon: Layers,
  },
];

const VALUE_LADDER = [
  {
    level: "ISCA / CAPTAÇÃO",
    tag: "Grátis",
    current: "Workshop Furo Humanizado (captura via Landing Page)",
    status: "active",
    observation: "Funil de workshop ativo com 4 versões testadas e segmentação por profissão (enfermeiras, farmacêuticas, esteticistas, profissionais de beleza). Modelo de captação validado.",
    opportunity: "Criar iscas específicas por profissão com quiz de diagnóstico que pontua automaticamente o lead. Quem pontua alto vai direto para oferta da Escola. Quem pontua baixo entra em sequência de nutrição. Resultado: menos leads desqualificados, mais conversão no final.",
    funnel: "Quiz → Segmentação automática → Sequência de e-mails personalizada por perfil → Oferta segmentada",
    team: "Copywriter para criar as variações de comunicação por perfil + automação na ActiveCampaign (já utilizada)",
  },
  {
    level: "ENTRADA",
    tag: "Low Ticket",
    current: "Minicurso de Furo Humanizado / Jaqueflix",
    status: "active",
    observation: "Jaqueflix funciona como biblioteca de conteúdo para engajar. Minicurso como primeira compra de entrada. Ambos validados com múltiplas versões.",
    opportunity: "Transformar o minicurso em oferta que se paga sozinha: na hora da compra, oferecer um 'Kit Documentos Prontos' como complemento por +R$47, e logo depois um upgrade para 'Aula de Biossegurança Avançada' por +R$97. Objetivo: o custo do anúncio se pagar já na primeira venda, antes mesmo de oferecer a Escola.",
    funnel: "Anúncio → Página de venda do minicurso → Complemento na hora do pagamento → Oferta adicional pós-compra → Sequência de e-mails aquecendo para a Escola",
    team: "Gestor de tráfego para anúncios + Copywriter para páginas de venda e e-mails + Equipe comercial via WhatsApp para quem não comprou",
  },
  {
    level: "PRODUTO PRINCIPAL",
    tag: "Carro-Chefe",
    current: "Escola do Furo Humanizado (R$ 997 — 12x R$ 92,77)",
    status: "active",
    observation: "+150h de aula, 1 ano de acesso, suporte + encontros ao vivo. 7.600+ alunas comprovam que o produto entrega. Sistema de Jaleco Dourado/Preto é um mecanismo genial de retenção e prova social.",
    opportunity: "Dois caminhos de venda simultâneos: (1) Webinário automatizado rodando todo dia — a pessoa se inscreve, assiste, e pode comprar a qualquer momento, sem depender de lançamento. (2) Lançamentos pontuais com eventos ao vivo (Congresso, Semanas temáticas) para picos de faturamento. Um não substitui o outro — os dois rodam em paralelo.",
    funnel: "PERPÉTUO: Anúncio → Inscrição no webinário → Apresentação automatizada → Página de matrícula → Equipe comercial para quem assistiu e não comprou.\nLANÇAMENTO: Evento ao vivo (3-5 dias) → Abertura de turma → Equipe comercial ativa nos grupos e no WhatsApp.",
    team: "Gestor de tráfego dedicado + Closer/SDR para contato via WhatsApp com leads quentes (quem assistiu webinário, quem clicou em matrícula) + Copywriter para roteiros e páginas + Suporte para onboarding de novas alunas",
  },
  {
    level: "PREMIUM",
    tag: "High Ticket",
    current: "Mentoria LED (aplicação via formulário + sessão estratégica)",
    status: "active",
    observation: "Processo de seleção estruturado: formulário → call de qualificação → matrícula. Modelo clássico de venda consultiva para ticket alto. Turmas recorrentes com renovação.",
    opportunity: "Imersão presencial premium como evento de ascensão (já existe estrutura 'Furo Humanizado Experience' nas páginas). Pode virar um evento trimestral presencial de 2 dias com ticket de R$3.000–5.000, gerando receita direta + conteúdo para redes + cases para a Escola.",
    funnel: "Convite exclusivo para alunas da Escola com resultado → Página de aplicação → Call de qualificação com closer → Matrícula → Onboarding presencial",
    team: "Closer dedicado para calls de qualificação (pode ser o mesmo do funil da Escola em horários separados) + Coordenação de eventos presenciais",
  },
  {
    level: "RECORRÊNCIA",
    tag: "Receita Todo Mês",
    current: "SaaS próprio + Piercing Lab Atacado (venda de insumos para alunas)",
    status: "active",
    observation: "O maior diferencial competitivo: a Damas da Lâmpada forma a profissional, dá a ferramenta digital (SaaS) e vende o insumo físico (joias atacado). É um ecossistema fechado que retém a aluna em múltiplas frentes.",
    opportunity: "Automatizar o momento da primeira compra: quando a aluna termina o módulo de instrumentação, recebe uma sequência de 3 e-mails + mensagem no WhatsApp com oferta exclusiva do 'Kit Primeira Atuação' via Piercing Lab. Cada aluna formada que compra insumos de terceiros é dinheiro que sai do ecossistema.",
    funnel: "Gatilho: aluna completa módulo → Sequência automatizada (e-mail + WhatsApp) → Oferta exclusiva Piercing Lab com desconto de ativação → Remarketing para quem não comprou",
    team: "Equipe comercial via WhatsApp para ativação de base + Automação de e-mail (ActiveCampaign) + Gestão de estoque alinhada com previsão de demanda",
  },
  {
    level: "EXPANSÃO FÍSICA",
    tag: "Novo Canal",
    current: "Operações em shoppings (em expansão) + Clínica Luquini",
    status: "expanding",
    observation: "É justamente essa expansão que gerou a necessidade de um lançador dedicado para o digital. O digital e o físico competem pela atenção de vocês — e o digital não pode perder.",
    opportunity: "Cada unidade física é um centro de produção de conteúdo e prova social local. A aluna que se forma no digital pode ser cliente da clínica. A cliente da clínica pode se interessar pela formação. Perfil no Google Meu Negócio otimizado por unidade + anúncios locais para captar clientes da região de cada shopping.",
    funnel: "DIGITAL → FÍSICO: aluna formada na cidade X recebe convite para visitar a unidade local.\nFÍSICO → DIGITAL: cliente da clínica recebe material sobre a formação profissional.",
    team: "Coordenação entre equipe digital e gerentes das unidades físicas para ações cruzadas",
  },
];

const GAPS = [
  {
    severity: "URGENTE",
    color: "#ef4444",
    title: "Site da oferta principal carregando lento no celular",
    detail: "A nota de velocidade da página principal no celular é 64 de 100. A imagem principal demora 5 segundos para aparecer. Como a maioria das pessoas vem do Instagram (celular), cada segundo de demora pode derrubar até 7% das vendas. A pessoa clica, espera, desiste.",
    action: "Otimização técnica da página: reduzir o peso das imagens, carregar apenas o essencial primeiro, eliminar arquivos desnecessários que travam o carregamento. Meta: página abrindo em menos de 2 segundos no celular.",
  },
  {
    severity: "URGENTE",
    color: "#ef4444",
    title: "Sistema de rastreamento de vendas com erro",
    detail: "O sistema que rastreia quem visitou o site e quem comprou está com falha técnica — ele não está conseguindo se comunicar com as plataformas de anúncio. Na prática: se vocês investirem em anúncios agora, não vão conseguir medir direito o retorno, e o algoritmo do Facebook/Google não vai aprender quem é o perfil ideal de compradora.",
    action: "Correção do sistema de rastreamento antes de qualquer investimento em anúncios pagos. Sem isso, qualquer real investido em mídia está parcialmente cego.",
  },
  {
    severity: "ALTO",
    color: "#f59e0b",
    title: "Nenhum anúncio pago rodando (Meta nem Google)",
    detail: "Com 7.600 alunas e um YouTube com 44 mil inscritos, o orgânico sustenta a operação — e isso é incrível. Mas significa que o crescimento está limitado à velocidade do conteúdo orgânico. Tráfego pago é o acelerador que faz o faturamento saltar de patamar sem precisar produzir mais conteúdo.",
    action: "Estruturar 3 frentes de anúncio: (1) Atrair pessoas novas → levar para o Workshop gratuito. (2) Impactar quem já assistiu vídeos no YouTube/Instagram → oferecer a Escola. (3) Encontrar pessoas parecidas com as melhores alunas (Jaleco Preto/Dourado) → aquisição premium.",
  },
  {
    severity: "ALTO",
    color: "#f59e0b",
    title: "Página principal invisível para o Google",
    detail: "A landing page não tem título nem descrição para buscadores. Quando alguém pesquisa 'curso furo humanizado' ou 'perfuração auricular curso' no Google, a página não aparece nos resultados — mesmo sendo a maior referência do mercado.",
    action: "Adicionar título, descrição e marcações em todas as páginas para que o Google encontre e exiba nos resultados de busca. Demanda orgânica de fundo de funil (gente já procurando o que vocês vendem) está sendo desperdiçada.",
  },
  {
    severity: "MÉDIO",
    color: "#3b82f6",
    title: "Venda cruzada Escola → Piercing Lab sem automação",
    detail: "O ecossistema é genial: forma a profissional e vende o insumo. Mas se não existe um processo automático que leve a aluna recém-formada a fazer o primeiro pedido no Piercing Lab, ela vai buscar fornecedores em outro lugar — e o dinheiro sai do ecossistema.",
    action: "Criar sequência automática: aluna completa módulo prático → recebe oferta exclusiva de 'Kit Primeira Atuação' com desconto de ativação → equipe comercial faz follow-up via WhatsApp com quem não comprou em 48h.",
  },
  {
    severity: "MÉDIO",
    color: "#3b82f6",
    title: "YouTube gerando audiência que não é reaproveitada em anúncios",
    detail: "204 vídeos gerando visualizações todos os dias = milhares de pessoas já educadas sobre o método. Esse público é ouro para anúncios. Mas sem campanhas impactando essas pessoas de volta, elas assistem, se interessam, e ninguém aparece com a oferta na hora certa.",
    action: "Criar públicos de quem assistiu vídeos no YouTube e impactá-los com anúncios da Escola e do Workshop. Quanto mais assistiram, mais prontas para comprar. Cada vídeo publicado vira um gerador silencioso de público qualificado para anúncios.",
  },
];

const TEAM_STRUCTURE = [
  {
    role: "Gestor de Tráfego Dedicado",
    focus: "Opera as campanhas de anúncios (Meta + Google + YouTube). Responsável por custo de aquisição, otimização de criativos e escala de investimento.",
    icon: Megaphone,
  },
  {
    role: "Closer / SDR Comercial",
    focus: "Atende via WhatsApp os leads quentes: quem assistiu webinário e não comprou, quem clicou em matrícula e abandonou, quem aplicou para mentoria. Faz follow-up humanizado, tira dúvidas, fecha venda.",
    icon: Phone,
  },
  {
    role: "Copywriter / Estrategista de Comunicação",
    focus: "Escreve roteiros de webinário, sequências de e-mail, páginas de venda, scripts para o comercial. Garante que a comunicação da Jaqueline se mantenha autêntica em todos os pontos de contato.",
    icon: MessageSquare,
  },
  {
    role: "Automação e Operações",
    focus: "Configura as automações (ActiveCampaign), integrações entre plataformas, rastreamento de conversões, relatórios. É quem garante que a máquina funcione sem travar.",
    icon: Repeat,
  },
];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ duration: 0.7, delay, type: "spring", stiffness: 100, damping: 20 }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const step = Math.max(1, Math.floor(end / 112));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{count.toLocaleString("pt-BR")}{suffix}</span>;
}

export default function DamasAnalysis() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeTab, setActiveTab] = useState("mobile");
  const [expandedLadder, setExpandedLadder] = useState(null);

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        :root { --bg:#0a0a0f; --bg2:#12121a; --bg3:#1a1a28; --text:#e8e6e3; --text2:#9b97a0; --accent:#c9a55c; --accent2:#e8c97a; --red:#ef4444; --amber:#f59e0b; --blue:#3b82f6; --green:#22c55e; --serif:'Playfair Display',serif; --sans:'Plus Jakarta Sans',sans-serif; }
        * { box-sizing:border-box; margin:0; padding:0; }
        @media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:0.01ms!important; transition-duration:0.01ms!important; } }
        ::selection { background:var(--accent); color:var(--bg); }
        .sp { padding:80px 24px; max-width:1100px; margin:0 auto; }
        @media (min-width:768px) { .sp { padding:120px 40px; } }
        .badge { display:inline-block; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
        .card { background:var(--bg2); border:1px solid rgba(201,165,92,0.12); border-radius:16px; padding:28px; }
        .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(201,165,92,0.25),transparent); margin:0 auto; max-width:600px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes pglow { 0%,100%{box-shadow:0 0 20px rgba(201,165,92,0.05)} 50%{box-shadow:0 0 40px rgba(201,165,92,0.12)} }
      `}</style>

      <motion.div style={{ scaleX, position:"fixed", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,var(--accent),var(--accent2))", transformOrigin:"0%", zIndex:999 }} />

      {/* HERO */}
      <header style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding:"40px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,165,92,0.08) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"-10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <span className="badge" style={{ background:"rgba(201,165,92,0.15)", color:"var(--accent)" }}>ANÁLISE DE OPORTUNIDADES — ABRIL 2026</span>
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.2, type:"spring", stiffness:80 }} style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,5vw,3.6rem)", lineHeight:1.1, marginTop:32, maxWidth:800 }}>
          E se o digital rodasse <span style={{ color:"var(--accent)" }}>sem depender de vocês?</span>
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} style={{ marginTop:24, color:"var(--text2)", fontSize:"clamp(1rem,2vw,1.15rem)", maxWidth:620, lineHeight:1.8 }}>
          Uma análise do ecossistema Damas da Lâmpada: o que já está construído, o que está travando a escala, e como transformar o digital em uma máquina que fatura mesmo quando a atenção de vocês está nos shoppings.
        </motion.p>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }} style={{ marginTop:24, padding:"12px 24px", borderRadius:12, background:"rgba(201,165,92,0.06)", border:"1px solid rgba(201,165,92,0.12)" }}>
          <p style={{ color:"var(--text2)", fontSize:13 }}>Gabriel Di Tullio — <span style={{ color:"var(--accent)" }}>@gabditullio</span></p>
          <p style={{ color:"var(--text2)", fontSize:12, marginTop:4 }}>Colega de mentoria Rise — Lançamento Pago</p>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }} style={{ marginTop:60 }}>
          <ChevronDown size={28} color="var(--accent)" style={{ animation:"float 2s ease-in-out infinite" }} />
        </motion.div>
      </header>

      {/* DOR REAL */}
      <section style={{ background:"var(--bg2)" }}>
        <div className="sp">
          <Section>
            <p style={{ color:"var(--accent)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Antes de Qualquer Proposta</p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>O que vocês estão <span style={{ color:"var(--accent)" }}>sentindo</span> vs. o que <span style={{ color:"var(--accent)" }}>está acontecendo</span></h2>
            <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:48 }}>Eu li sua mensagem no grupo e fiz questão de entender o que está por trás de cada frase antes de falar qualquer coisa. Porque a maioria dos lançadores vai responder oferecendo execução — mas o que vocês precisam é de alguém que entenda o problema de verdade.</p>
          </Section>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {REAL_PAINS.map((pain, i) => (
              <Section key={i} delay={i * 0.1}>
                <motion.div whileHover={{ borderColor:"rgba(201,165,92,0.3)" }} className="card" style={{ transition:"border-color 0.3s" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"rgba(201,165,92,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <pain.icon size={20} color="var(--accent)" />
                    </div>
                    <div>
                      <p style={{ color:"var(--text2)", fontSize:14, fontStyle:"italic", marginBottom:12, lineHeight:1.6 }}>{pain.surface}</p>
                      <p style={{ color:"var(--text)", fontSize:15, lineHeight:1.75 }}>{pain.deep}</p>
                    </div>
                  </div>
                </motion.div>
              </Section>
            ))}
          </div>
          <Section delay={0.4}>
            <div style={{ marginTop:32, padding:"24px 28px", borderRadius:16, background:"rgba(201,165,92,0.04)", border:"1px solid rgba(201,165,92,0.12)", textAlign:"center" }}>
              <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.1rem,2vw,1.35rem)", color:"var(--text)", lineHeight:1.7 }}>
                O sonho real não é "encontrar um lançador".<br />
                <span style={{ color:"var(--accent)" }}>É que o digital fature 7 dígitos no ano enquanto vocês inauguram a próxima unidade no shopping — sem precisar escolher um ou outro.</span>
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* METRICS */}
      <section className="sp">
        <Section>
          <p style={{ color:"var(--accent)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>O Ecossistema Hoje</p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>Vocês já construíram algo que <span style={{ color:"var(--accent)" }}>a maioria nunca vai ter</span></h2>
          <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:48 }}>A maioria dos infoprodutores tem 1 produto e depende de lançamento. Vocês têm um ecossistema com 6 degraus de valor, produto físico integrado, SaaS, comunidade gamificada e expansão internacional. Isso é raro. E é exatamente o que torna essa operação tão escalável com a pessoa certa operando.</p>
        </Section>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
          {METRICS.map((m, i) => (
            <Section key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y:-4, boxShadow:"0 8px 30px rgba(201,165,92,0.1)" }} className="card" style={{ textAlign:"center", cursor:"default" }}>
                <m.icon size={24} color="var(--accent)" style={{ marginBottom:12 }} />
                <div style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.8rem,3vw,2.6rem)", color:"var(--accent2)", fontWeight:700 }}><Counter value={m.value} suffix={m.suffix} /></div>
                <div style={{ color:"var(--text2)", fontSize:13, marginTop:6 }}>{m.label}</div>
              </motion.div>
            </Section>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* VALUE LADDER */}
      <section style={{ background:"var(--bg2)" }}>
        <div className="sp">
          <Section>
            <p style={{ color:"var(--accent)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Esteira de Valor Completa</p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>Cada degrau com seu <span style={{ color:"var(--accent)" }}>funil e equipe</span></h2>
            <p style={{ color:"var(--text2)", maxWidth:700, lineHeight:1.8, marginBottom:16 }}>A esteira já existe e é sofisticada. O que falta é que cada degrau tenha seu próprio caminho de venda automatizado e uma equipe comercial ativando as transições. Toque em cada card para ver o funil e a equipe recomendada.</p>
          </Section>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {VALUE_LADDER.map((item, i) => {
              const isExp = expandedLadder === i;
              return (
                <Section key={i} delay={i * 0.06}>
                  <motion.div whileHover={{ borderColor:"rgba(201,165,92,0.3)" }} onClick={() => setExpandedLadder(isExp ? null : i)} className="card" style={{ cursor:"pointer", transition:"border-color 0.3s" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:10, marginBottom:14 }}>
                      <span className="badge" style={{ background:"rgba(201,165,92,0.15)", color:"var(--accent)" }}>{item.level}</span>
                      <span className="badge" style={{ background:"rgba(34,197,94,0.12)", color:"var(--green)", fontSize:10 }}>{item.tag}</span>
                      {item.status === "expanding" && <span className="badge" style={{ background:"rgba(59,130,246,0.12)", color:"var(--blue)", fontSize:10 }}>EM EXPANSÃO</span>}
                      <motion.div animate={{ rotate: isExp ? 180 : 0 }} style={{ marginLeft:"auto" }}><ChevronDown size={18} color="var(--text2)" /></motion.div>
                    </div>
                    <h3 style={{ fontSize:"clamp(0.95rem,1.8vw,1.1rem)", fontWeight:700, marginBottom:10 }}>{item.current}</h3>
                    <p style={{ color:"var(--text2)", fontSize:14, lineHeight:1.65, marginBottom: isExp ? 14 : 0 }}>{item.observation}</p>
                    <AnimatePresence>
                      {isExp && (
                        <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3 }} style={{ overflow:"hidden" }}>
                          <div style={{ background:"rgba(201,165,92,0.06)", borderRadius:12, padding:"16px 20px", borderLeft:"3px solid var(--accent)", marginBottom:12 }}>
                            <div style={{ fontSize:11, fontWeight:700, color:"var(--accent)", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Oportunidade</div>
                            <p style={{ color:"var(--text)", fontSize:14, lineHeight:1.7 }}>{item.opportunity}</p>
                          </div>
                          <div style={{ background:"rgba(59,130,246,0.06)", borderRadius:12, padding:"16px 20px", borderLeft:"3px solid var(--blue)", marginBottom:12 }}>
                            <div style={{ fontSize:11, fontWeight:700, color:"var(--blue)", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Funil Recomendado</div>
                            <p style={{ color:"var(--text)", fontSize:14, lineHeight:1.7, whiteSpace:"pre-line" }}>{item.funnel}</p>
                          </div>
                          <div style={{ background:"rgba(34,197,94,0.06)", borderRadius:12, padding:"16px 20px", borderLeft:"3px solid var(--green)" }}>
                            <div style={{ fontSize:11, fontWeight:700, color:"var(--green)", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Equipe Necessária</div>
                            <p style={{ color:"var(--text)", fontSize:14, lineHeight:1.7 }}>{item.team}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Section>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* TEAM */}
      <section className="sp">
        <Section>
          <p style={{ color:"var(--green)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Estrutura de Equipe</p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>O time que faz o digital <span style={{ color:"var(--accent)" }}>rodar sozinho</span></h2>
          <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:48 }}>Não é sobre contratar 20 pessoas. É sobre ter as 4 funções certas cobertas — pode ser com 4 pessoas ou com 2 pessoas multifunção. O importante é que nenhuma dessas funções dependa de vocês no dia a dia.</p>
        </Section>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
          {TEAM_STRUCTURE.map((role, i) => (
            <Section key={i} delay={i * 0.1}>
              <motion.div whileHover={{ y:-4, boxShadow:"0 8px 30px rgba(201,165,92,0.08)" }} className="card" style={{ height:"100%", cursor:"default" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:"rgba(201,165,92,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                  <role.icon size={20} color="var(--accent)" />
                </div>
                <h4 style={{ fontSize:15, fontWeight:700, marginBottom:10, color:"var(--accent2)" }}>{role.role}</h4>
                <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.7 }}>{role.focus}</p>
              </motion.div>
            </Section>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PAGESPEED */}
      <section style={{ background:"var(--bg2)" }}>
        <div className="sp">
          <Section>
            <p style={{ color:"var(--red)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Diagnóstico Técnico</p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>Velocidade da página <span style={{ color:"var(--accent)" }}>onde a venda acontece</span></h2>
            <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:32 }}>Testei a página principal de matrículas pelo Google PageSpeed. O resultado no celular preocupa — e como a maioria do tráfego vem do Instagram (celular), isso impacta diretamente quantas pessoas conseguem chegar até o botão de compra.</p>
          </Section>
          <Section delay={0.1}>
            <div style={{ display:"flex", gap:8, marginBottom:24 }}>
              {["mobile","desktop"].map(tab => (
                <motion.button key={tab} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => setActiveTab(tab)} style={{ padding:"10px 24px", borderRadius:999, border:"1px solid", borderColor: activeTab===tab ? "var(--accent)" : "rgba(155,151,160,0.2)", background: activeTab===tab ? "rgba(201,165,92,0.12)" : "transparent", color: activeTab===tab ? "var(--accent)" : "var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--sans)", display:"flex", alignItems:"center", gap:6 }}>
                  {tab==="mobile" ? <Smartphone size={14}/> : <Monitor size={14}/>}
                  {tab==="mobile" ? "Celular" : "Computador"}
                </motion.button>
              ))}
            </div>
          </Section>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.3 }}>
              {(() => {
                const isM = activeTab === "mobile";
                const score = isM ? 64 : 70;
                const sc = score >= 90 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)";
                const ms = isM
                  ? [{ l:"Tempo até o primeiro conteúdo", v:"1,7s", g:false }, { l:"Tempo até a imagem principal", v:"5,1s", g:false }, { l:"Tempo que a página trava", v:"570ms", g:false }, { l:"Estabilidade visual", v:"Boa", g:true }]
                  : [{ l:"Tempo até o primeiro conteúdo", v:"0,3s", g:true }, { l:"Tempo até a imagem principal", v:"2,5s", g:false }, { l:"Tempo que a página trava", v:"290ms", g:false }, { l:"Estabilidade visual", v:"Boa", g:true }];
                return (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
                    <div className="card" style={{ textAlign:"center" }}>
                      <div style={{ fontSize:11, color:"var(--text2)", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Nota Geral</div>
                      <div style={{ width:90, height:90, borderRadius:"50%", border:`3px solid ${sc}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto", fontSize:32, fontWeight:800, color:sc }}>{score}</div>
                      <div style={{ fontSize:11, color:"var(--text2)", marginTop:8 }}>de 100</div>
                    </div>
                    {ms.map((m,i) => (
                      <div key={i} className="card" style={{ textAlign:"center" }}>
                        <div style={{ fontSize:11, color:"var(--text2)", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>{m.l}</div>
                        <div style={{ fontSize:24, fontWeight:700, color: m.g ? "var(--green)" : "var(--amber)" }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>
          <Section delay={0.2}>
            <div style={{ marginTop:24, background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.15)", borderRadius:12, padding:"20px 24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <AlertTriangle size={16} color="var(--red)" />
                <span style={{ fontWeight:700, fontSize:14, color:"var(--red)" }}>Problema no rastreamento de vendas</span>
              </div>
              <p style={{ color:"var(--text2)", fontSize:14, lineHeight:1.7 }}>O sistema que deveria dizer ao Facebook e ao Google "essa pessoa comprou" está com falha de comunicação. Na prática: se vocês investirem em anúncios agora, as plataformas não vão conseguir aprender quem é o perfil ideal de compradora. É como dirigir de olhos vendados. Precisa ser corrigido antes de qualquer investimento em mídia.</p>
            </div>
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* GAPS */}
      <section className="sp">
        <Section>
          <p style={{ color:"var(--amber)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>O Que Está Travando a Escala</p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>6 pontos que, <span style={{ color:"var(--accent)" }}>corrigidos, destravam crescimento</span></h2>
          <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:48 }}>Nenhum deles é sobre "falta de produto" ou "falta de conteúdo" — a Jaqueline já resolveu isso. São ajustes de infraestrutura, processos e ativação de canais que já existem mas não estão sendo usados.</p>
        </Section>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {GAPS.map((gap, i) => (
            <Section key={i} delay={i * 0.06}>
              <motion.div whileHover={{ borderColor:`${gap.color}40` }} className="card" style={{ borderLeft:`3px solid ${gap.color}`, transition:"border-color 0.3s" }}>
                <span className="badge" style={{ background:`${gap.color}18`, color:gap.color, marginBottom:12 }}>{gap.severity}</span>
                <h3 style={{ fontSize:"clamp(0.95rem,1.8vw,1.1rem)", fontWeight:700, marginBottom:8 }}>{gap.title}</h3>
                <p style={{ color:"var(--text2)", fontSize:14, lineHeight:1.7, marginBottom:14 }}>{gap.detail}</p>
                <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                  <Zap size={14} color="var(--accent)" style={{ marginTop:3, flexShrink:0 }} />
                  <p style={{ color:"var(--accent2)", fontSize:13, lineHeight:1.65 }}>{gap.action}</p>
                </div>
              </motion.div>
            </Section>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* INTERNATIONAL */}
      <section style={{ background:"var(--bg2)" }}>
        <div className="sp">
          <Section>
            <p style={{ color:"var(--blue)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Oportunidade Adicional</p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:12 }}>A Internacionalização Já Começou</h2>
            <p style={{ color:"var(--text2)", maxWidth:680, lineHeight:1.8, marginBottom:32 }}>Encontrei páginas em espanhol com checkout separado por moeda para México, Chile, Colômbia e Espanha. O "Semana Enfermería de Valor" já foi executado. Isso não é plano futuro — é uma operação que já saiu do papel e está esperando escala.</p>
          </Section>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
            {["México","Chile","Colômbia","Espanha","Dólar (EUA/outros)"].map((c,i) => (
              <Section key={i} delay={i * 0.08}>
                <motion.div whileHover={{ scale:1.05 }} className="card" style={{ padding:"12px 20px", display:"flex", alignItems:"center", gap:8, cursor:"default" }}>
                  <Globe size={14} color="var(--accent)" /><span style={{ fontSize:14, fontWeight:600 }}>{c}</span>
                </motion.div>
              </Section>
            ))}
          </div>
          <Section delay={0.3}>
            <div style={{ marginTop:32, background:"rgba(59,130,246,0.06)", border:"1px solid rgba(59,130,246,0.15)", borderRadius:12, padding:"20px 24px" }}>
              <p style={{ color:"var(--text)", fontSize:14, lineHeight:1.7 }}>
                <strong style={{ color:"var(--blue)" }}>Na prática:</strong> Cada país já tem checkout com moeda local e páginas em espanhol. Não é construir do zero — é escalar com anúncios segmentados por país e criativos localizados. Esse é um canal de receita adicional que a maioria dos concorrentes nem sonha em ter.
              </p>
            </div>
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* CONTEXT / RISE */}
      <section className="sp">
        <Section>
          <p style={{ color:"var(--accent)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Contexto</p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.4rem)", marginBottom:24 }}>Por que estou mandando <span style={{ color:"var(--accent)" }}>isso</span></h2>
        </Section>
        <Section delay={0.1}>
          <div className="card" style={{ animation:"pglow 4s ease-in-out infinite" }}>
            <p style={{ color:"var(--text)", fontSize:15, lineHeight:1.85, marginBottom:20 }}>Somos colegas na Rise do Baldan — mentoria de lançamento pago. Vi sua mensagem no grupo e, ao invés de simplesmente responder "tenho interesse", quis fazer diferente.</p>
            <p style={{ color:"var(--text)", fontSize:15, lineHeight:1.85, marginBottom:20 }}>Fiz questão de analisar o ecossistema inteiro da Damas da Lâmpada antes de qualquer conversa. Entrei nas páginas, rodei teste de velocidade, olhei todas as URLs do sitemap, verifiquei a biblioteca de anúncios, estudei o YouTube, li o posicionamento do Instagram. Não para impressionar — mas porque é assim que eu trabalho.</p>
            <p style={{ color:"var(--text)", fontSize:15, lineHeight:1.85, marginBottom:20 }}>Na Rise, a gente opera com lançamento pago. Meu último lançamento pago foi em nicho de saúde: <span style={{ color:"var(--accent)", fontWeight:700 }}>ROAS 7.7, CPM R$14, ticket R$997</span>. Isso significa que a cada R$1 investido em anúncios, voltaram R$7,70. E o ticket é praticamente o mesmo da Escola do Furo Humanizado.</p>
            <p style={{ color:"var(--text2)", fontSize:15, lineHeight:1.85 }}>Essa análise é genuína. É minha forma de mostrar como eu penso antes de pedir qualquer coisa. Se fizer sentido, conversa. Se não fizer, fica com o material — ele já tem valor sozinho.</p>
          </div>
        </Section>
      </section>

      <div className="divider" />

      {/* SYNTHESIS */}
      <section style={{ background:"var(--bg2)" }}>
        <div className="sp" style={{ textAlign:"center" }}>
          <Section>
            <p style={{ color:"var(--accent)", fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Síntese</p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.6rem,3vw,2.6rem)", marginBottom:24, maxWidth:750, margin:"0 auto 24px" }}>
              O ecossistema está <span style={{ color:"var(--accent)" }}>construído</span>. A expert <span style={{ color:"var(--accent)" }}>não arrega</span>. O que falta é <span style={{ color:"var(--accent)" }}>a máquina de aquisição rodar sem vocês.</span>
            </h2>
            <p style={{ color:"var(--text2)", maxWidth:660, margin:"0 auto", lineHeight:1.8, fontSize:"clamp(0.95rem,1.5vw,1.05rem)" }}>A Damas da Lâmpada tem o que 90% dos infoprodutores não têm: esteira com 6 degraus, produto físico no ecossistema, comunidade com gamificação, internacionalização em andamento e uma expert que produz conteúdo sem parar. A operação não precisa de mais produtos. Precisa de alguém que monte a máquina de aquisição paga, estruture os funis entre cada degrau, e coloque uma equipe comercial ativando — para que vocês possam abrir os shoppings com tranquilidade, sabendo que o digital está escalando.</p>
          </Section>
          <Section delay={0.2}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginTop:48, maxWidth:850, margin:"48px auto 0" }}>
              {[
                { icon: Shield, n:"01", t:"Corrigir a Base", d:"Velocidade da página, rastreamento de vendas, visibilidade no Google. Sem isso, qualquer investimento em anúncios rende menos do que deveria." },
                { icon: Megaphone, n:"02", t:"Ativar Aquisição Paga", d:"Anúncios rodando todo dia: pessoas novas → Workshop, audiência do YouTube → Escola, público parecido com as melhores alunas → aquisição premium." },
                { icon: Phone, n:"03", t:"Equipe Comercial nos Funis", d:"Closer no WhatsApp ativando quem assistiu e não comprou, quem abandonou matrícula, quem aplicou para mentoria. Nenhum lead quente esfria." },
                { icon: Repeat, n:"04", t:"Automatizar Cross-Sell", d:"Aluna formada → primeiro pedido Piercing Lab automático. Aluna da Escola → convite para mentoria. Cada transição entre degraus gerando receita sem depender de vocês." },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y:-6, boxShadow:"0 12px 40px rgba(201,165,92,0.1)" }} className="card" style={{ textAlign:"left", cursor:"default" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:"rgba(201,165,92,0.1)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <item.icon size={18} color="var(--accent)" />
                    </div>
                    <span style={{ fontSize:12, fontWeight:800, color:"var(--accent)", letterSpacing:1 }}>{item.n}</span>
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:700, marginBottom:8, color:"var(--accent2)" }}>{item.t}</h4>
                  <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.7 }}>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"48px 24px", textAlign:"center", borderTop:"1px solid rgba(201,165,92,0.08)" }}>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.1rem,2vw,1.3rem)", marginBottom:16 }}>Gabriel Di Tullio — <span style={{ color:"var(--accent)" }}>@gabditullio</span></p>
          <p style={{ color:"var(--text2)", fontSize:13, lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>Análise elaborada com dados públicos — Google PageSpeed, biblioteca de anúncios da Meta, YouTube, sitemaps, Instagram.</p>
          <p style={{ color:"var(--text2)", fontSize:12, marginTop:12 }}>Abril 2026 — Mentoria Rise / Lançamento Pago</p>
        </motion.div>
      </footer>
    </div>
  );
}
