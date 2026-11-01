const mongoose = require("mongoose");
const Producto = require("../models/producto.model");

async function getAllProducts(_req, res) {
  const productos = await Producto.find();
  res.json(productos);
}

async function getFeaturedProducts(_req, res) {
  const productosDestacados = await Producto.find({ destacado: true }).limit(3);
  res.json(productosDestacados);
}

async function getProductById(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error);
  }

  const producto = await Producto.findById(req.params.id);
  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error);
  }

  return res.json(producto);
}

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
};
