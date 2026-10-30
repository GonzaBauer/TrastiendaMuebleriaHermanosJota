const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
     nombre: {
        type: String,
       required: [true, 'El nombre del mueble es obligatorio'],
        trim: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true,
        enum: {
            values: ['comedor', 'sala', 'trabajo', 'dormitorio', 'mesa', 'almacenamiento'],
            message: 'La categoría no es válida en nuestro catálogo.'
        }
    },
    destacado: {
        type: Boolean,
        default: false
    },
    precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
    },
    imagen: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    },
    descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    },
    descripcionLarga: {
    type: String,
    required: [true, 'La descripción larga es obligatoria'],
    },
    medidas: {
    type: String,
    required: [true, 'Las medidas son obligatorias']
    },
    materiales: {
    type: String,
    required: [true, 'Los materiales son obligatorios']
    },
    acabado: {
    type: String,
    required: [true, 'El acabado es obligatorio']
    },
    rotacion: {
    type: String,
    required: [true, 'La rotación es obligatoria']
    },
    garantia: {
    type: String,
    required: [true, 'La garantía es obligatoria']
    }
    },{
        timestamps: true // Agrega createdAt y updatedAt automáticamente
    });


 
  
    
module.exports = mongoose.model('Producto', ProductoSchema);
