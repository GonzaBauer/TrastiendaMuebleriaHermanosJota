import { useEffect, useState } from "react";
import HomeView from "./components/home/HomeView.jsx";
import CatalogoView from "./components/catalogo/CatalogoView.jsx";
import ProductDetail from "./components/catalogo/ProductDetail.jsx";
import CarritoView from "./components/carrito/CarritoView.jsx";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");
const viewPaths = {
  home: "/",
  catalog: "/productos",
  cart: "/carrito",
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/api/productos`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok)
          throw new Error("No se pudieron cargar los productos.");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data))
          throw new Error("La respuesta de productos no es válida.");
        setProducts(data);
        setError("");
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(fetchError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

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
    if (window.location.pathname !== nextPath)
      window.history.pushState({}, "", nextPath);
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
    )
      return;
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
      const existingProduct = previousCart.find(
        (item) => item.id === product.id,
      );
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
    <div onClick={handleNavigation}>
      {view === "home" && (
        <HomeView
          cartCount={cartCount}
          products={products}
          loading={loading}
          error={error}
          onProductSelect={selectProduct}
        />
      )}
      {view === "catalog" && (
        <CatalogoView
          cartCount={cartCount}
          products={products}
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
          cartCount={cartCount}
        />
      )}
      {view === "cart" && (
        <CarritoView
          cart={cart}
          cartCount={cartCount}
          onChangeQuantity={changeQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      )}
    </div>
  );
}

export default App;
