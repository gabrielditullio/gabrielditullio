import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Lock, Shield, CheckCircle, X, TrendingUp, Clock } from "lucide-react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
    .tiofiis-vsl {
      --bg: #060B14;
      --bg2: #0C1220;
      --card: #111827;
      --green: #10B981;
      --green-l: #34D399;
      --green-d: #059669;
      --glow: rgba(16,185,129,0.15);
      --txt: #F1F5F9;
      --txt2: #94A3B8;
      --txt3: #64748B;
      --brd: rgba(148,163,184,0.08);
      --brd-g: rgba(16,185,129,0.2);
      --dsp: 'Space Grotesk', sans-serif;
      --bdy: 'DM Sans', sans-serif;
    }
    .tiofiis-vsl * { margin:0; padding:0; box-sizing:border-box; }
    .tiofiis-vsl ::selection { background:#10B981; color:#060B14; }
    @keyframes tiofiis-pulse { 0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.2)} 50%{box-shadow:0 0 50px rgba(16,185,129,0.5)} }
    @keyframes tiofiis-scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}
  `}</style>
);

const Grain = () => (
  <svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999,opacity:0.03}}>
    <filter id="g-vsl"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#g-vsl)"/>
  </svg>
);

const TioFiisVSL = () => {
  const [pageOpen, setPageOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!pageOpen) return;
    const t = setTimeout(() => setShowPopup(true), 90000);
    return () => clearTimeout(t);
  }, [pageOpen]);

  return (
    <div className="tiofiis-vsl" style={{ fontFamily:"var(--bdy)", background:"var(--bg)", color:"var(--txt)", minHeight:"100vh", overflowX:"hidden" }}>
      <Styles />
      <Grain />

      {/* POPUP DESCONTO */}
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}
            onClick={()=>setShowPopup(false)}>
            <motion.div initial={{scale:0.85,y:30}} animate={{scale:1,y:0}} exit={{scale:0.9,opacity:0}}
              transition={{type:"spring",stiffness:200,damping:20}} onClick={(e: React.MouseEvent)=>e.stopPropagation()}
              style={{background:"var(--card)",border:"1px solid var(--brd-g)",borderRadius:20,padding:"40px 32px",maxWidth:400,width:"100%",textAlign:"center",position:"relative",boxShadow:"0 0 80px rgba(16,185,129,0.12)"}}>
              <button onClick={()=>setShowPopup(false)} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:"var(--txt3)",cursor:"pointer"}}><X size={18}/></button>
              <p style={{fontFamily:"var(--dsp)",fontSize:20,fontWeight:700,marginBottom:6}}>O preço é um problema?</p>
              <p style={{color:"var(--txt2)",fontSize:14,marginBottom:24}}>Acesse agora com <span style={{color:"var(--green-l)",fontWeight:600}}>20% de desconto</span></p>
              <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:12,marginBottom:20}}>
                <span style={{fontFamily:"var(--dsp)",fontSize:20,color:"var(--txt3)",textDecoration:"line-through"}}>R$297</span>
                <span style={{fontFamily:"var(--dsp)",fontSize:42,fontWeight:700,color:"var(--green-l)"}}>R$237</span>
              </div>
              <motion.a href="https://chk.eduzz.com/1814326?coupon=DESC20" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                style={{display:"block",padding:"16px",borderRadius:10,background:"linear-gradient(135deg,var(--green),var(--green-d))",color:"#fff",fontFamily:"var(--dsp)",fontSize:15,fontWeight:600,textDecoration:"none",cursor:"pointer"}}>
                QUERO O DESCONTO
              </motion.a>
              <p style={{fontSize:11,color:"var(--txt3)",marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                <Lock size={11}/> Pagamento seguro · Garantia 7 dias
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PÁGINA FECHADA: SÓ VSL + HEADLINE */}
      <section style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"40px 20px", position:"relative", overflow:"hidden"
      }}>
        <div style={{position:"absolute",top:"-20%",left:"50%",transform:"translateX(-50%)",width:600,height:600,borderRadius:"50%",background:"var(--green)",filter:"blur(200px)",opacity:0.04}} />

        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          style={{display:"flex",alignItems:"center",gap:8,marginBottom:32}}>
          <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,var(--green),var(--green-d))",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <TrendingUp size={15} color="#fff"/>
          </div>
          <span style={{fontFamily:"var(--dsp)",fontSize:16,fontWeight:600}}>Tio FIIs</span>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
          transition={{delay:0.4,duration:0.8,type:"spring",stiffness:60,damping:18}}
          style={{
            fontFamily:"var(--dsp)", fontWeight:700,
            fontSize:"clamp(1.3rem, 4vw, 2.2rem)",
            textAlign:"center", maxWidth:700, lineHeight:1.3,
            marginBottom:32
          }}>
          O sistema que analisa sua carteira de FIIs em{" "}
          <span style={{color:"var(--green-l)"}}>30 segundos</span>{" "}
          e te diz exatamente o que fazer
        </motion.h1>

        <motion.div initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}
          transition={{delay:0.6,duration:0.8,type:"spring",stiffness:60,damping:20}}
          style={{width:"100%",maxWidth:800,position:"relative"}}>
          
          <div style={{
            width:"100%", aspectRatio:"16/9", borderRadius:10, overflow:"hidden",
            background:"#0a0f1a", border:"1px solid var(--brd-g)",
            boxShadow:"0 0 60px rgba(16,185,129,0.06), 0 20px 50px rgba(0,0,0,0.5)",
            position:"relative", cursor:"pointer"
          }}>
            <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(16,185,129,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.02) 1px,transparent 1px)",backgroundSize:"50px 50px",zIndex:1}}/>
            <div style={{position:"absolute",inset:0,overflow:"hidden",zIndex:2,pointerEvents:"none"}}>
              <div style={{position:"absolute",left:0,width:"100%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(16,185,129,0.2),transparent)",animation:"tiofiis-scan 5s linear infinite"}}/>
            </div>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:3}}>
              <div style={{
                width:72,height:72,borderRadius:"50%",
                background:"linear-gradient(135deg,var(--green),var(--green-d))",
                display:"flex",alignItems:"center",justifyContent:"center",
                animation:"tiofiis-pulse 3s ease-in-out infinite"
              }}>
                <Play size={28} fill="#fff" color="#fff" style={{marginLeft:3}}/>
              </div>
              <p style={{fontFamily:"var(--bdy)",color:"var(--txt3)",fontSize:12,marginTop:14,letterSpacing:"0.08em",textTransform:"uppercase"}}>
                Clique para assistir
              </p>
            </div>
            <div style={{position:"absolute",top:12,right:12,zIndex:3}}>
              <span style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"var(--txt3)",padding:"3px 10px",borderRadius:100,fontSize:10,fontFamily:"var(--bdy)"}}>
                Mateus Lima · Tio FIIs
              </span>
            </div>
          </div>
        </motion.div>

        {!pageOpen && showHint && (
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            style={{marginTop:32,textAlign:"center"}}>
            <motion.button
              onClick={() => setPageOpen(true)}
              whileHover={{scale:1.02}} whileTap={{scale:0.98}}
              style={{
                padding:"10px 24px",borderRadius:8,
                background:"rgba(16,185,129,0.1)",border:"1px solid var(--brd-g)",
                color:"var(--green-l)",fontFamily:"var(--bdy)",fontSize:12,
                cursor:"pointer",letterSpacing:"0.03em"
              }}>
              ⚡ Simular momento do pitch (remover em produção)
            </motion.button>
            <p style={{fontSize:11,color:"var(--txt3)",marginTop:8,maxWidth:400}}>
              Em produção: a página abre automaticamente quando o vídeo chega no momento do preço
            </p>
          </motion.div>
        )}
      </section>

      {/* PÁGINA ABERTA — APARECE APÓS O PITCH */}
      <AnimatePresence>
        {pageOpen && (
          <motion.div
            initial={{opacity:0, y:60}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.8, type:"spring", stiffness:60, damping:20}}
          >
            <div style={{height:1,background:"linear-gradient(90deg,transparent,var(--brd-g),transparent)",maxWidth:600,margin:"0 auto"}}/>

            <section style={{padding:"60px 20px 40px",textAlign:"center",maxWidth:520,margin:"0 auto"}}>
              
              <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt3)",marginBottom:4}}>
                Consultoria Witz Wealth: <span style={{textDecoration:"line-through"}}>R$5.000+/ano</span>
              </p>
              <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt3)",marginBottom:20}}>
                Casas de análise: <span style={{textDecoration:"line-through"}}>R$2.400/ano</span>
              </p>

              <div style={{display:"flex",alignItems:"baseline",justifyContent:"center",gap:4,marginBottom:4}}>
                <span style={{fontFamily:"var(--dsp)",fontSize:16,color:"var(--txt3)"}}>R$</span>
                <span style={{fontFamily:"var(--dsp)",fontSize:64,fontWeight:700,color:"var(--green-l)",lineHeight:1}}>297</span>
              </div>
              <p style={{fontFamily:"var(--bdy)",fontSize:13,color:"var(--txt3)",marginBottom:28}}>
                Pagamento único · ou 12x de R$29,22
              </p>

              <motion.a
                href="https://chk.eduzz.com/1814326?pf=1"
                whileHover={{scale:1.03,boxShadow:"0 0 50px rgba(16,185,129,0.3)"}}
                whileTap={{scale:0.97}}
                style={{
                  display:"inline-flex",alignItems:"center",gap:10,
                  padding:"18px 48px",borderRadius:12,border:"none",
                  background:"linear-gradient(135deg,var(--green),var(--green-d))",
                  color:"#fff",fontFamily:"var(--dsp)",fontSize:16,fontWeight:600,
                  textDecoration:"none",cursor:"pointer",
                  boxShadow:"0 0 30px rgba(16,185,129,0.25)"
                }}>
                QUERO ACESSAR AGORA <ArrowRight size={18}/>
              </motion.a>

              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,marginTop:20}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Shield size={14} color="var(--green)"/>
                  <span style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)"}}>
                    Garantia incondicional de 7 dias
                  </span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <Lock size={14} color="var(--green)"/>
                  <span style={{fontFamily:"var(--bdy)",fontSize:12,color:"var(--txt3)"}}>
                    Pagamento 100% seguro via Eduzz
                  </span>
                </div>
              </div>

              <div style={{marginTop:32,textAlign:"left",background:"var(--card)",borderRadius:14,padding:"24px 20px",border:"1px solid var(--brd)"}}>
                <p style={{fontFamily:"var(--dsp)",fontSize:13,fontWeight:600,color:"var(--txt2)",marginBottom:14,textTransform:"uppercase",letterSpacing:"0.08em"}}>
                  O que você recebe:
                </p>
                {[
                  "Analisador de Carteira com IA",
                  "Direcionador de Aporte Inteligente",
                  "Precificador em Tempo Real",
                  "Carteira Recomendada CNPI",
                  "Tutor IA — Perguntas e Respostas"
                ].map((item,i) => (
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom: i < 4 ? "1px solid var(--brd)" : "none"}}>
                    <CheckCircle size={15} color="var(--green)" style={{flexShrink:0}}/>
                    <span style={{fontFamily:"var(--bdy)",fontSize:14,color:"var(--txt2)"}}>{item}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="https://chk.eduzz.com/1814326?pf=1"
                whileHover={{scale:1.03}}
                whileTap={{scale:0.97}}
                style={{
                  display:"inline-flex",alignItems:"center",gap:8,
                  padding:"14px 36px",borderRadius:10,marginTop:24,
                  background:"linear-gradient(135deg,var(--green),var(--green-d))",
                  color:"#fff",fontFamily:"var(--dsp)",fontSize:14,fontWeight:600,
                  textDecoration:"none",cursor:"pointer"
                }}>
                GARANTIR MINHA VAGA <ArrowRight size={16}/>
              </motion.a>
            </section>

            <footer style={{borderTop:"1px solid var(--brd)",padding:"24px 20px",textAlign:"center"}}>
              <p style={{fontFamily:"var(--bdy)",fontSize:11,color:"var(--txt3)",maxWidth:500,margin:"0 auto",lineHeight:1.6}}>
                Lb Educação e Consultoria LTDA · CNPJ 44.997.387/0001-78
                <br/>Este produto não constitui recomendação de investimento.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TioFiisVSL;