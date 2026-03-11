import { useEffect } from "react"
import { Link } from "react-router-dom"

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target) }
      }),
      { threshold: 0.06 }
    )
    document.querySelectorAll(".reveal").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const GAMES = [
  {
    path: "/juegos/hiragana",
    jp: "ひらがな",
    title: "Quiz Hiragana",
    desc: "Practica los 46 caracteres del silabario nativo. Aparece el carácter y tú recuerdas su sonido.",
    count: "46 caracteres",
    color: "#9e2a2a",
    emoji: "あ",
  },
  {
    path: "/juegos/katakana",
    jp: "カタカナ",
    title: "Quiz Katakana",
    desc: "Entrena los 46 caracteres angulares usados para palabras extranjeras.",
    count: "46 caracteres",
    color: "#5c7a9a",
    emoji: "ア",
  },
  {
    path: "/juegos/kanji",
    jp: "漢字",
    title: "Quiz Kanji N5",
    desc: "Memoriza los 103 kanjis del N5 con su significado y lecturas.",
    count: "103 kanjis",
    color: "#7a5c00",
    emoji: "字",
  },
]

export default function JuegosPage() {
  useReveal()

  return (
    <>
      <style>{`
        .jg-hero {
          text-align:center; padding: var(--space-20) var(--space-12) var(--space-12);
          border-bottom:1px solid var(--border);
          background:linear-gradient(180deg,rgba(158,42,42,.04) 0%,transparent 100%);
          position:relative;
        }
        .jg-hero::before {
          content:""; position:absolute; inset:0;
          background-image:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(22,17,10,.025) 28px,rgba(22,17,10,.025) 29px);
          pointer-events:none;
        }
        .jg-super {
          font-family:var(--jp); font-size: var(--text-3xl);
          letter-spacing:.45em; color:var(--red);
          display:block; margin-bottom:.5rem; position:relative;
        }
        .jg-hero h1 {
          font-family:var(--serif); font-size: var(--text-xl);
          font-weight:600; position:relative;
        }
        .jg-sub {
          color:var(--muted); font-size: var(--text-base);
          font-style:italic; position:relative; margin-top:.3rem;
        }

        .jg-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit, minmax(17rem, 1fr));
          gap:1.5rem;
          max-width:900px; margin:4rem auto;
          padding:0 var(--space-12);
        }

        .jg-card {
          background:var(--white); border:1px solid var(--border);
          border-radius:4px; overflow:hidden;
          text-decoration:none; color:var(--ink);
          display:flex; flex-direction:column;
          transition:transform .2s, box-shadow .2s;
        }
        .jg-card:hover {
          transform:translateY(-5px);
          box-shadow:0 14px 40px rgba(22,17,10,.13);
        }
        .jg-card-top {
          height:7rem;
          display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden;
        }
        .jg-card-bg {
          position:absolute; inset:0;
          opacity:.08;
          background-image:repeating-linear-gradient(45deg,currentColor 0,currentColor 1px,transparent 0,transparent 50%);
          background-size:8px 8px;
        }
        .jg-card-char {
          font-family:var(--jp); font-size:3.5rem;
          line-height:1; position:relative; z-index:1;
          opacity:.15; user-select:none;
        }
        .jg-card-jp {
          font-family:var(--jp); font-size:var(--text-lg);
          position:absolute; left:50%; top:50%;
          transform:translate(-50%,-50%);
          z-index:2; letter-spacing:.15em;
        }
        .jg-card-body { padding:1.4rem 1.6rem 1.8rem; flex:1; display:flex; flex-direction:column; gap:.5rem; }
        .jg-card-count {
          font-family:var(--mono); font-size:var(--text-xs);
          letter-spacing:.12em; text-transform:uppercase;
        }
        .jg-card-title {
          font-family:var(--serif); font-size:var(--text-lg);
          font-weight:700; line-height:1.2;
        }
        .jg-card-desc {
          font-size:var(--text-sm); color:var(--muted);
          font-style:italic; line-height:1.65; flex:1;
        }
        .jg-card-cta {
          display:inline-flex; align-items:center; gap:.4rem;
          font-family:var(--mono); font-size:var(--text-xs);
          text-transform:uppercase; letter-spacing:.1em;
          margin-top:.8rem;
        }

        .jg-note {
          max-width:900px; margin:0 auto 4rem;
          padding:0 var(--space-12);
          font-family:var(--mono); font-size:var(--text-xs);
          color:var(--muted); letter-spacing:.05em;
          border-top:1px solid var(--border); padding-top:1.5rem;
        }

        @media(max-width:600px) {
          .jg-grid, .jg-note { padding-left:1rem; padding-right:1rem; }
          .jg-hero { padding:4rem 1.5rem 2rem; }
        }
      `}</style>

      <div className="jg-hero">
        <span className="jg-super">練習</span>
        <h1>Juegos de Práctica</h1>
        <p className="jg-sub">Flashcards interactivas · Elige un modo y empieza</p>
      </div>

      <div className="jg-grid">
        {GAMES.map(g => (
          <Link key={g.path} to={g.path} className="jg-card">
            <div className="jg-card-top" style={{ color: g.color, background: `${g.color}10` }}>
              <div className="jg-card-bg" style={{ color: g.color }} />
              <span className="jg-card-char">{g.emoji}</span>
              <span className="jg-card-jp" style={{ color: g.color }}>{g.jp}</span>
            </div>
            <div className="jg-card-body">
              <span className="jg-card-count" style={{ color: g.color }}>{g.count}</span>
              <div className="jg-card-title">{g.title}</div>
              <div className="jg-card-desc">{g.desc}</div>
              <span className="jg-card-cta" style={{ color: g.color }}>
                Empezar →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="jg-note">
        Más juegos próximamente — dictado, construcción de frases, kanji inverso...
      </div>
    </>
  )
}
