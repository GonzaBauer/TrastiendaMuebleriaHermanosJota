import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="contacto">
      <div className="footer__content">
        <address className="footer__details">
          <p>Av. San Juan 2847 - C1232AAB — Barrio de San Cristóbal - Ciudad Autónoma de Buenos Aires Argentina</p>
          <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
          <a href="https://wa.me/541112345678">+54 11 1234-5678</a>
        </address>
        <p className="footer__copyright">
          © 2026 Mueblería Hermanos Jota. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer