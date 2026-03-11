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
  ["あ","a","Empieza con la línea horizontal, luego el trazo curvo y por último el gancho."],
  ["い","i","Dos trazos curvos. El izquierdo más largo y ligeramente inclinado."],
  ["う","u","Un gancho arriba y una 'u' abierta debajo."],
  ["え","e","Tres trazos: primero el horizontal, luego el vertical que lo cruza, después el gancho."],
  ["お","o","Cinco trazos. El más difícil de la fila a. Empieza por la línea horizontal de arriba."],
  ["か","ka","Dos trazos verticales y uno diagonal que los cruza."],
  ["き","ki","Cuatro trazos. Parece una 'ki' en letra de imprenta."],
  ["く","ku","Un solo trazo en forma de ángulo agudo."],
  ["け","ke","Tres trazos: vertical, horizontal que sale de él, y el gancho."],
  ["こ","ko","Dos líneas horizontales paralelas."],
  ["さ","sa","Tres trazos. La línea superior, el trazo que la cruza y baja, y el gancho."],
  ["し","shi","Un solo trazo. Como una 'J' con el remate hacia arriba."],
  ["す","su","Dos trazos. El bucle de arriba y el gancho que baja."],
  ["せ","se","Tres trazos que forman una figura parecida a una 'Ψ' asimétrica."],
  ["そ","so","Un solo trazo fluido. Como un '3' que acaba con gancho."],
  ["た","ta","Cuatro trazos. Los dos primeros forman una cruz, los dos últimos el gancho."],
  ["ち","chi","Dos trazos. La 'chi' tiene esa curva característica en la parte inferior."],
  ["つ","tsu","Un solo trazo curvo que termina en punta. Como una 'c' tumbada."],
  ["て","te","Un solo trazo con forma de garabato que termina con un gancho."],
  ["と","to","Dos trazos: el vertical recto y la pequeña lengüeta que sale de él."],
  ["な","na","Cuatro trazos. Tiene un pequeño bucle en la parte inferior derecha."],
  ["に","ni","Tres trazos que forman algo parecido a dos rayas verticales con una horizontal."],
  ["ぬ","nu","Dos trazos. Tiene un bucle en el centro que lo hace característico."],
  ["ね","ne","Dos trazos. La parte superior parece una 'ね' con bucle cerrado."],
  ["の","no","Un solo trazo en espiral. Como el símbolo 'の' tan icónico del japonés."],
  ["は","ha","Tres trazos. El primero vertical, los otros dos forman el lado derecho."],
  ["ひ","hi","Un solo trazo curvado que termina en gancho."],
  ["ふ","fu","Cuatro trazos pequeños alrededor de un centro invisible."],
  ["へ","he","Un solo trazo. La versión hiragana es casi idéntica al katakana ヘ."],
  ["ほ","ho","Cuatro trazos. La parte derecha tiene el característico bucle de ほ."],
  ["ま","ma","Tres trazos. El trazo final forma un gancho hacia arriba."],
  ["み","mi","Dos trazos. El segundo traza un bucle y sube con un gancho."],
  ["む","mu","Tres trazos. Tiene un pequeño cuerno en la parte superior."],
  ["め","me","Dos trazos. El bucle del segundo trazo lo distingue claramente de ぬ."],
  ["も","mo","Tres trazos: dos horizontales y uno que los cruza con gancho."],
  ["や","ya","Tres trazos. Una de las formas más simples y reconocibles."],
  ["ゆ","yu","Dos trazos. Como un anzuelo con una raya encima."],
  ["よ","yo","Dos trazos. Similar a ゆ pero más simétrico."],
  ["ら","ra","Dos trazos. El segundo acaba en gancho curvo."],
  ["り","ri","Dos trazos verticales, el segundo con un gancho."],
  ["る","ru","Un solo trazo que termina en bucle. No cerrar del todo el bucle."],
  ["れ","re","Dos trazos. Empieza igual que れ pero el remate es diferente a る."],
  ["ろ","ro","Un solo trazo. Como る pero sin el bucle final."],
  ["わ","wa","Dos trazos. La curva final es el elemento característico."],
  ["を","wo","Tres trazos. Solo aparece como partícula de objeto directo."],
  ["ん","n","Un solo trazo. No confundirlo con り. Termina con un pequeño gancho."],
]

const DAKUTEN = [
  ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
  ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
  ["だ","da"],["ぢ","di"],["づ","du"],["で","de"],["ど","do"],
  ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
  ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"],
]

const COMBINATIONS = [
  ["きゃ","kya"],["きゅ","kyu"],["きょ","kyo"],
  ["しゃ","sha"],["しゅ","shu"],["しょ","sho"],
  ["ちゃ","cha"],["ちゅ","chu"],["ちょ","cho"],
  ["にゃ","nya"],["にゅ","nyu"],["にょ","nyo"],
  ["ひゃ","hya"],["ひゅ","hyu"],["ひょ","hyo"],
  ["みゃ","mya"],["みゅ","myu"],["みょ","myo"],
  ["りゃ","rya"],["りゅ","ryu"],["りょ","ryo"],
  ["ぎゃ","gya"],["ぎゅ","gyu"],["ぎょ","gyo"],
  ["じゃ","ja"], ["じゅ","ju"], ["じょ","jo"],
  ["びゃ","bya"],["びゅ","byu"],["びょ","byo"],
  ["ぴゃ","pya"],["ぴゅ","pyu"],["ぴょ","pyo"],
]

const ROWS = [
  { label: "— a", chars: ["あ","い","う","え","お"] },
  { label: "k —", chars: ["か","き","く","け","こ"] },
  { label: "s —", chars: ["さ","し","す","せ","そ"] },
  { label: "t —", chars: ["た","ち","つ","て","と"] },
  { label: "n —", chars: ["な","に","ぬ","ね","の"] },
  { label: "h —", chars: ["は","ひ","ふ","へ","ほ"] },
  { label: "m —", chars: ["ま","み","む","め","も"] },
  { label: "y —", chars: ["や", null, "ゆ", null, "よ"] },
  { label: "r —", chars: ["ら","り","る","れ","ろ"] },
  { label: "w —", chars: ["わ", null, null, null, "を"] },
  { label: "n",   chars: ["ん", null, null, null, null] },
]
const COL_HEADS = ["a","i","u","e","o"]

const ROMAJI = {
  "あ":"a","い":"i","う":"u","え":"e","お":"o",
  "か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
  "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so",
  "た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
  "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no",
  "は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
  "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo",
  "や":"ya","ゆ":"yu","よ":"yo",
  "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro",
  "わ":"wa","を":"wo","ん":"n",
}

export default function HiraganaPage() {
  useReveal()
  const [selected, setSelected] = useState(null)
  const info = selected ? BASIC.find(b => b[0] === selected) : null

  return (
    <>
      <style>{`
        .kana-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:2px; }
        .kana-cell {
          background:var(--white); border:1px solid var(--border);
          padding:.6rem .3rem; text-align:center; cursor:pointer; transition:background .15s;
        }
        .kana-cell:hover, .kana-cell.sel { background:var(--paper-dark); }
        .kana-cell.sel { border-color:rgba(22,17,10,.3); }
        .kana-cell .k { font-family:var(--jp); font-size:1.6rem; display:block; line-height:1.2; }
        .kana-cell .r { font-family:var(--mono); font-size:.6rem; color:var(--muted); display:block; margin-top:.15rem; }
        .kana-cell.empty { background:var(--paper-dark); cursor:default; }

        .info-box {
          background:var(--white); border:1px solid var(--border);
          padding:1.4rem 1.6rem; border-radius:2px;
          display:grid;
          grid-template-columns: 140px 1fr;
          gap:1.8rem; align-items:start;
          margin-top:1.5rem;
        }
        .info-text { font-size:.88rem; color:var(--muted); font-style:italic; line-height:1.7; }

        .dak-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:2px; }
        .comb-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(100px,1fr)); gap:2px; }

        .tip-box {
          background:var(--white); border:1px solid var(--border);
          border-left:3px solid var(--red); padding:1.2rem 1.5rem;
          font-size:.88rem; line-height:1.7; color:var(--ink-soft);
        }
        .tip-box strong { color:var(--ink); font-style:normal; }

        .col-head { font-family:var(--mono); font-size:.62rem; color:var(--muted); text-align:center; padding:.3rem 0; letter-spacing:.05em; }
        .row-label { font-family:var(--mono); font-size:.6rem; color:var(--muted); display:flex; align-items:center; justify-content:flex-end; padding-right:.4rem; letter-spacing:.04em; }
        .full-table { display:grid; grid-template-columns:2.5rem repeat(5,1fr); gap:2px; }

        @media(max-width:600px) {
          .info-box { grid-template-columns:1fr; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign:"center", padding:"5rem 3rem 3rem", borderBottom:"1px solid var(--border)", background:"linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%)", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px)", pointerEvents:"none" }} />
        <span style={{ fontFamily:"var(--jp)", fontSize:"2.8rem", letterSpacing:".45em", color:"var(--red)", display:"block", marginBottom:".5rem", position:"relative" }}>ひらがな</span>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:600, position:"relative" }}>Hiragana</h1>
        <p style={{ color:"var(--muted)", fontSize:".9rem", fontStyle:"italic", position:"relative", marginTop:".3rem" }}>46 caracteres · El silabario nativo del japonés</p>
      </div>

      {/* INTRO */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }}>
          <div>
            <p className="section-label">Por dónde empezar</p>
            <h2 className="section-title" style={{ fontSize:"1.8rem" }}>El primer silabario</h2>
            <div className="divider" />
            <p style={{ fontSize:".95rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.8 }}>
              El hiragana es el silabario que usan los japoneses para escribir palabras nativas,
              conjugaciones verbales y partículas gramaticales. A diferencia del kanji, cada
              símbolo representa un sonido, no un concepto.
            </p>
            <p style={{ fontSize:".95rem", color:"var(--muted)", fontStyle:"italic", lineHeight:1.8, marginTop:"1rem" }}>
              Con 46 caracteres básicos y unas pocas reglas de modificación puedes leer
              prácticamente cualquier texto japonés escrito solo en hiragana.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:".8rem" }}>
            {[
              ["46 caracteres básicos", "a, i, u, e, o para cada consonante"],
              ["+ dakuten y handakuten", "ガ→が, パ→ぱ — modificadores de sonido"],
              ["+ combinaciones", "き+ゃ = きゃ (kya) — sílabas compuestas"],
              ["En total ~100 sonidos", "Con estas reglas cubres todo el japonés básico"],
            ].map(([t, d]) => (
              <div key={t} style={{ background:"var(--white)", border:"1px solid var(--border)", padding:"1rem 1.2rem" }}>
                <p style={{ fontWeight:600, fontSize:".9rem", marginBottom:".2rem" }}>{t}</p>
                <p style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLA COMPLETA */}
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
                <div key={row.label + "-label"} className="row-label">{row.label}</div>
                {row.chars.map((ch, i) => ch ? (
                  <div
                    key={ch}
                    className={`kana-cell ${selected === ch ? "sel" : ""}`}
                    onClick={() => setSelected(selected === ch ? null : ch)}
                  >
                    <span className="k">{ch}</span>
                    <span className="r">{ROMAJI[ch]}</span>
                  </div>
                ) : (
                  <div key={row.label + i} className="kana-cell empty" />
                ))}
              </>
            ))}
          </div>

          {/* Panel de info con animación */}
          {info && (
            <div className="info-box">
              {/* Lado izquierdo: animación SVG */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".6rem" }}>
                <KanaStroke char={info[0]} size={120} speed={0.65} />
                <p style={{ fontFamily:"var(--mono)", fontSize:".6rem", color:"var(--muted)", letterSpacing:".08em", textTransform:"uppercase", textAlign:"center" }}>
                  {info[1]}
                </p>
              </div>

              {/* Lado derecho: notas */}
              <div style={{ paddingTop:".3rem" }}>
                <p style={{ fontFamily:"var(--mono)", fontSize:".7rem", color:"var(--red)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".6rem" }}>
                  orden de trazos
                </p>
                <p className="info-text">{info[2]}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DAKUTEN */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Modificadores</p>
          <h2 className="section-title">Dakuten y handakuten</h2>
          <div className="divider" />
          <p className="section-sub">Dos pequeños trazos que transforman el sonido de un carácter.</p>
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"start" }}>
          <div>
            <p style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".8rem" }}>Sonorización ゛</p>
            <p style={{ fontSize:".88rem", color:"var(--muted)", fontStyle:"italic", marginBottom:"1.2rem", lineHeight:1.7 }}>
              Las dos comillas (゛) hacen que el sonido se vuelva sonoro: か (ka) → が (ga).
            </p>
            <div className="tip-box">
              <strong>Truco:</strong> las dos comillas son como un interruptor que enciende las cuerdas vocales. k→g, s→z, t→d, h→b.
            </div>
          </div>
          <div>
            <p style={{ fontFamily:"var(--mono)", fontSize:".68rem", color:"var(--muted)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".8rem" }}>Semivocalización ゜</p>
            <p style={{ fontSize:".88rem", color:"var(--muted)", fontStyle:"italic", marginBottom:"1.2rem", lineHeight:1.7 }}>
              El círculo pequeño (゜) solo se usa con la fila は y convierte h→p: は (ha) → ぱ (pa).
            </p>
            <div className="tip-box">
              <strong>Solo en は:</strong> ぱぴぷぺぽ. Aparecen mucho en onomatopeyas.
            </div>
          </div>
        </div>
        <div className="reveal" style={{ marginTop:"1.5rem" }}>
          <div className="dak-grid">
            {DAKUTEN.map(([k, r]) => (
              <div key={k} className="kana-cell">
                <span className="k">{k}</span>
                <span className="r">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMBINACIONES */}
      <section className="page-section" style={{ borderBottom:"1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Sílabas compuestas</p>
          <h2 className="section-title">Combinaciones</h2>
          <div className="divider" />
          <p className="section-sub">Una consonante de la fila い seguida de una や, ゆ o よ pequeña forma una sílaba nueva.</p>
        </div>
        <div className="reveal">
          <div className="tip-box" style={{ marginBottom:"1.5rem" }}>
            <strong>La regla:</strong> き + ゃ = きゃ (kya). La や se escribe en tamaño pequeño y se fusiona con el carácter anterior. Es un solo sonido, no dos.
          </div>
          <div className="comb-grid">
            {COMBINATIONS.map(([k, r]) => (
              <div key={k} className="kana-cell">
                <span className="k">{k}</span>
                <span className="r">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSEJOS */}
      <section className="page-section">
        <div className="reveal">
          <p className="section-label">Cómo aprenderlo</p>
          <h2 className="section-title">Consejos prácticos</h2>
          <div className="divider" />
        </div>
        <div className="reveal" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem" }}>
          {[
            ["Escríbelo a mano", "Escribir activa la memoria motora. Copia cada fila varias veces. El orden de los trazos importa para que quede natural."],
            ["Aprende fila por fila", "Cinco caracteres por sesión es suficiente. Aprende la fila あ un día, か al siguiente."],
            ["Asocia sonido y forma", "Pronuncia en voz alta mientras escribes. El hiragana es fonético: una vez que lo memorizas, no hay ambigüedad."],
            ["Dos semanas es suficiente", "Con 20-30 minutos diarios en dos semanas tienes los 46 básicos."],
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
