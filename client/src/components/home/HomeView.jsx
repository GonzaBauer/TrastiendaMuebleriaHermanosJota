import Navbar from '../../Navbar.jsx'
import Footer from '../../Footer.jsx'
import FeaturedProducts from './FeaturedProducts.jsx'
import Hero from './Hero.jsx'
import './HomeView.css'

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
    <div className="home-view">
      <Navbar />
      <main>
        <Hero imageUrl="/images/imagen-hero-banner.png" />
        <FeaturedProducts products={featuredProducts} />
      </main>
      <Footer />
    </div>
  )
}

export default HomeView