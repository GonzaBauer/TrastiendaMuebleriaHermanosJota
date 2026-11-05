const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const error = new Error("La variable JWT_SECRET no está configurada");
    error.status = 500;
    return next(error);
  }

  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");
  if (scheme.toLowerCase() !== "bearer" || !token) {
    return res.status(401).json({ message: "Se requiere una sesión válida." });
  }

  let payload;
  try {
    payload = jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch (_error) {
    return res.status(401).json({ message: "Se requiere una sesión válida." });
  }

  if (typeof payload !== "object" || typeof payload.sub !== "string") {
    return res.status(401).json({ message: "Se requiere una sesión válida." });
  }

  req.auth = {
    userId: payload.sub,
    role: typeof payload.role === "string" ? payload.role : "cliente",
  };
  return next();
}

module.exports = requireAuth;
