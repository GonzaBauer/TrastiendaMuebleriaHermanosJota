const productos = require("../data/productos.js");

function getAllProducts(_req, res) {
  res.json(productos);
}

function getFeaturedProducts(_req, res) {
  const productosDestacados = productos
    .filter((producto) => producto.destacado === true)
    .slice(0, 3);

  res.json(productosDestacados);
}

function getProductById(req, res, next) {
  const productoId = Number(req.params.id);
  const producto = Number.isInteger(productoId)
    ? productos.find((item) => item.id === productoId)
    : null;

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
