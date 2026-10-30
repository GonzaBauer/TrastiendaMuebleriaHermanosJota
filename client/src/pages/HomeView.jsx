import Hero from "../components/home/Hero.jsx";
import ProductosDestacados from "../components/home/ProductosDestacados.jsx";

function HomeView({ onProductSelect }) {
  return (
    <main className="min-w-0 flex-1">
      <Hero imageUrl="/images/imagen-hero-banner.png" />
      <ProductosDestacados onProductSelect={onProductSelect} />
    </main>
  );
}

export default HomeView;
