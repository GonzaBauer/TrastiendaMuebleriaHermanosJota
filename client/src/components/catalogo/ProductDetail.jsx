import { ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "../../Navbar.jsx";
import Footer from "../../Footer.jsx";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

const nombresEspecificaciones = {
  medidas: "Medidas",
  materiales: "Materiales",
  acabado: "Acabado",
  rotacion: "Rotación",
  garantia: "Garantía",
  peso: "Peso",
  cargaMaxima: "Carga máxima",
  capacidad: "Capacidad",
  modulares: "Modulares",
  tapizado: "Tapizado",
  confort: "Confort",
  almacenamiento: "Almacenamiento",
  cables: "Gestión de cables",
  extension: "Extensión",
  caracteristicas: "Características",
  regulacion: "Regulación",
  certificacion: "Certificación",
  apilables: "Apilables",
  incluye: "Incluye",
  estructura: "Estructura",
  relleno: "Relleno",
  sostenibilidad: "Sostenibilidad",
};

const camposProducto = new Set([
  "id",
  "nombre",
  "categoria",
  "destacado",
  "precio",
  "imagen",
  "image",
  "descripcion",
  "descripcionLarga",
  "etiquetas",
]);

function ProductDetail({ product, onBack, backLabel, onAddToCart, cartCount }) {
  const name = product.name || product.nombre;
  const image =
    product.image || new URL(product.imagen, `${API_BASE_URL}/`).href;
  const specifications = Object.entries(product).filter(
    ([key, value]) => !camposProducto.has(key) && value != null && value !== "",
  );

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar cartCount={cartCount} />
      <main className="flex-1 bg-alabastro px-5 py-8 sm:px-8 lg:px-10">
        <nav aria-label="Ubicación actual" className="mx-auto mb-6 max-w-6xl">
          <button
            className="inline-flex min-h-11 items-center gap-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-siena hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
            onClick={onBack}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {backLabel}
          </button>
        </nav>
        <div className="mx-auto max-w-6xl border-t border-siena/25 pt-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex aspect-square items-center justify-center bg-white/60 p-6 sm:p-10">
              <img
                src={image}
                alt={name}
                width="1024"
                height="1024"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-4 py-2">
              <span className="font-brand-sans text-xs font-semibold uppercase tracking-[0.1em] text-siena">
                {product.category || product.categoria}
              </span>
              <h1 className="font-brand-serif text-3xl uppercase leading-tight tracking-[0.08em] text-siena sm:text-4xl">
                {name}
              </h1>
              <p className="font-brand-sans text-base leading-relaxed text-text">
                {product.descripcionLarga ||
                  product.description ||
                  product.descripcion}
              </p>
              {specifications.length > 0 && (
                <dl className="mt-2 divide-y divide-siena/15 border-y border-siena/20">
                  {specifications.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3 font-brand-sans text-sm"
                    >
                      <dt className="text-text/70">
                        {nombresEspecificaciones[key] || key}
                      </dt>
                      <dd className="text-right font-medium text-text">
                        {String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {product.etiquetas?.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {product.etiquetas.map((etiqueta) => (
                    <span
                      key={etiqueta}
                      className="border border-vara/50 bg-vara/10 px-3 py-1.5 font-brand-sans text-xs font-semibold uppercase tracking-[0.08em] text-siena"
                    >
                      {etiqueta}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex w-full flex-wrap items-end justify-between gap-5 border-t border-siena/25 pt-6">
                <div className="flex min-w-fit flex-col">
                  <span className="font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-text/70">
                    Precio
                  </span>
                  <span className="font-brand-serif text-3xl tabular-nums text-siena">
                    ${" "}
                    {new Intl.NumberFormat("es-AR", {
                      maximumFractionDigits: 0,
                    }).format(product.precio)}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-siena px-6 py-3 font-brand-sans text-sm font-medium uppercase tracking-[0.08em] text-alabastro transition-colors hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vara"
                  type="button"
                >
                  <ShoppingBag aria-hidden="true" className="h-4 w-4" /> Añadir
                  al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetail;
