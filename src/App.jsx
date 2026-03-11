import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import KanjisPage from './pages/KanjisPage.jsx'
import HiraganaPage from './pages/HiraganaPage.jsx'
import KatakanaPage from './pages/KatakanaPage.jsx'
import GramaticaPage from './pages/GramaticaPage.jsx'
import RecursosPage from './pages/RecursosPage.jsx'
import VocabularioPage from './pages/VocabularioPage.jsx'
import JuegosPage from './pages/JuegosPage.jsx'
import QuizHiragana from './pages/QuizHiragana.jsx'
import QuizKatakana from './pages/QuizKatakana.jsx'
import QuizKanji from './pages/QuizKanji.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas con Layout (nav + footer) */}
        <Route element={<Layout />}>
          <Route path="/"             element={<HomePage />}       />
          <Route path="/hiragana"     element={<HiraganaPage />}   />
          <Route path="/katakana"     element={<KatakanaPage />}   />
          <Route path="/kanjis"       element={<KanjisPage />}     />
          <Route path="/gramatica"    element={<GramaticaPage />}  />
          <Route path="/vocabulario"  element={<VocabularioPage />}/>
          <Route path="/recursos"     element={<RecursosPage />}   />
          <Route path="/juegos"       element={<JuegosPage />}     />
        </Route>

        {/* Rutas de juego SIN Layout (pantalla completa) */}
        <Route path="/juegos/hiragana" element={<QuizHiragana />} />
        <Route path="/juegos/katakana" element={<QuizKatakana />} />
        <Route path="/juegos/kanji"    element={<QuizKanji />}    />
      </Routes>
    </HashRouter>
  )
}
