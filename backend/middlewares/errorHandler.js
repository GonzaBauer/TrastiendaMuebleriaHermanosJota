function validationMessage(error) {
  return Object.values(error.errors)
    .map((detail) =>
      detail.name === "CastError"
        ? `El valor de "${detail.path}" no es válido.`
        : detail.message,
    )
    .map((message) => (/[.!?]$/.test(message) ? message : `${message}.`))
    .join(" ");
}

function errorHandler(error, _req, res, _next) {
  // Datos rechazados por Mongoose: el usuario tiene que saber qué corregir.
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: validationMessage(error) });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ message: `El valor de "${error.path}" no es válido.` });
  }

  const statusCode = error.status || 500;

  console.error(error.message, error.stack);

  res.status(statusCode).json({
    message: statusCode >= 500 ? "Error interno del servidor" : error.message,
  });
}

module.exports = errorHandler;
