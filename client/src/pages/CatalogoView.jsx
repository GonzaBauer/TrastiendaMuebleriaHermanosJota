import { ArrowLeft } from "lucide-react";
import ProductList from "../components/ProductList.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function CatalogoView({
  products,
  loading,
  error,
  onProductSelect,
  onProductDeleted,
}) {
  const { isAdmin } = useAuth();
  return (
    <main className="min-w-0 flex-1">
      <section className="bg-alabastro px-page py-section">
        <header className="mx-auto max-w-6xl px-1 pb-8 sm:pb-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="mb-3 font-brand-sans text-xs font-semibold uppercase tracking-[0.12em] text-siena">
              Colección atemporal
            </p>
            <h1 className="font-brand-serif text-3xl uppercase tracking-[0.1em] text-siena sm:text-4xl">
              Catálogo de productos
            </h1>
            <span aria-hidden="true" className="mt-4 h-px w-14 bg-vara" />
            <p className="mt-5 max-w-2xl font-brand-sans text-base leading-7 text-text">
              Cada pieza reúne herencia, materiales nobles y un diseño pensado
              para vivir con calma y belleza a lo largo del tiempo.
            </p>
          </div>
          {isAdmin && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admin"
                className="flex min-h-11 w-fit items-center justify-center gap-2 border border-siena/35 px-4 py-2 font-brand-sans text-sm font-semibold uppercase tracking-wider text-siena no-underline transition hover:bg-siena/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Volver
              </Link>
              <Link
                to="/admin/crear-producto"
                className="flex min-h-11 w-fit items-center justify-center bg-siena px-4 py-2 font-brand-sans text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
              >
                Agregar producto
              </Link>
            </div>
          )}
        </header>
        <ProductList
          products={products}
          loading={loading}
          error={error}
          onProductSelect={onProductSelect}
          onProductDeleted={onProductDeleted}
        />
      </section>
    </main>
  );
}

export default CatalogoView;
