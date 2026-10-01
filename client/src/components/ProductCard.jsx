const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function ProductCard({ producto }) {
  return (
    <div className="group flex aspect-[4/5] flex-col overflow-hidden rounded-2xl border border-[#D4A348] bg-gradient-to-b from-[#F3EADB] via-[#EFE5D3] to-[#E6D5BB] shadow-[0_4px_20px_rgba(160,82,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-[70%] w-full shrink-0 items-center justify-center overflow-hidden p-4">
        <img
          src={new URL(producto.imagen, `${API_BASE_URL}/`).href}
          alt={producto.nombre}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-3 pb-4 text-center">
        <h3 className="font-serif uppercase text-[#8B4513]">
          {producto.nombre}
        </h3>
        <p className="text-xs uppercase tracking-widest text-[#A0522D]">
          Ver detalle →
        </p>
      </div>
    </div>
  );
}

export default ProductCard;