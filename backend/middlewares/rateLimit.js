// Los intentos se guardan en memoria: se reinician al reiniciar el servidor y no se
// comparten entre instancias. Si el backend escala a varias instancias, usar un store compartido.
function rateLimit({ windowMs, max, message, key = (req) => req.ip }) {
  const intentos = new Map();

  return function limitRequests(req, res, next) {
    const now = Date.now();
    const id = key(req);
    let entry = intentos.get(id);

    if (!entry || entry.resetAt <= now) {
      if (intentos.size > 10000) {
        for (const [storedId, stored] of intentos) {
          if (stored.resetAt <= now) intentos.delete(storedId);
        }
      }
      entry = { count: 0, resetAt: now + windowMs };
      intentos.set(id, entry);
    }

    entry.count += 1;
    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ message });
    }

    return next();
  };
}

module.exports = rateLimit;
