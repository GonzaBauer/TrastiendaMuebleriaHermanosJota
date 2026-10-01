import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'
import CatalogProductCard from './CatalogProductCard.jsx'

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

function CatalogoView({ onProductSelect }) {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/productos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos')
        }
        return response.json()
      })
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  const termino = busqueda
    .trim()
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre
      .toLocaleLowerCase('es')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(termino),
  )

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar />
      <main className="min-w-0 flex-1">
        <section className="bg-alabastro px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-6xl rounded-lg border border-white/60 bg-white/35 px-6 py-10 shadow-[0_8px_28px_rgba(104,72,46,0.08)] sm:px-10 sm:py-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <p className="mb-3 font-brand-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#A0522D]">
                Colección atemporal
              </p>
              <h1 className="font-serif text-3xl uppercase tracking-widest text-[#A0522D] sm:text-4xl">
                Catálogo de productos
              </h1>
              <span className="mt-4 h-px w-14 bg-[#D4A348]" />
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B6258]">
                Cada pieza reúne herencia, materiales nobles y un diseño pensado para vivir con calma y belleza a lo largo del tiempo.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="block w-full min-w-0 flex-1">
                <span className="sr-only">Buscar productos</span>
                <input
                  className="w-full rounded-md border border-[#A0522D]/25 bg-white/60 px-4 py-3 text-sm text-[#4E4035] shadow-sm outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#D4A348]/40"
                  type="search"
                  value={busqueda}
                  onChange={(event) => setBusqueda(event.target.value)}
                  placeholder="Buscá tu próxima pieza favorita"
                />
              </label>
              <p className="shrink-0 self-end whitespace-nowrap text-right text-sm font-semibold uppercase tracking-[0.14em] text-[#A0522D] sm:self-auto">
                {productosFiltrados.length} {productosFiltrados.length === 1 ? 'pieza' : 'piezas'}
              </p>
            </div>

            {cargando ? (
              <p className="py-10 text-center text-[#A0522D]">Cargando productos...</p>
            ) : error !== null ? (
              <p className="py-10 text-center text-red-600">Ocurrió un error: {error}</p>
            ) : productosFiltrados.length === 0 ? (
              <p className="py-10 text-center text-[#6B6258]">
                No encontramos piezas que coincidan con tu búsqueda.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {productosFiltrados.map((producto) => {
                  return (
                    <CatalogProductCard
                      key={producto.id}
                      category={producto.categoria}
                      title={producto.nombre}
                      description={producto.descripcion}
                      price={producto.precio}
                      imageUrl={new URL(producto.imagen, `${API_BASE_URL}/`).href}
                      isFeatured={producto.destacado}
                      onSelect={() => {
                        onProductSelect(producto)
                        navigate(`/productos/${producto.id}`)
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CatalogoView