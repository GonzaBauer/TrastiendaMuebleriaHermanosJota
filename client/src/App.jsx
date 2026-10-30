import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeView from './components/home/HomeView.jsx'
import CatalogoView from './components/catalogo/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'
import CarritoView from './components/carrito/CarritoView.jsx'
import { ContactForm } from './components/ContactForm.jsx'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function App() {
  const navigate = useNavigate();
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

  function selectProduct(product) {
    navigate(`/productos/${product.id}`);
    window.scrollTo(0, 0);
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

  const shared = { cartCount, products: data, loading, error };

  return (
    <Routes>
      <Route path="/" element={<HomeView {...shared} onProductSelect={selectProduct} />} />
      <Route path="/productos" element={<CatalogoView {...shared} onProductSelect={selectProduct} />} />
      <Route path="/productos/:id" element={<ProductDetail {...shared} onAddToCart={addToCart} />} />
      <Route
        path="/carrito"
        element={
          <CarritoView
            cart={cart}
            cartCount={cartCount}
            onChangeQuantity={changeQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        }
      />
      <Route path="/contacto" element={<ContactForm cartCount={cartCount} />} />
      <Route path="*" element={<HomeView {...shared} onProductSelect={selectProduct} />} />
    </Routes>
  );
}

export default App;
