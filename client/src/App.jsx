import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import HomeView from './components/home/HomeView.jsx'
import CatalogoView from './components/catalogo/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'
import CarritoView from './components/carrito/CarritoView.jsx'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

function ProductDetailRoute({ selectedProduct, setSelectedProduct, onAddToCart, cartCount }) { 
  const { id } = useParams()
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (selectedProduct?.id === Number(id)) return

    let cancelled = false

    fetch(`${API_BASE_URL}/api/productos/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Producto no encontrado')
        return response.json()
      })
      .then((data) => {
        if (!cancelled) setResult({ id: Number(id), product: data })
      })
      .catch(() => {
        if (!cancelled) setResult({ id: Number(id), error: true })
      })

    return () => {
      cancelled = true
    }
  }, [id, selectedProduct])

  const product = selectedProduct?.id === Number(id)
    ? selectedProduct
    : result?.id === Number(id) ? result.product : null
  const error = result?.id === Number(id) && result.error

  function handleBack() {
    setSelectedProduct(null)
  }

  if (error) {
    return <main className="px-4 py-16 text-center text-[#6B6258]">No encontramos este producto.</main>
  }

  if (!product) {
    return <main className="px-4 py-16 text-center text-[#6B6258]">Cargando producto...</main>
  }

  return <ProductDetail product={product} onBack={handleBack} onAddToCart={onAddToCart} cartCount={cartCount} />
}

function App() { 
  const [selectedProduct, setSelectedProduct] = useState(null)

   const [cart, setCart] = useState([])

     function addToCart(product) {
     setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id)
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item,
      )
       }
        return [...prev, { ...product, cantidad: 1 }]
     })
    }
  function changeQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
        .filter((item) => item.cantidad > 0),
    )
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }
const cartCount = cart.reduce((total, item) => total + item.cantidad, 0)

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<HomeView cartCount={cartCount} />} />
        <Route
          path="/productos"
          element={selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} cartCount={cartCount} />
          ) : (
             <CatalogoView onProductSelect={setSelectedProduct} cartCount={cartCount} />
          )}
        />
         <Route
            path="/productos/:id"
             element={(
                 <ProductDetailRoute
              selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                    onAddToCart={addToCart}
                 cartCount={cartCount}
              />
             )}
          />
      
        
        <Route
          path="/inicio/catalogo/detalle/:id"
          element={(
            <ProductDetailRoute
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              onAddToCart={addToCart}
              cartCount={cartCount}
            />
          )}
        />
        <Route
             path="/carrito"
              element={(
            <CarritoView
              cart={cart}
              cartCount={cartCount}
             onChangeQuantity={changeQuantity}
              onRemove={removeFromCart}
               onClear={clearCart}
            />
           )}
         />
      </Routes>
    </BrowserRouter>
  )
}

export default App
