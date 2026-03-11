import { useEffect } from "react"
import { Link } from "react-router-dom"

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target) }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".reveal").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const CONTENTS = [
  {
    jp: "あ", tag: "Sistema de escritura", title: "Hiragana",
    desc: "El silabario nativo del japonés. 46 caracteres que cubren todos los sonidos del idioma. El primer paso antes de cualquier otra cosa.",
    to: "/hiragana", cta: "Estudiar hiragana",
  },
  {
    jp: "ア", tag: "Sistema de escritura", title: "Katakana",
    desc: "El silabario para palabras extranjeras, nombres propios y onomatopeyas. Mismos sonidos que el hiragana, forma diferente.",
    to: "/katakana", cta: "Estudiar katakana",
  },
  {
    jp: "漢", tag: "Kanji N5", title: "Los 103 Kanjis del N5",
    desc: "Cada kanji con su lógica original y su historia. Entender por qué tienen esa forma es la mejor manera de no olvidarlos.",
    to: "/kanjis", cta: "Estudiar kanjis",
  },
  {
    jp: "文", tag: "Gramática", title: "Gramática N5",
    desc: "Las estructuras fundamentales del japonés básico. Partículas, conjugaciones, formas verbales y construcciones esenciales.",
    to: "/gramatica", cta: "Ver gramática",
  },
  {
    jp: "語", tag: "Vocabulario", title: "Vocabulario N5",
    desc: "Más de 300 palabras esenciales organizadas por temas. Con romaji, lectura y ejemplos reales para cada una.",
    to: "/vocabulario", cta: "Ver vocabulario",
  },
  {
    jp: "本", tag: "Materiales", title: "Recursos",
    desc: "Apuntes en PDF, herramientas de estudio, manga y juegos para aprender japonés de verdad.",
    to: "/recursos", cta: "Ver recursos",
  },
]

const JLPT_INFO = [
  ["Duración total", "105 min"],
  ["Puntuación máxima", "180 puntos"],
  ["Mínimo para aprobar", "80 / 180"],
  ["Kanjis requeridos", "~100 kanjis"],
  ["Vocabulario requerido", "~800 palabras"],
  ["Convocatorias", "Julio y diciembre"],
]

export default function HomePage() {
  useReveal()
  return (
    <>
      <style>{`
        @keyframes fadeUp  { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:0.22; } }
        .h-ey  { animation: fadeUp 1s ease forwards 0s;   opacity:0; }
        .h-jp  { animation: fadeUp 1s ease forwards .2s;  opacity:0; }
        .h-h1  { animation: fadeUp 1s ease forwards .4s;  opacity:0; }
        .h-sub { animation: fadeUp 1s ease forwards .6s;  opacity:0; }
        .h-cta { animation: fadeUp 1s ease forwards .8s;  opacity:0; }
        .h-deco{ animation: fadeIn 1.5s ease forwards 1.2s; opacity:0; }

        .tc { background:var(--white); padding:2rem 2rem 1.8rem; display:flex; flex-direction:column; position:relative; overflow:hidden; transition:background .2s; }
        .tc:hover { background:var(--paper-dark); }
        .tc-deco { position:absolute; right:-.3rem; top:50%; transform:translateY(-50%); font-family:var(--jp); font-size:6rem; font-weight:700; color:var(--paper-dark); line-height:1; pointer-events:none; user-select:none; transition:color .2s; }
        .tc:hover .tc-deco { color:rgba(22,17,10,.07); }
        .tc-tag { font-family:var(--mono); font-size:.66rem; letter-spacing:.15em; text-transform:uppercase; color:var(--red); margin-bottom:.6rem; }
        .tc-title { font-family:var(--serif); font-size:1.5rem; font-weight:600; margin-bottom:.5rem; }
        .tc-desc { font-size:.88rem; color:var(--muted); font-style:italic; flex:1; margin-bottom:1.4rem; line-height:1.6; }
        .tc-link { display:inline-flex; align-items:center; gap:.4rem; font-family:var(--mono); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:var(--ink); border-bottom:1px solid var(--border); padding-bottom:.15rem; width:fit-content; transition:border-color .2s; text-decoration:none; }
        .tc-link:hover { border-color:var(--ink); }
        .tc-arr { display:inline-block; transition:transform .2s; }
        .tc:hover .tc-arr { transform:translateX(4px); }

        .jlpt-row { padding:1rem 1.4rem; display:flex; justify-content:space-between; align-items:baseline; border-bottom:1px solid var(--border); }
        .jlpt-row:last-child { border-bottom:none; }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", padding:"8rem 3rem 4rem", maxWidth:"1200px", margin:"0 auto", position:"relative" }}>
        <p className="h-ey" style={{ fontFamily:"var(--mono)", fontSize:".76rem", letterSpacing:".2em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"1rem" }}>
          JLPT · Nivel N5 · Guía de estudio
        </p>
        <div className="h-jp" style={{ fontFamily:"var(--jp)", fontSize:"clamp(4rem,12vw,9rem)", fontWeight:300, letterSpacing:".1em", lineHeight:1, marginBottom:".4rem" }}>
          <span style={{ color:"var(--red)" }}>日</span>本語
        </div>
        <h1 className="h-h1" style={{ fontFamily:"var(--serif)", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:600, lineHeight:1.15, maxWidth:"700px", marginBottom:"1.4rem" }}>
          Todo lo que necesitas para aprobar el N5
        </h1>
        <p className="h-sub" style={{ fontSize:"1.05rem", color:"var(--muted)", maxWidth:"520px", fontStyle:"italic", marginBottom:"2.5rem" }}>
          Escritura, gramática, kanjis y vocabulario. Sin aplicaciones, sin registro.
        </p>
        <div className="h-cta" style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
          <Link to="/hiragana" className="btn btn-primary">Empezar por el principio →</Link>
          <Link to="/kanjis"   className="btn btn-outline">Ver los kanjis</Link>
        </div>
        <div className="h-deco" style={{ position:"absolute", right:"3rem", top:"50%", transform:"translateY(-50%)", writingMode:"vertical-rl", fontFamily:"var(--jp)", fontSize:".73rem", color:"var(--border)", letterSpacing:".4em", userSelect:"none" }}>
          にほんご　・　N5　・　がんばって
        </div>
      </section>

      {/* CONTENIDOS */}
      <section className="page-section" style={{ borderTop:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Contenidos</p>
          <h2 className="section-title">¿Qué cubre esta guía?</h2>
          <div className="divider" />
          <p className="section-sub">Todos los bloques del JLPT N5, cada uno en su propia sección.</p>
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1.5px", background:"var(--border)", border:"1px solid var(--border)" }}>
          {CONTENTS.map(c => (
            <div key={c.to} className="tc">
              <span className="tc-deco">{c.jp}</span>
              <span className="tc-tag">{c.tag}</span>
              <h3 className="tc-title">{c.title}</h3>
              <p className="tc-desc">{c.desc}</p>
              <Link to={c.to} className="tc-link">{c.cta} <span className="tc-arr">→</span></Link>
            </div>
          ))}
        </div>
      </section>

      {/* JLPT N5 INFO */}
      <section className="page-section" style={{ borderTop:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">El examen</p>
          <h2 className="section-title">Formato del JLPT N5</h2>
          <div className="divider" />
          <p className="section-sub">Lo que necesitas saber antes de presentarte.</p>
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }}>
          <div style={{ border:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>
            {JLPT_INFO.map(([label, val]) => (
              <div key={label} className="jlpt-row">
                <span style={{ fontSize:".84rem", color:"var(--muted)", fontStyle:"italic" }}>{label}</span>
                <span style={{ fontFamily:"var(--mono)", fontSize:".8rem" }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {[
              ["一", "Domina hiragana y katakana antes de estudiar kanjis o gramática. Sin los silabarios no puedes leer ningún material."],
              ["二", "Los kanjis se memorizan mejor en contexto. Aprende cada uno dentro de al menos una palabra real."],
              ["三", "La escucha requiere práctica específica. Escucha contenido japonés real aunque no entiendas todo."],
              ["四", "Haz un examen de práctica en condiciones reales dos semanas antes. Identificar los puntos débiles con tiempo marca la diferencia."],
            ].map(([n, tip]) => (
              <div key={n} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                <span style={{ fontFamily:"var(--jp)", fontSize:"1.8rem", fontWeight:300, color:"var(--paper-dark)", lineHeight:1, flexShrink:0, width:"2.5rem", textAlign:"right" }}>{n}</span>
                <p style={{ fontSize:".88rem", color:"var(--ink-soft)", paddingTop:".2rem" }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
