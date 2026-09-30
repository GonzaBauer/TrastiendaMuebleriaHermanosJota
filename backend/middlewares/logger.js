const logger = (req, res, next) => {
  console.log(`Petición Recibida: ${req.method} en la ruta ${req.originalUrl}`);
  
  // ¡Crucial! Llamamos a next() para que la petición pueda continuar su viaje.
  next(); 
};

module.exports = logger;