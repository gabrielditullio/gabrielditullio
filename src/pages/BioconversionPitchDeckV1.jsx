import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// BIOCONVERSION ACADEMY — MASTERPLAN PITCH DECK
// Primeiro lançamento pago Método W em LATAM hispana
// High-ticket mentoria US$ 1.000 — Operadores médios e grandes
// ─────────────────────────────────────────────────────────────────────────────

const styles = {
  // CSS Variables via inline — dark premium theme
  root: {
    '--bg-primary': '#0a0a0f',
    '--bg-secondary': '#12121a',
    '--bg-tertiary': '#1a1a28',
    '--bg-card': '#16161f',
    '--accent-gold': '#c9a84c',
    '--accent-gold-dim': '#8b7332',
    '--accent-emerald': '#2dd4a8',
    '--accent-emerald-dim': '#1a8a6e',
    '--text-primary': '#f0ede6',
    '--text-secondary': '#a8a4a0',
    '--text-muted': '#6b6762',
    '--border-subtle': '#2a2a38',
    '--gradient-hero': 'linear-gradient(135deg, #0a0a0f 0%, #12151e 40%, #0f1a18 100%)',
    '--font-display': "'Playfair Display', serif",
    '--font-body': "'DM Sans', sans-serif",
    '--font-mono': "'JetBrains Mono', monospace",
  },
};

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function Navigation({ activeSection, onNavigate }) {
  const sections = [
    { id: 'hero', label: 'Início' },
    { id: 'executive', label: 'Sumário' },
    { id: 'premises', label: 'Premissas' },
    { id: 'viability', label: 'Viabilidade' },
    { id: 'offer', label: 'Oferta' },
    { id: 'sales-page', label: 'Página' },
    { id: 'capture', label: 'Captação' },
    { id: 'event', label: 'Evento' },
    { id: 'pitches', label: 'Pitches' },
    { id: 'cart', label: 'Carrinho' },
    { id: 'downsell', label: 'Downsell' },
    { id: 'pl', label: 'P&L' },
    { id: 'kpis', label: 'KPIs' },
    { id: 'calendar', label: 'Calendário' },
    { id: 'team', label: 'Equipe' },
    { id: 'risks', label: 'Riscos' },
    { id: 'proposal', label: 'Proposta' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(10, 10, 15, 0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #2a2a38',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        gap: '0.25rem',
        overflowX: 'auto',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem',
          color: '#c9a84c',
          fontWeight: 700,
          marginRight: '2rem',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em',
        }}>
          BIOCONVERSION ACADEMY
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            style={{
              background: activeSection === s.id ? 'rgba(201, 168, 76, 0.12)' : 'transparent',
              border: activeSection === s.id ? '1px solid rgba(201, 168, 76, 0.3)' : '1px solid transparent',
              color: activeSection === s.id ? '#c9a84c' : '#a8a4a0',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function Section({ id, children, dark = false }) {
  return (
    <section
      id={id}
      style={{
        minHeight: '100vh',
        padding: '120px 2rem 80px',
        background: dark ? '#0d0d14' : '#0a0a0f',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────

function SectionTitle({ number, title, subtitle }) {
  return (
    <div style={{ marginBottom: '4rem' }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#c9a84c',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
      }}>
        FASE {number}
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        color: '#f0ede6',
        fontWeight: 700,
        lineHeight: 1.15,
        marginBottom: '1rem',
        letterSpacing: '-0.03em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.1rem',
          color: '#a8a4a0',
          maxWidth: '680px',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────

function MetricCard({ value, label, accent = false }) {
  return (
    <div style={{
      background: '#16161f',
      border: `1px solid ${accent ? 'rgba(201, 168, 76, 0.3)' : '#2a2a38'}`,
      borderRadius: '12px',
      padding: '1.75rem',
      textAlign: 'left',
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '2.2rem',
        fontWeight: 700,
        color: accent ? '#c9a84c' : '#f0ede6',
        lineHeight: 1.1,
        marginBottom: '0.5rem',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.82rem',
        color: '#6b6762',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── DATA TABLE ──────────────────────────────────────────────────────────────

function DataTable({ headers, rows, highlightCol = null }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.85rem',
      }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                textAlign: 'left',
                padding: '0.85rem 1rem',
                borderBottom: '2px solid #2a2a38',
                color: '#c9a84c',
                fontWeight: 600,
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: '1px solid #1e1e2a' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{
                  padding: '0.75rem 1rem',
                  color: ci === highlightCol ? '#2dd4a8' : '#f0ede6',
                  fontWeight: ci === 0 ? 600 : 400,
                  whiteSpace: ci === 0 ? 'nowrap' : 'normal',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── INFO BLOCK ──────────────────────────────────────────────────────────────

function InfoBlock({ title, items }) {
  return (
    <div style={{
      background: '#16161f',
      border: '1px solid #2a2a38',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '1.5rem',
    }}>
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#c9a84c',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '1.25rem',
      }}>
        {title}
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.92rem',
            color: '#f0ede6',
            lineHeight: 1.7,
            paddingLeft: '1.25rem',
            position: 'relative',
            marginBottom: '0.4rem',
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#2dd4a8',
            }}>&#x25B8;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── TIMELINE ITEM ───────────────────────────────────────────────────────────

function TimelineItem({ time, title, detail }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '1.5rem',
      padding: '1.25rem 0',
      borderBottom: '1px solid #1e1e2a',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.78rem',
        color: '#c9a84c',
        paddingTop: '0.15rem',
      }}>
        {time}
      </div>
      <div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#f0ede6',
          marginBottom: '0.3rem',
        }}>
          {title}
        </div>
        {detail && (
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            color: '#a8a4a0',
            lineHeight: 1.6,
          }}>
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function BioconversionPitchDeck() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div style={{
        background: '#0a0a0f',
        color: '#f0ede6',
        minHeight: '100vh',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

        {/* ═══════════ HERO ═══════════ */}
        <section id="hero" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #12151e 40%, #0f1a18 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '2rem',
        }}>
          {/* Background texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(45, 212, 168, 0.04) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.05) 0%, transparent 50%)`,
          }} />
          {/* Grid lines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(42, 42, 56, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(42, 42, 56, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            opacity: 0.4,
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'left', maxWidth: '960px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.72rem',
              color: '#c9a84c',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}>
              MASTERPLAN V3.0 &mdash; CENARIO USD CONSOLIDADO &mdash; 20 ABRIL 2026
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '2rem',
              color: '#f0ede6',
            }}>
              Bioconversion<br />
              <span style={{ color: '#c9a84c' }}>Academy</span>
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: '#a8a4a0',
              lineHeight: 1.7,
              maxWidth: '640px',
              marginBottom: '3rem',
            }}>
              Primeiro lancamento pago Metodo W em LATAM hispana.
              Mentoria high ticket de <strong style={{ color: '#2dd4a8' }}>US$ 1.000</strong> para
              operadores medios e grandes. Bioconversao com mosca soldado negra
              (<em>Hermetia illucens</em>).
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem',
            }}>
              <MetricCard value="US$ 85K" label="Receita bruta projetada (realista)" accent />
              <MetricCard value="13.2x" label="ROAS bruto" />
              <MetricCard value="40" label="Mentorados por turma" />
              <MetricCard value="90 dias" label="Ciclo operacional completo" />
            </div>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: '#6b6762',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              <span><strong style={{ color: '#a8a4a0' }}>Especialista:</strong> Diego Flores Padron (PhD)</span>
              <span><strong style={{ color: '#a8a4a0' }}>Estrategista:</strong> Gabriel Di Tullio</span>
              <span><strong style={{ color: '#a8a4a0' }}>Metodo:</strong> Metodo W (Willian Baldan / Craft Black)</span>
              <span><strong style={{ color: '#a8a4a0' }}>Mercado:</strong> Colombia, Mexico, Panama</span>
            </div>
          </div>
        </section>

        {/* ═══════════ SUMARIO EXECUTIVO ═══════════ */}
        <Section id="executive" dark>
          <SectionTitle
            number="00"
            title="Sumario Executivo"
            subtitle="O projeto em uma pagina — validacao, receita projetada e vantagem competitiva."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            <MetricCard value="US$ 30K–48K" label="Receita bruta (1o ciclo conserv./otimista)" accent />
            <MetricCard value="6.0–9.6" label="ROAS projetado" />
            <MetricCard value="30–48" label="Mentorados no produto principal" />
            <MetricCard value="40 vagas" label="Teto por turma (lista de espera p/ 2o ciclo)" />
          </div>

          <InfoBlock
            title="Por que este plano e executavel"
            items={[
              "Autoridade tecnica real e publica — Diego e Diretor de Biotecnologia da Let's Fly (Finep R$ 2,25M + R$ 4M captados), PhD, primeiro curso do mundo da area (2020), presenca internacional (WildLabs, palestra Austria).",
              "Instagram maduro como ativo de topo de funil — 4.384 seguidores, grid editorial estruturado, 5 destaques organizados, narrativa consistente.",
              "Vantagem competitiva diferenciada — operacao industrial real + PhD + cases internacionais (Panama 2020, Colombia 2025) + agentes Claude proprietarios. Nenhum concorrente combina essas quatro camadas.",
              "Posicionamento anti-fumaca — a aversao declarada do Diego ao 'vendedor de purpurina' vira eixo de copy numa categoria saturada de infoprodutores sem operacao real.",
              "Produto com logica de continuidade clara — evento de 2 dias entrega diagnostico + planejamento + primeiras ferramentas; mentoria e o acompanhamento para implantar, escalar e sustentar.",
            ]}
          />

          <InfoBlock
            title="3 Pre-requisitos inegociaveis antes de qualquer dolar em trafego"
            items={[
              "Estabilizar infraestrutura propria — compostajedelfuturo.com e www.bioconversion.academy estao quebrados (SSL e DNS). Impossivel captar enquanto a casa propria nao estiver de pe.",
              "Confirmar capacidade operacional do Diego — o metodo exige presenca ativa (stories diarios, criativos em video, 2 dias de evento ao vivo, carrinho de 14 dias). O tempo semanal define o teto de ambicao.",
              "Estruturar base tagueada para trafego organico — 4.384 seguidores do IG + ~89 clientes historicos + email list precisam virar lista qualificada antes do ciclo comecar.",
            ]}
          />
        </Section>

        {/* ═══════════ PREMISSAS ═══════════ */}
        <Section id="premises">
          <SectionTitle
            number="01"
            title="Premissas do Plano"
            subtitle="Moeda, escopo geografico, stakeholders, base disponivel e produto."
          />

          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#c9a84c',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Moeda e Cambio
            </h3>
            <p style={{ color: '#a8a4a0', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '720px' }}>
              Lancamento executado 100% em <strong style={{ color: '#f0ede6' }}>USD</strong>. Ticket, lotes, order bump, cashback, budget, receita e P&L em USD.
              Equivalencia BRL usada apenas para operacional interno brasileiro: <strong style={{ color: '#f0ede6' }}>US$ 1 ≈ R$ 5,00</strong> (referencia conservadora).
              Faturamento no CNPJ Bioconversion Academy (Simples Nacional ~6%), via Hotmart com checkout em USD.
            </p>
          </div>

          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#c9a84c',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Escopo Geografico
          </h3>
          <DataTable
            headers={['Pais', 'Prioridade', 'Logica']}
            rows={[
              ['Colombia', 'Primaria', 'Mentorados pagos ativos; CPM mais baixo LATAM; cultura empreendedora forte em agronegocio'],
              ['Mexico', 'Primaria', 'Maior mercado LATAM; dispersao urbano-rural relevante; apetite por solucoes industriais'],
              ['Panama', 'Secundaria', 'Case historico de aluno 2020 (operacao real montada); alta disponibilidade de capital por operador'],
              ['Peru, Equador, Chile, Argentina', 'Terciaria', 'Abertos via Meta Ads sem otimizacao especifica; captura incidental'],
              ['Brasil', 'Excluido', 'Conflito direto com Let\'s Fly'],
              ['Espanha', 'Excluida (1o ciclo)', 'CPM alto, mercado EU exige adaptacao regulatoria (REACH, licenciamento feed)'],
            ]}
          />

          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#c9a84c',
            marginBottom: '1rem',
            marginTop: '2.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Stakeholders e Papeis
          </h3>
          <DataTable
            headers={['Parte', 'Papel', 'Compromisso']}
            rows={[
              ['Diego Flores', 'Especialista, dono CNPJ, conteudo tecnico, evento ao vivo, pitches', '15-20h/semana; 100% nos dias de evento + 3 primeiros dias de carrinho'],
              ['Gabriel Di Tullio', 'Estrategista, co-produtor, arquitetura, trafego, automacoes, dados', 'Remuneracao hibrida (fixo + comissao)'],
              ['Designer', 'Terceirizado — design pagina + criativos estaticos', '1 pagina + 10 criativos estaticos'],
              ['Editor video', 'Terceirizado — criativos de video e vinhetas', '8-12 videos ate 60s + 4 vinhetas'],
              ['UGCs (2-3)', 'Criadores hispanos (Colombia/Mexico) para prova social', 'Via Fiverr ES, Upwork ou rede direta'],
              ['SDR (parcial)', 'Atendimento de leads high ticket no carrinho', 'Terceirizado por hora ou bonus por venda'],
            ]}
          />

          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#c9a84c',
            marginBottom: '1rem',
            marginTop: '2.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Base Disponivel
          </h3>
          <DataTable
            headers={['Ativo', 'Tamanho', 'Status']}
            rows={[
              ['Instagram @bioconversionacademy', '4.384 seguidores', 'Forte, narrativa madura'],
              ['Facebook BioConversion Academy', '~1.100 seguidores', 'Secundario'],
              ['Clientes historicos (2020-2023 + perpetuo)', '~89 + ~10-15 mentorados passivos', 'Nao tagueados, fora de CRM'],
              ['Email list', 'Desconhecido', 'Gap aberto — resgatar da Hotmart'],
              ['WhatsApp broadcast', 'Desconhecido', 'Gap aberto'],
            ]}
          />

          <div style={{
            background: '#16161f',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '2.5rem',
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#f0ede6',
              marginBottom: '1rem',
            }}>
              Produto: Mentoria Bioconversion Pro
            </h3>
            <p style={{ color: '#a8a4a0', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.92rem' }}>
              Programa de 6 meses — Ticket: <strong style={{ color: '#2dd4a8' }}>US$ 1.000</strong> a vista ou <strong style={{ color: '#2dd4a8' }}>5x US$ 220</strong>.
              Capacidade: <strong style={{ color: '#f0ede6' }}>40 vagas</strong> por turma. Turmas trimestrais.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Onboarding tecnico individual com Diego (1h, primeira semana)',
                'Reunioes semanais em grupo (1h30, quinta-feira noite LATAM)',
                'Acesso vitalicio ao curso "Compostaje del Futuro" (reformatado)',
                'Suite de agentes IA proprietarios (Claude/GPT) — dimensionamento, substrato, projecao financeira',
                'Comunidade privada (Circle, Discord ou Telegram)',
                'Revisao de projeto individual a cada 2 meses',
                'Certificado de conclusao Bioconversion Academy',
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: '0.9rem',
                  color: '#f0ede6',
                  lineHeight: 1.8,
                  paddingLeft: '1.5rem',
                  position: 'relative',
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#2dd4a8' }}>+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ═══════════ VIABILIDADE ═══════════ */}
        <Section id="viability" dark>
          <SectionTitle
            number="02"
            title="Diagnostico de Viabilidade"
            subtitle="Parametros de entrada, calculo de CPA maximo, ROAS projetado e ponto critico."
          />

          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#c9a84c',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Parametros de Entrada
          </h3>
          <DataTable
            headers={['Parametro', 'Valor', 'Origem']}
            rows={[
              ['Ticket principal', 'US$ 1.000', 'Decisao estrategica'],
              ['Budget de trafego', 'US$ 5.000 (escalavel ate US$ 8.000)', 'Declarado pelo Diego'],
              ['Ingressos-alvo', '400-700', 'Derivado'],
              ['CPM estimado LATAM', 'US$ 4-7', 'Benchmark Colombia/Mexico'],
              ['CTR alvo', '1,5%', 'Benchmark W Method "bom"'],
              ['Connect Rate alvo', '77%', 'Benchmark W Method "bom"'],
              ['Conversao de pagina alvo', '6%', 'Benchmark "regular→bom"'],
              ['Conversao dia 1 pitch', '7-9% da base', 'Benchmark W Method'],
              ['Conversao total evento', '9%', 'Benchmark high ticket'],
            ]}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            margin: '3rem 0',
          }}>
            <div style={{
              background: '#16161f',
              border: '1px solid rgba(45, 212, 168, 0.2)',
              borderRadius: '12px',
              padding: '2rem',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#2dd4a8',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>CPA Maximo (teto)</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#f0ede6',
              }}>US$ 36.00</div>
              <p style={{ fontSize: '0.82rem', color: '#6b6762', marginTop: '0.5rem' }}>
                = US$ 1.000 x 0,09 x 0,40 (margem liquida)
              </p>
            </div>

            <div style={{
              background: '#16161f',
              border: '1px solid rgba(201, 168, 76, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#c9a84c',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>CPA Estimado</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#2dd4a8',
              }}>US$ 7.21</div>
              <p style={{ fontSize: '0.82rem', color: '#6b6762', marginTop: '0.5rem' }}>
                5x menor que o CPA maximo — viabilidade com folga
              </p>
            </div>
          </div>

          <h3 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 600,
            color: '#c9a84c',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            ROAS Projetado
          </h3>
          <DataTable
            headers={['Cenario', 'Ingressos', 'Conv. Evento', 'Mentorados', 'Receita Bruta', 'ROAS']}
            rows={[
              ['Conservador', '450', '7%', '32', 'US$ 32.000', '6,4'],
              ['Realista', '693', '9%', '40 (teto) + 22 espera', 'US$ 40.000', '8,0'],
              ['Otimista', '800', '10%', '40 (teto) + 40 espera', 'US$ 40.000+', '8,0+'],
            ]}
            highlightCol={5}
          />

          <div style={{
            background: 'rgba(45, 212, 168, 0.06)',
            border: '1px solid rgba(45, 212, 168, 0.2)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '2rem',
          }}>
            <h4 style={{ color: '#2dd4a8', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              Ponto critico: o teto de entrega e o gargalo, nao a captacao
            </h4>
            <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              693 ingressos x 9% conv. = 62 mentorados, mas teto = 40. O volume potencial excede a capacidade em todos os cenarios.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, color: '#f0ede6', fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '0.4rem' }}>1. Primeiro ciclo nao precisa maximizar captacao — reduzir budget para US$ 3.500-4.000 ja entrega 40 com ROAS 10+.</li>
              <li style={{ marginBottom: '0.4rem' }}>2. Excedente vira lista de espera pre-vendida para T3 2026.</li>
              <li>3. Justifica teste de aumento de ticket no 2o ciclo (US$ 1.200-1.500).</li>
            </ul>
          </div>

          <div style={{
            marginTop: '2.5rem',
            padding: '1.5rem 2rem',
            background: 'rgba(201, 168, 76, 0.08)',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#c9a84c',
            }}>
              VIABILIDADE: CONFIRMADA COM FOLGA
            </span>
            <p style={{ color: '#a8a4a0', fontSize: '0.85rem', marginTop: '0.5rem' }}>
              ROAS realista = 8,0 | Conservador = 6,4 | Ambos acima do minimo de 5 (metodo).
            </p>
          </div>
        </Section>

        {/* ═══════════ OFERTA ═══════════ */}
        <Section id="offer">
          <SectionTitle
            number="03"
            title="Promessa e Oferta"
            subtitle="Marca fraca no publico pagante — vender o FIM, nao o MEIO."
          />

          <div style={{
            background: '#16161f',
            borderLeft: '4px solid #c9a84c',
            padding: '2rem',
            marginBottom: '2.5rem',
            borderRadius: '0 12px 12px 0',
          }}>
            <p style={{ color: '#f0ede6', fontSize: '1.05rem', lineHeight: 1.7, fontStyle: 'italic' }}>
              "Promessa deve ser do FIM, nao do MEIO. Nao 'Workshop de Hermetia com Diego Flores PhD' (presume reconhecimento).
              Sim 'Monte sua operacao de bioconversao com capacidade de X kg/mes em 60 dias' (entrega resultado mensuravel)."
            </p>
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Lastro do Diego (prova)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            {[
              { icon: '🏭', text: 'Fabrica real financiada pela Finep (prova publica verificavel)' },
              { icon: '🇵🇦', text: 'Case aluno Panama — operacao montada em 2020' },
              { icon: '🇨🇴', text: 'Casos ativos Colombia (mentorias 2025)' },
              { icon: '📄', text: 'Publicacoes WildLabs + palestra Austria' },
              { icon: '🎓', text: 'PhD — diferencial institucional contra infoprodutores' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#16161f',
                border: '1px solid #2a2a38',
                borderRadius: '10px',
                padding: '1.25rem',
                fontSize: '0.85rem',
                color: '#f0ede6',
                lineHeight: 1.5,
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Headlines para teste (Modelo W Method)
          </h3>
          <div style={{ marginBottom: '3rem' }}>
            {[
              '"Dos dias construyendo tu operacion de bioconversion con mosca soldado negra — del biologia al primer kilo de sustrato procesado."',
              '"48 horas para salir con un plan de fabrica de Hermetia illucens dimensionado, con costos, cronograma y primera semana operativa listos."',
              '"Workshop intensivo: monta tu planta de bioconversion paso a paso, con un PhD que ya construyo tres fabricas en Brasil y America Latina."',
              '"Dos dias para dejar de ver videos de YouTube y salir con un proyecto real de bioconversion — planta, costos, alimentacion, primer cliente."',
            ].map((hl, i) => (
              <div key={i} style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #1e1e2a',
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.05rem',
                color: '#f0ede6',
                lineHeight: 1.5,
              }}>
                <span style={{ color: '#6b6762', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', marginRight: '1rem' }}>
                  H{i + 1}
                </span>
                {hl}
              </div>
            ))}
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Framework "Como vai funcionar" (6 etapas)
          </h3>
          <DataTable
            headers={['Etapa', 'Conteudo']}
            rows={[
              ['1. Pergunta inicial', '"Como vas a construir tu operacion de bioconversion en los proximos 60 dias?"'],
              ['2. Entrega', 'Plano de planta + cronograma 60 dias + custos + primeiro mes operativo mapeado'],
              ['3. Objecoes', '"No importa si: nunca has criado insectos, no tienes galpon, no tienes equipo tecnico..."'],
              ['4. Etapas', 'Dia 1: biologia, ciclo, dimensionamento. Dia 2: construcao, operacao, monetizacao.'],
              ['5. Interacao', 'Trabalho aplicado ao caso de cada participante. Grupos por tipo de operacao.'],
              ['6. CTA', 'Inscricao com preco progressivo. Cupos limitados por capacidade de atencao.'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Objecoes com icones (abaixo da headline)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}>
            {[
              { icon: '🧬', title: '"No necesitas ser biologo"', text: 'Proceso disenado para operadores agropecuarios, no academicos.' },
              { icon: '💰', title: '"Operacion viable desde 200 kg/dia"', text: 'No es proyecto de laboratorio, es produccion comercial real.' },
              { icon: '🏭', title: '"Con fabrica real detras"', text: 'Diego dirige una planta industrial en Brasil con apoyo de agencia de innovacion.' },
            ].map((obj, i) => (
              <div key={i} style={{
                background: '#16161f',
                border: '1px solid #2a2a38',
                borderRadius: '10px',
                padding: '1.5rem',
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{obj.icon}</div>
                <div style={{ fontWeight: 600, color: '#f0ede6', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{obj.title}</div>
                <div style={{ color: '#a8a4a0', fontSize: '0.85rem', lineHeight: 1.5 }}>{obj.text}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════ PAGINA DE VENDAS ═══════════ */}
        <Section id="sales-page" dark>
          <SectionTitle
            number="04"
            title="Pagina de Vendas — 12 Dobras"
            subtitle="Framework completo de pagina + regras de design."
          />

          <DataTable
            headers={['#', 'Dobra', 'Conteudo', 'Obs']}
            rows={[
              ['1', 'Promesa', 'Headline (<=3 linhas) + logo + botao + data + barra escassez', 'Tudo na 1a dobra'],
              ['2', 'Camino', '"No nacio de YouTube. Nacio de 6 anos dirigiendo una fabrica real con apoyo de Finep (R$ 6,25M)"', 'ESSENCIAL p/ marca fraca'],
              ['3', 'Identificacion', '"Si diriges una operacion de aves, cerdos, peces o composta..."', 'Avatar se ve'],
              ['4', 'Contenido', '8 blocos titulares: biologia, dimensionamiento, construccion, alimentacion, cosecha, procesamiento, monetizacion, agentes IA', 'Titulos competem em atratividade'],
              ['5', 'Cronograma', 'Dias, horarios LATAM, formato Zoom Webinar, gravacoes', 'Responde "puedo participar"'],
              ['6', 'Cases', 'Panama 2020, Colombia 2025, Let\'s Fly como case do Diego', 'Prova social visual'],
              ['7', 'Precio', 'Ancoragem: mentoria US$ 1.000 vs workshop US$ [lote]. Barra escassez real.', 'Concentrar botoes aqui'],
              ['8', 'Cases video', '2-3 depoimentos curtos (30-60s)', 'Se nao disponivel: escritos + foto'],
              ['9', 'Certificado', 'Util p/ linhas de credito rural ou licenciamento', 'Adaptacao LATAM'],
              ['10', 'Sobre Diego', 'PhD, Let\'s Fly, Finep, Austria, WildLabs. Foto profissional.', 'So depois de tudo'],
              ['11', 'Garantia', '1 dia apos workshop — 100% de volta', 'Nao brigar por US$ 4-49'],
              ['12', 'FAQ', '8 perguntas: moeda, idioma, fuso, gravacoes, requisitos, refund, tech, para quem nao e', 'Mencao da gravacao leva ao checkout'],
            ]}
          />

          <InfoBlock
            title="Regras de Design (nao decorativas)"
            items={[
              'Uma dobra, uma mensagem. Maximo 11 palavras por linha.',
              'Alinhamento a esquerda, nunca centralizado.',
              'Negrito <= 20% do texto.',
              'Botoes escondidos na secao de preco (evita sensacao de pressao).',
              'Barrinha fixa superior com CTA discreto (esconder na secao de preco).',
              'Familiaridade visual com o universo do avatar: galpoes, sacos de racao, balancas industriais.',
              'Escassez real na barra (vagas restantes no lote atual).',
            ]}
          />

          <div style={{
            background: '#16161f',
            border: '1px solid #2a2a38',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginTop: '1.5rem',
          }}>
            <h4 style={{ color: '#c9a84c', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              PLATAFORMA RECOMENDADA
            </h4>
            <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#f0ede6' }}>Elementor Pro sobre WordPress</strong> em hospedagem dedicada (Kinsta, WP Engine, Hostinger Business).
              Alternativa: <strong style={{ color: '#f0ede6' }}>Framer</strong> — design superior, mais rapido, mas Hotmart checkout exige iframe.
            </p>
          </div>
        </Section>

        {/* ═══════════ CAPTACAO ═══════════ */}
        <Section id="capture">
          <SectionTitle
            number="05"
            title="Captacao — 60 Dias"
            subtitle="10 lotes, 4 campanhas, criativos prioritarios, order bumps e automacoes."
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Estrutura de Lotes (US$ 9 a US$ 49)
          </h3>
          <DataTable
            headers={['Lote', 'Preco', 'Vagas', 'Gatilho', 'Dias']}
            rows={[
              ['1', 'US$ 9', '50', 'Esgotar', '1-3'],
              ['2', 'US$ 14', '80', 'Esgotar ou 85%', '3-6'],
              ['3', 'US$ 19', '100', 'Esgotar ou 85%', '6-10'],
              ['4', 'US$ 24', '120', 'Esgotar ou 85%', '10-15'],
              ['5', 'US$ 29', '120', 'Esgotar ou 85%', '15-22'],
              ['6', 'US$ 34', '100', 'Esgotar ou 85%', '22-30'],
              ['7', 'US$ 39', '80', 'Esgotar ou 85%', '30-40'],
              ['8', 'US$ 44', '60', 'Esgotar ou 85%', '40-50'],
              ['9', 'US$ 47', '40', 'Esgotar ou 85%', '50-55'],
              ['10', 'US$ 49', 'Ilimitado', 'Final', '55-60'],
            ]}
          />
          <p style={{ color: '#a8a4a0', fontSize: '0.85rem', marginBottom: '2.5rem' }}>
            Preco medio ponderado: <strong style={{ color: '#f0ede6' }}>US$ 28</strong> por ingresso.
            Receita de ingressos (693 proj.): <strong style={{ color: '#2dd4a8' }}>~US$ 19.400</strong> — paga 3,9x o budget.
          </p>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gravacao como Order Bump
          </h3>
          <div style={{
            background: '#16161f',
            border: '1px solid #2a2a38',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
          }}>
            <p style={{ color: '#f0ede6', fontSize: '0.92rem', lineHeight: 1.7 }}>
              <strong>"Workshop en formato de clases — accesos vitalicios"</strong> — US$ 147.
              Cashback: US$ 147 de desconto no produto principal. Projecao: 15-20% dos compradores de ingresso
              = 104-180 vendas = <strong style={{ color: '#2dd4a8' }}>US$ 15.300 a US$ 26.460</strong> receita adicional.
            </p>
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            4 Campanhas de Trafego
          </h3>
          <DataTable
            headers={['Campanha', '% Budget', 'Objetivo', 'Exclusoes']}
            rows={[
              ['1. Vendas + Remarketing', '65% (US$ 3.250)', 'Compra direta. Otimizar por conversao.', 'Compradores ja convertidos'],
              ['2. E4 — Corredor polones', '20% (US$ 1.000)', 'Videos sem botao. Gera publico quente.', 'Quem viu 50% (segue p/ remarketing)'],
              ['3. Remarketing single shot', '10% (US$ 500)', '1 anuncio unico para quem saiu do checkout.', 'Frequency cap = 1'],
              ['4. Nao pulaveis 3s', '5% (US$ 250)', 'Mensagem completa em 3s. Remarketing.', 'Visitantes pagina ultimos 14 dias'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Criativos Prioritarios (hierarquia)
          </h3>
          <InfoBlock
            title="Ordem de producao e teste"
            items={[
              '1. Criativo campeao Diego (video vertical 60s) — dor → quebra de padrao → prova → convite. Carrega 40%+ das vendas.',
              '2. "Como va a funcionar" em carrossel estatico — 8 slides. Top 1 do Cassio em 4 lancamentos seguidos.',
              '3. "Como va a funcionar" em video — mesma estrutura com Diego narrando.',
              '4. 2-3 UGCs latinos (Fiverr ES) — homem 35-55, sotaque regional, linguagem de agricultor. US$ 50-80/video.',
              '5. CTA invertido — "Aun no compres..." Benchmark: CTR 1,0% → 1,65%+.',
              '6. Tela final 10-14s em todos os videos — cenas da Let\'s Fly + card. +20% CTR.',
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Automacoes Operacionais
          </h3>
          <DataTable
            headers={['Ferramenta', 'Funcao']}
            rows={[
              ['ManyChat', 'Palavra-chave de ativacao, tagueamento, verificacao de cashback, link personalizado'],
              ['Email (ActiveCampaign/Mailchimp)', 'Onboarding pos-ingresso, lembretes de virada de lote, lembretes pre-evento'],
              ['WhatsApp API (Kommo/BotConversa)', 'Grupos por lote, lembretes T-7/T-3/T-1/T-0, ligacao via API (+4% comparecimento)'],
              ['Clint CRM', 'Pipeline de leads high ticket para carrinho aberto'],
              ['Hotmart', 'Produto principal + ingresso + gravacao + templates. Checkout USD.'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Conteudo Organico — Obrigatorio
          </h3>
          <DataTable
            headers={['Frequencia', 'Formato', 'Responsavel']}
            rows={[
              ['Diario', 'Stories (3-5 por dia)', 'Diego'],
              ['3x/semana', 'Post no feed IG (carrossel educativo ou caso)', 'Diego grava + Gabriel edita'],
              ['2x/semana', 'Reel (30-60s)', 'Diego grava + editor externo'],
              ['Semanal', 'Live no IG', 'Diego'],
              ['1x no ciclo', 'Live YouTube com convidado', 'Diego + Gabriel produz'],
              ['Diario (ultima semana)', '1 video no feed + 5-8 stories', 'Diego'],
            ]}
          />
        </Section>

        {/* ═══════════ EVENTO ═══════════ */}
        <Section id="event" dark>
          <SectionTitle
            number="06"
            title="Evento — 2 Dias de Construcao"
            subtitle="O lead sai com algo CONSTRUIDO. Nao informacao: artefato pronto."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            <MetricCard value="Zoom" label="Plataforma (500-1000 cap.)" />
            <MetricCard value="2 dias" label="9h30-17h30 Col (GMT-5)" />
            <MetricCard value="~12h" label="Total de conteudo" />
            <MetricCard value="80/20" label="Conteudo / Venda" />
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Dia 1 — Biologia, Dimensionamento, Primeira Construcao
          </h3>
          <div style={{ marginBottom: '2.5rem' }}>
            <TimelineItem time="9h30-9h45" title="Abertura" detail="Boas-vindas, promessa do que vao construir nos 2 dias." />
            <TimelineItem time="9h45-10h45" title="Bloco 1: Biologia de Hermetia illucens" detail="Ciclo de vida, fases, requisitos ambientais. Teoria aplicada." />
            <TimelineItem time="11h00-12h30" title="Bloco 2: Dimensionamiento" detail="Calculo da capacidade (200kg/dia, 500kg/dia, 2 ton/dia). Alunos fazem ao vivo com Excel." />
            <TimelineItem time="13h30-15h00" title="Bloco 3: Infraestrutura" detail="Projeto do galpao, equipamentos, fluxos, controle ambiental. Maquete + Excel de custos." />
            <TimelineItem time="15h20-15h40" title="Bloco 4: Alimentacion" detail="Substrato, balanceamento, fontes, logistica." />
            <TimelineItem time="15h40-16h40" title="PITCH 1" detail="Produto + preco cheio (US$ 1.000 a vista / 5x US$ 220)." />
            <TimelineItem time="17h00-17h30" title="Q&A + Cliffhanger Dia 2" detail="Resumo do dia, preview do Dia 2." />
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Dia 2 — Operacao, Monetizacao, Escalabilidade
          </h3>
          <div style={{ marginBottom: '2.5rem' }}>
            <TimelineItem time="9h30-9h45" title="Retomada" detail="Revisao do plano construido no Dia 1." />
            <TimelineItem time="9h45-11h00" title="Bloco 6: Manejo operacional" detail="Rotinas diarias, controle populacional, gestao de doencas e perdas." />
            <TimelineItem time="11h15-12h30" title="Bloco 7: Cosecha e procesamiento" detail="Oleo, proteina, fertilizante (frass). Alunos pensam em monetizacao." />
            <TimelineItem time="12h30-13h30" title="PITCH 2" detail="Oferta da turma + bonus para todos. Agentes IA como teaser." />
            <TimelineItem time="14h30-15h40" title="Bloco 8: Monetizacion" detail="Mercados-alvo (pet food, feed, composta premium), precios, negociacao B2B. ROI ao vivo." />
            <TimelineItem time="15h40-16h40" title="PITCH 3 — TSUNAMI" detail="Abertura oficial do carrinho. Suite Co-Pilot para primeiros 10." />
            <TimelineItem time="17h00-17h30" title="Encerramento" detail="Celebracao, proximos passos, teaser proxima turma." />
          </div>

          <div style={{
            background: '#16161f',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
          }}>
            <h4 style={{ color: '#c9a84c', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              "PATROCINADOR" COMUNICADO DESDE O INICIO
            </h4>
            <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>
              "Durante los 2 dias vamos a tener 3 momentos cortos donde les voy a presentar la mentoria Bioconversion Pro —
              es el patrocinador de este workshop y lo que hace posible que hayan pagado solo US$ [preco] por 2 dias completos."
            </p>
          </div>
        </Section>

        {/* ═══════════ PITCHES ═══════════ */}
        <Section id="pitches">
          <SectionTitle
            number="07"
            title="Pitches — Tsunami em 3 Ondas"
            subtitle="Cada pitch surpreende positivamente. De 'interessante' para 'seria loucura nao comprar' para 'preciso ser dos 10 primeiros.'"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {[
              {
                num: '1',
                when: 'Dia 1 — 15h40',
                goal: 'Apresentar produto e preco cheio',
                effect: '"Interessante, vou pensar"',
                items: ['Conectar com o construido', 'Apresentar Bioconversion Pro', 'Preco: US$ 1.000 / 5x US$ 220', 'Garantia 1 dia', 'Transicao para coffee'],
              },
              {
                num: '2',
                when: 'Dia 2 — 12h30',
                goal: 'Oferta da turma com bonus',
                effect: '"Seria loucura nao comprar"',
                items: ['Retomar Pitch 1', 'Bonus 1: Revisao individual extra (30 min)', 'Bonus 2: Sessao com convidado especialista', 'Bonus 3: Templates financeiros 3 anos', '"O preco continua — a oferta e o bonus"'],
              },
              {
                num: '3',
                when: 'Dia 2 — 15h40',
                goal: 'TSUNAMI — Abertura do carrinho',
                effect: '"Preciso ser dos 10 primeiros"',
                items: ['Recapitular tudo', 'TSUNAMI: Suite Bioconversion Co-Pilot p/ primeiros 10', 'Link liberado em todos os canais', 'Contagem ao vivo de vendas', 'Transicao + urgencia'],
              },
            ].map((pitch) => (
              <div key={pitch.num} style={{
                background: '#16161f',
                border: `1px solid ${pitch.num === '3' ? 'rgba(201, 168, 76, 0.4)' : '#2a2a38'}`,
                borderRadius: '12px',
                padding: '2rem',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#c9a84c',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  PITCH {pitch.num} &mdash; {pitch.when}
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.2rem',
                  color: '#f0ede6',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  {pitch.goal}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#2dd4a8', marginBottom: '1rem', fontStyle: 'italic' }}>
                  Efeito: {pitch.effect}
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pitch.items.map((item, i) => (
                    <li key={i} style={{
                      fontSize: '0.85rem', color: '#a8a4a0', lineHeight: 1.7,
                      paddingLeft: '1rem', position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: '#6b6762' }}>&#x25B8;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Suite Bioconversion Co-Pilot (Tsunami Bonus)
          </h3>
          <DataTable
            headers={['Agente', 'Funcao']}
            rows={[
              ['Plant Dimensioner', 'Input: objetivo kg/dia + clima + recurso. Output: plano de galpao com equipamentos e custos.'],
              ['Substrate Calculator', 'Input: disponibilidade local de residuos. Output: mix otimo, custo por kg processado.'],
              ['Growth Projector', 'Input: investimento inicial + projecao vendas. Output: fluxo populacional e financeiro 24 meses.'],
              ['Sales Negotiator Script', 'Treina aluno em negociacao B2B com industrias pet, feed ou fertilizante.'],
              ['Technical Troubleshooter', 'Base de conhecimento tecnico do Diego em agente conversacional — acesso 24/7.'],
            ]}
          />
        </Section>

        {/* ═══════════ CARRINHO ═══════════ */}
        <Section id="cart" dark>
          <SectionTitle
            number="08"
            title="Carrinho Aberto — 14 Dias"
            subtitle="Dia 1 converte 7-9%. Vendas pos-Dia 1 adicionam +65% a +100%. Cada dia precisa de motivo diferente."
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Cronograma Dia-a-Dia
          </h3>
          <DataTable
            headers={['Dia', 'Acao principal', 'Canal']}
            rows={[
              ['Dom 0', 'Abertura do carrinho. Link ativo, ManyChat dispara.', 'Zoom + WA + Email + IG'],
              ['Seg 1', 'Comunicacao oficial + resumo do construido.', 'Email + WA + IG feed'],
              ['Ter 2', 'Bonus 1 (revisao individual) acabando hoje 23h59', 'Email + WA + stories + anuncio'],
              ['Qua 3', 'Bonus 2 (sessao convidado) acabando hoje', 'Email + WA + stories'],
              ['Qui 4', 'Bonus surpresa: sessao biologia avancada (US$ 297)', 'Email + WA + stories + IG live'],
              ['Sex 5', 'Social proof — quem ja comprou, depoimentos quentes', 'Email + stories + carousel'],
              ['Sab 6', 'Live Diego IG: "preguntas sobre la mentoria"', 'IG Live + pitch discreto'],
              ['Dom 7', 'Dia de respiro. Conteudo puro, nao venda direta.', 'Email'],
              ['Seg 8', '"En 5 dias se cierra. Aqui esta todo lo que incluye."', 'Email longo + WA'],
              ['Ter 9', 'Cashback acabando hoje (US$ 147 desconto expira)', 'Email + WA + anuncio remarketing'],
              ['Qua 10', 'Parcelamento estendido liberado (6x US$ 185 ou 10x US$ 115)', 'Email + WA + stories'],
              ['Qui 11', 'Depoimentos real-time + prints da comunidade ativa', 'Stories + IG feed'],
              ['Sex 12', '"Faltan 3 dias." SDR entra em acao intensiva.', 'Telefone + WA individual'],
              ['Sab 13', '"Faltan 2 dias." Live final + stories cada 2h', 'IG Live + stories'],
              ['Dom 14', 'ULTIMO DIA. Contagem regressiva a cada 4h.', 'Todos os canais'],
              ['Seg 15', 'CARRINHO FECHA 00h. Mensagem oficial.', 'Email + stories'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            11 Abordagens Individuais por Lead
          </h3>
          <DataTable
            headers={['#', 'Formato', 'Timing']}
            rows={[
              ['1', 'WA de parabens pos-Pitch 3', 'Dom 0'],
              ['2', 'Email pessoal + perguntas abertas', 'Seg 1'],
              ['3', 'WA com voice note do Diego', 'Qua 3'],
              ['4', 'DM Instagram', 'Qui 4'],
              ['5', 'Email meio-de-caminho ("como esta tu reflexion")', 'Dom 7'],
              ['6', 'WA audio + oferta de call 15min', 'Ter 9'],
              ['7', 'Call real (se aceito)', 'Ter 9 / Qua 10'],
              ['8', 'Email ultima chamada cashback', 'Ter 9'],
              ['9', 'WA do closer/SDR', 'Sex 12'],
              ['10', 'Stories mencionando o lead (se aceito)', 'Sab 13'],
              ['11', 'WA final "ultimas horas, decidi..."', 'Dom 14'],
            ]}
          />

          <p style={{ color: '#a8a4a0', fontSize: '0.85rem', marginTop: '1.5rem' }}>
            Budget carrinho aberto: <strong style={{ color: '#f0ede6' }}>US$ 1.500 adicionais</strong> (fora captacao).
            Cashback encerra em D+9 (5 dias antes do fim).
          </p>
        </Section>

        {/* ═══════════ DOWNSELL ═══════════ */}
        <Section id="downsell">
          <SectionTitle
            number="09"
            title="Downsell (Condicional)"
            subtitle="Se representar >15-20% do faturamento e nao atrasar proxima captacao: fazer."
          />

          <div style={{
            background: '#16161f',
            border: '1px solid #2a2a38',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
          }}>
            <h4 style={{ color: '#f0ede6', fontSize: '1.1rem', marginBottom: '1rem' }}>
              Compostaje del Futuro Pro — US$ 397
            </h4>
            <p style={{ color: '#a8a4a0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Ativar nos ultimos 3 dias do carrinho (D+11 a D+14) para quem nao comprou a mentoria principal.
              Curso reformatado + 3 meses de comunidade + 1 sessao grupal.
            </p>
            <p style={{ color: '#a8a4a0', fontSize: '0.85rem' }}>
              Meta: 15-20 vendas = <strong style={{ color: '#2dd4a8' }}>US$ 6.000-8.000</strong> (3-5% de conversao sobre ~450 leads quentes).
              Se gerar &lt;US$ 3.000, eliminar no proximo ciclo.
            </p>
          </div>
        </Section>

        {/* ═══════════ P&L ═══════════ */}
        <Section id="pl" dark>
          <SectionTitle
            number="10"
            title="P&L em Tres Cenarios"
            subtitle="Projecao financeira completa — conservador, realista e otimista."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            {[
              {
                label: 'CONSERVADOR',
                revenue: 'US$ 58.566',
                net: 'US$ 29.770',
                roas: '9,0',
                students: '32',
                color: '#a8a4a0',
              },
              {
                label: 'REALISTA',
                revenue: 'US$ 85.719',
                net: 'US$ 50.346',
                roas: '13,2',
                students: '40 + 22 espera',
                color: '#c9a84c',
              },
              {
                label: 'OTIMISTA',
                revenue: 'US$ 103.199',
                net: 'US$ 61.025',
                roas: '12,9',
                students: '40 + 40 espera',
                color: '#2dd4a8',
              },
            ].map((scenario) => (
              <div key={scenario.label} style={{
                background: '#16161f',
                border: `1px solid ${scenario.color}33`,
                borderRadius: '12px',
                padding: '2rem',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: scenario.color,
                  letterSpacing: '0.15em',
                  marginBottom: '1.5rem',
                }}>
                  {scenario.label}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b6762', textTransform: 'uppercase' }}>Receita Bruta</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#f0ede6' }}>
                    {scenario.revenue}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6b6762', textTransform: 'uppercase' }}>Liquido Diego</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: scenario.color }}>
                    {scenario.net}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#6b6762' }}>ROAS</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0ede6' }}>{scenario.roas}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#6b6762' }}>Mentorados</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f0ede6' }}>{scenario.students}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Detalhamento — Cenario Realista
          </h3>
          <DataTable
            headers={['Item', 'Valor', 'Nota']}
            rows={[
              ['Ingressos vendidos', '693', 'Conversao de pagina 6%'],
              ['Receita ingressos', 'US$ 19.404', 'Preco medio US$ 28'],
              ['Mentorados', '40 (teto) + 22 lista espera T3', 'Demanda excede oferta'],
              ['Receita mentoria', 'US$ 40.000', '40 x US$ 1.000'],
              ['Gravacoes (18% ingressos)', 'US$ 18.375', '125 x US$ 147'],
              ['Downsell', 'US$ 7.940', '20 x US$ 397'],
              ['RECEITA BRUTA', 'US$ 85.719', ''],
              ['(-) Taxas Hotmart', '-US$ 9.186', '9,9% + US$1/venda'],
              ['(-) Impostos Simples', '-US$ 5.143', '6%'],
              ['(-) Cashback efetivo', '-US$ 1.470', '25% x 40 x US$ 147'],
              ['(-) Trafego pago', '-US$ 6.500', '5.000 captacao + 1.500 carrinho'],
              ['(-) Operacional fixo', '-US$ 3.500', 'Designer + editor + UGCs + ferramentas'],
              ['(-) Fixo Gabriel', '-US$ 2.000', ''],
              ['(-) Comissao Gabriel (20%)', '-US$ 7.574', 'Sobre liquida mentoria + downsell'],
              ['LIQUIDO DIEGO', 'US$ 50.346', '~7,7x o budget de trafego'],
            ]}
            highlightCol={1}
          />

          <div style={{
            marginTop: '2rem',
            padding: '1.25rem 2rem',
            background: 'rgba(201, 168, 76, 0.06)',
            border: '1px solid rgba(201, 168, 76, 0.2)',
            borderRadius: '10px',
            fontSize: '0.85rem',
            color: '#a8a4a0',
          }}>
            <strong style={{ color: '#c9a84c' }}>Receita Gabriel (realista):</strong> US$ 2.000 fixo + US$ 7.574 comissao = <strong style={{ color: '#f0ede6' }}>US$ 9.574</strong> por ciclo.
            Em 2 ciclos: ~US$ 27.000-30.000.
          </div>
        </Section>

        {/* ═══════════ KPIS ═══════════ */}
        <Section id="kpis">
          <SectionTitle
            number="11"
            title="KPIs e Benchmarks de Controle"
            subtitle="Dashboard diario durante captacao — metricas obrigatorias."
          />

          <DataTable
            headers={['Metrica', 'Excelente', 'Bom', 'Regular', 'Ruim', 'Critico']}
            rows={[
              ['Conversao pagina', '8-12%+', '7-8%', '5-7%', '2-4%', '—'],
              ['Connect Rate', '81%+', '75-80%', '69-75%', '55-60%', '<=54%'],
              ['CTR (c/ escala)', '1,8%+', '1,5-1,7%', '1,2-1,4%', '0,7-0,8%', '<=0,4%'],
              ['CPM LATAM hispana', '<=US$ 4', 'US$ 4-7', 'US$ 7-10', 'US$ 10-14', 'US$ 14+'],
              ['Checkout conversion', '40%+', '32-39%', '26-31%', '18-20%', '<=17%'],
              ['Gravacao / OB', '20-26%', '15-19%', '10-14%', '—', '—'],
              ['CAC ingresso', '<=US$ 10', 'US$ 10-18', 'US$ 18-25', 'US$ 25-30', 'US$ 30+'],
              ['CPA maximo (teto)', 'US$ 36', '—', '—', '—', '—'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Comparecimento
          </h3>
          <DataTable
            headers={['Metrica', 'Benchmark']}
            rows={[
              ['Entrada nos grupos WA', '>=85%'],
              ['Comparecimento D1', '70-75% excelente / 60-69% bom / 50-59% regular'],
              ['Queda D2 vs D1', '-10 pontos esperado'],
              ['Publico presente no pitch', '~80% do pico D1'],
              ['Conversao Dia 1 (primeiras horas)', '7-9% da base'],
              ['Vendas pos-Dia 1', '+65% a +100% do Dia 1'],
              ['Ciclo de venda pagante', '25-45 dias'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gates de Decisao
          </h3>
          <DataTable
            headers={['Dia', 'Indicador', 'Acao se abaixo']}
            rows={[
              ['D-55 (apos 5 dias)', 'CTR medio <0,8%', 'Produzir 3 novos criativos + substituir piores'],
              ['D-45', 'Conv. pagina <4%', 'Revisao de design (nao copy). 1 variavel, 3.000 visitas/variante'],
              ['D-30', 'CPA medio >US$ 25', 'Cortar piores. Aumentar E4 para 25% budget'],
              ['D-15', 'Ingressos <300', 'Estender captacao +7 dias ou reduzir meta p/ 30'],
              ['D-7', 'Comparecimento proj. <55%', 'API WhatsApp, ligacoes, credenciamento intensivo'],
            ]}
          />
        </Section>

        {/* ═══════════ CALENDARIO ═══════════ */}
        <Section id="calendar" dark>
          <SectionTitle
            number="12"
            title="Calendario de Execucao"
            subtitle="~90 dias do kickoff ao fim do carrinho. Evento: 15-16 agosto 2026."
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            <MetricCard value="10 dias" label="Pre-producao" />
            <MetricCard value="60 dias" label="Captacao" />
            <MetricCard value="2 dias" label="Evento" accent />
            <MetricCard value="14 dias" label="Carrinho aberto" />
            <MetricCard value="10 dias" label="Debrief" />
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Cronograma Detalhado
          </h3>
          <div style={{ marginBottom: '2.5rem' }}>
            <TimelineItem time="5 mai 2026" title="Kickoff formal" detail="Assinatura contrato, resolver DNS/SSL." />
            <TimelineItem time="6-9 mai" title="Pre-producao" detail="Briefing pagina, config Hotmart/ManyChat/automacoes." />
            <TimelineItem time="10-13 mai" title="Producao criativos" detail="6 primeiros criativos. Pixel, GA4, Clarity instalados." />
            <TimelineItem time="14 mai" title="Revisao final" detail="Teste completo pagina + checkout com compra real." />
            <TimelineItem time="15 mai 2026" title="CAPTACAO ABRE" detail="Lote 1 (US$ 9). Primeiros anuncios ao ar." />
            <TimelineItem time="15 mai - 10 ago" title="Captacao ativa" detail="Stories diarios, reels, lives, gestao de trafego, producao continua de criativos." />
            <TimelineItem time="11-14 ago" title="Pre-evento" detail="API ligacoes (+4%). Lembretes. Ensaios de pitch." />
            <TimelineItem time="15-16 ago 2026" title="EVENTO" detail="Workshop Bioconversion 2 dias." />
            <TimelineItem time="16 ago 17h40" title="Carrinho abre" detail="Pitch 3. Link ativo. ManyChat dispara." />
            <TimelineItem time="17-30 ago" title="Carrinho aberto" detail="14 dias conforme cronograma detalhado." />
            <TimelineItem time="30 ago 2026" title="CARRINHO FECHA" detail="Fim do ciclo." />
            <TimelineItem time="31 ago - 10 set" title="Debrief" detail="Analise dados, real vs plano, inicio prep T3." />
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Cadencia Trimestral (a partir de T3 2026)
          </h3>
          <DataTable
            headers={['Ciclo', 'Captacao', 'Evento', 'Carrinho']}
            rows={[
              ['T3 2026', '10 set - 7 nov', '7-8 nov', '8-22 nov'],
              ['T4 2026', '22 nov - 16 jan', '16-17 jan', '17-31 jan'],
              ['T1 2027', '31 jan - 27 mar', '27-28 mar', '28 mar - 11 abr'],
              ['T2 2027', '11 abr - 5 jun', '5-6 jun', '6-20 jun'],
            ]}
          />
        </Section>

        {/* ═══════════ EQUIPE ═══════════ */}
        <Section id="team">
          <SectionTitle
            number="13"
            title="Equipe, Papeis e Compensacao"
            subtitle="Compromisso de tempo + proposta comercial."
          />

          <DataTable
            headers={['Parte', 'Tempo/Semana', 'Dias Criticos']}
            rows={[
              ['Diego', '15-20h', '2 dias evento (100%) + 3 primeiros dias carrinho (100%)'],
              ['Gabriel', '20-25h', '2 dias evento (100%) + 2 primeiros dias carrinho (100%)'],
              ['Designer', '8h pre-prod, 2-4h/sem depois', '—'],
              ['Editor', '10h pre-prod, 5h/sem depois', '—'],
              ['UGCs', 'Pontual (3 entregas)', '—'],
              ['SDR', '0h captacao, 20h/sem no carrinho', '—'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Compensacao Gabriel — Modelo Hibrido
          </h3>
          <DataTable
            headers={['Componente', 'Valor', 'Obs']}
            rows={[
              ['Fixo mensal', 'US$ 2.000/mes', 'Estrategia, arquitetura, trafego, analise, briefings'],
              ['Comissao por ciclo', '20% receita liquida (mentoria + downsell)', 'Paga apos fechamento + recebimento Hotmart'],
              ['Bonus super-performance', '+5% sobre comissao se ROAS >12', 'Incentiva maximizacao'],
            ]}
          />

          <div style={{
            background: '#16161f',
            border: '1px solid #2a2a38',
            borderRadius: '12px',
            padding: '1.5rem 2rem',
            marginTop: '1.5rem',
            marginBottom: '2.5rem',
          }}>
            <p style={{ color: '#a8a4a0', fontSize: '0.9rem', lineHeight: 1.7 }}>
              <strong style={{ color: '#f0ede6' }}>Total esperado por ciclo (realista):</strong> US$ 6.000 fixo (3 meses) + US$ 7.574 comissao = <strong style={{ color: '#2dd4a8' }}>US$ 13.574/ciclo</strong>.
              Em 2 ciclos (T2+T3): ~US$ 27.000-30.000.
            </p>
            <p style={{ color: '#6b6762', fontSize: '0.82rem', marginTop: '0.75rem' }}>
              Evolucao: T4+T1 2027 elimina fixo, comissao sobe para 25% + 5% bonus.
              A partir de T2 2027: possibilidade de equity (sociedade formal).
            </p>
          </div>

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Operacional (Diego paga direto)
          </h3>
          <DataTable
            headers={['Fornecedor', 'Valor', 'Formato']}
            rows={[
              ['Designer', 'US$ 800/ciclo', 'Escopo fechado'],
              ['Editor', 'US$ 900/ciclo', 'Escopo fechado'],
              ['UGCs (2-3)', 'US$ 200-300/ciclo', 'Por entrega'],
              ['Ferramentas (Hotmart, ManyChat, Zoom, hosting)', 'US$ 400 fixo/mes', 'Recorrente'],
              ['SDR', 'Comissao US$ 30/venda', 'So no carrinho'],
            ]}
          />
        </Section>

        {/* ═══════════ RISCOS ═══════════ */}
        <Section id="risks" dark>
          <SectionTitle
            number="14"
            title="Riscos e Mitigacoes"
            subtitle="Operacionais, estrategicos e reputacionais."
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Riscos Operacionais
          </h3>
          <DataTable
            headers={['Risco', 'Prob.', 'Impacto', 'Mitigacao']}
            rows={[
              ['DNS/SSL nao resolvem a tempo', 'Media', 'Alto', 'Plano B: subdominio novo Cloudflare + Hostinger 48h (US$ 50)'],
              ['Diego nao mantém 15h/sem', 'Alta', 'Alto', '"Lancamento Lite" ou gravacao remota mensal (15-20 videos em 2 dias)'],
              ['CPM LATAM mais alto (US$ 8-12)', 'Media', 'Medio', 'Pivotar 30% budget para E4; reduzir volume inicial de lotes'],
              ['Criativos nao performam (CTR <0,8%)', 'Media', 'Alto', 'Pipeline 3-4 criativos novos/2 semanas. Se nenhum performa: revisar promessa'],
              ['Comparecimento <55%', 'Media', 'Alto', 'Ligacoes API (+4%). Credenciamento visual. Live D-1. Grupos WA pre-segmentados'],
              ['Pitch descontrola (caso IALAB)', 'Baixa', 'Medio', 'Ensaiar 3 pitches 2x com Gabriel. Cronometro visual.'],
              ['Excesso demanda (>40)', 'Alta', 'Baixo', 'Lista espera paga (deposito US$ 100) para T3'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Riscos Estrategicos
          </h3>
          <DataTable
            headers={['Risco', 'Prob.', 'Impacto', 'Mitigacao']}
            rows={[
              ['Ex-socio brasileiro entra em LATAM', 'Media', 'Alto', 'Moat: agentes Claude + relacionamentos + velocidade de execucao'],
              ['EduKawat lanca produto similar', 'Media', 'Medio', 'Diferenciar: PhD + fabrica + cases industriais. Competir em profundidade.'],
              ['Mudanca cambial USD/BRL', 'Baixa', 'Baixo-Medio', 'Converter em lotes. Reserva 1 mes em USD.'],
              ['Hotmart bloqueia checkout internacional', 'Baixa', 'Alto', 'Backup: Stripe + Kiwify (5-7 dias ativacao)'],
              ['Diego se sobrecarrega e desiste', 'Baixa', 'Critico', 'Checkpoints mensais. Aumentar terceirizacao se sinais de sobrecarga.'],
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Riscos Reputacionais
          </h3>
          <DataTable
            headers={['Risco', 'Prob.', 'Impacto', 'Mitigacao']}
            rows={[
              ['Acusacao "vendedor de fumaca"', 'Media', 'Medio', 'Copy ancorada em lastro verificavel (Finep, PhD, fabrica). Transparencia radical.'],
              ['Aluno insatisfeito viraliza', 'Baixa', 'Medio', 'Garantia 1 dia. Onboarding individual. Processo de feedback estruturado.'],
            ]}
          />
        </Section>

        {/* ═══════════ PROPOSTA COMERCIAL ═══════════ */}
        <Section id="proposal">
          <SectionTitle
            number="15"
            title="Proposta Comercial"
            subtitle="Resumo executivo para o Diego + termos + primeiros passos."
          />

          <div style={{
            background: '#16161f',
            borderLeft: '4px solid #c9a84c',
            padding: '2rem',
            marginBottom: '3rem',
            borderRadius: '0 12px 12px 0',
          }}>
            <p style={{ color: '#f0ede6', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic' }}>
              "Diego, minha proposta e construir o primeiro lancamento pago Metodo W da Bioconversion Academy para America Latina hispana.
              Produto: mentoria de US$ 1.000 para operadores medios e grandes. Investimento em trafego: US$ 5.000.
              Projecao realista: 40 mentorados, US$ 40.000 de faturamento de mentoria + US$ 45K de receita de ingresso, gravacoes e downsell.
              Ciclo de ~90 dias, compativel com sua cadencia trimestral. Te entrego um plano executavel, construo a arquitetura toda,
              cuido do trafego e analise, e so faturo comissao se voce faturar."
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}>
            <InfoBlock
              title="Termos Propostos"
              items={[
                'Duracao: 6 meses minimo (2 ciclos — T2 + T3 2026)',
                'Fixo: US$ 2.000/mes (pago em BRL ~R$ 10.000)',
                'Comissao: 20% receita liquida (mentoria + downsell)',
                'Bonus: +5% adicional se ROAS >12',
                'Propriedade dos ativos: 100% Bioconversion Academy',
                'Clausula saida: apos ciclo completo, aviso 30 dias, sem multa',
              ]}
            />
            <InfoBlock
              title="Entregas Gabriel (por ciclo)"
              items={[
                'Masterplan executavel',
                'Arquitetura completa do lancamento',
                'Briefing pagina de vendas + plano de criativos',
                'Gestao campanhas Meta Ads',
                'Configuracao automacoes (ManyChat, email, WA)',
                'Estrutura dos 3 pitches (roteiro, cronograma, cues)',
                'Gestao dados e KPIs em tempo real',
                'Co-producao do evento + carrinho aberto',
                'Debriefing completo pos-carrinho',
              ]}
            />
          </div>

          <InfoBlock
            title="Entregas Diego (por ciclo)"
            items={[
              '2 dias de evento ao vivo',
              'Conteudo organico (stories diarios, reels 2x/sem, live semanal)',
              'Gravacao criativos de video (5-10/ciclo)',
              '3 pitches ensaiados',
              'Atendimento dos 40 mentorados',
              'Pagamento fornecedores operacionais',
            ]}
          />

          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', marginTop: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Primeiros Passos (se aceito)
          </h3>
          <div style={{ marginBottom: '3rem' }}>
            <TimelineItem time="16 abr" title="Alinhamento verbal + revisao conjunta" detail="Revisao deste documento." />
            <TimelineItem time="Ate 22 abr" title="Contrato formal assinado" detail="" />
            <TimelineItem time="23 abr - 5 mai" title="Pre-producao" detail="DNS, SSL, pagina, Hotmart, automacoes, primeiros criativos." />
            <TimelineItem time="15 mai" title="CAPTACAO ABRE" detail="Lote 1 ao ar. Primeiro dolar em trafego." />
          </div>

          {/* GAPS */}
          <h3 style={{ color: '#c9a84c', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Gaps Abertos (confirmar com Diego)
          </h3>
          <DataTable
            headers={['#', 'Ponto']}
            rows={[
              ['1', 'Moeda USD e idioma espanhol — confirmar'],
              ['2', 'Email list existente — quantas pessoas, onde esta, possivel resgatar?'],
              ['3', 'Capacidade real Diego em horas/semana — compromisso formal'],
              ['4', 'Data exata do evento (assumido 15-16 ago 2026)'],
              ['5', 'Nome final do produto ("Mentoria Bioconversion Pro" provisorio)'],
              ['6', 'Cupos fixos em 40 ou abrir para 50 com 2 grupos?'],
              ['7', 'Escopo agentes IA — quantos prontos hoje, quantos construir ate 15/08?'],
              ['8', 'Risco ex-socio brasileiro — clausula de nao-concorrencia?'],
              ['9', 'Pagamento em pesos regionais (COP, MXN) ou so USD?'],
            ]}
          />

          {/* FOOTER */}
          <div style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid #2a2a38',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#c9a84c',
              marginBottom: '0.75rem',
            }}>
              Bioconversion Academy
            </div>
            <p style={{ color: '#6b6762', fontSize: '0.78rem', lineHeight: 1.6 }}>
              Masterplan V3.0 — Cenario USD Consolidado — 20 abril 2026<br />
              Propriedade conjunta de Gabriel Gomes Di Tullio e Diego Alejandro Flores Padron.<br />
              Nao se destina a compartilhamento externo.
            </p>
          </div>
        </Section>
      </div>
    </>
  );
}
