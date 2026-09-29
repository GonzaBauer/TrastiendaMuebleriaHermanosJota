import { Router } from "express";
import productos from "../productos.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(productos);
});

router.get("/:id", (req, res, next) => {
  const productoId = parseInt(req.params.id, 10);
  const producto = productos.find((p) => p.id === productoId);

  if (producto) {
    res.json(producto);
  } else {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    next(error);
  }
});

router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

export default router;