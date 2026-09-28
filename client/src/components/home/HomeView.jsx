import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'
import FeaturedProducts from './FeaturedProducts.jsx'
import Hero from './Hero.jsx'

const featuredProducts = [
  {
    nombre: 'Sillón Copacabana',
    imagen: '/images/sillon-copacabana.png',
  },
  {
    nombre: 'Mesa de Centro Araucaria',
    imagen: '/images/mesa-centro-araucaria.png',
  },
  {
    nombre: 'Aparador Uspallata',
    imagen: '/images/aparador-uspallata.png',
  },
]

function HomeView() {
  return (
    <div className="flex min-h-[100svh] w-full min-w-0 flex-col">
      <Navbar />
      <main className="min-w-0">
        <Hero imageUrl="/images/imagen-hero-banner.png" />
        <FeaturedProducts products={featuredProducts} />
      </main>
      <Footer />
    </div>
  )
}

export default HomeView