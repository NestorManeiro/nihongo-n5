import { useEffect } from "react"

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

// ─── APUNTES / GUÍAS ──────────────────────────────
const RESOURCES = [
  {
    name: "Gramática y Vocabulario N5",
    desc: "Apuntes completos basados en Genki 1: vocabulario, gramática y expresiones de las lecciones del N5.",
    href: "gramaticavocabulario-1.pdf",
    cta: "Descargar PDF",
    available: true,
  },
  {
    name: "Lógica del idioma japonés",
    desc: "Guía conceptual completa: sistemas de escritura, partículas, conjugaciones, adjetivos, contadores y mucho más.",
    href: "logica-n5.pdf",
    cta: "Descargar PDF",
    available: true,
  },
]

// ─── LIBROS DE TEXTO ────────────────────────────────────────────────────────

const BOOKS = [
  {
    name: "Genki I – Textbook",
    level: "N5 completo",
    levelColor: "#7a9a5c",
    desc: "El libro de texto más usado para aprender japonés desde cero. Incluye todo el N5: hiragana, katakana, 23 lecciones de gramática y vocabulario esencial.",
    note: "Base sólida para empezar a estudiar japonés.",
    href: "https://www.amazon.com/dp/4789014401", // ejemplo Amazon
    cta: "Ver en Amazon",
    available: true,
  },
  {
    name: "Genki I – Workbook",
    level: "N5 completo",
    levelColor: "#7a9a5c",
    desc: "Libro de ejercicios correspondiente a Genki I para practicar gramática, vocabulario y kanjis.",
    note: "Perfecto para complementar el textbook.",
    href: "https://www.amazon.com/dp/478901441X",
    cta: "Ver en Amazon",
    available: true,
  },
  {
    name: "Genki II – Textbook",
    level: "N4 completo",
    levelColor: "#5c7a9a",
    desc: "Continuación de Genki I. Incluye conjugaciones avanzadas, vocabulario intermedio y estructuras complejas.",
    note: "Se recomienda haber completado Genki I antes.",
    href: "https://www.amazon.com/dp/4789014428",
    cta: "Ver en Amazon",
    available: true,
  },
  {
    name: "Genki II – Workbook",
    level: "N4 completo",
    levelColor: "#5c7a9a",
    desc: "Libro de ejercicios de Genki II.",
    note: "Complementa el textbook para práctica intensiva.",
    href: "https://www.amazon.com/dp/4789014436",
    cta: "Ver en Amazon",
    available: true,
  },
  {
    name: "Kanji Look and Learn",
    level: "N5 Kanji",
    levelColor: "#9a5c7a",
    desc: "Libro de kanjis con ilustraciones y mnemotecnias para facilitar la memorización de los 103 kanjis del N5.",
    note: "Excelente para repasar y aprender kanjis visualmente.",
    href: "https://www.amazon.com/dp/4789014444",
    cta: "Ver en Amazon",
    available: true,
  },
  {
    name: "Kanji Look and Learn – Answers",
    level: "N5 Kanji",
    levelColor: "#9a5c7a",
    desc: "Soluciones y respuestas del libro de kanjis.",
    note: "Muy útil para comprobar ejercicios y practicar.",
    href: "https://www.amazon.com/dp/4789014452",
    cta: "Ver en Amazon",
    available: true,
  },
]

// ─── HERRAMIENTAS EXTERNAS ───────────────────────────────────────────────────

const EXTERNAL = [
  {
    name: "Jisho.org",
    desc: "El mejor diccionario japonés online. Busca palabras, kanjis y frases. Tiene sistema de radicales para buscar kanjis que no sabes leer — imprescindible.",
    url: "https://jisho.org",
    tag: "Diccionario",
  },
  {
    name: "Anki",
    desc: "Repetición espaciada. El método más eficaz para memorizar vocabulario a largo plazo. Hay mazos de N5 ya preparados para descargar gratis en AnkiWeb.",
    url: "https://apps.ankiweb.net",
    tag: "Repaso",
  },
]

// ─── MEDIA ───────────────────────────────────────────────────────────────────

const MEDIA = [
  {
    name: "Crystal Hunters",
    tag: "Manga",
    desc: "Manga diseñado específicamente para aprender japonés desde cero. Furigana en todos los kanjis, vocabulario controlado y una historia que engancha. Uno de los mejores puntos de entrada para leer japonés real.",
    links: [
      { label: "Leer gratis online", url: "https://www.crystalhuntersmanga.com" },
    ],
    emoji: "📖",
  },
  {
    name: "Wagotabi — Japanese Journey",
    tag: "Videojuego",
    desc: "Juego de rol diseñado para aprender japonés. Practica vocabulario, kanjis y frases reales en un contexto de aventura.",
    links: [
      { label: "Steam", url: "https://store.steampowered.com/app/2701720/Wagotabi_A_Japanese_Journey/" },
      { label: "App Store", url: "https://play.google.com/store/apps/details?id=com.WagotabiLimited.Wagotabi" },
      { label: "Google Play", url: "https://apps.apple.com/us/app/wagotabi-learn-japanese/id6474207287" },
    ],
    emoji: "🎮",
  },
  {
    name: "Duolingo — Japonés",
    tag: "App",
    desc: "El curso de japonés de Duolingo es uno de los más completos de la plataforma. Buen complemento para repasar vocabulario y hiragana/katakana en pequeñas dosis diarias. Disponible en iOS y Android.",
    links: [
      { label: "App Store", url: "https://apps.apple.com/app/duolingo-language-lessons/id570060128" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.duolingo" },
    ],
    emoji: "🦉",
  },
]

export default function RecursosPage() {
  useReveal()

  return (
    <>
      <style>{`
        .rc { background:var(--white); padding:1.8rem 2rem; display:flex; flex-direction:column; gap:.6rem; transition:background .18s; }
        .rc:hover { background:var(--paper-dark); }
        .rc-type { font-family:var(--mono); font-size:.63rem; letter-spacing:.15em; text-transform:uppercase; color:var(--red); }
        .rc-name { font-weight:600; font-size:1.05rem; }
        .rc-desc { font-style:italic; font-size:.85rem; color:var(--muted); flex:1; line-height:1.65; }
        .rc-btn {
          display:inline-flex; align-items:center; gap:.5rem;
          font-family:var(--mono); font-size:.7rem; letter-spacing:.08em; text-transform:uppercase;
          color:var(--ink); border:1px solid var(--border); padding:.5rem .9rem;
          width:fit-content; border-radius:2px; transition:all .18s; margin-top:.4rem;
          text-decoration:none; cursor:pointer; background:transparent;
        }
        .rc-btn:hover { background:var(--ink); color:var(--paper); border-color:var(--ink); }
        .rc-btn.disabled { opacity:.4; pointer-events:none; }

        .book-card {
          background:var(--white); border:1px solid var(--border);
          padding:1.6rem 2rem; display:grid;
          grid-template-columns:1fr auto; gap:1.5rem;
          align-items:start; transition:background .18s;
        }
        .book-card:hover { background:var(--paper-dark); }
        .book-name { font-family:var(--serif); font-weight:700; font-size:1.3rem; margin-bottom:.4rem; }
        .book-level {
          display:inline-block; font-family:var(--mono); font-size:.65rem;
          letter-spacing:.12em; text-transform:uppercase;
          padding:.15rem .6rem; border-radius:20px; color:#fff;
          margin-bottom:.6rem;
        }
        .book-desc { font-size:.88rem; color:var(--muted); font-style:italic; line-height:1.7; margin-bottom:.5rem; }
        .book-note { font-family:var(--mono); font-size:.68rem; color:var(--muted); border-left:2px solid var(--border); padding-left:.7rem; margin-top:.4rem; }

        .ext-card { background:var(--white); border-bottom:1px solid var(--border); padding:1.4rem 1.8rem; display:grid; grid-template-columns:auto 1fr; gap:1.2rem; align-items:start; transition:background .18s; }
        .ext-card:hover { background:var(--paper-dark); }
        .ext-card:last-child { border-bottom:none; }
        .ext-tag { font-family:var(--mono); font-size:.62rem; color:var(--muted); letter-spacing:.08em; text-transform:uppercase; white-space:nowrap; padding-top:.2rem; min-width:5rem; }
        .ext-name { font-weight:600; margin-bottom:.3rem; }
        .ext-desc { font-size:.85rem; color:var(--muted); font-style:italic; line-height:1.65; margin-bottom:.5rem; }
        .ext-link { font-family:var(--mono); font-size:.7rem; color:var(--muted); letter-spacing:.04em; text-decoration:none; transition:color .18s; }
        .ext-link:hover { color:var(--ink); }

        .media-card {
          background:var(--white); border:1px solid var(--border);
          padding:1.6rem 1.8rem; display:grid;
          grid-template-columns:3rem 1fr; gap:1.2rem;
          align-items:start; transition:background .18s;
        }
        .media-card:hover { background:var(--paper-dark); }
        .media-emoji { font-size:2rem; line-height:1; padding-top:.15rem; }
        .media-tag { font-family:var(--mono); font-size:.62rem; color:var(--red); letter-spacing:.12em; text-transform:uppercase; margin-bottom:.3rem; }
        .media-name { font-weight:600; font-size:1.05rem; margin-bottom:.4rem; }
        .media-desc { font-size:.85rem; color:var(--muted); font-style:italic; line-height:1.65; margin-bottom:.8rem; }
        .media-links { display:flex; gap:.6rem; flex-wrap:wrap; }
        .media-link {
          font-family:var(--mono); font-size:.68rem; letter-spacing:.06em;
          color:var(--ink); border:1px solid var(--border); padding:.35rem .75rem;
          border-radius:2px; transition:all .18s; text-decoration:none;
        }
        .media-link:hover { background:var(--ink); color:var(--paper); border-color:var(--ink); }

        @media(max-width:768px) {
          .ext-card { grid-template-columns:1fr; }
          .media-card { grid-template-columns:1fr; }
          .book-card { grid-template-columns:1fr; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "5rem 3rem 3rem", borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px)", pointerEvents: "none" }} />
        <span style={{ fontFamily: "var(--jp)", fontSize: "2.8rem", letterSpacing: ".45em", color: "var(--red)", display: "block", marginBottom: ".5rem", position: "relative" }}>資料</span>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 600, position: "relative" }}>Recursos</h1>
        <p style={{ color: "var(--muted)", fontSize: ".9rem", fontStyle: "italic", position: "relative", marginTop: ".3rem" }}>Materiales de estudio, herramientas y entretenimiento en japonés</p>
      </div>

      {/* MATERIALES INTERNOS / APUNTES */}
      <section className="page-section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Apuntes y Guías</p>
          <h2 className="section-title">Descarga tus PDFs</h2>
          <div className="divider" />
          <p className="section-sub">Material de estudio listo para descargar y consultar offline.</p>
        </div>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {RESOURCES.map(r => (
            <div key={r.name} className="book-card">
              <div>
                <div className="book-name">{r.name}</div>
                <p className="book-desc">{r.desc}</p>
              </div>
              <div style={{ paddingTop: ".3rem" }}>
                <a href={r.href} download className="rc-btn">↓ {r.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIBROS DE TEXTO */}
      <section className="page-section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Libros de texto</p>
          <h2 className="section-title">Genki I y Genki II</h2>
          <div className="divider" />
          <p className="section-sub">La serie Genki es el estándar en universidades de todo el mundo para aprender japonés. Dos libros cubren del N5 al N4 completo.</p>
        </div>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {BOOKS.map(b => (
            <div key={b.name} className="book-card">
              <div>
                <div className="book-name">{b.name}</div>
                <span className="book-level" style={{ background: b.levelColor }}>{b.level}</span>
                <p className="book-desc">{b.desc}</p>
                <p className="book-note">{b.note}</p>
              </div>
              <div style={{ paddingTop: ".3rem" }}>
                {b.available ? (
                  <a href={b.href} download className="rc-btn">↓ {b.cta}</a>
                ) : (
                  <span className="rc-btn disabled">No disponible</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HERRAMIENTAS */}
      <section className="page-section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="reveal">
          <p className="section-label">Herramientas</p>
          <h2 className="section-title">Diccionario y repaso</h2>
          <div className="divider" />
          <p className="section-sub">Las dos herramientas externas que más vas a necesitar.</p>
        </div>
        <div className="reveal" style={{ border: "1px solid var(--border)" }}>
          {EXTERNAL.map(e => (
            <div key={e.name} className="ext-card">
              <span className="ext-tag">{e.tag}</span>
              <div>
                <p className="ext-name">{e.name}</p>
                <p className="ext-desc">{e.desc}</p>
                <a href={e.url} target="_blank" rel="noreferrer" className="ext-link">
                  {e.url.replace("https://", "")} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEDIA */}
      <section className="page-section">
        <div className="reveal">
          <p className="section-label">Entretenimiento</p>
          <h2 className="section-title">Aprende mientras disfrutas</h2>
          <div className="divider" />
          <p className="section-sub">Manga, videojuegos y apps diseñados para aprender japonés de verdad.</p>
        </div>
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {MEDIA.map(m => (
            <div key={m.name} className="media-card">
              <div className="media-emoji">{m.emoji}</div>
              <div>
                <div className="media-tag">{m.tag}</div>
                <div className="media-name">{m.name}</div>
                <div className="media-desc">{m.desc}</div>
                <div className="media-links">
                  {m.links.map(l => (
                    <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="media-link">
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
