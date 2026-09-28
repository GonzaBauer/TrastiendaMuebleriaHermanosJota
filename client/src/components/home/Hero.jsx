function Hero({ imageUrl = '/images/imagen-hero-banner.png' }) {
  return (
    <section className="grid w-full min-w-0 grid-cols-1 items-center gap-8 bg-alabastro px-4 py-10 md:gap-10 md:px-6 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-16" id="inicio" aria-labelledby="home-hero-title">
      <div className="mx-auto min-w-0 max-w-[38rem] text-left">
        <h1 className="m-0 font-brand-serif text-2xl font-medium uppercase leading-[1.2] tracking-[0.02em] text-siena sm:text-3xl lg:text-4xl" id="home-hero-title">
          <span className="block">Diseño que trasciende</span>
          <span className="block">en el tiempo</span>
        </h1>
        <p className="mt-5 mb-6 font-brand-sans text-base leading-[1.6] text-text md:mt-6 md:mb-8 md:text-lg">
          Creamos muebles únicos, pensados para convertirse en tu próxima
          herencia <span className="font-medium text-siena underline decoration-1 underline-offset-[0.15em]">familiar</span>
        </p>
        <a className="inline-flex min-h-[48px] max-w-full items-center justify-center gap-2 rounded-full bg-siena px-5 py-3.5 text-center font-brand-sans text-xs font-semibold uppercase leading-[1.4] tracking-[0.08em] text-alabastro no-underline transition-all duration-300 ease-[ease] hover:bg-[#8B4726] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-vara md:px-7 md:py-4 md:text-[0.8rem]" href="catalogo">
          Explorar Nuestra Colección <span aria-hidden="true">→</span>
        </a>
        <ul className="mt-5 mb-0 flex list-none flex-wrap gap-2.5 p-0 md:mt-6 md:gap-3" aria-label="Nuestros valores">
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-salvia bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">Sostenible</li>
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-siena bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">Artesanal</li>
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-vara bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">Hecho para durar</li>
        </ul>
      </div>

      <div className="relative isolate mx-auto w-full max-w-[42rem] overflow-hidden rounded-md border border-[#C9A24B]/40 bg-gradient-to-br from-[#8B5A2B] via-[#6F4520] to-[#4A2C14] p-4 shadow-[inset_0_2px_3px_rgba(255,255,255,0.25),inset_0_-2px_3px_rgba(0,0,0,0.35),0_12px_30px_rgba(60,35,15,0.35)] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[repeating-linear-gradient(92deg,rgba(0,0,0,0.08)_0px,rgba(0,0,0,0.08)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(88deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_11px)]">
        <div className="relative z-10 bg-[#F3EADB] p-2">
          <img
            className="block aspect-[4/3] h-auto w-full rounded-[12px] object-cover object-center shadow-[inset_0_0_12px_rgba(0,0,0,0.25)]"
            src={imageUrl}
            alt="Living cálido con muebles de madera"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero