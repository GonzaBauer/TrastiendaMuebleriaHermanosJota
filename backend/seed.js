require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/producto.model'); // Asegúrate de que la ruta sea correcta

const mueblesDePrueba = [
  {
    nombre: "Mesa Comedor Nórdica",
    categoria: "comedor",
    destacado: true,
    precio: 125000,
    imagen: "/img/productos/mesa-nordica.webp",
    descripcion: "Mesa de comedor estilo nórdico para 6 personas.",
    descripcionLarga: "Elegante mesa de comedor con diseño escandinavo, ideal para espacios modernos. Su estructura reforzada garantiza años de durabilidad familiar.",
    medidas: "160cm x 90cm x 75cm",
    materiales: "Madera maciza de paraíso y tapa de MDF laqueado",
    acabado: "Laca poliuretánica mate",
    rotacion: "Alta",
    garantia: "12 meses"
  },
  {
    nombre: "Sofá Chaiselongue Premium",
    categoria: "sala",
    destacado: true,
    precio: 350000,
    imagen: "/img/productos/sofa-premium.webp",
    descripcion: "Sofá esquinero de 3 cuerpos con chaiselongue reversible.",
    descripcionLarga: "El máximo confort para tu sala de estar. Relleno de espuma de alta densidad y tapizado antimanchas, con estructura secada al horno para evitar deformaciones.",
    medidas: "210cm x 160cm x 85cm",
    materiales: "Estructura de saligna, tapizado en pana antimanchas",
    acabado: "Costuras reforzadas, patas de madera lustrada",
    rotacion: "Media",
    garantia: "24 meses"
  },
  {
    nombre: "Escritorio Home Office Pro",
    categoria: "trabajo",
    destacado: false,
    precio: 85000,
    imagen: "/img/productos/escritorio-pro.webp",
    descripcion: "Escritorio ergonómico con cajonera integrada.",
    descripcionLarga: "Diseñado para jornadas largas de teletrabajo. Cuenta con pasacables de aluminio y guías telescópicas en sus cajones para un deslizamiento suave.",
    medidas: "120cm x 60cm x 78cm",
    materiales: "Melamina 18mm sobre MDP",
    acabado: "Cantos de PVC termosellados, color roble y blanco",
    rotacion: "Alta",
    garantia: "6 meses"
  },
  {
    nombre: "Cama King Size con Cajones",
    categoria: "dormitorio",
    destacado: false,
    precio: 210000,
    imagen: "/img/productos/cama-king.webp",
    descripcion: "Cama base para colchón King con 4 cajones de guardado.",
    descripcionLarga: "Optimiza el espacio de tu dormitorio. Esta cama incluye módulos independientes con cajones profundos, ideales para ropa blanca o de cambio de temporada.",
    medidas: "200cm x 200cm x 35cm",
    materiales: "MDF de 18mm de alta resistencia",
    acabado: "Laqueado blanco brillante",
    rotacion: "Baja",
    garantia: "12 meses"
  }
];

const sembrarBaseDeDatos = async () => {
  try {
    console.log("⏳ Conectando a MongoDB Atlas...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión exitosa.");

    console.log("🧹 Limpiando el catálogo anterior...");
    await Producto.deleteMany(); 

    console.log("🌱 Insertando nuevos muebles...");
    await Producto.insertMany(mueblesDePrueba);
    
    console.log("🚀 ¡Base de datos sembrada con éxito!");
  } catch (error) {
    console.error("❌ Error al sembrar la base de datos:");
    console.error(error.message);
  } finally {
    mongoose.connection.close();
    console.log("👋 Conexión finalizada.");
    process.exit(0);
  }
};

sembrarBaseDeDatos();