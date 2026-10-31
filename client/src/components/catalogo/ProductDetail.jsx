import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAdminActions from "./ProductAdminActions.jsx";
import { getProductoById } from "../../service/productoService.js";
import formatPrice from "../../utils/formatPrice.js";
import getProductImage from "../../utils/getProductImage.js";

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
  "imagenUrl",
  "descripcion",
  "descripcionLarga",
  "etiquetas",
]);

function ProductDetail({ onAddToCart, onProductDeleted }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const detail = await getProductoById(id, controller.signal);
        if (!detail || typeof detail !== "object" || Array.isArray(detail)) {
          throw new Error("La respuesta del producto no es válida.");
        }

        if (!controller.signal.aborted) {
          setProduct(detail);
        }
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError.message || "Ocurrió un error al cargar el producto.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="min-w-0 flex-1 bg-alabastro px-5 py-8 text-center font-brand-sans text-text">
        Cargando...
      </main>
    );
  }

  if (error || String(product?.id) !== id) {
    return (
      <main
        className="min-w-0 flex-1 bg-alabastro px-5 py-8 text-center font-brand-sans text-text"
        role="alert"
      >
        {error || "No se pudo encontrar el producto."}
      </main>
    );
  }

  const productToDisplay = product;
  const name = productToDisplay.name || productToDisplay.nombre;
  const image = getProductImage(productToDisplay);
  const specifications = Object.entries(productToDisplay).filter(
    ([key, value]) =>
      !camposProducto.has(key) && key !== "stock" && value != null && value !== "",
  );

  return (
    <main className="min-w-0 flex-1 bg-alabastro px-5 py-8 sm:px-8 lg:px-10">
        <nav aria-label="Ubicación actual" className="mx-auto mb-6 max-w-6xl">
          <button
            className="inline-flex min-h-11 items-center gap-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-siena hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
            onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/productos"))}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Volver
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
                {productToDisplay.category || productToDisplay.categoria}
              </span>
              <h1 className="font-brand-serif text-3xl uppercase leading-tight tracking-[0.08em] text-siena sm:text-4xl">
                {name}
              </h1>
              <p className="font-brand-sans text-base leading-relaxed text-text">
                {productToDisplay.descripcionLarga ||
                  productToDisplay.description ||
                  productToDisplay.descripcion}
              </p>
              <p className="font-brand-sans text-sm text-text">
                <span className="font-semibold">Stock:</span>{" "}
                {productToDisplay.stock ?? "No disponible"}
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
              {productToDisplay.etiquetas?.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {productToDisplay.etiquetas.map((etiqueta) => (
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
                    {formatPrice(productToDisplay.precio)}
                  </span>
                </div>
                <button
                  onClick={() => onAddToCart(productToDisplay)}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-siena px-6 py-3 font-brand-sans text-sm font-medium uppercase tracking-[0.08em] text-alabastro transition-colors hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vara"
                  type="button"
                >
                  <ShoppingBag aria-hidden="true" className="h-4 w-4" /> Añadir
                  al carrito
                </button>
              </div>
              <ProductAdminActions
                id={productToDisplay.id}
                name={name}
                onDeleted={onProductDeleted}
              />
            </div>
          </div>
        </div>
    </main>
  );
}

export default ProductDetail;
