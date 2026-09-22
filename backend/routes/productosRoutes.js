const express = require("express");
const router = express.Router();

router.get( "/api/productos", (req,res) => {
    res.json(productos);

});

router.get("/:id", (req,res) => {
    const productoId = parseInt(req.params.id);
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }

});
