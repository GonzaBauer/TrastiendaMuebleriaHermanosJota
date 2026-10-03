import ProductCard from "../ProductCard";

function ProductosDestacados({ products, loading, error, onProductSelect }) {
  const productos = products.filter((producto) => producto.destacado);

  if (loading) {
    return (
      <p className="py-10 text-center font-brand-sans text-siena" role="status">
        Cargando productos...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center font-brand-sans text-siena" role="alert">
        No pudimos cargar los destacados. {error}
      </p>
    );
  }

  if (productos.length === 0) return null;

  return (
    <section
      className="bg-alabastro px-page py-section"
      aria-labelledby="featured-title"
    >
      <div className="group/title mx-auto flex w-fit flex-col items-center">
        <h2
          id="featured-title"
          className="text-center font-brand-serif text-3xl uppercase tracking-[0.1em] text-siena"
        >
          Productos Destacados
        </h2>
        <span aria-hidden="true" className="mt-3 h-px w-14 bg-vara" />
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.slice(0, 3).map((producto) => (
          <ProductCard
            producto={producto}
            key={producto.id}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;
