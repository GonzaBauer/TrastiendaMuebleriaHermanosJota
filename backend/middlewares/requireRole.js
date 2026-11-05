function requireRole(...roles) {
  return function authorizeRole(req, res, next) {
    if (!req.auth) {
      return res.status(401).json({ message: "Se requiere una sesión válida." });
    }

    const role = req.auth.role || "cliente";
    if (!roles.includes(role)) {
      return res.status(403).json({ message: "No tenés permiso para realizar esta acción." });
    }

    return next();
  };
}

module.exports = requireRole;
