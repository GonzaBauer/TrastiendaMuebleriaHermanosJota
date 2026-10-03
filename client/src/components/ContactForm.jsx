import { useState } from 'react';
import Navbar from '../Navbar.jsx'; // Ajusta la ruta si Navbar está en otra carpeta
import Footer from '../Footer.jsx'; // Ajusta la ruta según la ubicación de Footer
import './ContactForm.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const ContactForm = ({ cartCount = 0 }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [estadoEnvio, setEstadoEnvio] = useState({
    cargando: false,
    exito: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ cargando: true, exito: false, error: null });

    try {
      const respuesta = await fetch(`${API_BASE_URL}/api/contacto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }

      setEstadoEnvio({ cargando: false, exito: true, error: null });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      setEstadoEnvio({ cargando: false, exito: false, error: err.message });
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} activeView="contact" />

      <section className="contacto-container">
        <h2 className="contacto-title">CONTACTO</h2>

        <div className="contacto-grid">
          <div className="contacto-info">
            <div className="info-card">
              <h3>Hermanos Jota — Casa Taller</h3>
              <p>Av. San Juan 2847</p>
              <p>C1232AAB — Barrio de San Cristóbal</p>
              <p>Ciudad Autónoma de Buenos Aires, Argentina</p>
              <br />
              <strong>Horarios:</strong>
              <p>Lunes a Viernes: 10:00 - 19:00</p>
              <p>Sábados: 10:00 - 14:00</p>
            </div>

            <div className="info-card" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D7CE' }}>
              <h3>Contacto Digital</h3>
              <table className="contacto-tabla">
                <tbody>
                  <tr>
                    <td>Sitio web</td>
                    <td>www.hermanosjota.com.ar</td>
                  </tr>
                  <tr>
                    <td>Email general</td>
                    <td>info@hermanosjota.com.ar</td>
                  </tr>
                  <tr>
                    <td>Ventas</td>
                    <td>ventas@hermanosjota.com.ar</td>
                  </tr>
                  <tr>
                    <td>Instagram</td>
                    <td>@hermanosjota_ba</td>
                  </tr>
                  <tr>
                    <td>WhatsApp</td>
                    <td>+54 11 4567-8900</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-container">
            <h3>Envíanos un mensaje</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre completo *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Sofía Martínez"
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tuemail@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label>Asunto</label>
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  placeholder="Consulta sobre productos o envíos"
                />
              </div>

              <div className="form-group">
                <label>Mensaje *</label>
                <textarea
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-enviar"
                disabled={estadoEnvio.cargando}
              >
                {estadoEnvio.cargando ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </button>
            </form>

            {estadoEnvio.exito && (
              <p className="mensaje-exito" style={{ color: 'green', marginTop: '1rem' }}>
                ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
              </p>
            )}

            {estadoEnvio.error && (
              <p className="mensaje-error" style={{ color: 'red', marginTop: '1rem' }}>
                {estadoEnvio.error}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};