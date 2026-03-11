// KanaStroke.jsx
// Animación de trazos SVG para hiragana y katakana.
// Datos reales de caligrafía: animCJK → kana-svg-data (jsDelivr CDN)
// ViewBox 1024×1024. Bezier curves precisas según orden de trazos japonés.
//
// Uso:
//   <KanaStroke char="あ" size={120} speed={0.7} />
//
// Props:
//   char   — carácter kana (hiragana o katakana)
//   size   — tamaño en px del SVG (default 120)
//   speed  — segundos por trazo (default 0.7)

import { useEffect, useRef, useState, useCallback } from "react"

// ─── CARGA DE DATOS ──────────────────────────────────────────────────────────
// kana-svg-data publica JSON en jsDelivr.
// strokes[].value  → path filled (la forma "gorda" del trazo, tipo tinta)
// clipPaths[].value → línea median del trazo (para la animación dashoffset)
//
// Los IDs de stroke pueden ser "1","2","3a","3b"… (algunos trazos
// que se solapan como あ o ぬ se parten en sub-trazos con sufijo letra).

const CDN_BASE = "https://cdn.jsdelivr.net/npm/kana-svg-data/dist"

function charToUrl(char) {
  const code = char.codePointAt(0)
  const enc  = encodeURIComponent(char)
  // Hiragana: 3040–309F  /  Katakana: 30A0–30FF
  if (code >= 0x3040 && code <= 0x309F) return `${CDN_BASE}/hiragana/${enc}.json`
  if (code >= 0x30A0 && code <= 0x30FF) return `${CDN_BASE}/katakana/${enc}.json`
  return null
}

// Cache en memoria para no re-fetchear el mismo carácter
const dataCache = {}

async function loadCharData(char) {
  if (dataCache[char]) return dataCache[char]
  const url = charToUrl(char)
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    dataCache[char] = json
    return json
  } catch {
    return null
  }
}

// ─── PARSEO DE IDS ───────────────────────────────────────────────────────────
// Agrupa los sub-trazos (3a, 3b, 3c…) en un trazo lógico único.
// Devuelve array de { strokeNum, parts: [{id, strokePath, clipPath}] }

function groupStrokes(charData) {
  const { strokes, clipPaths } = charData

  // Mapa id → paths
  const strokeMap   = {}
  const clipPathMap = {}
  strokes.forEach(s => { strokeMap[s.id] = s.value })
  clipPaths.forEach(c => { clipPathMap[c.id] = c.value })

  // Ordenar IDs respetando el orden original
  const ids = strokes.map(s => s.id)

  // Agrupar: "1" → grupo 1, "3a","3b" → grupo 3
  const groups = []
  const seen   = {}

  ids.forEach(id => {
    const num = parseInt(id, 10)
    if (isNaN(num)) return
    if (seen[num]) {
      seen[num].parts.push({ id, strokePath: strokeMap[id], clipPath: clipPathMap[id] })
    } else {
      const g = { strokeNum: num, parts: [{ id, strokePath: strokeMap[id], clipPath: clipPathMap[id] }] }
      seen[num] = g
      groups.push(g)
    }
  })

  return groups
}

// ─── LONGITUD DE PATH MEDIAN ─────────────────────────────────────────────────
// Los clipPaths de animCJK usan pathLength=3333 en su sistema CSS.
// Usamos ese mismo valor fijo.
const PATH_LENGTH = 3333

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function KanaStroke({ char, size = 120, speed = 0.7 }) {
  const [charData, setCharData]   = useState(null)
  const [loading,  setLoading]    = useState(false)
  const [error,    setError]      = useState(false)
  const [phase,    setPhase]      = useState("idle")  // idle | playing | done
  const [visible,  setVisible]    = useState([])       // índices de grupos ya completos
  const [current,  setCurrent]    = useState(-1)       // índice del grupo animando ahora
  const timers = useRef([])

  // Carga datos cuando cambia el carácter
  useEffect(() => {
    setCharData(null)
    setError(false)
    setLoading(true)
    setPhase("idle")
    setVisible([])
    setCurrent(-1)
    timers.current.forEach(clearTimeout)

    loadCharData(char).then(data => {
      setLoading(false)
      if (!data) { setError(true); return }
      setCharData(data)
    })
    return () => timers.current.forEach(clearTimeout)
  }, [char])

  const play = useCallback(() => {
    if (!charData) return
    const groups = groupStrokes(charData)
    timers.current.forEach(clearTimeout)
    timers.current = []
    setVisible([])
    setCurrent(0)
    setPhase("playing")

    groups.forEach((_, i) => {
      // Cada trazo dura `speed` segundos → al acabar pasa al siguiente
      const t = setTimeout(() => {
        setVisible(v => [...v, i])
        if (i < groups.length - 1) {
          setCurrent(i + 1)
        } else {
          setCurrent(-1)
          setPhase("done")
        }
      }, (i + 1) * speed * 1000)
      timers.current.push(t)
    })
  }, [charData, speed])

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout)
    setVisible([])
    setCurrent(-1)
    setPhase("idle")
  }, [])

  if (loading) return <LoadingBox size={size} />
  if (error || !charData) return null

  const groups = groupStrokes(charData)
  const prefix = `ks${charData.charCode}`

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        style={{
          background: "var(--white, #fff)",
          border: "1px solid var(--border, #e0ddd8)",
          borderRadius: "3px",
          display: "block",
        }}
      >
        {/* Guías cruzadas */}
        <line x1="512" y1="0" x2="512" y2="1024" stroke="rgba(0,0,0,0.04)" strokeWidth="2" />
        <line x1="0"   y1="512" x2="1024" y2="512" stroke="rgba(0,0,0,0.04)" strokeWidth="2" />

        {/* Definiciones de clipPaths */}
        <defs>
          {groups.map((g, gi) =>
            g.parts.map(part => (
              part.clipPath
                ? <clipPath key={`${prefix}cp${part.id}`} id={`${prefix}cp${part.id}`}>
                    <path d={part.strokePath || ""} />
                  </clipPath>
                : null
            ))
          )}
        </defs>

        {/* Trazos */}
        {groups.map((g, gi) => {
          const isDone    = visible.includes(gi)
          const isActive  = current === gi && phase === "playing"
          const isGhost   = !isDone && !isActive

          return g.parts.map(part => {
            if (!part.clipPath && !part.strokePath) return null

            return (
              <g key={`g${gi}p${part.id}`}>
                {/* Sombra de guía (siempre visible, muy tenue) */}
                {part.strokePath && (
                  <path
                    d={part.strokePath}
                    fill="rgba(0,0,0,0.05)"
                  />
                )}

                {/* Trazo animado: se revela con dashoffset sobre el clipPath median */}
                {part.clipPath && (
                  <path
                    d={part.clipPath}
                    clipPath={part.strokePath ? `url(#${prefix}cp${part.id})` : undefined}
                    pathLength={PATH_LENGTH}
                    fill="none"
                    stroke={isDone ? "var(--ink, #16110a)" : isActive ? "var(--red, #c0392b)" : "transparent"}
                    strokeWidth={128}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={isActive ? {
                      strokeDasharray: PATH_LENGTH + 4,
                      strokeDashoffset: 0,
                      animation: `ksReveal${prefix} ${speed * 0.88}s ease forwards`,
                    } : isDone ? {
                      strokeDasharray: "none",
                    } : {
                      strokeDasharray: PATH_LENGTH + 4,
                      strokeDashoffset: PATH_LENGTH + 4,
                    }}
                  />
                )}
              </g>
            )
          })
        })}

        {/* Contador de trazos */}
        {phase !== "idle" && (
          <text
            x="990" y="50"
            textAnchor="end"
            fontSize="60"
            fontFamily="monospace"
            fill="var(--red, #c0392b)"
            opacity="0.6"
          >
            {(visible.length + (phase === "playing" ? 1 : 0))}/{groups.length}
          </text>
        )}

        <style>{`
          @keyframes ksReveal${prefix} {
            from { stroke-dashoffset: ${PATH_LENGTH + 4}; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>

      {/* Botones */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={phase === "playing" ? undefined : play}
          disabled={phase === "playing"}
          style={btnStyle(phase === "playing")}
        >
          {phase === "idle" ? "▶ Ver trazos" : phase === "playing" ? "..." : "▶ Repetir"}
        </button>
        {phase !== "idle" && phase !== "playing" && (
          <button onClick={reset} style={btnSecondary}>✕</button>
        )}
      </div>
    </div>
  )
}

// ─── SUBCOMPONENTES ───────────────────────────────────────────────────────────

function LoadingBox({ size }) {
  return (
    <div style={{
      width: size, height: size,
      border: "1px solid var(--border, #e0ddd8)",
      borderRadius: "3px",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--muted, #999)", fontSize: size * 0.1,
      fontFamily: "monospace",
    }}>
      …
    </div>
  )
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

function btnStyle(disabled) {
  return {
    fontFamily: "var(--mono, monospace)",
    fontSize: ".68rem",
    letterSpacing: ".06em",
    textTransform: "uppercase",
    padding: ".35rem .8rem",
    border: "1px solid var(--border, #e0ddd8)",
    borderRadius: "2px",
    background: disabled ? "var(--paper-dark, #f0ede8)" : "var(--ink, #16110a)",
    color: disabled ? "var(--muted, #999)" : "var(--paper, #faf8f4)",
    cursor: disabled ? "default" : "pointer",
    transition: "all .2s",
  }
}

const btnSecondary = {
  fontFamily: "var(--mono, monospace)",
  fontSize: ".68rem",
  letterSpacing: ".06em",
  textTransform: "uppercase",
  padding: ".35rem .8rem",
  border: "1px solid var(--border, #e0ddd8)",
  borderRadius: "2px",
  background: "transparent",
  color: "var(--muted, #999)",
  cursor: "pointer",
}