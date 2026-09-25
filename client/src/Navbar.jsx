import { useState } from 'react'
import './Navbar.css'

const navigationLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <a className="navbar__logo" href="#inicio" onClick={closeMenu}>
        Hermanos Jota
      </a>

      <nav
        className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}
        id="navbar-links"
        aria-label="Navegación principal"
      >
        {navigationLinks.map(({ label, href }) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>

      <button
        className="navbar__toggle"
        type="button"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </header>
  )
}

export default Navbar