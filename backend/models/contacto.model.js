const mongoose = require("mongoose");

const ContactoSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: Date.now,
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "El formato del correo electrónico no es válido"],
    },
    asunto: {
      type: String,
      default: "Consulta general",
      trim: true,
    },
    mensaje: {
      type: String,
      required: [true, "El mensaje es obligatorio"],
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Contacto", ContactoSchema);
