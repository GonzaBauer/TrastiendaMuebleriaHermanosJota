import { ArrowRight } from "lucide-react";

function Hero({ imageUrl = "/images/imagen-hero-banner.png" }) {
  return (
    <section
      className="grid w-full min-w-0 grid-cols-1 items-center gap-8 bg-alabastro px-page py-section md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12"
      id="inicio"
      aria-labelledby="home-hero-title"
    >
      <div className="mx-auto min-w-0 max-w-[38rem] text-left">
        <h1
          className="m-0 font-brand-serif text-3xl font-medium uppercase leading-[1.2] tracking-[0.1em] text-siena sm:text-4xl lg:text-5xl"
          id="home-hero-title"
        >
          <span className="block">Diseño que trasciende</span>
          <span className="block">en el tiempo</span>
        </h1>
        <p className="mt-5 mb-6 font-brand-sans text-base leading-[1.6] text-text md:mt-6 md:mb-8 md:text-lg">
          Creamos muebles únicos, pensados para convertirse en tu próxima
          herencia{" "}
          <span className="font-medium text-siena underline decoration-1 underline-offset-[0.15em]">
            familiar
          </span>
        </p>
        <a
          className="inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-sm bg-siena px-6 py-3.5 text-center font-brand-sans text-sm font-medium uppercase leading-[1.4] tracking-[0.08em] text-alabastro no-underline transition-colors duration-200 hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vara"
          href="/productos"
          data-view="catalog"
        >
          Explorar la colección{" "}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
        <ul
          className="mt-5 mb-0 flex list-none flex-wrap gap-2.5 p-0 md:mt-6 md:gap-3"
          aria-label="Nuestros valores"
        >
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-salvia bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">
            Sostenible
          </li>
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-siena bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">
            Artesanal
          </li>
          <li className="inline-flex min-h-[36px] items-center rounded-full border border-vara bg-transparent px-[0.8rem] py-[0.35rem] font-brand-sans text-xs leading-[1.3] text-text md:px-4 md:py-[0.4rem] md:text-[0.8rem]">
            Hecho para durar
          </li>
        </ul>
      </div>

      <div className="mx-auto w-full max-w-[42rem] overflow-hidden rounded-sm border border-siena/20 bg-white/30 p-2">
        <div className="bg-alabastro p-2">
          <img
            className="block aspect-[4/3] h-auto w-full object-cover object-center"
            src={imageUrl}
            alt="Living cálido con muebles de madera"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
