import './Hero.css'

function Hero({ imageUrl = '/images/imagen-hero-banner.png' }) {
  return (
    <section className="home-hero" id="inicio" aria-labelledby="home-hero-title">
      <div className="home-hero__content">
        <h1 className="home-hero__title" id="home-hero-title">
          <span>Diseño que trascienda</span>
          <span>en el tiempo</span>
        </h1>
        <p className="home-hero__description">
          Creamos muebles únicos, pensados para convertirse en tu próxima
          herencia <span>familiar</span>
        </p>
        <a className="home-hero__cta" href="#catalogo">
          Explorar Nuestra Colección <span aria-hidden="true">→</span>
        </a>
        <ul className="home-hero__badges" aria-label="Nuestros valores">
          <li className="home-hero__badge home-hero__badge--salvia">Sostenible</li>
          <li className="home-hero__badge home-hero__badge--siena">Artesanal</li>
          <li className="home-hero__badge home-hero__badge--vara">Hecho para durar</li>
        </ul>
      </div>

      <img
        className="home-hero__image"
        src={imageUrl}
        alt="Living cálido con muebles de madera"
      />
    </section>
  )
}

export default Hero