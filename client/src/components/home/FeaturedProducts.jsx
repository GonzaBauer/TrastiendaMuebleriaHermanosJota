function FeaturedProducts({ products = [] }) {
  return (
    <section
      className="w-full bg-alabastro px-4 py-10 md:px-6 lg:px-8 lg:py-12"
      id="catalogo"
      aria-labelledby="featured-products-title"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="group mt-0 mb-8 font-brand-serif text-center text-2xl font-medium uppercase leading-[1.2] tracking-[0.1em] text-siena sm:mb-10 sm:text-3xl" id="featured-products-title">
          <span className="inline-block transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(212,163,72,0.6)]">
            Productos destacados
          </span>
          <span aria-hidden="true" className="mx-auto mt-2 block h-px w-12 bg-vara transition-all duration-300 group-hover:w-24" />
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article className="group relative isolate aspect-[4/5] min-w-0 overflow-hidden rounded-2xl border border-vara bg-gradient-to-b from-[#F3EADB] via-[#F1E8D8] to-[#EEE2CF] shadow-[0_4px_20px_rgba(160,82,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(160,82,45,0.2)]" key={product.nombre}>
                {product.imagen ? (
                  <div className="absolute inset-x-0 top-0 bottom-20 z-0 flex items-center justify-center p-4">
                    <img
                      className="max-h-[85%] w-3/4 object-contain transition-transform duration-500 group-hover:scale-105"
                      src={product.imagen}
                      alt={product.nombre}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <span className="absolute inset-0 z-0 flex items-center justify-center p-4 font-brand-sans text-sm text-[#8B4513]" aria-hidden="true">
                    {product.nombre}
                  </span>
                )}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-left">
                <h3 className="m-0 font-brand-serif text-base font-medium uppercase leading-tight tracking-[0.03em] text-[#8B4513] md:text-lg">{product.nombre}</h3>
                <p className="mt-2 mb-0 flex items-center gap-1.5 font-brand-sans text-[11px] uppercase tracking-widest text-[#A0522D]">
                  Ver detalle
                  <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts