import { Link } from 'react-router-dom'
import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '')

const nombresEspecificaciones = {
  medidas: 'Medidas',
  materiales: 'Materiales',
  acabado: 'Acabado',
  rotacion: 'Rotación',
  garantia: 'Garantía',
  peso: 'Peso',
  cargaMaxima: 'Carga máxima',
  capacidad: 'Capacidad',
  modulares: 'Modulares',
  tapizado: 'Tapizado',
  confort: 'Confort',
  almacenamiento: 'Almacenamiento',
  cables: 'Gestión de cables',
  extension: 'Extensión',
  caracteristicas: 'Características',
  regulacion: 'Regulación',
  certificacion: 'Certificación',
  apilables: 'Apilables',
  incluye: 'Incluye',
  estructura: 'Estructura',
  relleno: 'Relleno',
  sostenibilidad: 'Sostenibilidad',
}

const camposProducto = new Set([
  'id', 'nombre', 'categoria', 'destacado', 'precio', 'imagen', 'image',
  'descripcion', 'descripcionLarga', 'etiquetas',
])

function ProductDetail({ product, onBack }) {
  const name = product.name || product.nombre
  const image = product.image || new URL(product.imagen, `${API_BASE_URL}/`).href
  const specifications = Object.entries(product).filter(
    ([key, value]) => !camposProducto.has(key) && value != null && value !== '',
  )

  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar />
      <main className="flex-1 bg-alabastro px-4 py-6 sm:px-6 lg:px-8">
        <nav aria-label="Migas de pan" className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
          <Link
            to="/"
            onClick={onBack}
            className="cursor-pointer transition-colors hover:text-gray-800"
          >
            INICIO
          </Link>
          <span aria-hidden="true" className="text-gray-400">/</span>
          <Link
            to="/productos"
            onClick={onBack}
            className="cursor-pointer transition-colors hover:text-gray-800"
          >
            CATÁLOGO
          </Link>
          <span aria-hidden="true" className="text-gray-400">/</span>
          <span aria-current="page" className="font-semibold text-gray-800">DETALLE</span>
        </nav>
        <div className="max-w-6xl mx-auto bg-white/50 rounded-3xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#eaddcf] rounded-2xl p-6 flex items-center justify-center min-h-[300px]">
              <img src={image} alt={name} className="w-4/5 object-contain drop-shadow-xl" />
            </div>
            <div className="flex flex-col space-y-3 py-2">
              <span className="text-xs uppercase text-[#4a5d4e] font-semibold tracking-wider">
                {product.category || product.categoria}
              </span>
              <h1 className="text-4xl font-serif text-[#8c4e32] uppercase leading-tight">
                {name}
              </h1>
              <p className="text-sm text-gray-600 leading-snug">
                {product.descripcionLarga || product.description || product.descripcion}
              </p>
              <hr className="border-gray-200 my-2" />
              <dl>
                {specifications.map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-sm">
                    <dt className="text-gray-500">{nombresEspecificaciones[key] || key}</dt>
                    <dd className="text-gray-800 text-right font-medium">{String(value)}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-3 mt-2">
                {(product.etiquetas || []).map((etiqueta) => (
                  <span key={etiqueta} className="bg-[#f0f2eb] text-[#5c7054] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {etiqueta}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex w-full flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4">
                <div className="flex min-w-fit flex-col">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Precio</span>
                  <span className="text-3xl font-extrabold tabular-nums text-[#8c4e32]">
                    $ {new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(product.precio)}
                  </span>
                </div>
                <button className="ml-auto bg-[#8c4e32] hover:bg-[#734028] text-white px-8 py-3.5 rounded-2xl font-medium w-fit transition-colors shadow-md" type="button">
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetail;