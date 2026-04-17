import { useState, useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import gabrielImg from "@/assets/mvp-img-0.jpg";
import ericoImg from "@/assets/mvp-img-1.jpg";
import priscilaImg from "@/assets/mvp-img-2.jpg";
import icaroImg from "@/assets/mvp-img-3.jpg";

const SECTIONS = [
  { id: "cover", label: "Capa" },
  { id: "quem", label: "Quem Sou Eu" },
  { id: "competencias", label: "Competências" },
  { id: "prova", label: "Prova Social" },
  { id: "metodo", label: "Meu Método" },
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "promessa", label: "Promessa" },
  { id: "entrega", label: "Entregáveis" },
  { id: "tabela", label: "Responsabilidades" },
  { id: "papel", label: "Meu Papel" },
  { id: "exclusoes", label: "Exclusões" },
  { id: "gestao", label: "Gestão" },
  { id: "metricas", label: "Métricas" },
  { id: "investimento", label: "Investimento" },
  { id: "advertencias", label: "Advertências" },
  { id: "estrutura", label: "Estrutura" },
  { id: "cronograma", label: "Cronograma" },
  { id: "preciso", label: "Pré-requisitos" },
  { id: "contrato", label: "Contrato" },
  { id: "proximos", label: "Próximos Passos" },
  { id: "final", label: "Consideração Final" },
];

function useOnScreen(ref: React.RefObject<Element>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [ref, threshold]);
  return visible;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useOnScreen(ref, 0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

function Section({ id, children, dark = false }: { id: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} style={{
      minHeight: "100vh", padding: "100px 0", position: "relative",
      background: dark ? "linear-gradient(180deg, #0a1628 0%, #0f1f3a 100%)" : "linear-gradient(180deg, #f8f6f1 0%, #f0ece3 100%)",
      color: dark ? "#e8e0d0" : "#1a1a2e",
    }}>{children}</section>
  );
}

function SectionTitle({ children, sub, dark = false }: { children: ReactNode; sub?: string; dark?: boolean }) {
  return (
    <Reveal>
      <div style={{ marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1,
          color: dark ? "#c9a55a" : "#0f1f3a", marginBottom: sub ? 12 : 0,
        }}>{children}</h2>
        {sub && <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: dark ? "#8a9bb5" : "#666",
          fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 8,
        }}>{sub}</p>}
        <div style={{
          width: 60, height: 3, marginTop: 20,
          background: dark ? "linear-gradient(90deg, #c9a55a, transparent)" : "linear-gradient(90deg, #0f1f3a, transparent)",
        }} />
      </div>
    </Reveal>
  );
}

function P({ children, delay = 0, style = {} }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  return (
    <Reveal delay={delay}>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75,
        marginBottom: 18, maxWidth: 720, ...style,
      }}>{children}</p>
    </Reveal>
  );
}

function Bold({ children }: { children: ReactNode }) {
  return <strong style={{ fontWeight: 600 }}>{children}</strong>;
}

function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: "#c9a55a", fontWeight: 600 }}>{children}</span>;
}

function CheckItem({ title, desc, gain, delay = 0, dark = false }: { title: ReactNode; desc?: ReactNode; gain?: ReactNode; delay?: number; dark?: boolean }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        padding: "20px 24px", marginBottom: 16, borderRadius: 8,
        background: dark ? "rgba(201,165,90,0.06)" : "rgba(15,31,58,0.03)",
        borderLeft: `3px solid ${dark ? "#c9a55a" : "#0f1f3a"}`,
      }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: dark ? "#c9a55a" : "#0f1f3a" }}>{title}</strong>{desc && <span>{desc}</span>}
        </p>
        {gain && <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.6,
          color: dark ? "#8a9bb5" : "#777", fontStyle: "italic", marginTop: 10, marginBottom: 0,
        }}>O que vocês ganham: {gain}</p>}
      </div>
    </Reveal>
  );
}

function CrossItem({ title, desc, delay = 0, dark = false }: { title: ReactNode; desc?: ReactNode; delay?: number; dark?: boolean }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        padding: "14px 20px", marginBottom: 10, borderRadius: 6,
        background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        display: "flex", gap: 12, alignItems: "flex-start",
      }}>
        <span style={{ color: "#c0392b", fontSize: 18, marginTop: 2, flexShrink: 0 }}>✗</span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
          <strong>{title}</strong>{desc}
        </p>
      </div>
    </Reveal>
  );
}

function PillarCard({ num, title, content, diagnosis, dark = false, delay = 0 }: { num: string; title: string; content: string[]; diagnosis: string; dark?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div style={{
        padding: 32, marginBottom: 24, borderRadius: 12,
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        boxShadow: dark ? "0 2px 20px rgba(0,0,0,0.3)" : "0 2px 20px rgba(0,0,0,0.06)",
        border: dark ? "1px solid rgba(201,165,90,0.15)" : "1px solid rgba(0,0,0,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700,
            color: dark ? "rgba(201,165,90,0.25)" : "rgba(15,31,58,0.1)",
          }}>{num}</span>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: 0,
            color: dark ? "#c9a55a" : "#0f1f3a",
          }}>{title}</h3>
        </div>
        {content.map((p, i) => (
          <p key={i} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7, marginBottom: 12,
            color: dark ? "#c5bfb0" : "#444",
          }}>{p}</p>
        ))}
        <div style={{
          marginTop: 16, padding: "12px 16px", borderRadius: 6,
          background: dark ? "rgba(201,165,90,0.1)" : "rgba(15,31,58,0.05)",
          borderLeft: `3px solid ${dark ? "#c9a55a" : "#0f1f3a"}`,
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.65, margin: 0,
            fontWeight: 600, color: dark ? "#c9a55a" : "#0f1f3a",
          }}>Diagnóstico: <span style={{ fontWeight: 400, color: dark ? "#e8e0d0" : "#333" }}>{diagnosis}</span></p>
        </div>
      </div>
    </Reveal>
  );
}

function Wrap({ children }: { children: ReactNode }) {
  return <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>{children}</div>;
}

export default function MvpEducation() {
  const [activeSection, setActiveSection] = useState("cover");
  const [navOpen, setNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? window.scrollY / h : 0);
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 200) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }, []);

  return (
    <div style={{ background: "#0a1628", minHeight: "100vh", position: "relative" }}>
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3, zIndex: 100,
        width: `${scrollProgress * 100}%`, background: "linear-gradient(90deg, #c9a55a, #e8c872)",
        transition: "width 0.1s linear",
      }} />

      <button onClick={() => setNavOpen(!navOpen)} style={{
        position: "fixed", top: 16, right: 16, zIndex: 101, width: 44, height: 44,
        background: "rgba(10,22,40,0.9)", border: "1px solid rgba(201,165,90,0.3)",
        borderRadius: 8, color: "#c9a55a", fontSize: 20, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(10px)",
      }}>☰</button>

      <nav style={{
        position: "fixed", right: navOpen ? 0 : -280, top: 0, width: 260, height: "100vh",
        background: "rgba(10,22,40,0.97)", backdropFilter: "blur(20px)", zIndex: 99,
        padding: "72px 24px 32px", overflowY: "auto", transition: "right 0.35s ease",
        borderLeft: "1px solid rgba(201,165,90,0.15)",
      }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)} style={{
            display: "block", width: "100%", textAlign: "left", padding: "10px 16px",
            background: activeSection === s.id ? "rgba(201,165,90,0.12)" : "transparent",
            border: "none", borderRadius: 6, cursor: "pointer", marginBottom: 2,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: activeSection === s.id ? 600 : 400,
            color: activeSection === s.id ? "#c9a55a" : "#8a9bb5",
            transition: "all 0.2s ease", letterSpacing: "0.02em",
          }}>{s.label}</button>
        ))}
      </nav>

      {/* COVER */}
      <section id="cover" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(160deg, #0a1628 0%, #132240 40%, #0f1f3a 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "radial-gradient(circle at 20% 50%, #c9a55a 1px, transparent 1px), radial-gradient(circle at 80% 20%, #c9a55a 1px, transparent 1px)",
          backgroundSize: "60px 60px, 80px 80px",
        }} />
        <div style={{ textAlign: "center", position: "relative", padding: "40px 32px", maxWidth: 700 }}>
          <Reveal>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a55a", marginBottom: 32, fontWeight: 500 }}>Proposta de Projeto</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, color: "#f0ece3", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>Implementação de Funis de Escala para a Mentoria MVP</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ width: 60, height: 2, background: "#c9a55a", margin: "0 auto 32px" }} />
          </Reveal>
          <Reveal delay={0.4}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#8a9bb5", lineHeight: 1.7, marginBottom: 8 }}>
              Preparado por <strong style={{ color: "#e8e0d0" }}>Gabriel Gomes Di Tullio</strong>
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#8a9bb5", lineHeight: 1.7, marginBottom: 8 }}>
              Para <strong style={{ color: "#e8e0d0" }}>Leonardo Garrido Zuccherato</strong> e <strong style={{ color: "#e8e0d0" }}>Guilherme Toledo da Silva</strong>
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#8a9bb5", lineHeight: 1.7, marginBottom: 8 }}>MVP Education LTDA</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5a6f8a", marginTop: 24, lineHeight: 1.7 }}>
              Especialista: Guilherme Toledo (@eutoledooficial)<br />
              Março de 2026 · Prestação de serviço — 3 meses
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <button onClick={() => scrollTo("quem")} style={{
              marginTop: 48, padding: "14px 36px", background: "transparent",
              border: "1px solid rgba(201,165,90,0.4)", borderRadius: 8, color: "#c9a55a",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.3s ease",
            }}>Explorar proposta ↓</button>
          </Reveal>
        </div>
      </section>

      {/* QUEM SOU EU */}
      <Section id="quem"><Wrap>
        <SectionTitle sub="Apresentação profissional">Quem Sou Eu</SectionTitle>
        <Reveal>
          <div style={{ display: "flex", gap: 36, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: "0 0 auto", width: 200 }}>
              <div style={{ width: 200, height: 260, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(15,31,58,0.1)" }}>
                <img src={gabrielImg} alt="Gabriel Gomes Di Tullio" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
              </div>
            </div>
            <div style={{ flex: "1 1 300px", minWidth: 0 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0f1f3a", lineHeight: 1.3, marginBottom: 8 }}>Gabriel Gomes Di Tullio</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20 }}>Estrategista de Bastidores · DT Coproduções</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, marginBottom: 16, color: "#444" }}>Estrategista e lançador profissional com 6 anos no mercado digital, especializado em implementação de funis e escala de operações de infoprodutos — de low ticket a high-ticket.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, marginBottom: 16, color: "#444" }}>Ao longo da minha trajetória, já gerei mais de <Bold>R$50 milhões</Bold> em faturamento para clientes atuando na arquitetura de funis, liderança e supervisão de equipes, coordenação de times multidisciplinares e escala via tráfego pago.</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.75, marginBottom: 0, color: "#444" }}>Atuo nos bastidores porque a minha habilidade é construir a máquina que faz o expert escalar sem depender só de orgânico.</p>
            </div>
          </div>
        </Reveal>
      </Wrap></Section>

      {/* COMPETÊNCIAS */}
      <Section id="competencias" dark><Wrap>
        <SectionTitle dark sub="Experiência e habilidades">Minhas Competências e o Que Eu Já Fiz</SectionTitle>
        <P delay={0.05} style={{ color: "#c5bfb0" }}>Formado, certificado e com experiência profissional dentro dos principais ecossistemas de bastidores do mercado digital brasileiro:</P>
        {[
          "Comunidade Sobral de Tráfego — Pedro Sobral",
          "Bastidor PRO — Priscila Zillo",
          "Fórmula de Lançamento + Insider + FHT — Érico Rocha",
          "Formação de Copywriting — Ícaro de Carvalho",
        ].map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ padding: "12px 20px", marginBottom: 8, borderRadius: 6, background: "rgba(201,165,90,0.06)", borderLeft: "3px solid rgba(201,165,90,0.4)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#c5bfb0", margin: 0 }}>{t}</p>
            </div>
          </Reveal>
        ))}
      </Wrap></Section>

      {/* PROVA SOCIAL */}
      <Section id="prova"><Wrap>
        <SectionTitle sub="Com quem eu já trabalhei">Quem Já Confiou no Meu Trabalho</SectionTitle>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 32 }}>
            {[
              { src: ericoImg, name: "Érico Rocha", desc: "Ignição Digital", pos: "center 20%" },
              { src: priscilaImg, name: "Priscila Zillo", desc: "Grupo Permaneo", pos: "center 30%" },
              { src: icaroImg, name: "Ícaro de Carvalho", desc: "O Novo Mercado Escola de Marketing LTDA", pos: "center 15%" },
            ].map((item, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ width: "100%", height: 220, overflow: "hidden" }}>
                  <img src={item.src} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos }} />
                </div>
                <div style={{ padding: "16px 18px" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#0f1f3a", margin: 0, marginBottom: 4 }}>{item.name}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Wrap></Section>

      {/* MEU MÉTODO */}
      <Section id="metodo" dark><Wrap>
        <SectionTitle dark sub="Como eu trabalho">Meu Método</SectionTitle>
        <P delay={0.05} style={{ color: "#c5bfb0" }}>Eu trabalho com um método de implementação em 3 fases que foi construído ao longo de 6 anos atuando como estrategista e lançador de projetos digitais.</P>
        {[
          { phase: "Fase 1", title: "Imersão e Arquitetura", desc: "Eu entro na operação, entendo de dentro como ela funciona, analiso o que já existe, identifico os gargalos e desenho toda a espinha dorsal estratégica dos funis. Nada é implementado antes de estar desenhado, validado e aprovado." },
          { phase: "Fase 2", title: "Implementação e Go-Live", desc: "Eu coordeno o time para construir e colocar para rodar tudo o que foi desenhado na Fase 1. Briefo, supervisiono, controlo qualidade e acompanho o go-live de perto até estabilizar." },
          { phase: "Fase 3", title: "Otimização e Escala", desc: "Com os funis rodando e gerando dados reais, eu analiso performance, faço testes, otimizo e escalo o que está funcionando. É aqui que o faturamento sobe de forma consistente e previsível." },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <div style={{ padding: 28, marginBottom: 16, borderRadius: 12, background: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.12)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c9a55a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>{item.phase}</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#e8e0d0", marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#a0a8b8", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          </Reveal>
        ))}
        <P delay={0.4} style={{ color: "#8a9bb5" }}>Esse método garante que a gente não pule etapas, não implemente no escuro e não queime dinheiro de tráfego sem estratégia.</P>
      </Wrap></Section>

      {/* DIAGNÓSTICO */}
      <Section id="diagnostico"><Wrap>
        <SectionTitle sub="Os 4 pilares do negócio digital">Diagnóstico da Situação Atual</SectionTitle>
        <P>Com base na nossa conversa, no áudio que você me enviou e nos dados que eu levantei sobre a operação, essa é a fotografia que eu enxergo da MVP Education hoje, organizada nos 4 pilares de um negócio digital:</P>

        <PillarCard num="01" title="Produto" delay={0.05} content={[
          "A Mentoria MVP é um produto validado, de alto valor, que resolve um problema real e doloroso de um mercado enorme: donos de barbearias e negócios de estética masculina presos no teto do trabalho braçal. O Guilherme é a prova viva do método — saiu da cadeira, implementou gestão, dobrou o faturamento da barbearia em seis meses e estabilizou em R$60k/mês. Essa história de \"pele em risco\" é um ativo de autoridade raro no mercado digital. O produto tem margem alta (CMV próximo de zero), modelo de entrega estruturado (3 gestores de CS, suporte) e ticket que sustenta escala.",
        ]} diagnosis="Produto não é gargalo. Está sólido." />

        <PillarCard num="02" title="Audiência" delay={0.1} content={[
          "O orgânico funciona — e funciona bem. 137 mil seguidores construídos com conteúdo de verdade, autoridade real e uma cadência agressiva de postagens. O funil de qualificação filtra curiosos e entrega leads aquecidos para o comercial. A automação via DM gera leads com taxa de abertura altíssima. Esse motor orgânico, sozinho, já sustenta o faturamento atual de R$300-400k e tem fôlego para levar a operação a R$700k nos próximos meses — a trajetória de crescimento aponta para isso com consistência.",
          "O que ainda não existe é a segunda perna de aquisição. A empresa tem anúncios ativos na Meta, tem gestor de tráfego, mas não tem funis estruturados de escala rodando de forma consistente e previsível via tráfego pago. Não há funil de webinário operando. Não há funil de diagnóstico gratuito rodando como máquina. Não há funil de aplicação direta otimizado com copy e páginas pensados para conversão em escala.",
          "A consequência: o orgânico vai levar a empresa até R$700k — e isso é mérito de tudo que já foi construído. Mas o orgânico sozinho tem um teto. Para ultrapassar esse teto e chegar a R$1M/mês com consistência, a empresa precisa de um segundo motor de aquisição que funcione em paralelo ao orgânico — um motor que não dependa do algoritmo, que alcance público frio que nunca ouviu falar do Toledo, e que gere demanda qualificada de forma previsível e escalável.",
        ]} diagnosis="Audiência orgânica está forte e crescendo. O gargalo é a ausência de uma segunda perna de aquisição via tráfego pago — que é o que vai fazer a diferença entre R$700k e R$1M." />

        <PillarCard num="03" title="Vendas" delay={0.15} content={[
          "Estrutura comercial robusta: head comercial, closer, SDR. A projeção de R$700k em 3 meses com a operação atual é realista — o que me diz que a máquina de fechamento funciona e está azeitada. O processo comercial (SDR qualifica → Closer fecha na sessão estratégica) está rodando.",
          "Dito isso, existe um ponto de atenção crítico: os funis de tráfego pago vão gerar um volume adicional de sessões estratégicas para o time comercial. Se o closer e o SDR já estão no limite com o orgânico atual (que vai crescer para R$700k), eles podem não ter capacidade de absorver as sessões adicionais vindas do tráfego pago. Além disso, leads de tráfego pago têm um perfil diferente do lead orgânico — são público mais frio, sem relacionamento prévio com o Toledo, e podem converter a taxas diferentes. A head comercial precisa ser envolvida desde o início para planejar a absorção dessa demanda adicional e, se necessário, adaptar o processo comercial para o novo perfil de lead.",
        ]} diagnosis="Vendas funciona e está azeitada para o orgânico. Mas a capacidade de absorver volume adicional vindo de tráfego pago precisa ser mapeada e planejada com a head comercial antes de escalar. Se o gargalo virar o time de vendas e não a geração de demanda, os funis vão funcionar mas as vendas não vão acontecer — e isso não é um problema de marketing, é um problema de capacidade comercial." />

        <PillarCard num="04" title="Entrega" delay={0.2} content={[
          "3 gestores de CS, suporte dedicado, estrutura de entrega funcionando. A mentoria já roda, os alunos são atendidos, a esteira de pós-vendas existe.",
        ]} diagnosis="Entrega não é gargalo. Está operando." />

        <Reveal delay={0.25}>
          <div style={{ marginTop: 40, padding: 32, borderRadius: 12, background: "#0f1f3a" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#c9a55a", marginBottom: 16 }}>Conclusão do Diagnóstico</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#c5bfb0", lineHeight: 1.75, marginBottom: 12 }}>Os 4 pilares estão sólidos. A operação está saudável e em crescimento. A projeção de R$700k com a operação atual é realista — o orgânico, o time comercial e a entrega sustentam esse número.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#c5bfb0", lineHeight: 1.75, marginBottom: 12 }}>A pergunta que fica é: <strong style={{ color: "#c9a55a" }}>o que separa R$700k de R$1M?</strong></p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#c5bfb0", lineHeight: 1.75, marginBottom: 12 }}>A resposta: uma segunda perna de aquisição que funcione de forma independente do orgânico. Um canal de tráfego pago com funis bem desenhados que gere R$300k+ adicionais por mês em sessões estratégicas qualificadas — alimentando uma máquina comercial que precisa estar preparada para converter esse volume extra.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#c5bfb0", lineHeight: 1.75, marginBottom: 12 }}>O que está faltando não é gente. A equipe já tem gestor de tráfego, closer, SDR, filmmaker, editor. O que falta é <strong style={{ color: "#e8e0d0" }}>arquitetura</strong> — alguém que desenhe a espinha dorsal desses funis, coordene a implementação usando o time que já existe, e lidere o processo de teste, otimização e escala até a máquina rodar com previsibilidade.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#e8e0d0", lineHeight: 1.75, margin: 0, fontWeight: 500 }}>Leonardo, isso é exatamente o que você me pediu: alguém que bata no peito e faça acontecer. Não mais um profissional na equipe. Um líder de implementação que traga método, execute através do time e entregue resultado.</p>
          </div>
        </Reveal>
      </Wrap></Section>

      {/* PROMESSA */}
      <Section id="promessa" dark><Wrap>
        <SectionTitle dark sub="Meu compromisso">Promessa de Transformação</SectionTitle>
        <Reveal>
          <div style={{ padding: 32, borderRadius: 12, marginBottom: 32, background: "rgba(201,165,90,0.08)", border: "1px solid rgba(201,165,90,0.2)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 3.5vw, 28px)", color: "#e8e0d0", lineHeight: 1.4, margin: 0 }}>
              A operação atual vai levar vocês a <Accent>R$700k</Accent>.<br />O meu trabalho é construir o que leva de <Accent>R$700k a R$1M</Accent> — e manter.
            </p>
          </div>
        </Reveal>
        <P delay={0.1} style={{ color: "#c5bfb0" }}>Nos próximos 3 meses, meu compromisso é desenhar, implementar e colocar para rodar os funis de tráfego pago que vão construir essa segunda perna de aquisição da Mentoria MVP. Uma perna que funciona independente do orgânico, que gera sessões estratégicas qualificadas de forma previsível, e que permite que vocês escalem investimento com clareza de retorno.</P>
        <P delay={0.15} style={{ color: "#c5bfb0" }}>Concretamente, isso significa: vocês vão continuar crescendo o orgânico como já estão fazendo — rumo aos R$700k. Paralelamente, eu vou construir e colocar para rodar os funis de tráfego que vão adicionar o volume incremental que falta para bater e sustentar R$1M/mês. Duas pernas de aquisição funcionando ao mesmo tempo, cada uma com suas métricas, cada uma escalável de forma independente.</P>
        <P delay={0.2} style={{ color: "#c5bfb0" }}>Mais do que implementar funis, eu vou entregar <strong style={{ color: "#e8e0d0" }}>clareza</strong>. Vocês vão saber exatamente quanto custa cada lead vindo de tráfego, cada sessão agendada, cada venda — e vão poder tomar decisões de escala baseadas em números, não em feeling.</P>
        <P delay={0.25} style={{ color: "#c5bfb0" }}>Não prometo milagres. Prometo processo, clareza, supervisão rigorosa e correção de rota quinzenal até encontrarmos a equação de escala. E prometo que, ao final dos 3 meses, a empresa terá uma máquina de aquisição paga funcionando — não dependente de mim, mas estruturada e documentada para rodar com a equipe.</P>
      </Wrap></Section>

      {/* ENTREGÁVEIS */}
      <Section id="entrega"><Wrap>
        <SectionTitle sub="O que eu entrego em cada fase">Como Eu Vou Entregar Isso</SectionTitle>

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0f1f3a", marginBottom: 24, marginTop: 40 }}>Fase 1 — Imersão e Arquitetura <span style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>(Semanas 1 a 3)</span></h3></Reveal>

        <CheckItem title="Imersão na operação atual" desc=" — entender de dentro como funciona o funil orgânico, o processo comercial (SDR → Closer), as métricas atuais de conversão da sessão estratégica, ticket médio, CAC atual, taxa de show, taxa de fechamento do closer, LTV do mentorado, histórico de campanhas já rodadas pelo gestor de tráfego (o que foi testado, o que funcionou, o que não funcionou). Objetivo: entender a máquina que já funciona para construir um segundo motor que a complemente — não que a substitua." gain="A certeza de que nenhuma decisão vai ser tomada no escuro. Eu vou conhecer a operação de vocês antes de mexer em qualquer coisa." delay={0.05} />
        <CheckItem title="Imersão na linha editorial do especialista e na estrutura da oferta" desc=" — entender profundamente como o Toledo se comunica, qual é a linguagem que conecta com o público de barbeiros, como a mentoria é apresentada hoje, qual o ticket, o que está incluído, os diferenciais do Método B10K, a jornada completa do lead desde o primeiro contato até o fechamento. Sem isso, o funil de tráfego pago vai falar uma língua diferente do orgânico e gerar dissonância quando o lead chegar no closer." gain="Coerência entre a comunicação do orgânico e dos funis de tráfego pago." delay={0.08} />
        <CheckItem title="Análise das campanhas de tráfego atuais" desc=" — o que o gestor de tráfego já testou, o que performou, o que não performou, e por quê." gain="Aproveitamento do que já foi investido. Não vou começar do zero — vou partir do que vocês já aprenderam." delay={0.1} />
        <CheckItem title="Pesquisa de mercado e benchmarking de funis no nicho" desc=" — análise de como concorrentes diretos e operações similares de mentoria high-ticket estão estruturando seus funis de tráfego pago. Criativos, iscas de entrada, modelos de webinário, estrutura de oferta, posicionamento." gain="Inteligência de mercado. Vocês vão saber o que os concorrentes estão fazendo e onde estão as oportunidades que ninguém está explorando." delay={0.12} />
        <CheckItem title="Desenho estratégico dos 3 funis de escala" desc=": Funil 1 — Aplicação Direta (anúncio → página de aplicação → qualificação → sessão estratégica → venda); Funil 2 — Diagnóstico Gratuito (anúncio → página de captura → diagnóstico → sessão estratégica → venda); Funil 3 — Webinário/Workshop (anúncio → página de registro → webinário ao vivo ou fake live → oferta → sessão estratégica → venda). Para cada funil: etapas, páginas necessárias, sequências de comunicação (e-mail, WhatsApp), critérios de qualificação, métricas-alvo de cada etapa." gain="Previsibilidade. Vocês vão saber exatamente como o lead entra, por onde passa e como chega na sessão estratégica." delay={0.14} />
        <CheckItem title="Definição da narrativa e oferta de cada funil" desc=" — conceito do webinário (tema, promessa, estrutura de conteúdo e pitch), ângulo do diagnóstico gratuito, posicionamento de copy das páginas de aplicação direta. Cada funil precisa de uma big idea que converta público frio em interessado." gain="Cada funil com uma narrativa única e uma oferta pensada para converter." delay={0.16} />
        <CheckItem title="Orientações estratégicas sobre posicionamento da oferta para público frio" desc=" — análise de como a mentoria precisa ser apresentada para quem vem de tráfego pago versus quem vem do orgânico. Público frio não conhece o Toledo, não tem relacionamento, não tem confiança construída. A oferta pode precisar de ajustes de ancoragem, bônus, garantia, estrutura do pitch. Não é criar produto novo — é adaptar a apresentação da oferta existente para os novos canais de aquisição." gain="A mentoria apresentada da forma certa para quem nunca ouviu falar do Toledo." delay={0.18} />
        <CheckItem title="Estratégia de crescimento de base via tráfego pago" desc=" — orientações estratégicas e supervisão do gestor de tráfego sobre alocação de verba para distribuição de conteúdo do Toledo e crescimento de audiência (seguidores, lista de e-mail, comunidade), complementar aos funis de venda direta. Uma empresa que quer sustentar R$1M/mês precisa estar constantemente ampliando a boca do funil com público que ainda não está pronto para comprar, mas que vai aquecer. Eu não operacionalizo — defino a estratégia e supervisiono o desempenho." gain="Crescimento sustentável da base de audiência via tráfego pago, alimentando ambos os motores de aquisição." delay={0.2} />
        <CheckItem title="Definição das métricas de sucesso para cada funil" desc=" — CPL, taxa de comparecimento, taxa de agendamento, taxa de fechamento, CAC, ROAS." gain="Controle. Cada funil vai ter indicadores claros de performance." delay={0.22} />
        <CheckItem title="Briefing estratégico de implementação" desc=" — documento final detalhado com toda a espinha dorsal de cada funil: copy macro, estrutura de páginas, sequência de e-mails/WhatsApp, roteiro do webinário, criativos necessários. Tudo que precisa ser executado, por quem da equipe, em qual prazo, com quais recursos." gain="Documentação. Tudo que for desenhado fica registrado." delay={0.24} />
        <CheckItem title="Reunião de defesa da estratégia com Leonardo e Guilherme" desc=" — apresentação dos 3 funis, validação, ajustes e aprovação antes de implementar." gain="Segurança de que nada vai pro ar sem a aprovação de vocês." delay={0.26} />

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0f1f3a", marginBottom: 24, marginTop: 48 }}>Fase 2 — Implementação e Go-Live <span style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>(Semanas 4 a 8)</span></h3></Reveal>

        <CheckItem title="Coordenação do gestor de tráfego" desc=" — briefing estratégico para estruturação e subida das campanhas conforme o que foi desenhado e aprovado na Fase 1. Eu defino a estratégia de campanha para cada funil, analiso dashboards, decido quando escalar ou pausar, dou feedback sobre criativos, aprovo públicos e orçamentos. O gestor opera as campanhas. Eu defino a estratégia e supervisiono a performance." gain="O gestor de tráfego vai trabalhar com direção clara, não no escuro." delay={0.05} />
        <CheckItem title="Execução e supervisão de copy" desc=" — páginas de captura, inscrição, aplicação, e-mails, scripts de WhatsApp, roteiro do webinário, mensagens de follow-up, roteiros de VSL se aplicável. Eu assumo a execução do copy estratégico dos funis como parte do meu escopo de trabalho." gain="Copy pensado para conversão em cada etapa do funil, escrito por quem desenhou a estratégia." delay={0.08} />
        <CheckItem title="Briefing e supervisão de criativos" desc=" — orientação estratégica para o filmmaker e editor sobre quais peças produzir, com qual narrativa, para qual etapa do funil. Supervisionando a qualidade das entregas e aprovando antes de subir." gain="Os criativos do Guilherme — que já são bons — vão ser direcionados especificamente para alimentar os funis. Cada peça com um objetivo claro." delay={0.1} />
        <CheckItem title="Supervisão de design e identidade visual dos funis" desc=" — controle de qualidade visual das páginas, criativos de anúncio e materiais de webinário. A equipe não tem designer. Se necessário, indico profissional freelancer do meu hub de parceiros (custo a ser aprovado pelo Leonardo) ou supervisiono execução via ferramenta com o time." gain="Páginas e criativos com qualidade visual profissional, sem depender de contratação fixa." delay={0.12} />
        <CheckItem title="Configuração e supervisão de automações" desc=" — fluxos de automação (WhatsApp, e-mail, CRM), alinhando com o que já existe e integrando os novos funis. Sequências de confirmação, lembrete, replay, oferta para funis de webinário e diagnóstico." gain="Automação que funciona sem precisar de intervenção manual. O lead entra no funil e percorre sozinho até a sessão estratégica." delay={0.14} />
        <CheckItem title="Configuração de rastreamento" desc=" — UTMs, pixel, tracking de origem para separar com precisão o faturamento vindo de tráfego pago do faturamento orgânico. Cada funil com rastreamento próprio. Precisa estar pronto antes dos funis irem ao ar." gain="Clareza absoluta de onde vem cada venda. Protege os dois lados." delay={0.16} />
        <CheckItem title="Supervisão das páginas" desc=" — estrutura, copy, design, velocidade de carregamento, experiência do lead." gain="Páginas que convertem, não páginas bonitas que não geram resultado." delay={0.18} />
        <CheckItem title="Interface estratégica com a head comercial e time de vendas" desc=" — alinhar como os leads dos novos funis chegam, qual é o SLA de atendimento, como qualificar, como a régua de follow-up precisa se adaptar ao perfil de lead de tráfego. Calibrar critérios de qualificação dos funis, acompanhar taxa de conversão do closer nos leads de tráfego pago especificamente. Avaliar capacidade do time comercial para absorver demanda adicional." gain="O comercial preparado para receber um volume maior e um perfil diferente de lead." delay={0.2} />
        <CheckItem title="Go-live dos funis" desc=" com acompanhamento diário nos primeiros 7-10 dias." gain="Nenhum funil vai para o ar e fica largado. Eu vou acompanhar de perto até estabilizar." delay={0.22} />

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#0f1f3a", marginBottom: 24, marginTop: 48 }}>Fase 3 — Otimização e Escala <span style={{ fontSize: 14, color: "#888", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>(Semanas 9 a 12)</span></h3></Reveal>

        <CheckItem title="Análise de performance de cada funil" desc=" — o que está convertendo, onde está o gargalo, o que precisa mudar." gain="Decisões de escala baseadas em dados, não em feeling." delay={0.05} />
        <CheckItem title="Testes A/B" desc=" — criativos, copies, páginas, horários de webinário, abordagens de qualificação." gain="Otimização contínua. Cada teste melhora a máquina." delay={0.08} />
        <CheckItem title="Otimização contínua das campanhas" desc=" em conjunto com o gestor de tráfego." gain="O gestor não fica sozinho tentando adivinhar o que fazer. Tem alguém com visão de funil orientando." delay={0.1} />
        <CheckItem title="Otimização do processo comercial para leads de tráfego" desc=" em conjunto com a head comercial — ajustar scripts, abordagens e follow-up para o perfil de lead que vem de ads." gain="Taxa de fechamento maximizada para o novo canal." delay={0.12} />
        <CheckItem title="Escala agressiva do que está funcionando" desc=" — decisões de aumento de orçamento, replicação de criativos vencedores, expansão de públicos." gain="O faturamento sobe de forma consistente e previsível." delay={0.14} />
        <CheckItem title="Relatório quinzenal de performance" desc=" com métricas claras e recomendações de próximos passos." gain="Visibilidade total. A cada 15 dias vocês sabem exatamente como estão os funis." delay={0.16} />
        <CheckItem title="Reunião de fechamento do projeto ao final do mês 3" desc=" — apresentação de resultados, aprendizados, DRE do projeto (quanto investiu, quanto gerou, qual o ROI) e proposta de continuidade (se fizer sentido para os dois lados)." gain="Dados na mesa para decidir os próximos passos. Sem achismo, sem pressão." delay={0.18} />
      </Wrap></Section>

      {/* TABELA */}
      <Section id="tabela" dark><Wrap>
        <SectionTitle dark sub="Quem faz o quê">Tabela de Responsabilidades</SectionTitle>
        <P style={{ color: "#8a9bb5" }}>Quem faz o quê em cada uma das atividades dos bastidores, nas 3 dimensões de atuação:</P>
        <Reveal delay={0.1}>
          <div style={{ overflowX: "auto", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif", fontSize: 14, minWidth: 600 }}>
              <thead>
                <tr>{["Atividade", "Brief", "Execução", "Supervisão"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", borderBottom: "2px solid #c9a55a", color: "#c9a55a", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {[
                  ["Estratégia dos funis", "Gabriel", "Gabriel", "Gabriel"],
                  ["Conteúdo orgânico", "✗", "Guilherme / time MVP", "✗"],
                  ["Tráfego Pago", "Gabriel", "Gestor de tráfego", "Gabriel"],
                  ["Copywriting dos funis", "Gabriel", "Gabriel", "Gabriel"],
                  ["Design / Páginas", "Gabriel", "Time MVP (ou indicado)", "Gabriel"],
                  ["Audiovisual / Criativos", "Gabriel", "Filmmaker + Editor", "Gabriel"],
                  ["Automações", "Gabriel", "Gabriel + time MVP", "Gabriel"],
                  ["Comercial (alinhamento)", "Gabriel", "Head + Closer + SDR", "Head comercial"],
                  ["Crescimento de base", "Gabriel", "Gestor de tráfego", "Gabriel"],
                  ["Produto", "✗", "Guilherme", "✗"],
                  ["Backoffice", "✗", "Leonardo / Financeiro", "✗"],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                        color: cell === "✗" ? "#5a6f8a" : cell === "Gabriel" ? "#c9a55a" : "#b0bcc8",
                        fontWeight: j === 0 ? 500 : 400,
                      }}>{cell === "✗" ? "✗ Não incluído" : cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <P style={{ color: "#8a9bb5", fontSize: 14 }}>Onde está "Gabriel", eu sou o responsável. Onde está "time MVP", a equipe executa conforme meu briefing e sob minha supervisão. Onde está "✗ Não incluído", a atividade não faz parte do escopo.</P>
      </Wrap></Section>

      {/* MEU PAPEL */}
      <Section id="papel"><Wrap>
        <SectionTitle sub="Para não haver ambiguidade">Meu Papel — O Que Exatamente Eu Faço</SectionTitle>
        {[
          { n: "1", title: "Estratégia (eu desenho)", desc: "Todo o desenho dos funis, narrativas, copies macro, estrutura das campanhas, posicionamento da oferta para público frio, estratégia de crescimento de base e métricas. É a espinha dorsal. É o que dá direção para todo o time executar." },
          { n: "2", title: "Liderança e Supervisão (eu lidero)", desc: "Eu vou coordenar e supervisionar o trabalho do time que já existe — gestor de tráfego, filmmaker, editor — para que cada peça seja entregue de acordo com o briefing e com a qualidade necessária. Eu vou alinhar com a head comercial como receber e converter os leads novos, e avaliar a capacidade do time de absorver volume adicional. Eu vou ser o ponto focal que garante que todas as engrenagens estão girando juntas. Isso inclui: controle de prazos, controle de qualidade, feedbacks, ajustes e rituais de alinhamento." },
          { n: "3", title: "Execução seletiva (eu faço o que exige visão de funil)", desc: "Copy estratégico dos funis (páginas, e-mails, roteiro de webinário, scripts, sequências de WhatsApp), configuração de automações e briefings detalhados para o time. Não vou subir campanhas no gerenciador (a equipe já tem gestor de tráfego para isso) nem editar vídeos (a equipe já tem editor). Vou fazer o que exige visão de funil e conversão — e delegar para o time o que exige execução operacional especializada." },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ padding: 28, marginBottom: 16, borderRadius: 12, background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "rgba(15,31,58,0.12)", fontWeight: 700, lineHeight: 1 }}>{item.n}</span>
                <div>
                  <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 600, color: "#0f1f3a", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </Wrap></Section>

      {/* EXCLUSÕES */}
      <Section id="exclusoes" dark><Wrap>
        <SectionTitle dark sub="Limites do escopo">O Que Não Está Incluído Neste Projeto</SectionTitle>
        {([
          ["Gestão do negócio como um todo (visão 360)", " — esta proposta é cirúrgica: funis de aquisição via tráfego pago para a mentoria. Se os resultados vierem, podemos conversar sobre expandir a atuação no futuro."],
          ["Novos produtos, novas ofertas, nova escada de valor", " — o foco são os funis para a mentoria que já existe. Se surgir oportunidade durante os 3 meses, negociamos separadamente."],
          ["Estratégia e operação de conteúdo orgânico", " — o orgânico do Toledo já funciona e é o motor que leva a empresa a R$700k. Posso dar contribuições pontuais, mas não é meu entregável."],
          ["Orientações sobre linha editorial e calendário de orgânico", " — continua sob responsabilidade da equipe atual."],
          ["Consultoria sobre produto (mentoria em si)", " — foco é aquisição, não redesenho do produto."],
          ["Execução de tráfego pago", " — quem opera as campanhas é o gestor de tráfego da equipe. Eu defino a estratégia e supervisiono."],
          ["Execução de edição de vídeo, filmagem", " — eu briefo e supervisiono os criativos para os funis."],
          ["Gestão de equipe, RH, cultura", " — não é meu escopo nestes 3 meses."],
          ["Entrega do produto, suporte, CS, pós-vendas", " — responsabilidade integral da equipe da MVP."],
          ["Atendimento comercial e fechamento de vendas", " — eu alinho o processo, mas não opero o comercial."],
          ["Backoffice (jurídico, contábil, financeiro)", " — Leonardo, isso é com você."],
          ["Legenda de post, trabalho de social media", " — não faço posts, legendas ou social media."],
          ["Presença física", " — nesta fase o trabalho é remoto."],
          ["Concepção e gestão do produto", " — ativo e responsabilidade do especialista."],
          ["Direitos sobre produto, marca, lista de leads e redes sociais", " — ficam 100% com a MVP Education."],
          ["Qualquer atividade fora deste hall de entregáveis", " — tudo que está nesta proposta eu entrego. Tudo que não está, eu não entrego."],
        ] as [string, string][]).map(([t, d], i) => <CrossItem key={i} title={t} desc={d} delay={Math.min(i * 0.04, 0.4)} dark />)}
      </Wrap></Section>

      {/* GESTÃO */}
      <Section id="gestao"><Wrap>
        <SectionTitle sub="Como o projeto funciona no dia a dia">Gestão e Processos do Projeto</SectionTitle>

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#0f1f3a", marginBottom: 16, marginTop: 32 }}>Matriz RACE</h3></Reveal>
        <P>Na primeira semana do projeto, vou construir e apresentar uma Matriz RACE — documento que define com precisão, para cada atividade do projeto:</P>
        {["R — Quem é o Responsável pela execução", "A — Quem Aprova antes de ir pro ar", "C — Quem é Consultado durante o processo", "E — Quem é o Executor operacional"].map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{ padding: "10px 20px", marginBottom: 6, borderRadius: 6, background: "rgba(15,31,58,0.04)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, margin: 0 }}><strong style={{ color: "#0f1f3a" }}>{t.charAt(0)}</strong>{t.slice(1)}</p>
            </div>
          </Reveal>
        ))}
        <P delay={0.3}>Com o tamanho do time da MVP, essa clareza é essencial para que ninguém fique sem saber o que fazer, quem cobrar, ou quem tem a palavra final.</P>

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#0f1f3a", marginBottom: 16, marginTop: 40 }}>Processos, Rituais e Rotinas</h3></Reveal>
        <CheckItem title="Reunião semanal de alinhamento" desc=" com Leonardo e/ou Guilherme — status do projeto, métricas, decisões pendentes. Curta e objetiva." delay={0.05} />
        <CheckItem title="Reunião semanal operacional" desc=" com gestor de tráfego — análise de campanhas, ajustes, próximos passos." delay={0.08} />
        <CheckItem title="Briefings documentados" desc=" — todo briefing para o time vai ser entregue por escrito, com prazo e critérios de qualidade. Nada verbal que se perde." delay={0.1} />
        <CheckItem title="Relatório quinzenal de performance" desc=" — dashboard com as métricas-chave de cada funil, comparativo com período anterior e recomendações de ação." delay={0.12} />
        <CheckItem title="Relatório final (mês 3)" desc=" — apresentação de resultados, DRE do projeto (quanto investiu, quanto gerou, qual o ROI), aprendizados e recomendação de próximos passos." delay={0.14} />
        <CheckItem title="Documentação de processos" desc=" — ao final do projeto, os processos de cada funil estarão documentados para que o time da MVP possa operar e otimizar de forma independente." delay={0.16} />

        <Reveal><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#0f1f3a", marginBottom: 16, marginTop: 40 }}>Controle Financeiro do Projeto</h3></Reveal>
        <P>Dois CNPJs separados — minha empresa é minha, a MVP Education é de vocês. Dois caixas separados — eu controlo o meu financeiro, vocês controlam o de vocês. Cada um emite notas conforme sua participação.</P>
        <P delay={0.05}>Acompanhamento quinzenal de investimento em tráfego vs. faturamento gerado pelos funis de tráfego pago especificamente, separado do faturamento orgânico. CAC por funil, ROAS, custo por lead qualificado, custo por sessão estratégica agendada, custo por venda fechada, taxa de show, taxa de conversão do closer em leads de tráfego pago. Resultados do tráfego pago reportados separadamente dos resultados do orgânico para que fique transparente a contribuição de cada motor.</P>
      </Wrap></Section>

      {/* MÉTRICAS */}
      <Section id="metricas" dark><Wrap>
        <SectionTitle dark sub="O que eu vou medir e reportar">Métricas de Sucesso do Projeto</SectionTitle>
        <P style={{ color: "#8a9bb5" }}>Todas relativas exclusivamente aos funis de tráfego pago:</P>
        {([
          ["Custo por lead qualificado", "(por funil) — quanto custa trazer cada lead que efetivamente preenche aplicação, agenda diagnóstico ou se inscreve no webinário"],
          ["Taxa de show", "— % de leads que efetivamente aparecem na sessão estratégica, no diagnóstico ou no webinário"],
          ["Custo por sessão estratégica agendada", "— quanto custa cada sessão que o closer vai ter"],
          ["Taxa de conversão do closer nos leads de tráfego pago", "— separada da taxa do orgânico, para medir a qualidade do lead de cada funil"],
          ["Custo por venda (CAC)", "— por funil, comparado ao CAC atual do orgânico"],
          ["ROAS", "(retorno sobre investimento em tráfego) — por funil e consolidado"],
          ["Faturamento originado dos funis de tráfego pago", "— total de vendas atribuídas ao meu projeto, separado do faturamento orgânico"],
          ["Volume de sessões estratégicas geradas", "— capacidade de demanda adicional que os funis estão alimentando no time comercial"],
          ["Ticket médio dos clientes de tráfego pago", "— comparado ao ticket médio do orgânico"],
        ] as [string, string][]).map(([t, d], i) => <CheckItem key={i} title={t + " "} desc={d} delay={Math.min(i * 0.05, 0.3)} dark />)}
        <Reveal delay={0.4}>
          <div style={{ marginTop: 32, padding: 24, borderRadius: 12, background: "rgba(201,165,90,0.1)", border: "1px solid rgba(201,165,90,0.2)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#e8e0d0", margin: 0 }}>
              Meta: funis de tráfego pago adicionam <Accent>R$300k/mês</Accent> ao orgânico de <Accent>R$700k</Accent> para atingir <Accent>R$1M/mês</Accent>
            </p>
          </div>
        </Reveal>
      </Wrap></Section>

      {/* INVESTIMENTO */}
      <Section id="investimento"><Wrap>
        <SectionTitle sub="Modelo fixo + comissão sobre resultado">Investimento</SectionTitle>

        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginBottom: 32 }}>
            <div style={{ flex: "1 1 300px", padding: 32, borderRadius: 12, background: "#0f1f3a", textAlign: "center" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c9a55a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Fixo mensal</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#e8e0d0", fontWeight: 700, margin: 0 }}>R$8.000</p>
            </div>
            <div style={{ flex: "1 1 300px", padding: 32, borderRadius: 12, background: "#0f1f3a", textAlign: "center" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c9a55a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Comissão</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, color: "#e8e0d0", fontWeight: 700, margin: 0 }}>15%</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8a9bb5", marginTop: 8 }}>sobre faturamento dos funis de tráfego pago</p>
            </div>
          </div>
        </Reveal>

        <P delay={0.1}>O fixo cobre meu tempo de dedicação ao projeto, a liderança do time, a construção estratégica, a execução de copy dos funis e os custos operacionais da minha estrutura. Garante minha dedicação e compromisso independente de fatores fora do meu controle.</P>
        <P delay={0.15}>A comissão é calculada apenas sobre o que os novos funis gerarem — não sobre o orgânico. Isso é fundamental, porque o crescimento orgânico de R$300-400k para R$700k é mérito de tudo que vocês já construíram e continuam construindo. Eu não vou cobrar sobre isso. Minha comissão incide exclusivamente sobre o faturamento incremental que os funis de tráfego pago adicionarem à operação.</P>

        <Reveal delay={0.2}><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#0f1f3a", marginBottom: 12, marginTop: 32 }}>Atribuição e janela</h3></Reveal>
        <P delay={0.22}>Cada funil terá rastreamento próprio (UTMs, origem do lead no CRM, funil de entrada registrado). Todo lead que entra pelos funis que eu construí é tagueado como "tráfego pago — funil X". Quando esse lead fecha com o closer, a venda é atribuída ao meu projeto. Vendas orgânicas (DM, indicação, conteúdo) não entram na minha comissão.</P>
        <P delay={0.25}><Bold>Janela de atribuição: 60 dias</Bold> a partir da entrada do lead no funil. Se o lead entrou mas só fechou depois de 60 dias, a atribuição expira. Documentado em contrato.</P>

        <Reveal delay={0.3}>
          <div style={{ marginTop: 24, padding: 28, borderRadius: 12, background: "rgba(15,31,58,0.05)", border: "1px solid rgba(15,31,58,0.1)" }}>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#0f1f3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Simulação — Meta R$1M no mês 3</h4>
            {([
              ["Faturamento orgânico projetado", "R$700k"],
              ["Faturamento dos funis de tráfego pago", "R$300k"],
              ["Comissão a 15%", "R$45.000"],
              ["Total mês 3", "R$8.000 + R$45.000 = R$53.000"],
            ] as [string, string][]).map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "2px solid #0f1f3a" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#555" }}>{l}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#0f1f3a", fontWeight: i === 3 ? 700 : 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.35}><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#0f1f3a", marginBottom: 12, marginTop: 32 }}>Por que esse modelo</h3></Reveal>
        <P delay={0.37}>O orgânico leva vocês a R$700k — mérito do Guilherme, do time e de anos de trabalho. Eu entro para construir o que falta. Minha comissão é sobre o território que eu ajudei a conquistar, não sobre o que já existia. Vocês pagam comissão apenas sobre resultado real, e eu tenho incentivo direto para fazer a máquina performar cada vez melhor.</P>
        <P delay={0.4}><Bold>Por que não só comissão:</Bold> Eu vou liderar implementação, coordenar time, produzir briefings, escrever copies, configurar automações. O fixo sustenta a operação. A comissão alinha o incentivo ao resultado.</P>
        <P delay={0.43}><Bold>Por que não só fixo:</Bold> Porque eu quero ter pele em risco. Se os funis não gerarem resultado, não tem comissão. Isso mostra que eu não estou aqui para cobrar e sumir — estou aqui para fazer a máquina funcionar.</P>
        <P delay={0.46}><Bold>Forma de faturamento:</Bold> Nota fiscal de prestação de serviço mensal para o fixo. Comissão apurada quinzenalmente com NF separada. Prazo: fixo até o dia 5 do mês vigente, comissão até o dia 10 do mês seguinte à apuração.</P>
      </Wrap></Section>

      {/* ADVERTÊNCIAS */}
      <Section id="advertencias" dark><Wrap>
        <SectionTitle dark sub="Pontos de atenção e proteções">Advertências e Itens Inegociáveis</SectionTitle>
        {[
          { title: "Responsabilidade de investimento", items: [
            "Tráfego pago: Todo investimento em anúncios é de responsabilidade da MVP Education. Eu não invisto em ativo que não é meu. O retorno desse investimento é o que eu vou trabalhar para maximizar — mas o capital de mídia é de vocês.",
            "Ferramentas: Todas as ferramentas da operação são de responsabilidade e propriedade da MVP Education. Se for necessário contratar ferramenta nova, o custo é da empresa.",
            "Contratação de profissionais adicionais: Se precisarmos de designer ou desenvolvedor de páginas, o custo é da operação. Eu posso indicar profissionais do meu hub e liderar/supervisionar.",
          ]},
          { title: "Propriedade do projeto", items: [
            "Tudo que for construído — funis, páginas, copies, automações, criativos, briefings, documentação de processos — pertence integralmente à MVP Education. Se ao final dos 3 meses a gente decidir não continuar, vocês levam tudo. Eu não levo nada.",
          ]},
          { title: "Itens que são sempre do especialista", items: [
            "Produto (Mentoria MVP — concepção, gestão, direitos, propriedade intelectual), lista de leads (orgânico + tráfego), redes sociais (@eutoledooficial), marca e imagem (MVP Education, Toledo). Se a parceria acabar, o especialista leva tudo. Não é negociável.",
          ]},
          { title: "Apresentação formal ao time", items: [
            "Leonardo precisa me apresentar formalmente à equipe com clareza sobre meu papel e autoridade dentro do escopo dos funis. Vou interfacear diretamente com o gestor de tráfego, a head comercial, o filmmaker e o editor. Sem essa legitimação delegada pelo Leonardo, a liderança não acontece.",
          ]},
          { title: "Dependência do especialista", items: [
            "Os funis dependem do Toledo para gravar o webinário, aprovar narrativas e manter a qualidade do conteúdo. Se houver atraso ou indisponibilidade, os prazos são diretamente impactados.",
          ]},
          { title: "Dependência da equipe existente", items: [
            "Eu lidero e supervisiono, mas quem executa tráfego é o gestor, quem fecha é o closer, quem filma é o filmmaker. Se algum profissional não performar ou sair, o projeto sofre impacto. Minha responsabilidade é identificar gargalos e comunicar — não substituir profissionais.",
          ]},
          { title: "Capacidade comercial", items: [
            "Os funis vão gerar volume adicional de sessões estratégicas. Se o closer e o SDR já estão no limite com o orgânico, podem não absorver as sessões adicionais. A head comercial precisa planejar isso. Se o gargalo virar vendas, os funis vão funcionar mas as vendas não — e isso não é problema de marketing, é de capacidade comercial.",
          ]},
          { title: "Curva de aprendizado", items: [
            "Mês 1 = construção da máquina. Mês 2 = ligar a máquina e calibrar. Mês 3 = acelerar. Resultados consistentes aparecem no terceiro mês.",
          ]},
          { title: "Separação orgânico vs. tráfego pago", items: [
            "O CRM precisa registrar a origem de cada lead desde o dia 1. Sem essa separação implementada antes dos funis irem ao ar, a atribuição vira discussão. Configurar na Semana 0.",
          ]},
          { title: "O que eu não sou", items: [
            "Não sou agência. Não sou sócio. Não sou vínculo empregatício. Sou um profissional de bastidores com escopo claro, resultado mensurável. Quando o projeto terminar, o negócio de vocês é de vocês — com uma máquina de aquisição a mais funcionando.",
          ]},
          { title: "Revisão ao final dos 3 meses", items: [
            "Sentamos para avaliar: os funis estão gerando? A parceria funcionou? Faz sentido expandir? Ajustar termos? Esse é o momento de decidir se o \"namoro\" vira algo mais.",
          ]},
        ].map((section, i) => (
          <Reveal key={i} delay={Math.min(i * 0.06, 0.5)}>
            <div style={{ padding: "20px 24px", marginBottom: 12, borderRadius: 8, background: "rgba(255,255,255,0.03)", borderLeft: "3px solid rgba(201,165,90,0.4)" }}>
              <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#c9a55a", marginBottom: 10, fontWeight: 600 }}>{section.title}</h4>
              {section.items.map((item, j) => (
                <p key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#b0bcc8", lineHeight: 1.7, marginBottom: j < section.items.length - 1 ? 10 : 0 }}>{item}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </Wrap></Section>

      {/* ESTRUTURA */}
      <Section id="estrutura"><Wrap>
        <SectionTitle sub="O que eu trago para o projeto">Estrutura Que Eu Trago</SectionTitle>
        <CheckItem title="Minha dedicação estratégica e tática" desc=" — sou o responsável pelo projeto. Estudo o negócio, desenho os funis, escrevo os copies, lidero a implementação, supervisiono a equipe, analiso métricas, corrijo rota, reporto resultados." delay={0.05} />
        <CheckItem title="Hub de profissionais freelancers" desc=" — tenho acesso a profissionais já triados (designers, desenvolvedores de página) que posso acionar para o projeto, com custo e SLA conhecidos. Se a MVP precisar de algum desses profissionais e não tiver internamente, posso indicar e liderar. O custo desses profissionais não está incluso no meu fixo — é orçamento do projeto a ser aprovado pelo Leonardo." delay={0.1} />
        <CheckItem title="Ferramentas de gestão de projeto" desc=" — organizo a operação em ferramenta de gestão (ClickUp ou similar) para que Leonardo e o time tenham visibilidade de tarefas, prazos e status de cada entrega." delay={0.15} />
      </Wrap></Section>

      {/* CRONOGRAMA */}
      <Section id="cronograma" dark><Wrap>
        <SectionTitle dark sub="Visão macro dos 3 meses">Cronograma</SectionTitle>
        {[
          { period: "Semana 0", title: "Pré-projeto", items: ["Assinatura do contrato", "Apresentação formal ao time pelo Leonardo", "Acesso a ferramentas, métricas e dashboards", "Configuração do rastreamento de origem de leads no CRM", "Alinhamento sobre orçamento mensal de tráfego pago"] },
          { period: "Mês 1", title: "Diagnóstico + Desenho + Início da implementação", items: ["Semana 1-2: Imersão na operação (análise de métricas, conversa com head comercial, conversa com gestor de tráfego, imersão na linha editorial do Toledo, pesquisa de mercado)", "Semana 3: Desenho dos funis + definição de narrativa e oferta + orientações de posicionamento para público frio + defesa com Leonardo", "Semana 4: Briefing estratégico + Matriz RACE + documentação de processos + início da implementação do primeiro funil"] },
          { period: "Mês 2", title: "Primeiro funil rodando + Implementação do segundo", items: ["Semana 5-6: Primeiro funil no ar, primeiros testes de tráfego, análise de métricas, otimização, interface com time comercial para calibrar qualidade dos leads e avaliar capacidade de absorção", "Semana 7-8: Implementação do segundo funil, otimização contínua do primeiro, estratégia de crescimento de base via tráfego pago em andamento"] },
          { period: "Mês 3", title: "Dois funis rodando + Escala + Teste do terceiro", items: ["Semana 9-10: Dois funis rodando e sendo otimizados, decisões de escala, implementação ou teste do terceiro funil", "Semana 11-12: Escala agressiva do que está funcionando, DRE do projeto, debriefing final, reunião de avaliação com Leonardo"] },
        ].map((block, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ padding: 28, marginBottom: 20, borderRadius: 12, background: "rgba(201,165,90,0.06)", border: "1px solid rgba(201,165,90,0.12)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#c9a55a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{block.period}</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#e8e0d0", marginBottom: 14 }}>{block.title}</h3>
              {block.items.map((item, j) => (
                <p key={j} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#a0a8b8", lineHeight: 1.7, marginBottom: 6, paddingLeft: 16, borderLeft: "2px solid rgba(201,165,90,0.2)" }}>{item}</p>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.4}>
          <div style={{ padding: 20, borderRadius: 8, background: "rgba(255,255,255,0.03)" }}>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#c9a55a", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Entregas recorrentes</h4>
            {["Reunião semanal com Leonardo (report + métricas + ajustes)", "Reunião semanal operacional com gestor de tráfego", "Relatório quinzenal de performance documentado", "Controle de métricas financeiras atualizado quinzenalmente (CAC, ROAS, custo por lead, custo por venda — tudo separado por funil e separado do orgânico)"].map((t, i) => (
              <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#b0bcc8", marginBottom: 6 }}>• {t}</p>
            ))}
          </div>
        </Reveal>
      </Wrap></Section>

      {/* O QUE PRECISO */}
      <Section id="preciso"><Wrap>
        <SectionTitle sub="Antes de começar">O Que Eu Preciso da MVP</SectionTitle>
        {[
          "Acesso às métricas da operação atual (dashboards de vendas, relatórios do closer, dados de tráfego, histórico de campanhas)",
          "Acesso ao gestor de tráfego para entender o que já foi testado e o que está rodando",
          "Conversa com a head comercial para entender o perfil dos leads que convertem melhor, a dinâmica atual do time de vendas e a capacidade de absorção de demanda adicional",
          "Acesso ao CRM, plataforma de e-mail e ferramentas de automação",
          "Disponibilidade do Toledo para uma reunião de imersão inicial (entender a narrativa, a oferta da mentoria, os diferenciais do Método B10K, como ele se comunica)",
          "Alinhamento sobre orçamento mensal de tráfego pago disponível para os novos funis",
          "Apresentação formal ao time com delegação de autoridade para o escopo do projeto",
          "Configuração do CRM para rastrear origem dos leads (orgânico vs. tráfego pago, por funil) — precisa estar pronto antes dos funis irem ao ar",
          "Relatório de faturamento dos últimos 3 meses para referência",
        ].map((t, i) => <CheckItem key={i} title="" desc={t} delay={Math.min(i * 0.05, 0.3)} />)}
      </Wrap></Section>

      {/* CONTRATO */}
      <Section id="contrato" dark><Wrap>
        <SectionTitle dark sub="Termos formais">Aspectos Contratuais</SectionTitle>
        {([
          ["Contrato de prestação de serviço com prazo determinado", " — 3 meses a partir da data de assinatura, com escopo definido conforme esta proposta."],
          ["Dois CNPJs separados", " — minha empresa é minha, a MVP Education é de vocês. Cada parte emite suas notas fiscais conforme sua participação."],
          ["Regulamentação do escopo", " — o contrato deve listar os entregáveis das 3 fases e a lista de exclusões. Escopo restrito aos 3 funis de tráfego pago + estratégia de crescimento de base para a Mentoria MVP."],
          ["Regra de atribuição de vendas", " — documentar no contrato como as vendas são atribuídas (UTM, origem no CRM, funil de entrada). Janela de atribuição de 60 dias."],
          ["SLA de reuniões", " — 1 alinhamento semanal com Leonardo/Guilherme + 1 reunião operacional semanal com gestor de tráfego."],
          ["Relatórios", " — quinzenais durante o projeto + relatório final com DRE no mês 3."],
          ["Cláusula de revisão e renovação", " — ao final dos 3 meses, reunião de avaliação. Nenhuma das partes tem obrigação de renovar."],
          ["Cláusula de rescisão antecipada", " — aviso prévio de 15 ou 30 dias (a definir), pagamento proporcional do fixo e apuração final de comissão sobre vendas realizadas dentro da janela."],
          ["Gatilhos de renegociação", " — se os funis gerarem consistentemente acima de R$300k/mês antes do fim dos 3 meses, ou se o escopo mudar significativamente, as partes podem renegociar antes do prazo final."],
          ["Confidencialidade", " — compromisso de não divulgar métricas, estratégias, dados financeiros ou informações internas sem autorização expressa. Posso mencionar a parceria em portfólio (nome e resultados gerais), mas não dados sensíveis."],
          ["Contrato assinado antes do início dos trabalhos", " — eu não começo sem contrato."],
          ["Rastreamento de origem", " — UTMs e/ou pixel dedicado para separar faturamento (base para cálculo da comissão)."],
        ] as [string, string][]).map(([t, d], i) => <CheckItem key={i} title={t} desc={d} delay={Math.min(i * 0.05, 0.4)} dark />)}
      </Wrap></Section>

      {/* PRÓXIMOS PASSOS */}
      <Section id="proximos"><Wrap>
        <SectionTitle sub="O caminho a partir daqui">Próximos Passos</SectionTitle>
        {[
          "Leonardo avalia esta proposta e traz feedbacks, dúvidas, contrapontos.",
          "Reunião de negociação — sentamos para ajustar pontos abertos (regra de atribuição, quem faz design, quem constrói páginas, orçamento de tráfego).",
          "Alinhamento final e assinatura — contrato com todos os termos definidos.",
          "Semana 0 — apresentação ao time + acesso a ferramentas e métricas + configuração de rastreamento no CRM.",
          "Mês 1 começa — imersão e diagnóstico.",
        ].map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#0f1f3a", minWidth: 36, lineHeight: 1 }}>{i + 1}</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", lineHeight: 1.7, margin: 0, paddingTop: 4 }}>{t}</p>
            </div>
          </Reveal>
        ))}
      </Wrap></Section>

      {/* CONSIDERAÇÃO FINAL */}
      <section id="final" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "linear-gradient(160deg, #0a1628 0%, #132240 40%, #0f1f3a 100%)",
        position: "relative", padding: "80px 0",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "radial-gradient(circle at 80% 50%, #c9a55a 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        <Wrap>
          <SectionTitle dark sub="Fechamento">Consideração Final</SectionTitle>
          <P delay={0.05} style={{ color: "#c5bfb0" }}>Esta proposta foi desenhada para respeitar o momento da MVP Education: uma empresa que está crescendo de forma saudável, com clareza de onde quer chegar, e que não tem pressa — mas está acelerando.</P>
          <P delay={0.1} style={{ color: "#c5bfb0" }}>O orgânico do Toledo é uma máquina poderosa que vai levar a empresa a R$700k. Meu trabalho não é competir com essa máquina nem substituí-la. É construir um segundo motor que funcione em paralelo, que alcance pessoas que o orgânico não alcança, e que adicione os R$300k que separam R$700k de R$1M.</P>
          <P delay={0.15} style={{ color: "#c5bfb0" }}>Se ao final dos 3 meses os funis estiverem rodando, gerando demanda qualificada e convertendo com CAC sustentável, teremos construído algo que vai muito além de um projeto pontual — teremos provado que a empresa pode escalar com dois motores funcionando ao mesmo tempo. E aí a conversa sobre os próximos passos (novos produtos, nova escada de valor, visão 360) acontece naturalmente, com resultados na mesa e confiança construída.</P>
          <P delay={0.2} style={{ color: "#c5bfb0" }}>Leonardo, você disse que é muito tranquilo sobre o lugar onde está, com muita clareza de onde quer chegar, e que quer dar passos firmes e certeiros. Essa proposta foi construída exatamente com essa filosofia: escopo focado, prazo definido, entregáveis claros, e resultado mensurável.</P>
          <P delay={0.25} style={{ color: "#c5bfb0" }}>Você também disse que gosta de namorar antes de casar. Esses 3 meses são exatamente isso: a gente se conhece, eu provo meu trabalho com dados na mesa, e aí a gente decide junto se faz sentido construir algo maior.</P>
          <P delay={0.3} style={{ color: "#c5bfb0" }}>A operação de vocês já vai chegar a R$700k. Eu entro para construir o que falta para chegar a R$1M e manter.</P>
          <Reveal delay={0.4}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 36px)", color: "#c9a55a", fontWeight: 700, marginTop: 48, marginBottom: 48 }}>A bola está com vocês.</p>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ borderTop: "1px solid rgba(201,165,90,0.3)", paddingTop: 32 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#e8e0d0", fontWeight: 600, marginBottom: 4 }}>Gabriel Gomes Di Tullio</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5a6f8a", fontStyle: "italic" }}>(seus dados de contato)</p>
            </div>
          </Reveal>
        </Wrap>
      </section>
    </div>
  );
}
