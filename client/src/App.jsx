import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import HomeView from './components/home/HomeView.jsx'
import CatalogoView from './components/catalogo/CatalogoView.jsx'
import ProductDetail from './components/catalogo/ProductDetail.jsx'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

function ProductDetailRoute({ selectedProduct, setSelectedProduct }) {
  const { id } = useParams()
  const navigate = useNavigate()
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
    navigate('/productos')
  }

  if (error) {
    return <main className="px-4 py-16 text-center text-[#6B6258]">No encontramos este producto.</main>
  }

  if (!product) {
    return <main className="px-4 py-16 text-center text-[#6B6258]">Cargando producto...</main>
  }

  return <ProductDetail product={product} onBack={handleBack} />
}

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/productos"
          element={selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
          ) : (
            <CatalogoView onProductSelect={setSelectedProduct} />
          )}
        />
        <Route
          path="/productos/:id"
          element={(
            <ProductDetailRoute
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        />
        <Route
          path="/inicio/catalogo/detalle/:id"
          element={(
            <ProductDetailRoute
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
