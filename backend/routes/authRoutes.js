const express = require("express");
const authController = require("../controllers/authController");
const requireAuth = require("../middlewares/requireAuth");
const rateLimit = require("../middlewares/rateLimit");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Demasiados intentos de inicio de sesión. Probá de nuevo en unos minutos.",
  key: (req) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    return `${req.ip}|${email}`;
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Demasiados registros desde esta conexión. Probá de nuevo más tarde.",
});

router.post("/register", registerLimiter, authController.register);
router.post("/login", loginLimiter, authController.login);
router.get("/me", requireAuth, authController.getCurrentUser);

module.exports = router;
