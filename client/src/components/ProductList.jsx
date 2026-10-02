import { useEffect, useState } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductList() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList;