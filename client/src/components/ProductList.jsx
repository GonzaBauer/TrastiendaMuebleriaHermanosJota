import { useState } from "react";
import CatalogProductCard from "./catalogo/CatalogProductCard.jsx";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function normalizeText(value) {
  return value
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function ProductList({ products, loading, error, onProductSelect }) {
  const [busqueda, setBusqueda] = useState("");
  const termino = normalizeText(busqueda);
  const productosFiltrados = products.filter((producto) =>
    normalizeText(producto.nombre).includes(termino),
  );

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="block w-full min-w-0 flex-1">
          <span className="mb-2 block font-brand-sans text-sm font-medium text-text">
            Buscar en el catálogo
          </span>
          <input
            className="min-h-12 w-full rounded-sm border border-siena/35 bg-white/70 px-4 font-brand-sans text-sm text-text outline-none transition focus:border-siena focus:ring-2 focus:ring-vara/40"
            type="search"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscá tu próxima pieza favorita"
          />
        </label>
        <p
          className="shrink-0 self-end whitespace-nowrap text-right font-brand-sans text-sm font-semibold uppercase tracking-[0.08em] text-siena sm:self-auto"
          aria-live="polite"
        >
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "pieza" : "piezas"}
        </p>
      </div>

      {loading ? (
        <p
          className="py-10 text-center font-brand-sans text-siena"
          role="status"
        >
          Cargando productos...
        </p>
      ) : error ? (
        <p
          className="py-10 text-center font-brand-sans text-siena"
          role="alert"
        >
          No pudimos cargar el catálogo. {error}
        </p>
      ) : productosFiltrados.length === 0 ? (
        <p
          className="py-10 text-center font-brand-sans text-text"
          role="status"
        >
          No encontramos piezas que coincidan con tu búsqueda.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((producto) => (
            <CatalogProductCard
              key={producto.id}
              category={producto.categoria}
              title={producto.nombre}
              description={producto.descripcion}
              price={producto.precio}
              imageUrl={new URL(producto.imagen, `${API_BASE_URL}/`).href}
              isFeatured={producto.destacado}
              onSelect={() => onProductSelect(producto)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
