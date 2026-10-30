const express = require("express");
const productoController = require("../controllers/productoController");

const router = express.Router();

router.get("/", productoController.getAllProducts);
router.get("/destacados", productoController.getFeaturedProducts);
router.get("/:id", productoController.getProductById);

module.exports = router;
