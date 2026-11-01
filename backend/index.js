const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const apiController = require("./controllers/apiController");
const productoRoutes = require("./routes/productoRoutes");
const contactoRoutes = require("./routes/contactoRoutes");
const conectarDB = require('./config/db'); 
require('dotenv').config();

const iniciarServidor = async () => {
  await conectarDB();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger);
app.use(cors());
app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

app.use("/api/productos", productoRoutes);
app.use("/api/contacto", contactoRoutes);

app.get("/", apiController.getApiInfo);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
};

iniciarServidor();
