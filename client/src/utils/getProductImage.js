function getProductImage(producto) {
  return producto.imagenUrl || producto.imagen || producto.image;
}

export default getProductImage;
