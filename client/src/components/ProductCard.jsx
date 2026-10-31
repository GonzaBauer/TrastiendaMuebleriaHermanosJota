import { ArrowUpRight } from "lucide-react";
import formatPrice from "../utils/formatPrice.js";
import getProductImage from "../utils/getProductImage.js";

function ProductCard({
  producto,
  onSelect,
  showDescription = false,
  showFeatured = false,
}) {
  const name = producto.nombre || producto.name;
  const category = producto.categoria || producto.category;
  const image = getProductImage(producto);

  return (
    <button
      type="button"
      onClick={() => onSelect(producto)}
      aria-label={`Ver detalle de ${name}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-card border border-siena/20 bg-white/50 text-left shadow-surface transition-colors duration-200 hover:border-siena/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-siena"
    >
      <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden bg-alabastro p-4">
        <img
          src={image}
          alt={name}
          width="1024"
          height="1024"
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-sm border border-siena/30 bg-alabastro px-3 py-1 font-brand-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-siena">
            {category}
          </span>
          {showFeatured && producto.destacado && (
            <span className="rounded-sm border border-vara/50 bg-vara/10 px-3 py-1 font-brand-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-siena">
              Destacado
            </span>
          )}
        </div>
        <h2 className="font-brand-serif text-xl uppercase leading-snug text-siena">
          {name}
        </h2>
        {showDescription && (
          <p className="line-clamp-3 font-brand-sans text-sm leading-relaxed text-text">
            {producto.descripcion || producto.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-siena/15 pt-4">
          <span className="font-brand-sans text-sm font-semibold text-text">
            $ {formatPrice(producto.precio)}
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
