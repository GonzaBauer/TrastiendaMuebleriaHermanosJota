import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import LoginView from './pages/LoginView.jsx'
import RegisterView from './pages/RegisterView.jsx'
import AdminHomeView from './pages/AdminHomeView.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomeView from './pages/HomeView.jsx'
import CatalogoView from './pages/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'
import CarritoView from './components/carrito/CarritoView.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CrearProductoView from './pages/CrearProductoView.jsx'
import EditarProductoView from './pages/EditarProductoView.jsx'
import { getProductos } from './service/productoService.js'

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [productsVersion, setProductsVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const products = await getProductos(controller.signal);
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
  }, [productsVersion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function selectProduct(product) {
    navigate(`/productos/${product.id}`);
  }

  function refreshProducts() {
    setProductsVersion((version) => version + 1);
  }

  function handleProductDeleted(id) {
    removeFromCart(id);
    refreshProducts();
    navigate("/productos");
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

  const home = (
    <HomeView
      onProductSelect={selectProduct}
      productsVersion={productsVersion}
      onProductDeleted={refreshProducts}
    />
  );
  const isAuthPage = pathname === "/login" || pathname === "/registro";

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      {!isAuthPage && <Navbar cartCount={cartCount} />}
      <Routes>
        <Route path="/" element={home} />
        <Route path="/inicio" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/registro" element={<RegisterView />} />
        <Route
          path="/productos"
          element={
            <CatalogoView
              products={data}
              loading={loading}
              error={error}
              onProductSelect={selectProduct}
              onProductDeleted={refreshProducts}
            />
          }
        />
        <Route
          path="/productos/:id"
          element={
            <ProductDetail
              onAddToCart={addToCart}
              onProductDeleted={handleProductDeleted}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <CarritoView
                cart={cart}
                onChangeQuantity={changeQuantity}
                onRemove={removeFromCart}
                onClear={clearCart}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/contacto" element={<ContactForm />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHomeView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/crear-producto"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CrearProductoView onProductSaved={refreshProducts} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editar-producto/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditarProductoView onProductSaved={refreshProducts} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
