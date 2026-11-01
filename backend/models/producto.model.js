const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del mueble es obligatorio"],
      trim: true,
    },
    categoria: {
      type: String,
      trim: true,
      enum: {
        values: [
          "comedor",
          "sala",
          "trabajo",
          "dormitorio",
          "mesa",
          "almacenamiento",
        ],
        message: "La categoría no es válida en nuestro catálogo.",
      },
    },
    destacado: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      min: [0, "El stock no puede ser negativo"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    imagenUrl: {
      type: String,
    },
    descripcion: {
      type: String,
    },
    medidas: {
      type: String,
    },
    materiales: {
      type: String,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    toJSON: { virtuals: true },
  },
);

module.exports = mongoose.model("Producto", ProductoSchema);
