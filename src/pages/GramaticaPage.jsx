import { useEffect, useState } from "react"

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

const SECTIONS = [
  {
    id: "orden",
    label: "La base de todo",
    title: "El orden de la frase japonesa",
    intro: `En español el orden habitual es Sujeto-Verbo-Objeto: "Yo como arroz". En japonés el verbo va siempre al final: "Yo arroz como" (わたしは ごはんを たべます). Este cambio parece pequeño pero lo cambia todo: el japonés construye la frase acumulando información y solo al final sabes qué pasa con ella.

Una vez que interiorizas esto, la gramática japonesa empieza a tener sentido. Las partículas existen precisamente porque el orden es flexible: en lugar de la posición en la frase, es la partícula la que indica el papel de cada palabra.`,
    items: [
      {
        structure: "【Sujeto は】【Objeto を】【Verbo】",
        meaning: "Estructura básica de oración",
        explanation: "El verbo siempre al final. Las partículas indican la función de cada sustantivo independientemente de su posición.",
        examples: [
          { jp: "わたしは　りんごを　たべます。", es: "Yo como una manzana." },
          { jp: "たなかさんは　にほんごを　べんきょうします。", es: "Tanaka estudia japonés." },
        ],
      },
    ],
  },
  {
    id: "particulas",
    label: "Partículas",
    title: "Las partículas esenciales",
    intro: `Las partículas son palabras cortas que van pegadas después de un sustantivo e indican su función en la frase. No tienen equivalente exacto en español porque en español la posición y las preposiciones hacen ese trabajo. Son el corazón de la gramática japonesa.`,
    items: [
      {
        structure: "は (wa)",
        meaning: "Tema de la oración",
        explanation: "Marca de qué trata la frase. No es exactamente el sujeto: es lo que se pone en primer plano, lo que 'se comenta'. Cuando cambias は por が el matiz cambia.",
        examples: [
          { jp: "わたしは　がくせいです。", es: "Yo soy estudiante. (hablando de mí...)" },
          { jp: "これは　なんですか？", es: "¿Qué es esto? (sobre esto...)" },
        ],
      },
      {
        structure: "が (ga)",
        meaning: "Sujeto gramatical / énfasis",
        explanation: "Marca el sujeto con énfasis. Mientras は presenta el tema general, が identifica específicamente quién hace la acción o señala algo nuevo en el discurso.",
        examples: [
          { jp: "だれが　きましたか？　たなかさんが　きました。", es: "¿Quién vino? Tanaka vino." },
          { jp: "あそこに　ねこが　います。", es: "Allí hay un gato." },
        ],
      },
      {
        structure: "を (wo)",
        meaning: "Objeto directo",
        explanation: "Marca lo que recibe la acción del verbo. Equivale aproximadamente al complemento directo del español. Solo se pronuncia 'o' en el japonés moderno.",
        examples: [
          { jp: "コーヒーを　のみます。", es: "Bebo café." },
          { jp: "えいがを　みました。", es: "Vi una película." },
        ],
      },
      {
        structure: "に (ni)",
        meaning: "Dirección / momento / lugar de existencia",
        explanation: "Una de las partículas más versátiles. Indica hacia dónde se va, cuándo ocurre algo, o dónde está algo. El contexto determina cuál de estos significados aplica.",
        examples: [
          { jp: "がっこうに　いきます。", es: "Voy a la escuela." },
          { jp: "しちじに　おきます。", es: "Me levanto a las siete." },
          { jp: "つくえに　ほんが　あります。", es: "Hay un libro en el escritorio." },
        ],
      },
      {
        structure: "で (de)",
        meaning: "Lugar de acción / medio / causa",
        explanation: "Indica dónde ocurre una acción (a diferencia de に que indica dónde algo existe), con qué medio o herramienta se hace algo, o cuál es la causa.",
        examples: [
          { jp: "としょかんで　べんきょうします。", es: "Estudio en la biblioteca." },
          { jp: "バスで　きます。", es: "Vengo en autobús." },
        ],
      },
      {
        structure: "の (no)",
        meaning: "Posesión y relación entre sustantivos",
        explanation: "Une dos sustantivos. El primero modifica al segundo. Funciona como el apóstrofe 's en inglés, como 'de' en español, pero también para muchas relaciones que en español expresamos de otras formas.",
        examples: [
          { jp: "わたしの　かばん", es: "Mi bolso (el bolso de mí)" },
          { jp: "にほんごの　きょうかしょ", es: "El libro de texto de japonés" },
          { jp: "だいがくの　ともだち", es: "Un amigo de la universidad" },
        ],
      },
      {
        structure: "と (to)",
        meaning: "Y (lista exhaustiva) / Con (compañía)",
        explanation: "Une sustantivos en una lista completa (a diferencia de や que implica 'entre otros'), o indica con quién se hace algo.",
        examples: [
          { jp: "りんごと　みかんを　かいました。", es: "Compré una manzana y una mandarina (solo esas)." },
          { jp: "ともだちと　えいがを　みました。", es: "Vi una película con un amigo." },
        ],
      },
      {
        structure: "も (mo)",
        meaning: "También / Tampoco",
        explanation: "Reemplaza a は o が para indicar que algo se suma a lo ya mencionado. Añade el significado de 'también' o 'incluso'.",
        examples: [
          { jp: "わたしも　がくせいです。", es: "Yo también soy estudiante." },
          { jp: "これも　いいですね。", es: "Esto también está bien." },
        ],
      },
      {
        structure: "か (ka)",
        meaning: "Pregunta / Alternativa",
        explanation: "Al final de frase convierte cualquier oración en pregunta, sin cambiar el orden de las palabras. También puede unir alternativas con el sentido de 'o'.",
        examples: [
          { jp: "これは　なんですか？", es: "¿Qué es esto?" },
          { jp: "コーヒーか　おちゃは　どうですか？", es: "¿Qué te parece un café o un té?" },
        ],
      },
    ],
  },
  {
    id: "verbos",
    label: "Verbos",
    title: "Conjugación verbal",
    intro: `Los verbos japoneses se conjugan según el tiempo, la polaridad (afirmativo/negativo) y el nivel de formalidad, pero no varían según la persona. "Hablo", "hablas", "habla" son la misma forma en japonés. Hay dos grupos principales de verbos más los irregulares する y くる.`,
    items: [
      {
        structure: "～ます / ～ません",
        meaning: "Presente/futuro afirmativo y negativo (formal)",
        explanation: "La forma ます es la base del japonés formal. El presente y el futuro comparten la misma forma: たべます puede ser 'como' o 'comeré' según el contexto.",
        examples: [
          { jp: "まいにち　にほんごを　べんきょうします。", es: "Estudio japonés todos los días." },
          { jp: "さかなは　たべません。", es: "No como pescado." },
          { jp: "あした　ともだちに　あいます。", es: "Mañana me veré con un amigo." },
        ],
      },
      {
        structure: "～ました / ～ませんでした",
        meaning: "Pasado afirmativo y negativo (formal)",
        explanation: "El pasado en japonés es sencillo: ます → ました. El negativo del pasado: ません → ませんでした. No hay irregularidades en esta forma.",
        examples: [
          { jp: "きのう　えいがを　みました。", es: "Ayer vi una película." },
          { jp: "きょうは　がっこうに　いきませんでした。", es: "Hoy no fui a la escuela." },
        ],
      },
      {
        structure: "～ている",
        meaning: "Acción en curso / estado resultante",
        explanation: "Esta forma tiene dos usos principales. Con verbos de acción indica que algo está ocurriendo ahora (como el gerundio español). Con verbos de cambio indica el estado resultado de ese cambio.",
        examples: [
          { jp: "いま　テレビを　みています。", es: "Ahora mismo estoy viendo la tele." },
          { jp: "けっこんしています。", es: "Estoy casado/a. (resultado de haberse casado)" },
          { jp: "まどが　あいています。", es: "La ventana está abierta. (resultado de haberse abierto)" },
        ],
      },
      {
        structure: "～てください",
        meaning: "Petición cortés",
        explanation: "Se forma con la forma て del verbo más ください. Es la manera estándar de pedir algo educadamente. Más directo que una sugerencia pero no una orden.",
        examples: [
          { jp: "ここに　なまえを　かいてください。", es: "Por favor, escribe tu nombre aquí." },
          { jp: "もう　いちど　いってください。", es: "Por favor, dilo otra vez." },
        ],
      },
      {
        structure: "～たい",
        meaning: "Deseos propios",
        explanation: "Se forma quitando ます y añadiendo たい. Solo se usa para los deseos de uno mismo. Para hablar de los deseos de otra persona se usan otras formas. たい se conjuga como un adjetivo い.",
        examples: [
          { jp: "にほんに　いきたいです。", es: "Quiero ir a Japón." },
          { jp: "なにが　たべたいですか？", es: "¿Qué quieres comer?" },
          { jp: "もっと　ねたい。", es: "Quiero dormir más." },
        ],
      },
      {
        structure: "～てもいいですか",
        meaning: "Pedir permiso",
        explanation: "Literalmente 'aunque haga X, ¿está bien?'. La forma más natural de pedir permiso en japonés. La respuesta afirmativa es いいですよ o どうぞ.",
        examples: [
          { jp: "しゃしんを　とっても　いいですか？", es: "¿Puedo hacer una foto?" },
          { jp: "ここに　すわっても　いいですか？", es: "¿Puedo sentarme aquí?" },
        ],
      },
      {
        structure: "～なければなりません",
        meaning: "Obligación",
        explanation: "Literalmente 'si no hago X, no va bien'. La forma de expresar obligación en japonés. Más larga que sus equivalentes en otros idiomas, pero se puede acortar en habla informal a ～なきゃ.",
        examples: [
          { jp: "しゅくだいを　しなければなりません。", es: "Tengo que hacer los deberes." },
          { jp: "はやく　いかなければなりません。", es: "Tengo que ir rápido." },
        ],
      },
    ],
  },
  {
    id: "adjetivos",
    label: "Adjetivos",
    title: "Adjetivos い y な",
    intro: `El japonés tiene dos tipos de adjetivos que se comportan de forma diferente. Los adjetivos い terminan en い y se conjugan directamente. Los adjetivos な necesitan な cuando van antes de un sustantivo. Entender esta diferencia evita muchos errores típicos.`,
    items: [
      {
        structure: "Adjetivos い — conjugación directa",
        meaning: "たかい, ちいさい, おもしろい...",
        explanation: "Se conjugan cambiando la terminación. Presente: たかい (es caro). Pasado: たかかった (era caro). Negativo: たかくない (no es caro). Negativo pasado: たかくなかった.",
        examples: [
          { jp: "このレストランは　たかいです。", es: "Este restaurante es caro." },
          { jp: "きのうは　さむかった。", es: "Ayer hacía frío." },
          { jp: "このほんは　おもしろくない。", es: "Este libro no es interesante." },
        ],
      },
      {
        structure: "Adjetivos な — con sustantivos",
        meaning: "きれい、しずか、べんり...",
        explanation: "Antes de un sustantivo necesitan な. Cuando son el predicado de la frase van con です/でした. No terminan en い (salvo excepciones como きれい que parece い pero es な).",
        examples: [
          { jp: "しずかな　まち　です。", es: "Es una ciudad tranquila." },
          { jp: "このこうえんは　きれいです。", es: "Este parque es bonito." },
          { jp: "べんりじゃないです。", es: "No es conveniente." },
        ],
      },
    ],
  },
  {
    id: "otros",
    label: "Otras estructuras",
    title: "Construcciones frecuentes",
    intro: `Hay una serie de patrones que aparecen constantemente en el japonés del N5 y que conviene conocer bien.`,
    items: [
      {
        structure: "A の ほうが B より ～",
        meaning: "Comparación: A es más ~ que B",
        explanation: "Literalmente 'la dirección de A, comparado con B'. El elemento preferido o con más cualidad va con のほうが, el de referencia va con より.",
        examples: [
          { jp: "なつのほうが　ふゆより　すきです。", es: "Prefiero el verano al invierno." },
          { jp: "でんしゃのほうが　バスより　はやいです。", es: "El tren es más rápido que el autobús." },
        ],
      },
      {
        structure: "～から / ～ので",
        meaning: "Causa / razón",
        explanation: "Ambas expresan causa pero con distinto matiz. から es más directo y subjetivo. ので es más suave y objetivo, y suena más formal. En el N5 se aprende principalmente から.",
        examples: [
          { jp: "あめが　ふっているから、いえに　います。", es: "Como está lloviendo, estoy en casa." },
          { jp: "びょうきなので、がっこうを　やすみます。", es: "Falto a la escuela porque estoy enfermo." },
        ],
      },
      {
        structure: "～と　おもいます",
        meaning: "Creo que / Me parece que",
        explanation: "Sirve para expresar opiniones personales de forma suave. En japonés es descortés ser demasiado directo con las opiniones, así que esta forma se usa mucho.",
        examples: [
          { jp: "あしたは　あめだと　おもいます。", es: "Creo que mañana lloverá." },
          { jp: "これは　むずかしいと　おもいます。", es: "Me parece que esto es difícil." },
        ],
      },
      {
        structure: "X は Y が ～",
        meaning: "Habilidades, gustos, necesidades",
        explanation: "En japonés, habilidades y preferencias se expresan de forma diferente al español. El tema va con は y la habilidad o gusto con が. 'Me gustan los gatos' se dice literalmente 'en cuanto a mí, los gatos gustan'.",
        examples: [
          { jp: "わたしは　ねこが　すきです。", es: "Me gustan los gatos." },
          { jp: "たなかさんは　えいごが　じょうずです。", es: "Tanaka habla bien inglés." },
          { jp: "わたしは　くるまが　ほしいです。", es: "Quiero un coche." },
        ],
      },
      {
        structure: "～まえに / ～あとで",
        meaning: "Antes de / Después de",
        explanation: "まえに va con la forma del diccionario del verbo. あとで va con la forma た (pasado corto). Este detalle es importante: 'antes de comer' = たべるまえに, 'después de comer' = たべたあとで.",
        examples: [
          { jp: "ねるまえに、はを　みがきます。", es: "Me cepillo los dientes antes de dormir." },
          { jp: "しょくじのあとで、さんぽします。", es: "Doy un paseo después de comer." },
        ],
      },
      {
        structure: "～ながら",
        meaning: "Mientras / Al mismo tiempo",
        explanation: "Indica dos acciones simultáneas. La acción secundaria va con ながら, la principal al final. En español 'mientras' puede ir en cualquier posición, en japonés ながら va en el medio.",
        examples: [
          { jp: "おんがくを　ききながら、べんきょうします。", es: "Estudio mientras escucho música." },
          { jp: "あるきながら、スマホを　みないでください。", es: "Por favor, no mires el móvil mientras caminas." },
        ],
      },
    ],
  },
]

export default function GramaticaPage() {
  useReveal()
  const [openItem, setOpenItem] = useState(null)

  return (
    <>
      <style>{`
        .gr-section { border-top:1px solid var(--border); }
        .gr-item { background:var(--white); border-bottom:1px solid var(--border); transition:background .18s; }
        .gr-item:last-child { border-bottom:none; }
        .gr-item-head { padding:1.4rem 1.8rem; display:grid; grid-template-columns:280px 1fr auto; gap:1.5rem; align-items:start; cursor:pointer; }
        .gr-item-head:hover { background:var(--paper-dark); }
        .gr-structure { font-family:var(--jp); font-size:1.05rem; color:var(--ink); line-height:1.5; }
        .gr-meaning { font-weight:600; font-size:.95rem; }
        .gr-toggle { font-family:var(--mono); font-size:.7rem; color:var(--muted); flex-shrink:0; padding-top:.2rem; }
        .gr-body { padding:0 1.8rem 1.6rem; display:none; }
        .gr-body.open { display:block; }
        .gr-explanation { font-size:.9rem; color:var(--muted); font-style:italic; line-height:1.8; margin-bottom:1.2rem; }
        .gr-examples { display:flex; flex-direction:column; gap:.6rem; }
        .gr-ex { background:var(--paper-dark); padding:.8rem 1rem; border-radius:2px; }
        .gr-jp { font-family:var(--jp); font-size:.95rem; display:block; margin-bottom:.2rem; }
        .gr-es { font-size:.8rem; color:var(--muted); font-style:italic; display:block; }
        .gr-red { color:var(--red); }

        .intro-box { background:var(--white); border:1px solid var(--border); border-left:3px solid var(--red); padding:1.4rem 1.8rem; font-size:.92rem; color:var(--muted); font-style:italic; line-height:1.85; margin-bottom:2rem; white-space:pre-line; }

        @media(max-width:768px) {
          .gr-item-head { grid-template-columns:1fr; gap:.5rem; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign:"center", padding:"5rem 3rem 3rem", borderBottom:"1px solid var(--border)", background:"linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%)", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px)", pointerEvents:"none" }} />
        <span style={{ fontFamily:"var(--jp)", fontSize:"2.8rem", letterSpacing:".45em", color:"var(--red)", display:"block", marginBottom:".5rem", position:"relative" }}>文法</span>
        <h1 style={{ fontFamily:"var(--serif)", fontSize:"1.8rem", fontWeight:600, position:"relative" }}>Gramática N5</h1>
        <p style={{ color:"var(--muted)", fontSize:".9rem", fontStyle:"italic", position:"relative", marginTop:".3rem" }}>Las estructuras fundamentales del japonés básico</p>
      </div>

      {SECTIONS.map(sec => (
        <section key={sec.id} className="page-section gr-section">
          <div className="reveal">
            <p className="section-label">{sec.label}</p>
            <h2 className="section-title">{sec.title}</h2>
            <div className="divider" />
            <div className="intro-box">{sec.intro}</div>
          </div>
          <div className="reveal" style={{ border:"1px solid var(--border)" }}>
            {sec.items.map((item, i) => {
              const key = `${sec.id}-${i}`
              const isOpen = openItem === key
              return (
                <div key={key} className="gr-item">
                  <div className="gr-item-head" onClick={() => setOpenItem(isOpen ? null : key)}>
                    <span className="gr-structure">{item.structure}</span>
                    <div>
                      <p className="gr-meaning">{item.meaning}</p>
                    </div>
                    <span className="gr-toggle">{isOpen ? "▲" : "▼"}</span>
                  </div>
                  <div className={`gr-body ${isOpen ? "open" : ""}`}>
                    <p className="gr-explanation">{item.explanation}</p>
                    <div className="gr-examples">
                      {item.examples.map((ex, j) => (
                        <div key={j} className="gr-ex">
                          <span className="gr-jp">{ex.jp}</span>
                          <span className="gr-es">{ex.es}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <div style={{ height:"2rem" }} />
    </>
  )
}
