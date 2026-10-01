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
      <main className="flex-1 bg-alabastro px-4 py-8 sm:px-6 lg:px-8">
        <nav
          className="text-xs text-gray-500 uppercase tracking-widest mb-6 cursor-pointer"
          onClick={onBack}
        >
          INICIO / CATÁLOGO / DETALLE
        </nav>
        <div className="max-w-6xl mx-auto bg-white/50 rounded-3xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#eaddcf] rounded-2xl p-10 flex items-center justify-center min-h-[500px]">
              <img src={image} alt={name} className="w-4/5 object-contain drop-shadow-xl" />
            </div>
            <div className="flex flex-col space-y-5 py-4">
              <span className="text-xs uppercase text-[#4a5d4e] font-semibold tracking-wider">
                {product.category || product.categoria}
              </span>
              <h1 className="text-5xl font-serif text-[#8c4e32] uppercase leading-tight">
                {name}
              </h1>
              <span className="text-3xl font-bold text-[#8c4e32]">
                $ {new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(product.precio)}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.descripcionLarga || product.description || product.descripcion}
              </p>
              <hr className="border-gray-200 my-2" />
              <dl>
                {specifications.map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-0 text-sm">
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
              <button className="bg-[#8c4e32] hover:bg-[#734028] text-white px-8 py-3.5 rounded-2xl font-medium w-fit mt-6 transition-colors shadow-md" type="button">
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetail