import { Link } from 'react-router-dom'
import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')
const formatearPrecio = (valor) =>
  new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(valor)

function CarritoView({ cart, cartCount, onChangeQuantity, onRemove, onClear }) {
  const total = cart.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar cartCount={cartCount} />
      <main className="flex-1 bg-alabastro px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/50 p-6 shadow-sm">
          <h1 className="mb-6 font-serif text-3xl uppercase text-[#8c4e32]">Tu carrito</h1>

          {cart.length === 0 ? (
            <div className="py-10 text-center text-[#6B6258]">
              <p className="mb-6">Tu carrito está vacío</p>
              <Link to="/productos" className="rounded-2xl bg-[#8c4e32] px-6 py-3 text-white hover:bg-[#734028]">
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex flex-wrap items-center gap-4 border-b border-gray-200 py-4">
                    <img
                      src={new URL(item.imagen, `${API_BASE_URL}/`).href}
                      alt={item.nombre}
                      className="h-20 w-20 rounded-xl bg-[#eaddcf] object-contain p-2"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800">{item.nombre}</p>
                      <p className="text-sm text-gray-500">$ {formatearPrecio(item.precio)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => onChangeQuantity(item.id, -1)} className="h-8 w-8 rounded-full border border-gray-300">−</button>
                      <span className="w-6 text-center">{item.cantidad}</span>
                      <button type="button" onClick={() => onChangeQuantity(item.id, 1)} className="h-8 w-8 rounded-full border border-gray-300">+</button>
                    </div>
                    <p className="w-28 text-right font-bold text-[#8c4e32]">
                      $ {formatearPrecio(item.precio * item.cantidad)}
                    </p>
                    <button type="button" onClick={() => onRemove(item.id)} className="text-sm text-gray-500 hover:text-red-600">
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button type="button" onClick={onClear} className="text-sm text-gray-500 hover:text-red-600">
                  Vaciar carrito
                </button>
                <p className="text-2xl font-extrabold text-[#8c4e32]">Total: $ {formatearPrecio(total)}</p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CarritoView