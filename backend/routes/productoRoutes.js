const express = require("express");
const productos = require("../data/productos.js");

const router = express.Router();

router.get("/", (_req, res, next) => {
  try {
    return res.json(productos);
  } catch (error) {
    return next(error);
  }
});

router.get("/destacados", (_req, res, next) => {
  try {
    const productosDestacados = productos
      .filter((producto) => producto.destacado === true)
      .slice(0, 3);

    return res.json(productosDestacados);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const productoId = parseInt(req.params.id, 10);
    const producto = productos.find((item) => item.id === productoId);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    return res.json(producto);
  } catch (error) {
    return next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length + 1;
    productos.push(nuevoProducto);
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;