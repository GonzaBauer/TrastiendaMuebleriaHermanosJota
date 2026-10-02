import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const navigationLinks = [
  { label: "Inicio", href: "/", view: "home" },
  { label: "Productos", href: "/productos", view: "catalog" },
  { label: "Contacto", href: "#contacto" },
];

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full min-w-0 items-center justify-between border-b border-siena/20 bg-alabastro px-4 md:px-6">
      <a
        className="flex h-[120px] w-[120px] shrink-0 items-center justify-center"
        href="/"
        data-view="home"
        onClick={closeMenu}
      >
        <img
          className="h-full w-full object-contain"
          src="/images/logo.svg"
          alt="Hermanos Jota"
          width="120"
          height="120"
        />
      </a>
      <nav
        className={`md:flex md:items-center md:gap-3 lg:gap-6${menuOpen ? " absolute inset-x-0 top-full flex max-w-full flex-col gap-1 border-b border-[rgba(160,82,45,0.2)] bg-alabastro px-4 pt-2 pb-4 shadow-[0_4px_6px_rgba(0,0,0,0.08)] md:static md:flex-row md:gap-3 md:border-0 md:bg-transparent md:p-0 md:shadow-none" : " hidden"}`}
        id="navbar-links"
        aria-label="Navegación principal"
      >
        {navigationLinks.map(({ label, href, view }) => (
          <a
            className="group relative flex min-h-[44px] items-center p-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-text no-underline transition-colors duration-200 hover:text-siena focus-visible:text-siena focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-siena md:justify-center"
            key={href}
            href={href}
            data-view={view}
            onClick={closeMenu}
          >
            <span className="relative inline-block">
              {label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-center scale-x-0 bg-vara transition-transform duration-300 group-hover:scale-x-100"
              />
            </span>
          </a>
        ))}
      </nav>
      <a
        className="relative ml-auto mr-3 flex h-[44px] shrink-0 items-center gap-2 font-brand-sans text-xs font-medium uppercase tracking-wider text-text no-underline hover:text-siena focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-siena md:ml-6 md:mr-0"
        href="/carrito"
        data-view="cart"
        aria-label={`Carrito, ${cartCount} productos`}
      >
        <ShoppingBag aria-hidden="true" className="h-5 w-5" />
        <span className="min-w-[1.25rem] rounded-full bg-siena px-1.5 py-0.5 text-center text-[10px] font-bold text-alabastro">
          {cartCount}
        </span>
      </a>
      <button
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-sm border border-siena/35 bg-transparent p-0 text-siena focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-siena md:hidden"
        type="button"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="navbar-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
    </header>
  );
}

export default Navbar;
