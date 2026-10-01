import { useState } from 'react'

function CatalogProductCard({
  category,
  title,
  description,
  extendedDescription,
  price,
  imageUrl,
  isFeatured,
  specifications,
}) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const detailsId = `product-details-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/55 shadow-[0_10px_32px_rgba(112,130,104,0.12)] backdrop-blur-sm transition-[scale,box-shadow] duration-500 ease-in-out hover:z-10 hover:scale-[1.01] hover:shadow-[0_14px_34px_rgba(112,130,104,0.15)]">
      <div>
        <div className="flex h-40 w-full shrink-0 items-center justify-center bg-[#F7F8F4]/70 p-2 sm:h-44">
          <img className="h-full w-full object-contain" src={imageUrl} alt={title} />
        </div>
        <div className="space-y-1.5 p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#E8EBDD] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#70452B]">
              {category}
            </span>
            {isFeatured && (
              <span className="rounded-full bg-[#F2E7D5] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8B5A2B]">
                Destacado
              </span>
            )}
          </div>
          <h2 className="font-serif text-lg uppercase leading-snug text-[#8B4513]">
            {title}
          </h2>
          <p className="line-clamp-3 text-left text-xs font-normal normal-case leading-snug text-[#4E4943]">
            {description}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <hr className="my-3 border-0 border-t border-[#8B4513]/15" />

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-[#70452B]">
            $ {new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(price)}
          </p>
          {(extendedDescription || specifications.length > 0) && (
            <button
              className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-xs font-bold uppercase tracking-wider text-[#A98232] hover:text-[#805E1C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A98232]"
              type="button"
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              onClick={() => setDetailsOpen((open) => !open)}
            >
              VER DETALLE
            </button>
          )}
        </div>

      </div>
      {detailsOpen && (
        <div className="space-y-3 border-t border-[#8B4513]/15 p-4 pt-3" id={detailsId}>
          {extendedDescription && (
            <p className="text-sm leading-relaxed text-[#4E4943]">{extendedDescription}</p>
          )}
          {specifications.length > 0 && (
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specifications.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-[#A0522D]">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#4E4035]">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </article>
  )
}

export default CatalogProductCard