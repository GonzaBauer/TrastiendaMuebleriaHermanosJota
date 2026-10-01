import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'
import ProductList from '../ProductList.jsx'

function CatalogoView() {
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
          <ProductList />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CatalogoView