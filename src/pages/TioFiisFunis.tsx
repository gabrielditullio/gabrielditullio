import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { TrendingUp, Target, Filter, Megaphone, BarChart3, ArrowRight, ArrowDown, CheckCircle, ChevronDown, Zap, Users, Clock, Shield, DollarSign, Layers, Eye, Brain, Repeat, Star, AlertTriangle, Play, Mail, PenTool, Monitor } from "lucide-react";

const S = () => (<style>{`
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
.tiofiis-funis{--bg:#08090c;--bg2:#0e1118;--card:rgba(255,255,255,0.03);--card2:rgba(255,255,255,0.05);--txt:#eeeae4;--txt2:#8a877f;--txt3:#5a5850;--gold:#d4af37;--gold2:#e8c84a;--gold-g:rgba(212,175,55,0.12);--green:#10b981;--blue:#3b82f6;--red:#ef6b6b;--brd:rgba(255,255,255,0.06);--dsp:'Sora',sans-serif;--bdy:'DM Sans',sans-serif}
.tiofiis-funis *{margin:0;padding:0;box-sizing:border-box}.tiofiis-funis{scroll-behavior:smooth}.tiofiis-funis ::selection{background:var(--gold);color:var(--bg)}
@keyframes tff-glow{0%,100%{opacity:.04}50%{opacity:.08}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`}</style>);

const Grain=()=>(<svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999,opacity:.03}}><filter id="g-tff"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#g-tff)"/></svg>);

const R=({children,d=0}: {children: React.ReactNode; d?: number})=>{const r=useRef<HTMLDivElement>(null),v=useInView(r,{once:true,margin:"-60px"});return(<motion.div ref={r} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:.7,delay:d,type:"spring",stiffness:80,damping:20}}>{children}</motion.div>);};

const Counter=({target,suffix="",prefix=""}: {target: number; suffix?: string; prefix?: string})=>{const r=useRef<HTMLSpanElement>(null),v=useInView(r,{once:true});const[c,setC]=useState(0);useEffect(()=>{if(!v)return;let s=0;const step=target/(2*60);const t=setInterval(()=>{s+=step;if(s>=target){setC(target);clearInterval(t)}else setC(Math.floor(s))},1000/60);return()=>clearInterval(t)},[v,target]);return <span ref={r}>{prefix}{c.toLocaleString("pt-BR")}{suffix}</span>};

const Badge=({children,color="var(--gold)"}: {children: React.ReactNode; color?: string})=>(<span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:100,background:color+"15",border:"1px solid "+color+"30",color,fontSize:12,fontFamily:"var(--dsp)",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase"}}>{children}</span>);

const Sec=({children,pad="90px 20px"}: {children: React.ReactNode; pad?: string})=>(<section style={{padding:pad,maxWidth:1100,margin:"0 auto"}}>{children}</section>);

const H2=({badge,title,sub}: {badge?: string; title: string; sub?: string})=>(<div style={{marginBottom:44}}>{badge&&<R><Badge>{badge}</Badge></R>}<R d={.05}><h2 style={{fontFamily:"var(--dsp)",fontSize:"clamp(24px,4.5vw,38px)",color:"var(--txt)",lineHeight:1.15,fontWeight:700,marginTop:badge?14:0}}>{title}</h2></R>{sub&&<R d={.1}><p style={{fontFamily:"var(--bdy)",fontSize:16,color:"var(--txt2)",marginTop:10,lineHeight:1.65,maxWidth:650}}>{sub}</p></R>}</div>);

const Div=()=>(<div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px"}}><div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)"}}/></div>);

const FRAMEWORKS=[
  {num:"01",name:"Funil Perpétuo VSL",icon:<Play size={20}/>,color:"#10b981",
   insight:"Quem vende produto no perpétuo tem teto. Quem vende funil escala.",
   items:["Front R$297 — IA de Investidores standalone","VSL 20-30min em página fechada","Checkout limpo — sem order bump","Upsell R$697 Carteira Recomendada CNPI","Downsell R$347 (6 meses)","Upsell 2 R$1.497 curso completo","Recuperação via webinário gravado","Pop-up 20% desconto (1:30 após abertura)"]},
  {num:"02",name:"Filtro de Valor Progressivo",icon:<Filter size={20}/>,color:"#3b82f6",
   insight:"1 em cada 4 clientes high ticket começou comprando algo entre R$67 e R$197.",
   items:["Framework PSS aplicado ao TF","Low ticket R$67-97 em paralelo","Upsell = outro FUNIL (sessão Witz)","Qualificação automática por patrimônio",">R$100K → agendamento direto Witz","Lançamento = safra · Filtro = colheita","Extrair produtos, não criar"]},
  {num:"03",name:"Direct Response — 3 Motores",icon:<Megaphone size={20}/>,color:"#f59e0b",
   insight:"Não crie vontade. Direcione a vontade que já existe.",
   items:["Psicologia: vender proteção no cenário de guerra","1 produto × 20 ângulos de criativo","Fórmula CC=CV×(FVOdM+TG)","Top 10 vídeos → estrutura de anúncio","Empilhamento de funil no backend","LTV R$3K+ → bidar agressivo","Witz como backend = imbatível no leilão"]},
  {num:"04",name:"Protocolo MARGEM",icon:<BarChart3 size={20}/>,color:"#ec4899",
   insight:"Margem front 50%. Com upsells 60-65%. Os três motores juntos = antifrágil.",
   items:["Margem de contribuição por produto","7 alavancas priorizadas via iScore","Weekly + 101 quinzenal + daily em LP","Plano 90 dias com metas SMART","MDTs + Farol semanal com indicadores","HIP libera ~16h/semana de Lucas","Prioridade #1: tráfego perpétuo"]},
];

const FUNNEL=[
  {l:"Tráfego Cold",s:"R$40-50K/mês",c:"var(--txt3)",d:"Investidores buscando análise de FIIs, proteção, dividendos."},
  {l:"VSL Página Fechada",s:"Play Rate >60%",c:"var(--green)",d:"Só headline + vídeo. Conteúdo aparece após o preço."},
  {l:"Front R$297",s:"IA de Investidores",c:"var(--green)",d:"1.700 usuários validam. Checkout limpo."},
  {l:"Upsell R$697",s:"Carteira CNPI 12 meses",c:"var(--blue)",d:"One-click buy. Conversão 10-15%."},
  {l:"Downsell R$347",s:"Carteira 6 meses",c:"var(--blue)",d:"Mesmo produto, metade do acesso."},
  {l:"Upsell R$1.497",s:"Curso completo",c:"var(--gold)",d:"LTV explode. Próximo passo natural."},
  {l:"Webinário Recovery",s:"Automático",c:"var(--gold)",d:"Para quem não comprou upsell."},
  {l:"Aplicação Witz",s:"Fee-based recorrente",c:"var(--gold2)",d:"Patrimônio >R$100K → agendamento direto."},
];

const SCENARIOS=[
  {name:"Golaço Mínimo",roas:"2x",fat:"R$80K",marg:"R$27K",pct:"34"},
  {name:"Pessimista",roas:"3x",fat:"R$120K",marg:"R$61K",pct:"51"},
  {name:"Conservador",roas:"4,2x",fat:"R$178K",marg:"R$110K",pct:"62"},
  {name:"Otimista",roas:"4,7x",fat:"R$190K",marg:"R$120K",pct:"63"},
];

const TIMELINE=[
  {w:"Sem 1-2",t:"Imersão & Diagnóstico",d:"Análise do ecossistema. Definição do produto e formato do perpétuo.",icon:<Eye size={16}/>,tags:["Mapa de Performance","Briefing do produto","20 vídeos analisados"]},
  {w:"Sem 3-4",t:"Estratégia & Copy",d:"Espinha dorsal, big idea, roteiro VSL, copy de página e criativos.",icon:<PenTool size={16}/>,tags:["Roteiro VSL","3 versões de abertura","10+ criativos"]},
  {w:"Sem 5-6",t:"Build & Testes",d:"Páginas, automações, gravação, tráfego teste R$5-10K.",icon:<Monitor size={16}/>,tags:["Funil no ar","Primeiros dados","Gravação com Mateus"]},
  {w:"Sem 7-12",t:"Otimização & Escala",d:"Otimização contínua. Escala para R$40-50K/mês.",icon:<TrendingUp size={16}/>,tags:["ROAS ≥2x","Farol semanal","10+ criativos rodando"]},
  {w:"Meses 4-6",t:"Maturação & Novos Funis",d:"Funil 1 otimizado. Segundo funil em build.",icon:<Layers size={16}/>,tags:["Segundo funil","10+ leads Witz/mês","Qualificação automática"]},
];

export default function TioFiisFunis(){
  const{scrollYProgress}=useScroll();
  const scaleX=useSpring(scrollYProgress,{stiffness:100,damping:30});
  const[af,setAf]=useState(0);

  return(
  <div className="tiofiis-funis" style={{fontFamily:"var(--bdy)",background:"var(--bg)",color:"var(--txt)",minHeight:"100vh",overflowX:"hidden"}}>
  <S/><Grain/>
  <motion.div style={{position:"fixed",top:0,left:0,right:0,height:3,background:"var(--gold)",transformOrigin:"0%",scaleX,zIndex:9998,opacity:.7}}/>

  {/* HERO */}
  <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"60px 24px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"-20%",left:"50%",transform:"translateX(-50%)",width:700,height:700,borderRadius:"50%",background:"var(--gold)",filter:"blur(220px)",opacity:.04,animation:"tff-glow 8s ease-in-out infinite"}}/>
    <motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} transition={{delay:.2}}><Badge>Playbook Estratégico · Abril 2026</Badge></motion.div>
    <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:.5,type:"spring",stiffness:50,damping:18}}
      style={{fontFamily:"var(--dsp)",fontSize:"clamp(34px,7.5vw,72px)",fontWeight:800,lineHeight:1.05,marginTop:24,maxWidth:900,letterSpacing:"-0.02em"}}>
      <span style={{background:"linear-gradient(135deg,var(--gold),var(--gold2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Tio FIIs</span><br/>Funis Perpétuos
    </motion.h1>
    <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}} style={{fontFamily:"var(--bdy)",fontSize:"clamp(15px,2.2vw,19px)",color:"var(--txt2)",marginTop:20,fontWeight:300,maxWidth:600,lineHeight:1.6}}>
      Plano de implementação de funis perpétuos aplicando 4 frameworks ao ecossistema Lb Educação + Witz Wealth
    </motion.p>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}} style={{marginTop:50}}><ChevronDown size={24} color="var(--gold)" style={{opacity:.4}}/></motion.div>
  </section>

  <Div/>

  {/* NÚMEROS */}
  <Sec pad="70px 20px">
    <H2 badge="Ecossistema" title="Onde estamos hoje"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))",gap:14}}>
      {[{v:109,s:"K",l:"YouTube"},{v:205,s:"K+",l:"Instagram"},{v:1400,s:"+",l:"Vídeos"},{v:600,s:"M+",p:"R$",l:"Witz Wealth"},{v:1700,s:"+",l:"Usuários IA"},{v:9000,s:"+",l:"Alunos"}].map((s,i)=>(
        <R key={i} d={i*.07}><div style={{textAlign:"center",padding:"20px 12px",borderRadius:12,background:"var(--card)",border:"1px solid var(--brd)"}}>
          <div style={{fontFamily:"var(--dsp)",fontSize:"clamp(22px,3.5vw,32px)",fontWeight:700,color:"var(--gold)"}}><Counter target={s.v} prefix={s.p||""} suffix={s.s}/></div>
          <div style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)",marginTop:4}}>{s.l}</div>
        </div></R>
      ))}
    </div>
  </Sec>

  <Div/>

  {/* DIAGNÓSTICO */}
  <Sec pad="70px 20px">
    <H2 badge="Diagnóstico" title="Gargalos Identificados"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:12}}>
      {[{t:"Dependência de lançamento",d:"100% da receita vem de picos. Zero previsibilidade."},{t:"Lucas é gargalo",d:"Copy, criativos, páginas — tudo depende dele."},{t:"Produtos parados",d:"IA, carteira CNPI, curso ações — prontos sem funil."},{t:"Witz sem canal automatizado",d:"Leads chegam por acaso, não por sistema."},{t:"Zero tráfego perpétuo",d:"Fora de lançamento = zero anúncios rodando."},{t:"Cenário macro adverso",d:"Guerra, Selic alta, conversão abaixo do esperado."}].map((item,i)=>(
        <R key={i} d={i*.07}><motion.div whileHover={{x:4}} style={{display:"flex",gap:14,padding:"18px 16px",borderRadius:12,background:"var(--card)",border:"1px solid var(--brd)"}}>
          <AlertTriangle size={18} color="var(--red)" style={{marginTop:2,flexShrink:0}}/>
          <div><h4 style={{fontFamily:"var(--dsp)",fontSize:14,fontWeight:600,marginBottom:4}}>{item.t}</h4><p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.6}}>{item.d}</p></div>
        </motion.div></R>
      ))}
    </div>
  </Sec>

  <Div/>

  {/* GOLAÇO */}
  <Sec pad="70px 20px">
    <R><div style={{background:"linear-gradient(135deg,rgba(212,175,55,.08),rgba(212,175,55,.02))",border:"1px solid rgba(212,175,55,.2)",borderRadius:18,padding:"48px 32px",textAlign:"center"}}>
      <Badge>Meta — 6 meses</Badge>
      <h3 style={{fontFamily:"var(--dsp)",fontSize:"clamp(26px,5vw,44px)",fontWeight:700,marginTop:16,lineHeight:1.15}}>1 funil perpétuo com ROAS 2x</h3>
      <p style={{fontFamily:"var(--bdy)",fontSize:18,color:"var(--txt2)",marginTop:14}}>Investindo R$40-50K/mês → Faturando R$80-100K/mês</p>
    </div></R>
  </Sec>

  <Div/>

  {/* FRAMEWORKS */}
  <Sec>
    <H2 badge="Estratégia" title="4 Frameworks de Escala"/>
    <div style={{display:"flex",gap:8,marginBottom:32,flexWrap:"wrap"}}>
      {FRAMEWORKS.map((f,i)=>(<motion.button key={i} onClick={()=>setAf(i)} whileHover={{scale:1.02}} whileTap={{scale:.98}}
        style={{padding:"10px 18px",borderRadius:10,border:"1px solid",cursor:"pointer",fontFamily:"var(--dsp)",fontSize:13,fontWeight:600,background:af===i?f.color+"15":"transparent",borderColor:af===i?f.color+"40":"var(--brd)",color:af===i?f.color:"var(--txt3)",transition:"all .2s"}}>{f.num} · {f.name}</motion.button>))}
    </div>
    <AnimatePresence mode="wait">
      <motion.div key={af} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.35}}>
        {(()=>{const f=FRAMEWORKS[af];return(<div style={{display:"grid",gap:20}}>
          <div style={{background:"var(--card)",border:"1px solid var(--brd)",borderRadius:16,padding:"28px 24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <div style={{width:40,height:40,borderRadius:10,background:f.color+"15",display:"flex",alignItems:"center",justifyContent:"center",color:f.color}}>{f.icon}</div>
              <h3 style={{fontFamily:"var(--dsp)",fontSize:18,fontWeight:700}}>{f.name}</h3>
            </div>
            <p style={{fontFamily:"var(--bdy)",fontSize:15,color:f.color,fontStyle:"italic",lineHeight:1.6,borderLeft:"2px solid "+f.color+"40",paddingLeft:16}}>"{f.insight}"</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:10}}>
            {f.items.map((item,j)=>(<motion.div key={j} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:j*.05}} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"12px 16px",borderRadius:10,background:"var(--card)",border:"1px solid var(--brd)"}}>
              <CheckCircle size={15} color={f.color} style={{marginTop:2,flexShrink:0}}/><span style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.55}}>{item}</span>
            </motion.div>))}
          </div>
        </div>)})()}
      </motion.div>
    </AnimatePresence>
  </Sec>

  <Div/>

  {/* FUNNEL */}
  <Sec>
    <H2 badge="Arquitetura" title="Funil Perpétuo — Fluxo Completo"/>
    <div style={{display:"flex",flexDirection:"column",gap:6,position:"relative"}}>
      <div style={{position:"absolute",left:20,top:28,bottom:28,width:2,background:"linear-gradient(180deg,var(--green),var(--gold))",opacity:.2}}/>
      {FUNNEL.map((step,i)=>(<R key={i} d={i*.06}><motion.div whileHover={{x:6}} style={{display:"flex",alignItems:"flex-start",gap:16,padding:"14px 20px 14px 48px",borderRadius:12,background:"var(--card)",border:"1px solid var(--brd)",position:"relative"}}>
        <div style={{position:"absolute",left:13,top:18,width:16,height:16,borderRadius:"50%",background:"var(--bg)",border:"2px solid "+step.c,zIndex:2}}/>
        <div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><span style={{fontFamily:"var(--dsp)",fontSize:14,fontWeight:600}}>{step.l}</span><span style={{fontSize:11,color:step.c,background:step.c+"15",padding:"2px 8px",borderRadius:100}}>{step.s}</span></div><p style={{fontSize:12,color:"var(--txt3)",marginTop:3}}>{step.d}</p></div>
        {i<FUNNEL.length-1&&<ArrowDown size={14} color="var(--txt3)" style={{flexShrink:0,marginTop:4}}/>}
      </motion.div></R>))}
    </div>
  </Sec>

  <Div/>

  {/* PROJEÇÕES */}
  <Sec>
    <H2 badge="Projeções" title="Cenários de Faturamento Mensal" sub="Investimento de R$40K/mês. Margem após tráfego, gateway e impostos."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:14}}>
      {SCENARIOS.map((s,i)=>(<R key={i} d={i*.1}><motion.div whileHover={{y:-4}} style={{padding:"24px 20px",borderRadius:14,background:i===2?"linear-gradient(135deg,rgba(212,175,55,.06),rgba(212,175,55,.02))":"var(--card)",border:i===2?"1px solid rgba(212,175,55,.15)":"1px solid var(--brd)",position:"relative"}}>
        {i===2&&<span style={{position:"absolute",top:12,right:12,fontSize:10,color:"var(--gold)",fontFamily:"var(--dsp)",fontWeight:600,textTransform:"uppercase"}}>Projetado</span>}
        <p style={{fontFamily:"var(--dsp)",fontSize:12,color:"var(--txt3)",fontWeight:600,textTransform:"uppercase"}}>{s.name}</p>
        <p style={{fontFamily:"var(--dsp)",fontSize:28,fontWeight:700,color:i===2?"var(--gold)":"var(--txt)",marginTop:6}}>ROAS {s.roas}</p>
        <div style={{marginTop:16,paddingTop:14,borderTop:"1px solid var(--brd)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontSize:12,color:"var(--txt3)"}}>Faturamento</span><span style={{fontSize:15,fontFamily:"var(--dsp)",fontWeight:700}}>{s.fat}/mês</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"var(--txt3)"}}>Margem</span><span style={{fontSize:15,fontFamily:"var(--dsp)",fontWeight:700,color:"var(--green)"}}>{s.marg}/mês</span></div>
          <div style={{width:"100%",height:4,borderRadius:2,background:"var(--brd)",marginTop:10}}><motion.div initial={{width:0}} whileInView={{width:s.pct+"%"}} viewport={{once:true}} transition={{duration:1,delay:.3}} style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,var(--green),var(--gold))"}}/></div>
        </div>
      </motion.div></R>))}
    </div>
  </Sec>

  <Div/>

  {/* CASCATA */}
  <Sec>
    <H2 badge="Efeito cascata" title="O Perpétuo Potencializa Todo o Ecossistema" sub="O funil não gera apenas receita direta. Alimenta pelo menos 6 fontes de valor adicional."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:14}}>
      {[
        {s:"Witz Wealth",v:"~R$300K/ano",d:"~5 novos clientes/mês via qualificação automática",i:<Users size={18}/>,c:"var(--green)"},
        {s:"Lançamento Pago",v:"~R$180K/ano",d:"4.800 compradores aquecidos adicionados à base",i:<Repeat size={18}/>,c:"var(--blue)"},
        {s:"Afiliações Orion",v:"~R$85K/ano",d:"Base maior = mais conversões de research",i:<Star size={18}/>,c:"#8b5cf6"},
        {s:"Eficiência Operacional",v:"~R$225K/ano",d:"~16h/semana liberadas → melhoria nos lançamentos",i:<Zap size={18}/>,c:"var(--gold)"},
        {s:"Carteira CNPI",v:"~R$300K/ano",d:"Upsell R$697 dentro do funil — produto já existe",i:<Shield size={18}/>,c:"var(--green)"},
        {s:"IA como Assinatura",v:"potencial MRR",d:"R$47-97/mês × base construída pelo perpétuo",i:<Brain size={18}/>,c:"#ec4899"},
      ].map((c,i)=>(<R key={i} d={i*.08}><motion.div whileHover={{y:-3}} style={{padding:"22px 20px",borderRadius:14,background:"var(--card)",border:"1px solid var(--brd)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:36,height:36,borderRadius:9,background:c.c+"12",display:"flex",alignItems:"center",justifyContent:"center",color:c.c}}>{c.i}</div>
          <div><h4 style={{fontFamily:"var(--dsp)",fontSize:14,fontWeight:600}}>{c.s}</h4><span style={{fontFamily:"var(--dsp)",fontSize:15,fontWeight:700,color:c.c}}>{c.v}</span></div>
        </div>
        <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.6}}>{c.d}</p>
      </motion.div></R>))}
    </div>
    <R d={.5}><div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:12,marginTop:24,padding:"16px 24px",borderRadius:12,background:"linear-gradient(135deg,rgba(212,175,55,.06),rgba(212,175,55,.02))",border:"1px solid rgba(212,175,55,.12)"}}>
      <span style={{fontFamily:"var(--dsp)",fontSize:14,fontWeight:600,color:"var(--txt2)"}}>Valor total estimado:</span>
      <span style={{fontFamily:"var(--dsp)",fontSize:26,fontWeight:800,color:"var(--gold)"}}>~R$2M<span style={{fontSize:13,fontWeight:400,color:"var(--txt3)"}}>/ano</span></span>
    </div></R>
  </Sec>

  <Div/>

  {/* TIMELINE */}
  <Sec>
    <H2 badge="Roadmap" title="Implementação em 6 Meses"/>
    <div style={{position:"relative",paddingLeft:28}}>
      <div style={{position:"absolute",left:7,top:8,bottom:8,width:2,background:"linear-gradient(180deg,var(--gold),rgba(212,175,55,.1))"}}/>
      {TIMELINE.map((step,i)=>(<R key={i} d={i*.08}><div style={{position:"relative",marginBottom:24,paddingLeft:24}}>
        <div style={{position:"absolute",left:-28,top:4,width:16,height:16,borderRadius:"50%",background:"var(--bg)",border:"2px solid var(--gold)",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:6,height:6,borderRadius:"50%",background:"var(--gold)"}}/></div>
        <span style={{fontFamily:"var(--dsp)",fontSize:11,color:"var(--gold)",fontWeight:600,letterSpacing:".12em",textTransform:"uppercase"}}>{step.w}</span>
        <h4 style={{fontFamily:"var(--dsp)",fontSize:18,fontWeight:600,marginTop:4,display:"flex",alignItems:"center",gap:8}}><span style={{color:"var(--txt3)"}}>{step.icon}</span>{step.t}</h4>
        <p style={{fontFamily:"var(--bdy)",fontSize:14,color:"var(--txt2)",lineHeight:1.6,marginTop:6}}>{step.d}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
          {step.tags.map((tag,j)=>(<span key={j} style={{fontSize:11,color:"var(--txt3)",background:"var(--card)",border:"1px solid var(--brd)",padding:"4px 10px",borderRadius:100}}>{tag}</span>))}
        </div>
      </div></R>))}
    </div>
  </Sec>

  <Div/>

  {/* BEFORE/AFTER */}
  <Sec>
    <H2 badge="Transformação" title="O que muda no ecossistema"/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:16}}>
      <R><div style={{padding:"28px 24px",borderRadius:16,background:"rgba(239,107,107,.03)",border:"1px solid rgba(239,107,107,.1)",height:"100%"}}>
        <Badge color="var(--red)">Hoje</Badge>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:18}}>
          {["100% dependente de lançamentos","Lucas é gargalo de tudo","Zero funis perpétuos","205K seguidores sem monetização contínua","Witz recebe leads por acaso","Sem defesa estrutural contra cenário macro"].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"var(--txt2)"}}><AlertTriangle size={14} color="var(--red)" style={{marginTop:3,flexShrink:0}}/>{t}</div>))}
        </div>
      </div></R>
      <R d={.15}><div style={{padding:"28px 24px",borderRadius:16,background:"rgba(16,185,129,.03)",border:"1px solid rgba(16,185,129,.1)",height:"100%"}}>
        <Badge color="var(--green)">Em 6 meses</Badge>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:18}}>
          {["Funil perpétuo netando custo fixo 365 dias","Lucas liberado — 16h/semana para estratégia","R$80-190K/mês de receita nova e previsível","Witz alimentada continuamente por qualificação automática","Lançamento + Filtro + Perpétuo = antifrágil","Farol semanal garantindo execução"].map((t,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:13,color:"var(--txt2)"}}><CheckCircle size={14} color="var(--green)" style={{marginTop:3,flexShrink:0}}/>{t}</div>))}
        </div>
      </div></R>
    </div>
  </Sec>

  <footer style={{borderTop:"1px solid var(--brd)",padding:"30px 20px",textAlign:"center",marginTop:40}}>
    <p style={{fontFamily:"var(--bdy)",fontSize:11,color:"var(--txt3)"}}>Playbook Estratégico · Ecossistema TioFIIs / Witz Wealth · Documento confidencial · Abril 2026</p>
  </footer>
  </div>);
}