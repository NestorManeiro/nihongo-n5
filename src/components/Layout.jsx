import { NavLink, Outlet } from 'react-router-dom'
import '../styles/global.css'
import styles from './Layout.module.css'
import { useState } from 'react'

const NAV_ITEMS = [
  { to: '/hiragana', label: 'Hiragana' },
  { to: '/katakana', label: 'Katakana' },
  { to: '/kanjis', label: 'Kanjis' },
  { to: '/temario', label: 'Temario' },
  { to: '/gramatica', label: 'Gramática' },
  { to: '/vocabulario', label: 'Vocabulario' },
  { to: '/juegos', label: 'Juegos' },
  { to: '/recursos', label: 'Recursos' },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div>

      {/* NAVBAR */}
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          日本語 <span className={styles.logoSub}>N5</span>
        </NavLink>

        {/* Menú escritorio */}
        <ul className={styles.navList}>
          {NAV_ITEMS.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa móvil */}
        <button className={styles.toggle} onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)} // cierra al hacer click
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* CONTENIDO */}
      <main style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span className={styles.footerJp}>日本語能力試験</span>
        <span>Guía de Estudio N5</span>
      </footer>
    </div>
  )
}