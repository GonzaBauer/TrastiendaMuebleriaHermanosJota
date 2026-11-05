const express = require("express");
const productoController = require("../controllers/productoController");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");

const router = express.Router();

router.get("/", productoController.getAllProducts);
router.get("/destacados", productoController.getFeaturedProducts);
router.get("/:id", productoController.getProductById);
router.post("/", requireAuth, requireRole("admin"), productoController.createProduct);
router.put("/:id", requireAuth, requireRole("admin"), productoController.updateProduct);
router.delete("/:id", requireAuth, requireRole("admin"), productoController.deleteProduct);

module.exports = router;
