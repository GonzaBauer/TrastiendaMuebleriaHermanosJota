import API_BASE_URL from "../config/api.js";

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof body?.message === "string"
        ? body.message
        : `No se pudo iniciar sesión (HTTP ${response.status}).`,
    );
  }

  if (typeof body?.token !== "string" || !body.token) {
    throw new Error("La respuesta de inicio de sesión no es válida.");
  }

  return body;
}

export async function register(nombre, email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof body?.message === "string"
        ? body.message
        : `No se pudo crear la cuenta (HTTP ${response.status}).`,
    );
  }

  return body;
}
