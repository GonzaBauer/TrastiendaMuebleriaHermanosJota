require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const conectarDB = require("../config/db");
const Usuario = require("../models/usuario.model");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BCRYPT_MAX_BYTES = 72;
const SALT_ROUNDS = 12;

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !EMAIL_PATTERN.test(email)) {
    throw new Error("Configurá un ADMIN_EMAIL válido en las variables de entorno.");
  }
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    Buffer.byteLength(password, "utf8") > BCRYPT_MAX_BYTES
  ) {
    throw new Error(
      "ADMIN_PASSWORD debe tener al menos 8 caracteres y no superar 72 bytes.",
    );
  }

  await conectarDB();

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const usuario = await Usuario.findOne({ email });

  if (usuario) {
    usuario.role = "admin";
    usuario.passwordHash = passwordHash;
    await usuario.save();
    console.log(`Se promovió a administrador la cuenta ${email}.`);
    return;
  }

  await Usuario.create({
    nombre: "Administrador",
    email,
    passwordHash,
    role: "admin",
  });
  console.log(`Se creó la cuenta administradora ${email}.`);
}

createAdmin()
  .catch((error) => {
    console.error("No se pudo crear el administrador:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
