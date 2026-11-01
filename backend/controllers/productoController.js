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

async function createProduct(req, res, next) {
    try {
        const nuevoProducto = await Producto.create(req.body);
        return res.status(201).json({
            ok: true,
            message: "¡Producto creado con éxito!",
            data: nuevoProducto
        });
    } catch (error) {
        return next(error);
    }
}
async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!productoActualizado) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        return res.json({
            ok: true,
            message: "¡Producto actualizado con éxito!",
            data: productoActualizado
        });
    } catch (error) {
        return next(error);
    }
}
async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        return res.json({
            ok: true,
            message: "¡Producto eliminado con éxito!",
            data: productoEliminado
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
