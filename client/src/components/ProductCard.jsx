import { ArrowUpRight } from "lucide-react";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function ProductCard({ producto, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(producto)}
      aria-label={`Ver detalle de ${producto.nombre}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-card border border-siena/20 bg-white/50 text-left shadow-surface transition-colors duration-200 hover:border-siena/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-siena"
    >
      <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden bg-alabastro p-5">
        <img
          src={new URL(producto.imagen, `${API_BASE_URL}/`).href}
          alt={producto.nombre}
          width="1024"
          height="1024"
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-3 p-5">
        <p className="font-brand-sans text-xs uppercase tracking-[0.08em] text-text">
          {producto.categoria}
        </p>
        <h3 className="font-brand-serif text-xl uppercase leading-snug text-siena">
          {producto.nombre}
        </h3>
        <div className="mt-auto flex items-center justify-between border-t border-siena/15 pt-4">
          <span className="font-brand-sans text-sm font-semibold text-text">
            ${" "}
            {new Intl.NumberFormat("es-AR", {
              maximumFractionDigits: 0,
            }).format(producto.precio)}
          </span>
          <span className="inline-flex items-center gap-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-siena">
            Ver detalle <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default ProductCard;
