const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function ProductCard({ producto }) {
  return (
    <div className="group flex aspect-[4/5] flex-col overflow-hidden rounded-2xl border border-[#D4A348] bg-gradient-to-b from-[#F3EADB] via-[#EFE5D3] to-[#E6D5BB] shadow-[0_4px_20px_rgba(160,82,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-[48%] w-full shrink-0 items-center justify-center overflow-hidden p-4">
        <img
          src={new URL(producto.imagen, `${API_BASE_URL}/`).href}
          alt={`${producto.nombre}: ${producto.descripcion}`}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-2 px-3 py-3">
        <div className="min-h-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A0522D]">
            {producto.categoria}
          </p>
          <h3 className="line-clamp-2 font-serif text-sm uppercase leading-snug text-[#8B4513] sm:text-base">
            {producto.nombre}
          </h3>
          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[#5E554D]">
            {producto.descripcion}
          </p>
        </div>
        <div className="-mx-3 -mb-3 mt-1 flex items-center justify-between gap-2 border-t border-[#D4A348]/30 bg-[#FFF9EF]/90 px-3 py-2.5">
          <p className="shrink-0 font-brand-sans text-sm font-semibold text-[#8B4513]">
            ${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(producto.precio)}
          </p>
          <span className="text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-[#A0522D] sm:text-xs">
            Ver detalle →
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;