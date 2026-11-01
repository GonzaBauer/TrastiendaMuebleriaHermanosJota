const Contacto = require("../models/contacto.model");

async function createContactMessage(req, res, next) {
  try {
    const { nombre, email, asunto, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      const error = new Error(
        "Los campos nombre, email y mensaje son obligatorios.",
      );
      error.status = 400;
      return next(error);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = new Error(
        "El formato del correo electrónico no es válido.",
      );
      error.status = 400;
      return next(error);
    }

    const nuevoMensaje = await Contacto.create({
      nombre: nombre.trim(),
      email: email.trim(),
      asunto: asunto ? asunto.trim() : "Consulta general",
      mensaje: mensaje.trim(),
    });

    return res.status(201).json({
      ok: true,
      message: "¡Gracias por contactarnos! Nos comunicaremos a la brevedad.",
      data: nuevoMensaje,
    });
  } catch (error) {
    return next(error);
  }
}

async function getAllContactMessages(req, res, next) {
    try {
        const mensajes = await Contacto.find().sort({ fecha: -1 });
        return res.status(200).json({
            ok: true,
            data: mensajes,
        });
    } catch (error) {
        return next(error);
    }
}

async function deleteContactMessage(req, res, next) {
    try {
        const { id } = req.params;
        const mensajeEliminado = await Contacto.findByIdAndDelete(id);

        if (!mensajeEliminado) {
            const error = new Error("No se encontró el mensaje de contacto especificado.");
            error.status = 404;
            return next(error);
        }

        return res.status(200).json({
            ok: true,
            message: "Mensaje eliminado correctamente.",
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = { createContactMessage, getAllContactMessages, 
    deleteContactMessage};
