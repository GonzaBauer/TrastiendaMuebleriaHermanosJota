const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BCRYPT_MAX_BYTES = 72;
const SALT_ROUNDS = 12;

function isValidPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 8 &&
    Buffer.byteLength(password, "utf8") <= BCRYPT_MAX_BYTES
  );
}

function createToken(usuario) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const error = new Error("La variable JWT_SECRET no está configurada");
    error.status = 500;
    throw error;
  }

  return jwt.sign(
    { sub: usuario._id.toString(), role: usuario.role || "cliente" },
    secret,
    {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    },
  );
}

function publicUser(usuario) {
  return {
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    email: usuario.email,
    role: usuario.role || "cliente",
  };
}

async function register(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Los datos enviados no son válidos." });
  }

  const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const { password } = body;

  if (!nombre || nombre.length > 100) {
    return res.status(400).json({ message: "Ingresá un nombre válido (máximo 100 caracteres)." });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return res.status(400).json({ message: "Ingresá un correo electrónico válido." });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 8 caracteres y no superar 72 bytes.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const usuario = await Usuario.create({ nombre, email, passwordHash });

    return res.status(201).json({
      message: "La cuenta se creó correctamente.",
      user: publicUser(usuario),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo electrónico." });
    }
    throw error;
  }
}

async function login(req, res) {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Los datos enviados no son válidos." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const { password } = body;
  if (!EMAIL_PATTERN.test(email) || typeof password !== "string" || password.length === 0) {
    return res.status(400).json({ message: "Ingresá un correo y una contraseña válidos." });
  }
  if (Buffer.byteLength(password, "utf8") > BCRYPT_MAX_BYTES) {
    return res.status(401).json({ message: "El correo o la contraseña son incorrectos." });
  }

  const usuario = await Usuario.findOne({ email }).select("+passwordHash");
  if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
    return res.status(401).json({ message: "El correo o la contraseña son incorrectos." });
  }

  return res.json({
    token: createToken(usuario),
    user: publicUser(usuario),
  });
}

async function getCurrentUser(req, res) {
  const usuario = await Usuario.findById(req.auth.userId);
  if (!usuario) {
    return res.status(401).json({ message: "La sesión no es válida." });
  }

  return res.json({ user: publicUser(usuario) });
}

module.exports = { register, login, getCurrentUser };
