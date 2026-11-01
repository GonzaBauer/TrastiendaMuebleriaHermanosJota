const express = require("express");
const productoController = require("../controllers/productoController");

const router = express.Router();

router.get("/", productoController.getAllProducts);
router.get("/destacados", productoController.getFeaturedProducts);
router.get("/:id", productoController.getProductById);
router.post("/", productoController.createProduct);
router.put("/:id", productoController.updateProduct);
router.delete("/:id", productoController.deleteProduct);

module.exports = router;
