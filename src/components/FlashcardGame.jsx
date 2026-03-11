// FlashcardGame.jsx — motor de flashcards reutilizable
// Props:
//   title        string        — "Quiz Hiragana"
//   titleJp      string        — "ひらがな"
//   accentColor  string        — "#9e2a2a"
//   cards        [{front, back, sub?}]
//     front: lo que se muestra primero (el kana/kanji)
//     back:  la respuesta (romaji / significado)
//     sub:   línea secundaria opcional (ej. on/kun para kanji)

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

const FLIP_DURATION = 400 // ms

export default function FlashcardGame({ title, titleJp, accentColor = "#9e2a2a", cards }) {
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [flipping, setFlipping] = useState(false)
  const [result, setResult] = useState(null)   // "ok" | "fail" | null
  const [done, setDone] = useState(false)
  const [stats, setStats] = useState({ ok: 0, fail: 0 })
  const [started, setStarted] = useState(false)

  // Barajar
  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

  const initDeck = useCallback(() => {
    setDeck(shuffle(cards))
    setIndex(0)
    setFlipped(false)
    setFlipping(false)
    setResult(null)
    setDone(false)
    setStats({ ok: 0, fail: 0 })
    setStarted(true)
  }, [cards])

  const doFlip = () => {
    if (flipping || flipped) return
    setFlipping(true)
    setTimeout(() => {
      setFlipped(true)
      setFlipping(false)
    }, FLIP_DURATION / 2)
  }

const next = (verdict) => {
  if (!flipped) return

  setResult(verdict)
  setStats(s => ({ ...s, [verdict]: s[verdict] + 1 }))

  // Etapa flip out
  setFlipped(false)
  setFlipping(true)

  setTimeout(() => {
    // Cambiar tarjeta justo cuando la tarjeta está a 90°
    if (index + 1 >= deck.length) {
      setDone(true)
      setFlipping(false)
      setResult(null)
    } else {
      setIndex(i => i + 1)
      // Flip in tarjeta nueva
      setFlipping(false)
    }
  }, FLIP_DURATION / 2)
}

  // Teclado
  useEffect(() => {
    const handler = (e) => {
      if (!started || done) return
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); doFlip() }
      if (e.key === "ArrowRight" || e.key === "1") next("ok")
      if (e.key === "ArrowLeft" || e.key === "2") next("fail")
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [started, done, flipped, index])

  const card = deck[index]
  const progress = deck.length > 0 ? ((index) / deck.length) * 100 : 0

  return (
    <>
      <style>{`
        .fg-wrap {
          min-height: 100vh;
          display: flex; flex-direction: column;
          background: var(--paper);
        }

        /* Header */
        .fg-header {
          display:flex; align-items:center; justify-content:space-between;
          padding: var(--space-4) var(--space-8);
          border-bottom:1px solid var(--border);
          background:var(--white);
        }
        .fg-back {
          font-family:var(--mono); font-size:var(--text-xs);
          text-transform:uppercase; letter-spacing:.1em;
          color:var(--muted); text-decoration:none;
          display:flex; align-items:center; gap:.4rem;
          transition:color .18s;
        }
        .fg-back:hover { color:var(--ink); }
        .fg-htitle {
          font-family:var(--jp); font-size:var(--text-md);
          color:var(--ink); letter-spacing:.15em;
        }
        .fg-hstats {
          font-family:var(--mono); font-size:var(--text-xs);
          display:flex; gap:1rem;
        }
        .fg-ok   { color:#5c7a4a; }
        .fg-fail { color:var(--red); }

        /* Progress bar */
        .fg-progress {
          height:3px; background:var(--paper-dark);
          position:relative; overflow:hidden;
        }
        .fg-bar {
          position:absolute; left:0; top:0; bottom:0;
          transition:width .4s ease;
        }

        /* Main area */
        .fg-main {
          flex:1; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          padding:var(--space-8) var(--space-4);
          gap:var(--space-8);
        }

        /* Counter */
        .fg-counter {
          font-family:var(--mono); font-size:var(--text-sm);
          color:var(--muted); letter-spacing:.08em;
        }

        /* Card flip container */
        .fg-scene {
          width: min(22rem, 90vw);
          height: min(16rem, 55vw);
          perspective: 1000px;
          cursor: pointer;
        }
        .fg-card-inner {
          width:100%; height:100%;
          position:relative;
          transform-style: preserve-3d;
          transition: transform ${FLIP_DURATION}ms cubic-bezier(.4,0,.2,1);
        }
        .fg-card-inner.is-flipped {
          transform: rotateY(180deg);
        }
        .fg-card-inner.is-flipping-front {
          transform: rotateY(-90deg);
        }
        .fg-face {
          position:absolute; inset:0;
          backface-visibility:hidden;
          -webkit-backface-visibility:hidden;
          border-radius:6px;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:var(--space-2);
          border:1px solid var(--border);
          box-shadow:0 8px 32px rgba(22,17,10,.1);
          transition: box-shadow .2s;
          user-select:none;
        }
        .fg-face:hover { box-shadow:0 12px 40px rgba(22,17,10,.16); }
        .fg-front {
          background:var(--white);
        }
        .fg-back-face {
          background:var(--white);
          transform: rotateY(180deg);
        }

        /* Result flash */
        .fg-face.result-ok   { border-color:#5c7a4a; box-shadow:0 0 0 2px #5c7a4a40; }
        .fg-face.result-fail { border-color:var(--red); box-shadow:0 0 0 2px #9e2a2a40; }

        .fg-front-char {
          font-family:var(--jp); font-size: clamp(3.5rem, 12vw, 5rem);
          line-height:1; color:var(--ink);
        }
        .fg-hint {
          font-family:var(--mono); font-size:var(--text-xs);
          color:var(--muted); letter-spacing:.1em; text-transform:uppercase;
          margin-top:var(--space-4);
        }

        .fg-back-main {
          font-family:var(--mono); font-size: clamp(1.4rem, 5vw, 2rem);
          color:var(--ink); letter-spacing:.05em;
        }
        .fg-back-sub {
          font-family:var(--jp); font-size:var(--text-md);
          color:var(--muted); margin-top:var(--space-1);
          text-align:center; padding:0 var(--space-4);
          line-height:1.5;
        }
        .fg-back-char {
          font-family:var(--jp); font-size:clamp(2.5rem, 8vw, 3.5rem);
          color:var(--muted); opacity:.25;
          position:absolute; bottom:var(--space-3); right:var(--space-4);
        }

        /* Buttons */
        .fg-btns {
          display:flex; gap:var(--space-4);
          width: min(22rem, 90vw);
        }
        .fg-btn {
          flex:1; padding:var(--space-4) var(--space-4);
          border-radius:4px; border:1px solid var(--border);
          font-family:var(--mono); font-size:var(--text-xs);
          text-transform:uppercase; letter-spacing:.1em;
          cursor:pointer; transition:all .18s;
          display:flex; flex-direction:column; align-items:center; gap:var(--space-1);
          background:var(--white);
        }
        .fg-btn:disabled { opacity:.35; cursor:default; }
        .fg-btn-ok:not(:disabled):hover  { background:#5c7a4a; color:#fff; border-color:#5c7a4a; }
        .fg-btn-fail:not(:disabled):hover { background:var(--red); color:#fff; border-color:var(--red); }
        .fg-btn .fg-kbd {
          font-size:var(--text-xs); opacity:.5;
          border:1px solid currentColor; border-radius:2px;
          padding:.05rem .3rem; line-height:1.4;
        }

        /* Flip cta when not yet flipped */
        .fg-flip-cta {
          width: min(22rem, 90vw);
          padding:var(--space-4);
          border-radius:4px; border:1px solid var(--border);
          font-family:var(--mono); font-size:var(--text-sm);
          text-transform:uppercase; letter-spacing:.1em;
          cursor:pointer; transition:all .18s;
          background:var(--ink); color:var(--paper);
          text-align:center;
        }
        .fg-flip-cta:hover { background:var(--red); }

        .fg-keyboard-hint {
          font-family:var(--mono); font-size:var(--text-xs);
          color:var(--muted); text-align:center; opacity:.6;
        }

        /* Start screen */
        .fg-start {
          flex:1; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:var(--space-6); padding:var(--space-8);
          text-align:center;
        }
        .fg-start-char {
          font-family:var(--jp); font-size:clamp(4rem, 15vw, 7rem);
          line-height:1; opacity:.12;
        }
        .fg-start h2 {
          font-family:var(--serif); font-size:var(--text-xl);
          font-weight:600; margin-top:calc(-1 * var(--space-16));
        }
        .fg-start p {
          font-size:var(--text-base); color:var(--muted);
          font-style:italic; max-width:28rem;
        }
        .fg-start-btn {
          padding:var(--space-4) var(--space-12);
          border-radius:4px; border:none;
          font-family:var(--mono); font-size:var(--text-sm);
          text-transform:uppercase; letter-spacing:.12em;
          cursor:pointer; transition:all .2s;
          color:var(--paper);
        }
        .fg-start-btn:hover { filter:brightness(1.15); }

        /* Done screen */
        .fg-done {
          flex:1; display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:var(--space-6); padding:var(--space-8);
          text-align:center;
        }
        .fg-done h2 {
          font-family:var(--serif); font-size:var(--text-xl); font-weight:600;
        }
        .fg-done-stats {
          display:flex; gap:var(--space-8);
        }
        .fg-done-stat {
          display:flex; flex-direction:column; align-items:center; gap:.2rem;
        }
        .fg-done-num {
          font-family:var(--serif); font-size:var(--text-2xl); font-weight:700;
          line-height:1;
        }
        .fg-done-label {
          font-family:var(--mono); font-size:var(--text-xs);
          text-transform:uppercase; letter-spacing:.1em; color:var(--muted);
        }
        .fg-done-pct {
          font-family:var(--mono); font-size:var(--text-sm); color:var(--muted);
        }
        .fg-done-btns {
          display:flex; gap:var(--space-4); flex-wrap:wrap; justify-content:center;
        }
        .fg-done-btn {
          padding:var(--space-3) var(--space-8);
          border-radius:4px; border:1px solid var(--border);
          font-family:var(--mono); font-size:var(--text-xs);
          text-transform:uppercase; letter-spacing:.1em;
          cursor:pointer; transition:all .18s;
          background:var(--white); color:var(--ink);
        }
        .fg-done-btn:hover { background:var(--ink); color:var(--paper); }
        .fg-done-btn.primary { color:var(--paper); border:none; }
        .fg-done-btn.primary:hover { filter:brightness(1.15); }
      `}</style>

      <div className="fg-wrap">
        {/* Header */}
        <div className="fg-header">
          <Link to="/juegos" className="fg-back">← Juegos</Link>
          <span className="fg-htitle">{titleJp}</span>
          <div className="fg-hstats">
            <span className="fg-ok">✓ {stats.ok}</span>
            <span className="fg-fail">✗ {stats.fail}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="fg-progress">
          <div className="fg-bar" style={{ width: `${progress}%`, background: accentColor }} />
        </div>

        {/* Start */}
        {!started && (
          <div className="fg-start">
            <div className="fg-start-char">{titleJp}</div>
            <h2>{title}</h2>
            <p>{cards.length} tarjetas · orden aleatorio · haz clic para revelar la respuesta</p>
            <button
              className="fg-start-btn"
              style={{ background: accentColor }}
              onClick={initDeck}
            >
              Empezar
            </button>
          </div>
        )}

        {/* Done */}
        {done && (
          <div className="fg-done">
            <h2>¡Ronda completada!</h2>
            <div className="fg-done-stats">
              <div className="fg-done-stat">
                <span className="fg-done-num" style={{ color: "#5c7a4a" }}>{stats.ok}</span>
                <span className="fg-done-label">Correctas</span>
              </div>
              <div className="fg-done-stat">
                <span className="fg-done-num" style={{ color: "#9e2a2a" }}>{stats.fail}</span>
                <span className="fg-done-label">A repasar</span>
              </div>
            </div>
            <p className="fg-done-pct">
              {Math.round((stats.ok / (stats.ok + stats.fail)) * 100)}% correcto
            </p>
            <div className="fg-done-btns">
              <button className="fg-done-btn primary" style={{ background: accentColor }} onClick={initDeck}>
                Otra ronda
              </button>
              <Link to="/juegos" className="fg-done-btn">Volver a juegos</Link>
            </div>
          </div>
        )}

        {/* Game */}
        {started && !done && card && (
          <div className="fg-main">
            <span className="fg-counter">
              {index + 1} / {deck.length}
            </span>

            {/* Flashcard */}
            <div className="fg-scene" onClick={doFlip}>
              <div className={`fg-card-inner ${flipped ? "is-flipped" : ""} ${flipping && !flipped ? "is-flipping-front" : ""}`}>
                {/* Frente */}
                <div className={`fg-face fg-front ${result ? `result-${result}` : ""}`}>
                  <span className="fg-front-char">{card.front}</span>
                  {!flipped && (
                    <span className="fg-hint">
                      {flipping ? "…" : "clic para revelar"}
                    </span>
                  )}
                </div>

                {/* Reverso */}
                <div className={`fg-face fg-back-face ${result ? `result-${result}` : ""}`}>
                  <span className="fg-back-main">{card.back}</span>
                  {card.sub && <span className="fg-back-sub">{card.sub}</span>}
                  <span className="fg-back-char">{card.front}</span>
                </div>
              </div>
            </div>

            {/* Botones */}
            {flipped ? (
              <div className="fg-btns">
                <button
                  className="fg-btn fg-btn-fail"
                  onClick={() => next("fail")}
                >
                  <span>✗ A repasar</span>
                  <span className="fg-kbd">←</span>
                </button>
                <button
                  className="fg-btn fg-btn-ok"
                  onClick={() => next("ok")}
                >
                  <span>✓ Lo sabía</span>
                  <span className="fg-kbd">→</span>
                </button>
              </div>
            ) : (
              <button className="fg-flip-cta" onClick={doFlip}>
                Revelar respuesta
              </button>
            )}

            <p className="fg-keyboard-hint">
              Espacio = revelar · ← no sabía · → lo sabía
            </p>
          </div>
        )}
      </div>
    </>
  )
}
