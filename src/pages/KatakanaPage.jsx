import { useEffect, useState } from "react"
import KanaStroke from "../components/KanaStroke.jsx"

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target) } }),
      { threshold: 0.06 }
    )
    document.querySelectorAll(".reveal").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const BASIC = [
  ["ア","a","Un trazo diagonal hacia abajo y otro que lo cruza."],
  ["イ","i","Dos trazos: diagonal corto y vertical más largo."],
  ["ウ","u","Una 'V' con una pequeña línea encima."],
  ["エ","e","Tres líneas: dos horizontales y una vertical central."],
  ["オ","o","Como エ pero con el trazo central desplazado y un gancho."],
  ["カ","ka","Dos trazos: el primero diagonal, el segundo vertical con una pequeña lengüeta."],
  ["キ","ki","Tres líneas horizontales cruzadas por una vertical."],
  ["ク","ku","Dos trazos angulosos. Parece un pico de pájaro."],
  ["ケ","ke","Tres trazos angulosos. El último sale hacia la derecha."],
  ["コ","ko","Dos líneas perpendiculares que forman una 'C' cuadrada."],
  ["サ","sa","Tres trazos: dos horizontales cortos y uno largo diagonal."],
  ["シ","shi","Tres trazos cortos. Muy parecido a ツ, cuidado con no confundirlos."],
  ["ス","su","Dos trazos. Parece una 'Z' curvada."],
  ["セ","se","Tres trazos. Parecido a su equivalente hiragana せ pero más angular."],
  ["ソ","so","Dos trazos. Muy parecido a ン. La diferencia está en la dirección."],
  ["タ","ta","Tres trazos. El último cruza los anteriores con un gancho."],
  ["チ","chi","Tres trazos angulosos con una curva al final."],
  ["ツ","tsu","Tres trazos cortos paralelos y uno curvo. No confundir con シ."],
  ["テ","te","Tres trazos: como una cruz con la horizontal de abajo extendida."],
  ["ト","to","Dos trazos: vertical y pequeña lengüeta hacia la derecha."],
  ["ナ","na","Dos trazos: horizontal y vertical que lo cruza."],
  ["ニ","ni","Dos líneas horizontales paralelas."],
  ["ヌ","nu","Dos trazos. El segundo hace un bucle y acaba en diagonal."],
  ["ネ","ne","Cuatro trazos. La cruz del centro es su rasgo más reconocible."],
  ["ノ","no","Un solo trazo diagonal. El más simple del katakana."],
  ["ハ","ha","Dos trazos diagonales que se alejan entre sí, como las piernas de 'A'."],
  ["ヒ","hi","Dos trazos: vertical y horizontal que sale de su mitad."],
  ["フ","fu","Un solo trazo con forma de gancho cuadrado."],
  ["ヘ","he","Un solo trazo. Idéntico al hiragana へ."],
  ["ホ","ho","Cuatro trazos. Como una cruz con dos patas diagonales abajo."],
  ["マ","ma","Dos trazos: horizontal y diagonal que baja desde su extremo derecho."],
  ["ミ","mi","Tres trazos horizontales con el último más largo."],
  ["ム","mu","Dos trazos. El ángulo superior y la curva que baja."],
  ["メ","me","Dos trazos que se cruzan en diagonal."],
  ["モ","mo","Tres trazos: como una 'F' con una tercera horizontal abajo."],
  ["ヤ","ya","Tres trazos. Angular y sencillo."],
  ["ユ","yu","Dos trazos que forman una figura parecida a una 'U' cuadrada."],
  ["ヨ","yo","Tres trazos: como una 'E' al revés."],
  ["ラ","ra","Dos trazos: horizontal y diagonal que baja hacia la izquierda."],
  ["リ","ri","Dos trazos verticales, el derecho con un pequeño gancho."],
  ["ル","ru","Dos trazos. El segundo hace un ángulo y termina en diagonal."],
  ["レ","re","Un solo trazo con gancho hacia la derecha."],
  ["ロ","ro","Tres trazos que forman un rectángulo abierto por abajo."],
  ["ワ","wa","Dos trazos. El segundo baja verticalmente desde la horizontal."],
  ["ヲ","wo","Tres trazos. Solo se usa como partícula."],
  ["ン","n","Dos trazos. Muy parecido a ソ, pero distinto en dirección y ángulo."],
]

const ROWS = [
  { label:"— a", chars:["ア","イ","ウ","エ","オ"] },
  { label:"k —", chars:["カ","キ","ク","ケ","コ"] },
  { label:"s —", chars:["サ","シ","ス","セ","ソ"] },
  { label:"t —", chars:["タ","チ","ツ","テ","ト"] },
  { label:"n —", chars:["ナ","ニ","ヌ","ネ","ノ"] },
  { label:"h —", chars:["ハ","ヒ","フ","ヘ","ホ"] },
  { label:"m —", chars:["マ","ミ","ム","メ","モ"] },
  { label:"y —", chars:["ヤ", null,"ユ", null,"ヨ"] },
  { label:"r —", chars:["ラ","リ","ル","レ","ロ"] },
  { label:"w —", chars:["ワ", null, null, null,"ヲ"] },
  { label:"n",   chars:["ン", null, null, null, null] },
]
const COL_HEADS = ["a","i","u","e","o"]

const ROMAJI = {
  "ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o",
  "カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko",
  "サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so",
  "タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to",
  "ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no",
  "ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho",
  "マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo",
  "ヤ":"ya","ユ":"yu","ヨ":"yo",
  "ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro",
  "ワ":"wa","ヲ":"wo","ン":"n",
}

const CONFUSABLES = [
  { pair:["シ","ツ"], note:"シ (shi) tiene los tres trazos más horizontales y el trazo largo sube. ツ (tsu) los tiene más verticales y el trazo largo baja." },
  { pair:["ソ","ン"], note:"ソ (so) tiene el trazo corto más horizontal. ン (n) lo tiene más vertical, casi como un punto." },
  { pair:["ア","マ"], note:"ア (a) tiene el primer trazo diagonal hacia arriba. マ (ma) tiene el primer trazo horizontal." },
  { pair:["ウ","ワ"], note:"ウ (u) tiene una V con línea. ワ (wa) tiene el trazo vertical que baja desde el lado derecho del horizontal." },
]

export default function KatakanaPage() {
  useReveal()
  const [selected, setSelected] = useState(null)
  const info = selected ? BASIC.find(b => b[0] === selected) : null

  return (
    <>
      <style>{`
        .kana-cell { background:var(--white); border:1px solid var(--border); padding:.6rem .3rem; text-align:center; cursor:pointer; transition:background .15s; }
        .kana-cell:hover, .kana-cell.sel { background:var(--paper-dark); }
        .kana-cell.sel { border-color:rgba(22,17,10,.3); }
        .kana-cell .k { font-family:var(--jp); font-size:1.6rem; display:block; line-height:1.2; }
        .kana-cell .r { font-family:var(--mono); font-size:.6rem; color:var(--muted); display:block; margin-top:.15rem; }
        .kana-cell.empty { background:var(--paper-dark); cursor:default; }
        .full-table { display:grid; grid-template-columns:2.5rem repeat(5,1fr); gap:2px; }
        .col-head { font-family:var(--mono); font-size:.62rem; color:var(--muted); text-align:center; padding:.3rem 0; letter-spacing:.05em; }
        .row-label { font-family:var(--mono); font-size:.6rem; color:var(--muted); display:flex; align-items:center; justify-content:flex-end; padding-right:.4rem; }

        .info-box {
          background:var(--white); border:1px solid var(--border);
          padding:1.4rem 1.6rem; border-radius:2px;
          display:grid;
          grid-template-columns: 140px 1fr;
          gap:1.8rem; align-items:start;
          margin-top:1.5rem;
        }
        .tip-box { background:var(--white); border:1px solid var(--border); border-left:3px solid var(--red); padding:1.2rem 1.5rem; font-size:.88rem; line-height:1.7; color:var(--ink-soft); }

        @media(max-width:600px) {
          .info-box { grid-template-columns:1fr; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign:"center", padding:"5rem 3rem 3rem", borderBottom:"1px solid var(--border)", background:"linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%)", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px)", pointerEvents:"none" }} />
        <span style={{ fontFamily:"var(--jp)", fontSize:"2.8rem", letterSpacing:".45em", color:"var(--red)", display:"block", marginBottom:".5rem", position:"relative" }}>カタカナ</span>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:600, position:"relative" }}>Katakana</h1>
        <p style={{ color:"var(--muted)", fontSize:".9rem", fontStyle:"italic", position:"relative", marginTop:".3rem" }}>46 caracteres · Para palabras extranjeras y énfasis</p>
      </div>

      {/* INTRO */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }}>
          <div>
            <p className="section-label">Qué es y para qué sirve</p>
            <h2 className="section-title" style={{ fontSize:"1.8rem" }}>El silabario angular</h2>
            <div className="divider" />
            <p style={{ fontSize:".95rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.8 }}>
              El katakana representa exactamente los mismos sonidos que el hiragana,
              pero con una forma más angular y geométrica. Su uso principal es escribir
              palabras de origen extranjero: テレビ (terebi, televisión), コーヒー (kōhī, café).
            </p>
            <p style={{ fontSize:".95rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.8, marginTop:"1rem" }}>
              Si dominas el hiragana, el katakana te llevará la mitad de tiempo porque los sonidos ya los conoces.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:".8rem" }}>
            {[
              ["Palabras extranjeras", "テレビ, コンピューター, アイスクリーム"],
              ["Nombres propios", "Países, ciudades, nombres de personas extranjeras"],
              ["Onomatopeyas", "ドキドキ (latido del corazón), ワクワク (emoción)"],
              ["Énfasis", "Como la cursiva o las mayúsculas en español"],
            ].map(([t, d]) => (
              <div key={t} style={{ background:"var(--white)", border:"1px solid var(--border)", padding:"1rem 1.2rem" }}>
                <p style={{ fontWeight:600, fontSize:".9rem", marginBottom:".2rem" }}>{t}</p>
                <p style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLA */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Tabla completa</p>
          <h2 className="section-title">Los 46 caracteres</h2>
          <div className="divider" />
          <p className="section-sub">Haz clic en cualquier carácter para ver la animación de trazos.</p>
        </div>
        <div className="reveal">
          <div className="full-table">
            <div />
            {COL_HEADS.map(h => <div key={h} className="col-head">{h}</div>)}
            {ROWS.map(row => (
              <>
                <div key={row.label + "-l"} className="row-label">{row.label}</div>
                {row.chars.map((ch, i) => ch ? (
                  <div key={ch} className={`kana-cell ${selected === ch ? "sel" : ""}`} onClick={() => setSelected(selected === ch ? null : ch)}>
                    <span className="k">{ch}</span>
                    <span className="r">{ROMAJI[ch]}</span>
                  </div>
                ) : (
                  <div key={row.label + i} className="kana-cell empty" />
                ))}
              </>
            ))}
          </div>

          {/* Panel con animación */}
          {info && (
            <div className="info-box">
              {/* Animación SVG */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".6rem" }}>
                <KanaStroke char={info[0]} size={120} speed={0.6} />
                <p style={{ fontFamily:"var(--mono)", fontSize:".6rem", color:"var(--muted)", letterSpacing:".08em", textTransform:"uppercase", textAlign:"center" }}>
                  {info[1]}
                </p>
              </div>

              {/* Notas */}
              <div style={{ paddingTop:".3rem" }}>
                <p style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--red)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".6rem" }}>
                  orden de trazos
                </p>
                <p style={{ fontSize:".88rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.7 }}>{info[2]}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CONFUSABLES */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Pares difíciles</p>
          <h2 className="section-title">Los que se confunden</h2>
          <div className="divider" />
          <p className="section-sub">El katakana tiene varios caracteres visualmente muy parecidos. Estos son los más problemáticos.</p>
        </div>
        <div className="reveal" style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {CONFUSABLES.map(({ pair, note }) => (
            <div key={pair.join("")} style={{ background:"var(--white)", border:"1px solid var(--border)", padding:"1.4rem 1.6rem", display:"grid", gridTemplateColumns:"auto 1fr", gap:"1.5rem", alignItems:"center" }}>
              <div style={{ display:"flex", gap:".5rem" }}>
                {pair.map(k => (
                  <div
                    key={k}
                    style={{ background:"var(--paper-dark)", border:"1px solid var(--border)", width:"3.2rem", height:"3.2rem", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
                    onClick={() => setSelected(selected === k ? null : k)}
                  >
                    <span style={{ fontFamily:"var(--jp)", fontSize:"2rem" }}>{k}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize:".88rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.7 }}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONSEJOS */}
      <section className="page-section">
        <div className="reveal">
          <p className="section-label">Cómo aprenderlo</p>
          <h2 className="section-title">Viene después del hiragana</h2>
          <div className="divider" />
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem" }}>
          {[
            ["Aprende el hiragana primero", "Los sonidos son los mismos. Si ya sabes hiragana, aprender katakana es solo aprender las formas nuevas."],
            ["Palabras que ya conoces", "ア merica, コーヒー (coffee), テレビ (TV). Muchas palabras katakana son préstamos del inglés."],
            ["Los pares difíciles", "シ/ツ y ソ/ン son los que más confunden. El truco está en la dirección de los trazos cortos."],
            ["Una semana y media", "Si tienes el hiragana sólido, una semana y media de práctica es suficiente para leer katakana con fluidez."],
          ].map(([t, d]) => (
            <div key={t} style={{ background:"var(--white)", border:"1px solid var(--border)", padding:"1.4rem 1.6rem" }}>
              <p style={{ fontWeight:600, marginBottom:".5rem" }}>{t}</p>
              <p style={{ fontSize:".86rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
