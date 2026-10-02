import Navbar from "../../Navbar.jsx";
import Footer from "../../Footer.jsx";
import Hero from "./Hero.jsx";
import ProductosDestacados from "./ProductosDestacados.jsx";

function HomeView({ cartCount, products, loading, error, onProductSelect }) {
  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar cartCount={cartCount} />
      <main className="min-w-0">
        <Hero imageUrl="/images/imagen-hero-banner.png" />
        <ProductosDestacados
          products={products}
          loading={loading}
          error={error}
          onProductSelect={onProductSelect}
        />
      </main>
      <Footer />
    </div>
  );
}

export default HomeView;
