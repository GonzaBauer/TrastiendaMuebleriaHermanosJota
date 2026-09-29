import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";
import logger from "./middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 5000;


app.use(logger); // Lo aplicamos globalmente. Se ejecutará para CADA petición.
app.use(cors());
app.use(express.json());
app.use("/api/productos", productosRoutes);


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
