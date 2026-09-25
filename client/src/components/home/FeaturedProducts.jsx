import './FeaturedProducts.css'

function FeaturedProducts({ products = [] }) {
  return (
    <section
      className="featured-products"
      id="catalogo"
      aria-labelledby="featured-products-title"
    >
      <div className="featured-products__inner">
        <h2 className="featured-products__title" id="featured-products-title">
          Productos destacados
        </h2>
        <div className="featured-products__grid">
          {products.map((product) => (
            <article className="featured-product" key={product.nombre}>
              <div className="featured-product__image-wrap">
                {product.imagen ? (
                  <img
                    className="featured-product__image"
                    src={product.imagen}
                    alt={product.nombre}
                    loading="lazy"
                  />
                ) : (
                  <span className="featured-product__placeholder" aria-hidden="true">
                    {product.nombre}
                  </span>
                )}
              </div>
              <h3 className="featured-product__name">{product.nombre}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts