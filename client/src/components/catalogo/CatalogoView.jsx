import Navbar from "../../Navbar.jsx";
import Footer from "../../Footer.jsx";
import ProductList from "../ProductList.jsx";

function CatalogoView({
  cartCount,
  products,
  loading,
  error,
  onProductSelect,
}) {
  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar cartCount={cartCount} />
      <main className="min-w-0 flex-1">
        <section className="bg-alabastro px-page py-section">
          <header className="mx-auto mb-10 max-w-6xl border-b border-siena/25 px-1 pb-8 sm:pb-10">
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
          </header>
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onProductSelect={onProductSelect}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogoView;
