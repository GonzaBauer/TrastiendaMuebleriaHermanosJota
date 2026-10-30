const priceFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 0,
});

function formatPrice(value) {
  return priceFormatter.format(value);
}

export default formatPrice;
