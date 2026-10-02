function CatalogProductCard({
  category,
  title,
  description,
  price,
  imageUrl,
  isFeatured,
  onSelect,
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-siena/20 bg-white/50 shadow-surface transition-colors duration-200 hover:border-siena/60">
      <div>
        <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center bg-alabastro p-4">
          <img
            className="h-full w-full object-contain"
            src={imageUrl}
            alt={title}
            width="1024"
            height="1024"
            loading="lazy"
          />
        </div>
        <div className="space-y-1.5 p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-siena/30 bg-alabastro px-3 py-1 font-brand-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-siena">
              {category}
            </span>
            {isFeatured && (
              <span className="rounded-sm border border-vara/50 bg-vara/10 px-3 py-1 font-brand-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-siena">
                Destacado
              </span>
            )}
          </div>
          <h2 className="font-brand-serif text-xl uppercase leading-snug text-siena">
            {title}
          </h2>
          <p className="line-clamp-3 font-brand-sans text-sm font-normal normal-case leading-relaxed text-text">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-auto px-4 pb-4">
        <hr
          aria-hidden="true"
          className="my-3 border-0 border-t border-siena/15"
        />

        <div className="flex items-center justify-between gap-3">
          <p className="font-brand-sans text-sm font-bold text-text">
            ${" "}
            {new Intl.NumberFormat("es-AR", {
              maximumFractionDigits: 0,
            }).format(price)}
          </p>
          {onSelect && (
            <button
              className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border-0 bg-transparent px-2 font-brand-sans text-xs font-semibold uppercase tracking-[0.08em] text-siena hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
              type="button"
              onClick={onSelect}
            >
              VER DETALLE
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default CatalogProductCard;
