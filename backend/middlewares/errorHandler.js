function errorHandler(error, _req, res, _next) {
  const statusCode = error.status || 500;

  console.error(error.message, error.stack);

  res.status(statusCode).json({
    message: statusCode >= 500 ? "Error interno del servidor" : error.message,
  });
}

module.exports = errorHandler;
