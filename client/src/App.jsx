import { useEffect, useState } from 'react'
import HomeView from './pages/HomeView.jsx'
import CatalogoView from './pages/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'
import CarritoView from './components/carrito/CarritoView.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import API_BASE_URL from './config/api.js'

const viewPaths = {
  home: "/",
  catalog: "/productos",
  cart: "/carrito",
  contact: "/contacto",
};

function getViewFromPath(pathname) {
  return (
    Object.entries(viewPaths).find(([, path]) => path === pathname)?.[0] ||
    "home"
  );
}

function App() {
  const [view, setView] = useState(() =>
    getViewFromPath(window.location.pathname),
  );
  const [previousView, setPreviousView] = useState("catalog");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/productos`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const products = await response.json();
        if (!Array.isArray(products)) {
          throw new Error("La respuesta de productos no es válida.");
        }

        if (controller.signal.aborted) return;
        setData(products);
        setError(null);
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError.message || "Ocurrió un error al cargar los productos.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    function handlePopState() {
      setView(getViewFromPath(window.location.pathname));
      setSelectedProduct(null);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigateTo(nextView) {
    const nextPath = viewPaths[nextView];
    if (!nextPath) return;

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setView(nextView);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  }

  function handleNavigation(event) {
    const link = event.target.closest?.("a[data-view]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(link.dataset.view);
  }

  function selectProduct(product) {
    setPreviousView(view);
    setSelectedProduct(product);
    setView("detail");
    window.scrollTo(0, 0);
  }

  function returnFromDetail() {
    setSelectedProduct(null);
    setView(previousView);
  }

  function addToCart(product) {
    setCart((previousCart) => {
      const existingProduct = previousCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...previousCart, { ...product, cantidad: 1 }];
    });
  }

  function changeQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((total, item) => total + item.cantidad, 0);

 return (
    <div
      className="flex min-h-[100svh] w-full min-w-0 flex-col"
      onClick={handleNavigation}
    >
      <Navbar cartCount={cartCount} />
      {view === "home" && (
        <HomeView
          onProductSelect={selectProduct}
        />
      )}

      {view === "catalog" && (
        <CatalogoView
          products={data}
          loading={loading}
          error={error}
          onProductSelect={selectProduct}
        />
      )}

      {view === "detail" && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={returnFromDetail}
          backLabel={
            previousView === "home" ? "Volver al inicio" : "Volver al catálogo"
          }
          onAddToCart={addToCart}
        />
      )}

      {view === "cart" && (
        <CarritoView
          cart={cart}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}

      {view === "contact" && <ContactForm />}
      <Footer />
    </div>
  );
}

export default App;