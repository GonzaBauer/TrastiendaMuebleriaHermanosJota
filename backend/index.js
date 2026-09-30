const express = require("express");
const cors = require("cors");
const path = require("path");   
const productoRoutes = require("./routes/productoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

app.use("/api/productos", productoRoutes);


app.get("/", (_req, res) => {
  res.json({ message: "API de Trastienda Mueblería Hermanos Jota" });
});

app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada: ' + req.originalUrl);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error(err.message, err.stack);

  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
