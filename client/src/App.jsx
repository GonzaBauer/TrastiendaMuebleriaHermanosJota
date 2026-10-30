import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HomeView from './pages/HomeView.jsx'
import CatalogoView from './pages/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'
import CarritoView from './components/carrito/CarritoView.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import API_BASE_URL from './config/api.js'

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    window.scrollTo(0, 0);
  }, [pathname]);

  function selectProduct(product) {
    navigate(`/productos/${product.id}`);
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

  const home = <HomeView onProductSelect={selectProduct} />;

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={home} />
        <Route
          path="/productos"
          element={
            <CatalogoView
              products={data}
              loading={loading}
              error={error}
              onProductSelect={selectProduct}
            />
          }
        />
        <Route path="/productos/:id" element={<ProductDetail onAddToCart={addToCart} />} />
        <Route
          path="/carrito"
          element={
            <CarritoView
              cart={cart}
              onChangeQuantity={changeQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          }
        />
        <Route path="/contacto" element={<ContactForm />} />
        <Route path="*" element={home} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
