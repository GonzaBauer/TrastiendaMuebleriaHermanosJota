const express = require("express");
const router = express.Router();

// POST /api/contacto
router.post("/", (req, res, next) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !email || !mensaje) {
      const error = new Error("Los campos nombre, email y mensaje son obligatorios.");
      error.status = 400;
      return next(error);
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error("El formato del correo electrónico no es válido.");
      error.status = 400;
      return next(error);
    }

    const nuevoMensaje = {
      id: Date.now(),
      nombre: nombre.trim(),
      email: email.trim(),
      asunto: asunto ? asunto.trim() : "Consulta general",
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString()
    };

    console.log("Mensaje de contacto recibido:", nuevoMensaje);

    return res.status(201).json({
      ok: true,
      message: "¡Gracias por contactarnos! Nos comunicaremos a la brevedad.",
      data: nuevoMensaje
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;