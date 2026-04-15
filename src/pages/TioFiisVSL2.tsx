import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Lock, TrendingUp, Zap, Target, ChevronDown, Star, Clock, Users, BarChart3 } from "lucide-react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    .tiofiis-v2 {
      --bg: #060B14;
      --bg2: #0C1220;
      --card: #111827;
      --green: #10B981;
      --green-l: #34D399;
      --green-d: #059669;
      --glow: rgba(16,185,129,0.12);
      --txt: #F1F5F9;
      --txt2: #94A3B8;
      --txt3: #64748B;
      --brd: rgba(148,163,184,0.08);
      --brd-g: rgba(16,185,129,0.2);
      --dsp: 'Space Grotesk', sans-serif;
      --bdy: 'DM Sans', sans-serif;
    }
    .tiofiis-v2 * { margin:0; padding:0; box-sizing:border-box; }
    .tiofiis-v2 ::selection { background:#10B981; color:#060B14; }
    @keyframes tiofiis2-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
  `}</style>
);

const Grain = () => (
  <svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999,opacity:0.03}}>
    <filter id="g-v2"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#g-v2)"/>
  </svg>
);

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{opacity:0,y:35}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.6,delay,type:"spring",stiffness:80,damping:20}}>
      {children}
    </motion.div>
  );
};

const BENEFITS = [
  { icon: <Target size={22}/>, title: "Quais FIIs comprar agora", desc: "Lista objetiva dos fundos com melhor relação risco-retorno no cenário atual de guerra e juros altos." },
  { icon: <BarChart3 size={22}/>, title: "Como montar sua carteira", desc: "Framework de 5 critérios para montar uma carteira diversificada que paga dividendos todo mês." },
  { icon: <Zap size={22}/>, title: "Os erros que destroem patrimônio", desc: "Os 7 erros mais comuns que 90% dos investidores de FIIs cometem — e como evitar cada um deles." },
];

const PROOF = [
  { name: "Marcos T.", text: "Comprei achando que era mais um ebook genérico. Em 2 horas eu já tinha reorganizado minha carteira inteira. Valeu cada centavo.", tag: "Investidor iniciante" },
  { name: "Juliana R.", text: "Simples, direto, sem enrolação. Exatamente o que eu precisava para parar de ficar perdida olhando 500 fundos sem saber qual escolher.", tag: "2 anos investindo" },
  { name: "André L.", text: "O framework de análise mudou minha forma de olhar FIIs. Coisa que eu levava 3 horas, agora faço em 20 minutos.", tag: "Carteira de R$200K" },
];

const TioFiisVSL2 = () => {
  const [orderBump, setOrderBump] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faq = [
    { q: "Preciso ter experiência em investimentos?", a: "Não. O guia foi feito para quem está começando do zero e também para quem já investe mas quer um framework claro de análise." },
    { q: "É um curso longo?", a: "Não. É um guia prático de consumo rápido (2-3 horas). Direto ao ponto, sem enrolação." },
    { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, direto no seu e-mail. Acesso vitalício." },
    { q: "Tem garantia?", a: "Sim. 7 dias de garantia incondicional. Se não gostar, devolvemos 100%." },
  ];

  return (
    <div className="tiofiis-v2" style={{fontFamily:"var(--bdy)",background:"var(--bg)",color:"var(--txt)",minHeight:"100vh",overflowX:"hidden"}}>
      <Styles/>
      <Grain/>

      {/* HERO */}
      <section style={{padding:"50px 20px 60px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-15%",right:"-10%",width:450,height:450,borderRadius:"50%",background:"var(--green)",filter:"blur(180px)",opacity:0.04}}/>
        
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            style={{display:"flex",alignItems:"center",gap:8,marginBottom:40}}>
            <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,var(--green),var(--green-d))",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <TrendingUp size={15} color="#fff"/>
            </div>
            <span style={{fontFamily:"var(--dsp)",fontSize:15,fontWeight:600}}>Tio FIIs</span>
          </motion.div>

          <div style={{display:"grid",gridTemplateColumns:"1fr",gap:40,alignItems:"center"}}>
            <div>
              <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
                <span style={{
                  display:"inline-block",padding:"5px 14px",borderRadius:100,fontSize:12,
                  background:"var(--glow)",color:"var(--green-l)",fontWeight:500,
                  fontFamily:"var(--bdy)",letterSpacing:"0.04em",marginBottom:16,
                  border:"1px solid var(--brd-g)"
                }}>
                  🔥 Novo · Atualizado para o cenário 2026
                </span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}
                transition={{delay:0.3,duration:0.7,type:"spring",stiffness:60,damping:18}}
                style={{fontFamily:"var(--dsp)",fontSize:"clamp(1.6rem,4.5vw,2.5rem)",fontWeight:700,lineHeight:1.2,marginBottom:16}}>
                O Guia Definitivo para Investir em FIIs no{" "}
                <span style={{color:"var(--green-l)"}}>Cenário de Guerra e Juros Altos</span>
              </motion.h1>

              <motion.p initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
                style={{fontFamily:"var(--bdy)",fontSize:"clamp(0.95rem,1.8vw,1.1rem)",color:"var(--txt2)",lineHeight:1.7,marginBottom:28,maxWidth:600}}>
                O framework de 5 critérios que o Mateus Lima usa para analisar qualquer Fundo Imobiliário em menos de 20 minutos — e que você pode aplicar hoje, mesmo que nunca tenha investido antes.
              </motion.p>

              <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.55}}
                style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
                {["Saiba exatamente quais FIIs comprar agora","Framework prático de análise em 5 critérios","Os 7 erros que destroem patrimônio (e como evitar)","Aplicável hoje — consumo rápido de 2-3 horas"].map((t,i) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                    <CheckCircle size={16} color="var(--green)" style={{flexShrink:0}}/>
                    <span style={{fontFamily:"var(--bdy)",fontSize:14,color:"var(--txt2)"}}>{t}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:0.65}}
                style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap",marginBottom:16}}>
                <div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                    <span style={{fontFamily:"var(--dsp)",fontSize:14,color:"var(--txt3)"}}>R$</span>
                    <span style={{fontFamily:"var(--dsp)",fontSize:48,fontWeight:700,color:"var(--green-l)",lineHeight:1}}>97</span>
                  </div>
                  <p style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)"}}>Pagamento único · Acesso vitalício</p>
                </div>
                <motion.a
                  href="https://chk.eduzz.com/tiofiis-guia-fiis?pf=1"
                  whileHover={{scale:1.03,boxShadow:"0 0 40px rgba(16,185,129,0.3)"}}
                  whileTap={{scale:0.97}}
                  style={{
                    display:"inline-flex",alignItems:"center",gap:10,
                    padding:"16px 36px",borderRadius:10,
                    background:"linear-gradient(135deg,var(--green),var(--green-d))",
                    color:"#fff",fontFamily:"var(--dsp)",fontSize:15,fontWeight:600,
                    textDecoration:"none",cursor:"pointer",
                    boxShadow:"0 0 25px rgba(16,185,129,0.2)"
                  }}>
                  QUERO O GUIA AGORA <ArrowRight size={16}/>
                </motion.a>
              </motion.div>

              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.75}}
                style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"var(--txt3)"}}>
                  <Shield size={13} color="var(--green)"/> Garantia 7 dias
                </span>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"var(--txt3)"}}>
                  <Lock size={13} color="var(--green)"/> Pagamento seguro
                </span>
                <span style={{display:"flex",alignItems:"center",gap:4,fontSize:12,color:"var(--txt3)"}}>
                  <Clock size={13} color="var(--green)"/> Acesso imediato
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY BAR */}
      <div style={{borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)",padding:"14px 20px",background:"rgba(16,185,129,0.02)"}}>
        <div style={{maxWidth:800,margin:"0 auto",display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
          {[
            {v:"109K",l:"YouTube"},
            {v:"205K",l:"Instagram"},
            {v:"R$600M+",l:"sob consultoria"},
            {v:"9.000+",l:"alunos"},
          ].map((s,i) => (
            <div key={i} style={{textAlign:"center"}}>
              <span style={{fontFamily:"var(--dsp)",fontSize:16,fontWeight:700,color:"var(--green-l)"}}>{s.v}</span>
              <span style={{fontFamily:"var(--bdy)",fontSize:11,color:"var(--txt3)",marginLeft:5}}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* O QUE VOCÊ VAI APRENDER */}
      <section style={{padding:"70px 20px",maxWidth:900,margin:"0 auto"}}>
        <Reveal>
          <h2 style={{fontFamily:"var(--dsp)",fontSize:"clamp(1.3rem,3vw,1.8rem)",fontWeight:700,textAlign:"center",marginBottom:40}}>
            O que você vai aprender
          </h2>
        </Reveal>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16}}>
          {BENEFITS.map((b,i) => (
            <Reveal key={i} delay={i*0.1}>
              <motion.div whileHover={{y:-4,borderColor:"var(--brd-g)"}}
                style={{padding:"24px 20px",borderRadius:14,background:"var(--card)",border:"1px solid var(--brd)",height:"100%"}}>
                <div style={{width:42,height:42,borderRadius:10,background:"var(--glow)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,color:"var(--green-l)"}}>
                  {b.icon}
                </div>
                <h3 style={{fontFamily:"var(--dsp)",fontSize:15,fontWeight:600,marginBottom:6}}>{b.title}</h3>
                <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.7}}>{b.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{padding:"60px 20px",background:"var(--bg2)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"var(--dsp)",fontSize:"clamp(1.2rem,2.5vw,1.6rem)",fontWeight:700,textAlign:"center",marginBottom:36}}>
              O que estão dizendo
            </h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:14}}>
            {PROOF.map((p,i) => (
              <Reveal key={i} delay={i*0.1}>
                <div style={{padding:"20px 18px",borderRadius:12,background:"var(--card)",border:"1px solid var(--brd)"}}>
                  <div style={{display:"flex",gap:3,marginBottom:10}}>
                    {[...Array(5)].map((_,j) => <Star key={j} size={12} fill="var(--green)" color="var(--green)"/>)}
                  </div>
                  <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.7,marginBottom:14,fontStyle:"italic"}}>
                    "{p.text}"
                  </p>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontFamily:"var(--dsp)",fontSize:13,fontWeight:600}}>{p.name}</span>
                    <span style={{fontSize:11,color:"var(--txt3)",background:"var(--glow)",padding:"2px 8px",borderRadius:100}}>{p.tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT SECTION WITH ORDER BUMP */}
      <section id="comprar" style={{padding:"70px 20px",maxWidth:480,margin:"0 auto"}}>
        <Reveal>
          <div style={{
            background:"var(--card)",border:"2px solid var(--brd-g)",borderRadius:18,
            padding:"32px 24px",boxShadow:"0 0 60px rgba(16,185,129,0.08),0 20px 40px rgba(0,0,0,0.3)"
          }}>
            <div style={{textAlign:"center",marginBottom:24}}>
              <p style={{fontFamily:"var(--dsp)",fontSize:13,color:"var(--green-l)",fontWeight:500,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>
                Oferta especial
              </p>
              <h3 style={{fontFamily:"var(--dsp)",fontSize:20,fontWeight:700,marginBottom:4}}>
                Guia Definitivo de FIIs 2026
              </h3>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:4,marginBottom:4}}>
                <span style={{fontFamily:"var(--dsp)",fontSize:14,color:"var(--txt3)",textDecoration:"line-through"}}>R$197</span>
                <span style={{fontFamily:"var(--dsp)",fontSize:13,color:"var(--txt3)"}}>por apenas</span>
              </div>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:3}}>
                <span style={{fontFamily:"var(--dsp)",fontSize:14,color:"var(--txt3)"}}>R$</span>
                <span style={{fontFamily:"var(--dsp)",fontSize:52,fontWeight:700,color:"var(--green-l)",lineHeight:1}}>97</span>
              </div>
              <p style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)",marginTop:4}}>
                Pagamento único · Acesso vitalício
              </p>
            </div>

            <div style={{marginBottom:20}}>
              {["Framework de 5 critérios de análise","Lista de FIIs recomendados para 2026","Os 7 erros fatais (e como evitar)","Modelo de carteira para iniciantes","Acesso vitalício + atualizações"].map((item,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",fontSize:13,color:"var(--txt2)"}}>
                  <CheckCircle size={14} color="var(--green)" style={{flexShrink:0}}/>
                  {item}
                </div>
              ))}
            </div>

            {/* ORDER BUMP */}
            <motion.div
              onClick={() => setOrderBump(!orderBump)}
              whileHover={{borderColor:"var(--green)"}}
              style={{
                padding:"14px 16px",borderRadius:10,marginBottom:20,cursor:"pointer",
                background: orderBump ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                border: orderBump ? "2px solid var(--green)" : "2px dashed rgba(148,163,184,0.15)",
                transition:"all 0.2s ease"
              }}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{
                  width:20,height:20,borderRadius:4,border:"2px solid",flexShrink:0,marginTop:2,
                  borderColor: orderBump ? "var(--green)" : "var(--txt3)",
                  background: orderBump ? "var(--green)" : "transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  transition:"all 0.2s ease"
                }}>
                  {orderBump && <CheckCircle size={14} color="#fff"/>}
                </div>
                <div>
                  <p style={{fontFamily:"var(--dsp)",fontSize:13,fontWeight:600,color: orderBump ? "var(--green-l)" : "var(--txt)",marginBottom:3}}>
                    🔥 ADICIONAR: Planilha de Precificação Automática — <span style={{color:"var(--green-l)"}}>+R$47</span>
                  </p>
                  <p style={{fontFamily:"var(--bdy)",fontSize:11,color:"var(--txt3)",lineHeight:1.5}}>
                    A mesma planilha que o Mateus usa nos vídeos do YouTube. Precifica automaticamente qualquer FII e te diz se está caro ou barato.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Total */}
            <div style={{textAlign:"center",marginBottom:16,padding:"10px 0",borderTop:"1px solid var(--brd)",borderBottom:"1px solid var(--brd)"}}>
              <p style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)",marginBottom:2}}>Total hoje:</p>
              <p style={{fontFamily:"var(--dsp)",fontSize:28,fontWeight:700,color:"var(--green-l)"}}>
                R${orderBump ? "144" : "97"}
              </p>
            </div>

            {/* CTA */}
            <motion.a
              href={`https://chk.eduzz.com/tiofiis-guia-fiis?pf=1${orderBump?"&bump=1":""}`}
              whileHover={{scale:1.02,boxShadow:"0 0 40px rgba(16,185,129,0.3)"}}
              whileTap={{scale:0.97}}
              style={{
                display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                width:"100%",padding:"16px",borderRadius:10,
                background:"linear-gradient(135deg,var(--green),var(--green-d))",
                color:"#fff",fontFamily:"var(--dsp)",fontSize:15,fontWeight:600,
                textDecoration:"none",cursor:"pointer",
                boxShadow:"0 0 25px rgba(16,185,129,0.2)"
              }}>
              GARANTIR MEU ACESSO <ArrowRight size={16}/>
            </motion.a>

            <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:14,flexWrap:"wrap"}}>
              <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--txt3)"}}>
                <Shield size={12} color="var(--green)"/> Garantia 7 dias
              </span>
              <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"var(--txt3)"}}>
                <Lock size={12} color="var(--green)"/> Pagamento seguro
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* QUEM É MATEUS */}
      <section style={{padding:"60px 20px",maxWidth:700,margin:"0 auto"}}>
        <Reveal>
          <div style={{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{width:80,height:80,borderRadius:16,background:"var(--card)",border:"1px solid var(--brd-g)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Users size={32} color="var(--green)"/>
            </div>
            <div style={{flex:1,minWidth:250}}>
              <h3 style={{fontFamily:"var(--dsp)",fontSize:17,fontWeight:700,marginBottom:6}}>Quem é Mateus Lima?</h3>
              <p style={{fontFamily:"var(--bdy)",fontSize:14,color:"var(--txt2)",lineHeight:1.7}}>
                Investidor há mais de 10 anos, criador do canal Tio FIIs (109K inscritos, 1.400+ vídeos), palestrante convidado do FII Summit e fundador da Witz Wealth — consultoria que gerencia mais de R$600 milhões em patrimônio de clientes reais.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section style={{padding:"50px 20px 70px",maxWidth:600,margin:"0 auto"}}>
        <Reveal>
          <h2 style={{fontFamily:"var(--dsp)",fontSize:"clamp(1.2rem,2.5vw,1.5rem)",fontWeight:700,textAlign:"center",marginBottom:30}}>
            Perguntas frequentes
          </h2>
        </Reveal>
        {faq.map((item,i) => (
          <Reveal key={i} delay={i*0.06}>
            <div style={{borderBottom:"1px solid var(--brd)"}}>
              <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                style={{width:"100%",padding:"16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",
                  background:"none",border:"none",cursor:"pointer",fontFamily:"var(--dsp)",fontSize:14,fontWeight:600,
                  color:openFaq===i?"var(--green-l)":"var(--txt)",textAlign:"left"}}>
                {item.q}
                <motion.div animate={{rotate:openFaq===i?180:0}} transition={{duration:0.25}}>
                  <ChevronDown size={16} color="var(--txt3)"/>
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}}>
                    <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt2)",lineHeight:1.7,paddingBottom:16}}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{padding:"50px 20px 70px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",bottom:"-30%",left:"50%",transform:"translateX(-50%)",width:500,height:300,borderRadius:"50%",background:"var(--green)",filter:"blur(180px)",opacity:0.04}}/>
        <Reveal>
          <h2 style={{fontFamily:"var(--dsp)",fontSize:"clamp(1.3rem,3vw,1.8rem)",fontWeight:700,maxWidth:500,margin:"0 auto 12px",lineHeight:1.3,position:"relative",zIndex:2}}>
            Comece a investir com clareza.
            <br/><span style={{color:"var(--green-l)"}}>Hoje.</span>
          </h2>
          <p style={{fontFamily:"var(--bdy)",fontSize:14,color:"var(--txt2)",maxWidth:400,margin:"0 auto 24px",position:"relative",zIndex:2}}>
            Por menos do que uma cota de FII, você tem o framework completo para investir com segurança.
          </p>
          <motion.a href="#comprar"
            whileHover={{scale:1.03,boxShadow:"0 0 40px rgba(16,185,129,0.3)"}}
            whileTap={{scale:0.97}}
            style={{
              display:"inline-flex",alignItems:"center",gap:8,
              padding:"16px 40px",borderRadius:10,
              background:"linear-gradient(135deg,var(--green),var(--green-d))",
              color:"#fff",fontFamily:"var(--dsp)",fontSize:15,fontWeight:600,
              textDecoration:"none",cursor:"pointer",position:"relative",zIndex:2
            }}>
            QUERO O GUIA POR R$97 <ArrowRight size={16}/>
          </motion.a>
          <p style={{fontSize:12,color:"var(--txt3)",marginTop:12,position:"relative",zIndex:2}}>
            Garantia 7 dias · Acesso imediato · Pagamento único
          </p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{borderTop:"1px solid var(--brd)",padding:"20px",textAlign:"center"}}>
        <p style={{fontFamily:"var(--bdy)",fontSize:11,color:"var(--txt3)",lineHeight:1.6}}>
          Lb Educação e Consultoria LTDA · CNPJ 44.997.387/0001-78
          <br/>Este produto não constitui recomendação de investimento.
        </p>
      </footer>
    </div>
  );
};

export default TioFiisVSL2;