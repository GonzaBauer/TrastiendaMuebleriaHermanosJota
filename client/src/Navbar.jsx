import { useState } from 'react'
import { Link } from 'react-router-dom'

const navigationLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Contacto', href: '/contacto' },
]

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 flex w-full min-w-0 items-center justify-between border-b border-[rgba(160,82,45,0.2)] bg-alabastro px-4 py-1.5 md:px-6 md:py-2">
      <Link className="h-10 w-10 shrink-0 ..." to="/" onClick={closeMenu}>
         <img className="h-full w-full object-contain" src="/images/logo.svg" alt="Hermanos Jota" />
         </Link>
      <nav
        className={`md:flex md:items-center md:gap-3 lg:gap-6${menuOpen ? ' absolute inset-x-0 top-full flex max-w-full flex-col gap-1 border-b border-[rgba(160,82,45,0.2)] bg-alabastro px-4 pt-2 pb-4 shadow-[0_4px_6px_rgba(0,0,0,0.08)] md:static md:flex-row md:gap-3 md:border-0 md:bg-transparent md:p-0 md:shadow-none' : ' hidden'}`}
        id="navbar-links"
        aria-label="Navegación principal"
      >
        {navigationLinks.map(({ label, href }) => (
          <Link className="group relative flex min-h-[44px] transform items-center p-1 font-brand-sans text-xs font-medium uppercase tracking-wider text-text no-underline transition-all duration-300 ease-[ease] hover:scale-105 hover:text-siena focus-visible:text-siena focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-siena md:justify-center" key={href} to={href} onClick={closeMenu}>
            <span className="relative inline-block">
              {label}
              <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 bg-vara transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </Link>
        ))}
      </nav>
             <Link
        className="relative ml-auto mr-3 flex h-[44px] shrink-0 items-center gap-1 font-brand-sans text-xs font-medium uppercase tracking-wider text-text no-underline hover:text-siena md:ml-6 md:mr-0"
        to="/carrito"
        aria-label={`Carrito, ${cartCount} productos`}
           >
        <span aria-hidden="true">🛒</span>
        <span className="min-w-[1.25rem] rounded-full bg-siena px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
          {cartCount}
        </span>
      </Link>
      <button
        className="flex h-[44px] w-[44px] shrink-0 flex-col items-center justify-center gap-[5px] rounded-[4px] border border-[rgba(160,82,45,0.35)] bg-transparent p-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-siena md:hidden"
        type="button"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="block h-0.5 w-5 rounded-[1px] bg-siena" aria-hidden="true" />
        <span className="block h-0.5 w-5 rounded-[1px] bg-siena" aria-hidden="true" />
        <span className="block h-0.5 w-5 rounded-[1px] bg-siena" aria-hidden="true" />
      </button>
    </header>
  )
}

export default Navbar