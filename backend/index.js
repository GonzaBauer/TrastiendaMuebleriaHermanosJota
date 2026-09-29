const express = require("express");
const cors = require("cors");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/productos", productoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});