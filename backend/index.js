const express = require("express");
const cors = require("cors");
const path = require("path");   
const productoRoutes = require("./routes/productoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

app.use("/api/productos", productoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});