function Footer() {
  return (
    <footer className="mt-auto w-full bg-siena px-4 py-6 text-left text-alabastro md:px-6 lg:px-8" id="contacto">
      <div className="mx-auto flex w-full max-w-[1126px] flex-col items-center gap-3 text-center">
        <address className="flex max-w-full flex-col items-center gap-1 italic">
          <p className="[overflow-wrap:anywhere] font-brand-sans text-[0.9rem] leading-[1.5]">Av. San Juan 2847 - C1232AAB — Barrio de San Cristóbal - Ciudad Autónoma de Buenos Aires Argentina</p>
          <a className="[overflow-wrap:anywhere] font-brand-sans text-[0.9rem] leading-[1.5] text-alabastro no-underline transition-all duration-300 ease-[ease] hover:text-white hover:underline hover:underline-offset-[0.2em] focus-visible:text-white focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-alabastro" href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
          <a className="[overflow-wrap:anywhere] font-brand-sans text-[0.9rem] leading-[1.5] text-alabastro no-underline transition-all duration-300 ease-[ease] hover:text-white hover:underline hover:underline-offset-[0.2em] focus-visible:text-white focus-visible:underline focus-visible:underline-offset-[0.2em] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-alabastro" href="https://wa.me/541112345678">+54 11 1234-5678</a>
        </address>
        <p className="mt-0 font-brand-sans text-[0.8rem] leading-[1.6] opacity-[0.85]">
          © 2026 Mueblería Hermanos Jota. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer;